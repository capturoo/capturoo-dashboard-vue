<template>
  <div class="buckets">
    <div class="mb-3">
      <span class="ml-4 title font-weight-light">Buckets</span>
      <router-link :to="{ name: 'create-bucket' }">
        <v-btn text class="primary--text float-right">
          Create Bucket
          <v-icon left dark class="pl-4">mdi-plus-box</v-icon>
        </v-btn>
      </router-link>
    </div>

    <v-divider></v-divider>

    <v-container fluid>
      <p class="pl-1 text--secondary">Buckets provide containers for collections of leads.</p>
      <v-simple-table v-if="buckets" class="mt-4">
        <template v-slot:default>
          <thead>
            <tr>
              <th>Resource name</th>
              <th>Bucket name</th>
              <th>Public API Key</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last modified</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bucket in buckets" :key="bucket.resourceName">
              <td>
                <router-link
                  :to="{ name: 'view-bucket', params: { bucketId: bucket.bucketId }}"
                >
                  {{ bucket.resourceName }}
                </router-link>
              </td>
              <td>{{ bucket.bucketName }}</td>
              <td>{{ bucket.publicApiKey }}</td>
              <td>
                <v-icon
                  v-show="bucket.status == 'locked'"
                  color="warning"
                >mdi-upload-lock</v-icon>
                <v-icon
                  v-show="bucket.status == 'online'"
                  color="success"
                >mdi-cloud-check</v-icon>
              </td>
              <td>{{ bucket.created }}</td>
              <td>{{ bucket.modified }}</td>
              <td>
                <c-confirm-dialog
                  :id="bucket.bucketId"
                  icon="mdi-delete"
                  @confirm="deleteConfirm"
                  cancel="Cancel"
                  action="Delete"
                  title="Delete bucket?"
                >
                  <template v-slot:content>
                    <p>You cannot undo this action.</p>
                    <p>Do you want to delete {{ bucket.resourceName }}?</p>
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

<script lang="ts">
import ConfirmDialog from '@/components/ConfirmDialog.vue'

export default {
  components: {
    'c-confirm-dialog': ConfirmDialog
  },
  computed: {
    buckets() {
      if (this.$store.getters.buckets) {
        return this.$store.getters.buckets.map(b => {
          return b.data()
        })
      }
      return null
    }
  },
  beforeMount: async function() {
    await this.getBuckets()
  },
  methods: {
    async getBuckets() {
      await this.$store.dispatch('getBuckets')
    },
    async deleteConfirm(bucketId) {
      await this.$store.dispatch('deleteBucket', { bucketId })
    }
  }
}
</script>
