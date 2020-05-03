interface CapturooClientOptions {
  endpoint?: string
  firebaseConfig?: FirebaseConfig
  debug?: boolean
}

interface FirebaseConfig {
  apiKey: string
  appId?: string
  authDomain: string
  databaseURL?: string
  messagingSenderId?: string
  projectId: string
  storageBucket?: string
}

interface AutoConf {
  object: string
  data: {
    firebaseConfig: FirebaseConfig
  }
}

interface AccountData {
  object: string
  accountId: string
  uid: string
  role: string
  email: string
  displayName: string
  developerKey: string
  created: string
  modified: string
}

interface BucketData {
  object: string
  bucketId: string
  accountId: string
  resourceName: string
  bucketName: string
  publicApiKey: string
  created: string
  modified: string
}

interface BucketList {
  object: string
  data: BucketData[]
}

interface WebhookData {
  object: string
  webhookId: string
  code: string
  events: string[]
  url: string
  enabled: boolean
  created: string
  modified: string
}

interface WebhookList {
  object: string
  data: WebhookData[]
}


interface ErrorResponse {
  status: number
  code: string
  message: string
}

const CAPTUROO_ENDPOINT = 'https://api-staging.capturoo.com'

class CapturooClient {
  static client
  endpoint: string
  user: firebase.User
  claimAccountId: string
  claimRole: string | undefined
  claimUid: string | undefined
  private jwt: string | undefined
  private debug: boolean

  private firebaseConfig: FirebaseConfig

  constructor(opts: CapturooClientOptions) {
    this.claimAccountId = undefined
    this.claimRole = undefined
    this.claimUid = undefined
    this.jwt = undefined
    this.endpoint = opts.endpoint || CAPTUROO_ENDPOINT
    this.debug = opts.debug || false
    this.firebaseConfig = opts.firebaseConfig
  }

  static version() {
    return 'dev'
  }

  static admin(): CapturooClient {
    return CapturooClient.client
  }

  static initializeApp(opts: CapturooClientOptions) {
    try {
      const endpoint = opts.endpoint || CAPTUROO_ENDPOINT
      const debug = opts.debug || false
      if (!endpoint) {
        throw Error('endpoint not set')
      }
      CapturooClient.client = new CapturooClient(opts)
    } catch (err) {
      throw err
    }
  }

  setFirebaseUser(user: firebase.User) {
    this.user = user
  }

  setJWT(jwt: string) {
    this.jwt = jwt
  }

  setClaims(claims: any) {
    this.claimAccountId = undefined
    if ('cap_aid' in claims) {
      this.claimAccountId = claims['cap_aid']
    }

    this.claimRole = undefined
    if ('cap_role' in claims) {
      this.claimRole = claims['cap_role']
    }

    this.claimUid = undefined
    if ('user_id' in claims) {
      this.claimUid = claims['user_id']
    }
  }

  async get(url: string, query?: URLSearchParams) {
    if (!query) {
      query = null
    }
    return this.do(url, 'GET', query, null, false)
  }

  async post(url: string, body: object | null, noAuth?: boolean) : Promise<Response> {
    return this.do(url, 'POST', null, body, noAuth);
  }

  async delete(url: string) : Promise<Response> {
    return this.do(url, 'DELETE', null, null);
  }

