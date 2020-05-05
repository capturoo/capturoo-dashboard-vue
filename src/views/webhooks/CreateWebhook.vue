<template>
  <div class="webhooks">
    <div class="mb-3">
      <router-link :to="{ name: 'webhooks-overview' }">
        <v-btn
          :disabled="loading"
          text
          class="primary--text float-left pl-0 ml-0">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <span class="pb-4 ml-4 title font-weight-light">Create a webhook</span>
    </div>

    <v-divider></v-divider>

    <v-container fluid>
      <p class="text--secondary">A webhook description TODO.</p>
      <v-form>
        <v-row>
          <v-col cols="12" sm="6" lg="3">
            <v-text-field
              v-model="webhookCode"
              placeholder="example-webhook-code"
              :rules="webhookCodeRules"
              label="Webhook code"
              dense
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="url"
              placeholder="https://example.com/webhook-endpoint"
              :rules="urlRules"
              label="URL"
              dense
              outlined
              required
            ></v-text-field>

            <v-combobox
              v-model="accountEvents"
              :items="accountScopedEvents"
              label="Account scoped events"
              multiple
              chips
            >
              <template v-slot:selection="data">
                <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  class="ml-0 mt-2 mr-2"
                  color="primary"
                  label
                  close
                  small
                  @click:close="data.parent.selectItem(data.item)"
                >
                  <v-icon left>mdi-label</v-icon>
                  {{ data.item }}
                </v-chip>
              </template>
            </v-combobox>

            <v-combobox
              v-model="bucketEvents"
              :items="bucketScopedEvents"
              label="Bucket scoped events"
              multiple
              chips
            >
              <template v-slot:selection="data">
                <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  class="ml-0 mt-2 mr-2"
                  color="primary"
                  label
                  close
                  small
                  @click:close="data.parent.selectItem(data.item)"
                >
                  <v-icon left>mdi-label</v-icon>
                  {{ data.item }}
                </v-chip>
              </template>
            </v-combobox>

            <v-switch
              v-model="enabled"
              label="Enable webhook"
              dense
              ></v-switch>

            <v-btn
              @click="createWebhook"
              :disabled="loading"
              :loading="loading"
              class="primary ml-0"
            >Create</v-btn>
            <v-btn
              @click="cancel"
              depressed
              class="ml-4"
            >Cancel</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    enabled: true,
    webhookCode: '',
    webhookCodeRules: [
      v => !!v || 'Webhook code is required'
    ],
    url: '',
    urlRules: [
      v => !!v || 'Secure URL is required'
    ],
    accountEvents: [],
    bucketEvents: [],
    accountScopedEvents: [
      'bucket.created',
      'bucket.deleted'
    ]
  }),
  beforeMount: async function() {
    try {
      this.$store.commit('resetBuckets')
      await this.$store.dispatch('getBuckets')
    } catch (err) {
      throw err
    }
  },
  computed: {
    bucketScopedEvents() {
      const buckets = this.$store.getters.buckets
      if (!buckets) {
        return []
      }
      const bucketScopedEvents = [];
      buckets.forEach(v => {
        bucketScopedEvents.push(`lead.created:${v.bucketCode}`)
      });
      return bucketScopedEvents
    }
  },
  methods: {
    async createWebhook() {
      try {
        const events = this.accountEvents.concat(this.bucketEvents);
        this.loading = true
        await this.$store.dispatch('createWebhook', {
          webhookCode: this.webhookCode,
          url: this.url,
          events,
          enabled: this.enabled
        })
        this.loading = false
        this.$router.replace({ name: 'webhooks-overview' })
      } catch (err) {
        this.loading = false
        throw err
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.$router.replace({ name: 'webhooks-overview' })
    }
  }
}
</script>
