<template>
  <div class="webhooks">
    <div class="mb-3">
      <router-link :to="{ name: 'webhooks-overview' }">
        <v-btn
          :disabled="disabled"
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

            <v-btn
              :disabled="disabled"
              :loading="loading"
              @click="createWebhook"
              class="primary ml-0"
            >
              Create
            </v-btn>
            <v-btn depressed class="ml-4">Cancel</v-btn>
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
    disabled: false,
    webhookCode: '',
    webhookCodeRules: [
      v => !!v || 'Webhook code is required'
    ],
    url: '',
    urlRules: [
      v => !!v || 'Secure URL is required'
    ]
  }),
  methods: {
    createWebhook() {
      this.loading = true
      this.disabled = true
      setTimeout(() => {
        this.loading = false
        this.$router.replace({ name: 'webhooks-overview' })
      }, 3000)
    }
  }
}
</script>
