<template>
  <div class="buckets">
    <div class="mb-3">
      <span class="ml-4 title font-weight-light">Account Settings</span>
    </div>

    <v-divider></v-divider>

    <v-tabs v-model="tab">
      <v-tab>Account</v-tab>
      <v-tab>Developer Keys</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :transition="false" :reverse-transition="false">
        <v-card flat>
          <v-card-text>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ account.displayName }}</v-list-item-title>
                <v-list-item-subtitle>{{ account.email }}</v-list-item-subtitle>
                <p class="grey--text text--darken-1 pt-4">Account id: {{ account.accountId }}</p>
                <p class="grey--text text--darken-1 pt-4">Created: {{ account.created }}</p>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item :transition="false" :reverse-transition="false">
        <v-card flat>
          <v-card flat>
          <v-card-text>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">Private API Key</v-list-item-title>
                <v-list-item-subtitle>{{ account.developerKey }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null
    }
  },
  computed: {
    account() {
      return this.$store.getters.account
    }
  },
  beforeMount: async function() {
    this.loading = true;
    console.log('loading account')
    const account = await this.getBuckets();
    console.log('account loaded')
    console.log(account)
  },
  methods: {
    async getBuckets() {
      const account = await this.$store.dispatch('getAccount')
      console.log('method: getBuckets')
      console.log(account)
      return account
    },
    async deleteConfirm(bucketId) {
      await this.$store.dispatch('deleteBucket', { bucketId })
    }
  }
}
</script>
