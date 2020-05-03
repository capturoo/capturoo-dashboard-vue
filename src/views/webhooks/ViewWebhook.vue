<template>
  <div class="webhooks">
    <div class="mb-3">
      <router-link :to="{ name: 'webhooks-overview' }">
        <v-btn text class="primary--text float-left pl-0 ml-0">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <span class="pb-4 ml-4 title font-weight-light">Webhook details</span>

      <router-link :to="{ name: 'create-webhook' }">
        <v-btn text class="primary--text float-right">
          Edit
          <v-icon left dark class="pl-4">mdi-pencil</v-icon>
        </v-btn>
      </router-link>
    </div>

    <v-divider></v-divider>

    <v-container v-if="webhook" fluid>
      <v-row>
          <v-col cols="12" x="6" md="6">
            <v-icon
              large
              left
              color="success"
              class="pr-4 pb-1"
            >mdi-webhook</v-icon>
            <span class="font-weight-light title">{{ webhook.code }}</span>
          </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="6" md="6">
          <div class="caption grey--text">Webhook URL</div>
          <div>{{ webhook.url }}</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="6" md="6">
          <div class="caption grey--text">Created</div>
          <div><p class="grey--text text--darken-1 pt-0 body-2">{{ webhook.created }}</p></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  computed: {
    webhook() {
      return this.$store.getters.webhook
    }
  },
  beforeMount: async function() {
    try {
      await this.$store.dispatch('getWebhook', {
        webhookId: this.$route.params.webhookId
      })
    } catch (err) {
      throw err
    }
  },
  beforeDestroy() {
    this.$store.dispatch('resetWebhook')
  }
}
</script>
