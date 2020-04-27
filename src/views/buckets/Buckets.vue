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
      <p class="text--secondary">Buckets provide containers for collections of leads.</p>
      <v-simple-table class="mt-4">
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
                  :to="{ name: 'view-bucket', params: { bucketId: 'xyz' }}"
                >
                  {{ bucket.resourceName }}
                </router-link>
              </td>
              <td>{{ bucket.name }}</td>
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
                <delete-bucket-dialog :resource-name="bucket.resourceName"></delete-bucket-dialog>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import DeleteBucketDialog from './DeleteBucketDialog.vue'

export default {
  components: {
    'delete-bucket-dialog': DeleteBucketDialog
  },
  data() {
    return {
      buckets: [
        { resourceName: '89233482:woofy', name: 'Woofy Woofy Project', publicApiKey: 'e46FGb1A', status: 'online', created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
        { resourceName: '89233482:skincare', name: 'My skincare campaign', publicApiKey: 'ObGsEG4x', status: 'locked', created: '2020-04-13 11:04:23.682 +0000 UTC', modified: '2020-04-13 11:04:23.682 +0000 UTC' }
      ]
    }
  }
}
</script>
