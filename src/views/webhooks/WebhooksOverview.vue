<template>
  <div class="webhooks">
    <div class="mb-3">
      <span class="ml-4 title font-weight-light">Webhooks</span>
      <router-link :to="{ name: 'create-webhook' }">
        <v-btn text class="primary--text float-right">
          Create Webhook
          <v-icon left dark class="pl-4">mdi-plus-box</v-icon>
        </v-btn>
      </router-link>
    </div>

    <v-divider></v-divider>

    <v-container fluid>
      <p class="pl-1 text--secondary">Webhooks description TODO.</p>
      <v-simple-table class="mt-4">
        <template v-slot:default>
          <thead>
            <tr>
              <th>Webhook code</th>
              <th>Enabled</th>
              <th>URL</th>
              <th>Events</th>
              <th>Created</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="webhook in webhooks" :key="webhook.code">
              <td>
                <router-link
                  :to="{ name: 'view-webhook', params: { webhookId: webhook.webhookId }}"
                >
                  {{ webhook.code }}
                </router-link>
              </td>
              <td>
                <v-icon
                  v-show="webhook.enabled == true"
                  color="success"
                >mdi-lightbulb-on</v-icon>
                <v-icon
                  v-show="webhook.enabled == false"
                  color="error"
                >mdi-lightbulb-off</v-icon>
              </td>
              <td>{{ webhook.url }}</td>
              <td>
                <v-chip
                  v-for="event in webhook.events"
                  :key="event"
                  small
                  class="ml-0 ma-2"
                  label
                  outlined=""
                >
                  <v-icon left>mdi-label</v-icon>
                    {{ event }}
                </v-chip>
              </td>
              <td>{{ webhook.created }}</td>
              <td>
                <c-confirm-dialog
                  :id="webhook.webhookId"
                  icon="mdi-delete"
                  @confirm="deleteConfirm"
                  cancel="Cancel"
                  action="Delete"
                  title="Delete webhook?"
                >
                  <template v-slot:content>
                    <p>You cannot undo this action.</p>
                    <p>Do you want to delete {{ webhook.code }}?</p>
                  </template>
                </c-confirm-dialog>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog.vue'

export default {
  components: {
    'c-confirm-dialog': ConfirmDialog
  },
  data() {
    return {
      webhooks: [
        { webhookId: 'xyz123', code: 'webhook-one', url: 'https://us-central1-capturoo-api-staging.cloudfunctions.net/capturooWebhookPluginTest1', events: ['bucket.created', 'bucket-deleted', 'lead.created:woofy,skincare,big-long-project-name,lions,zebra'], enabled: true, created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
        { webhookId: 'def345', code: 'webhook-two', url: 'https://us-central1-capturoo-api-staging.cloudfunctions.net/capturooWebhookPluginTest2', events: ['bucket.created'], enabled: false, created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
        { webhookId: 'abc567', code: 'webhook-three', url: 'https://us-central1-capturoo-api-staging.cloudfunctions.net/capturooWebhookPluginTest3', events: ['bucket.created'], enabled: true, created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
      ]
    }
  },
  methods: {
    deleteConfirm(id) {
      console.log(`delete ${id} confirm`)
    }
  }
}
</script>