  private async do(url: string, method: string, query: URLSearchParams | null, body: object | null, noAuth?: boolean): Promise<Response> {
    const opts : any  = {
      method,
      headers: {
        'Accept': 'application/json',

      },
      mode: 'cors'
    }
    console.log('a')
    if (noAuth === false) {
      console.log('adding auth header')
      const { token } = await this.user.getIdTokenResult()
      opts.headers['Authorization'] = `Bearer ${token}`
    }

    if ((method === 'POST') && (!body)) {
      opts.headers['Content-Length'] = '0'
    }

    if (body) {
      opts.body = JSON.stringify(body)
      opts.headers['Content-Type'] = 'application/json'
    }
    if (this.debug) {
      console.log(`fetch url=${url}`)
      console.dir(opts)
    }

    try {
      let queryString = ''
      if (query) {
        const s = query.toString()
        if (s.length > 0) {
          queryString = '?' + s
        }
      }
      const response = await fetch(`${this.endpoint}${url}${queryString}`, opts)
      if (response.status >= 400) {
        let data: ErrorResponse = await response.json()
        if (this.debug) {
          console.log(data)
        }
        throw new CapturooError(data.status, data.code, data.message)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  async getFirebaseConfig(): Promise<FirebaseConfig> {
    if (!this.firebaseConfig) {
      const response = await this.do('/autoconf', 'GET', null, null, true)
      if (response.status === 200) {
        const data: AutoConf = await response.json()
        this.firebaseConfig = data.data.firebaseConfig
      }
    }
    return this.firebaseConfig
  }

  /**
   * signUp creates a new capturoo account
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} email
   * @param {string} password
   * @returns {Promise.Account}
   */
  async signUp(firstname: string, lastname: string, email: string, password: string) {
    try {
      const response = await this.post('/signup', {
        displayName: `${firstname} ${lastname}`,
        email,
        password
      }, true)

      if (response.status === 201) {
        const data: AccountData = await response.json()
        return new Account(this, data)
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }

  /**
   * getAccount fetches the account object.
   * @param accountId? account id or defaults to the account in the claim if not set
   * @returns {Promise.<Account>}
   */
  async getAccount(accountId?: string): Promise<Account> {
    try {
      if (!accountId) {
        accountId = this.claimAccountId
      }

      const response = await this.get(`/accounts/${accountId}`)
      if (response.status === 200) {
        const account: Account = await response.json()
        return account
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }
  /**
   * createBucket creates a new bucket inside the account associated to the
   * currently signed in user
   * @param {string} bucketCode lowercase including hyphens
   * @param {string} bucketName mixed case short name
   * @returns {Promise.<Bucket>}
   */
  async createBucket(bucketCode: string, bucketName: string): Promise<Bucket> {
    try {
      const response = await this.post('/buckets', {
        accountId: this.claimAccountId,
        bucketCode,
        bucketName
      })

      if (response.status === 201) {
        const data: BucketData = await response.json()
        return new Bucket(this, data)
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }

  async getBuckets(): Promise<Bucket[]> {
    try {
      const query = new URLSearchParams()
      query.append('accountId', this.claimAccountId)

      const buckets: Bucket[] = []
      const response = await this.get('/buckets', query)
      if (response.status === 200) {
        const data: BucketList = await response.json()
        for (let v of data.data) {
          buckets.push(new Bucket(this, v))
        }
        return buckets
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }

  async getBucket(bucketId: string): Promise<Bucket> {
    try {
      const response = await this.get(`/buckets/${bucketId}`)
      if (response.status === 200) {
        const data: BucketData = await response.json()
        return new Bucket(this, data)
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }

  async getWebhooks(): Promise<Webhook[]> {
    try {
      const query = new URLSearchParams()
      query.append('accountId', this.claimAccountId)

      const webhooks: Webhook[] = []
      const response = await this.get('/webhooks', query)
      if (response.status === 200) {
        const data: WebhookList = await response.json()
        for (let v of data.data) {
          webhooks.push(new Webhook(this, v))
        }
        return webhooks
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }

  async getWebhook(webhookId: string): Promise<Webhook> {
    try {
      const response = await this.get(`/webhooks/${webhookId}`)
      if (response.status === 200) {
        const data: WebhookData = await response.json()
        return new Webhook(this, data)
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }
}

class Account {
  private _client: CapturooClient
  readonly accountId: string
  readonly uid: string
  readonly role: string
  readonly email: string
  readonly displayName: string
  readonly developerKey: string
  readonly created: Date
  readonly modified: Date

  constructor(client: CapturooClient, data: AccountData) {
    this._client = client
    this.accountId = data.accountId
    this.uid = data.uid
    this.role = data.role
    this.email = data.email
    this.displayName = data.displayName
    this.developerKey = data.developerKey
    this.created = new Date(data.created)
    this.modified = new Date(data.modified)
  }
}

class Bucket {
  private _client: CapturooClient
  readonly accountId: string
  readonly bucketId: string
  readonly bucketName: string
  readonly resourceName: string
  readonly publicApiKey: string
  readonly created: Date
  readonly modified: Date

  constructor(client: CapturooClient, data: BucketData) {
    this._client = client
    this.accountId = data.accountId
    this.bucketId = data.bucketId
    this.bucketName = data.bucketName
    this.publicApiKey = data.publicApiKey
    this.resourceName = data.resourceName
    this.created = new Date(data.created)
    this.modified = new Date(data.modified)
  }

  async delete(): Promise<void> {
    try {
      const response = await this._client.delete(`/buckets/${this.bucketId}`)
      if (response.status === 204) {
        return
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }

  data() : BucketData {
    return {
      object: 'bucket',
      bucketId: this.bucketId,
      accountId: this.accountId,
      bucketName: this.bucketName,
      resourceName: this.resourceName,
      publicApiKey: this.publicApiKey,
      created: this.created.toISOString(),
      modified: this.modified.toISOString()
    }
  }
}

class Lead {

}

class Webhook {
  private _client: CapturooClient
  readonly webhookId: string
  readonly code: string
  readonly events: string[]
  readonly url: string
  readonly enabled: boolean
  readonly created: Date
  readonly modified: Date

  constructor(client: CapturooClient, data: WebhookData) {
    this._client = client
    this.webhookId = data.webhookId
    this.code = data.code
    this.events = data.events
    this.url = data.url
    this.enabled = data.enabled
    this.created = new Date(data.created)
    this.modified = new Date(data.modified)
  }

  async delete(): Promise<void> {
    try {
      const response = await this._client.delete(`/webhooks/${this.webhookId}`)
      if (response.status === 204) {
        return
      }

      const data = await response.json()
      throw new CapturooError(response.status, 'unknown-error', data.toString())
    } catch (err) {
      throw err
    }
  }
}

class CapturooError extends Error {
  readonly status: number
  readonly code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

export default CapturooClient
