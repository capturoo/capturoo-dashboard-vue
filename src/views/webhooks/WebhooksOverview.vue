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
      <v-simple-table v-if="webhooks" class="mt-4">
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
            <tr v-for="w in webhooks" :key="w.webhookCode">
              <td>
                <router-link
                  :to="{ name: 'view-webhook', params: { webhookId: w.webhookId }}"
                >
                  {{ w.webhookCode }}
                </router-link>
              </td>
              <td>
                <v-icon
                  v-show="w.enabled == true"
                  color="success"
                >mdi-webhook</v-icon>
                <v-icon
                  v-show="w.enabled == false"
                  color="error"
                >mdi-webhook</v-icon>
              </td>
              <td>{{ w.url }}</td>
              <td>
                <v-chip
                  v-for="event in w.events"
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
              <td>{{ w.created }}</td>
              <td>
                <c-confirm-dialog
                  :id="w.webhookId"
                  icon="mdi-delete"
                  @confirm="deleteConfirm"
                  cancel="Cancel"
                  action="Delete"
                  title="Delete webhook?"
                >
                  <template v-slot:content>
                    <p>You cannot undo this action.</p>
                    <p>Do you want to delete {{ w.webhookCode }}?</p>
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
  computed: {
    webhooks() {
      const webhooks = this.$store.getters.webhooks
      if (webhooks) {
        return webhooks.map(v => v.data())
      }
      return null
    }
  },
  beforeMount: async function() {
    await this.getWebhooks()
  },
  methods: {
    async getWebhooks() {
      await this.$store.dispatch('getWebhooks')
    },
    async deleteConfirm(webhookId) {
      await this.$store.dispatch('deleteWebhook', { webhookId })
    }
  }
}
</script>
