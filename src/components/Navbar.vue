<template>
  <nav>
    <v-app-bar app flat>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="grey--text"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase grey--text">
        <span>Capturoo</span>
      </v-toolbar-title>

      <c-select-bucket-dialog
        @selected="selectedBucket"
        bucket-name="My Bucket Name"
      ></c-select-bucket-dialog>

      <v-spacer></v-spacer>

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <v-list-group prepend-icon="mdi-account-circle" value="true">
          <template v-slot-activator="on">
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
              <v-list-item-action>
                <v-icon class="white--text">{{ link.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import SelectBucketDialog from './SelectBucketDialog.vue'

export default {
  components: {
    'c-select-bucket-dialog': SelectBucketDialog
  },
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-bucket-outline', text: 'Buckets', route: { name: 'buckets-overview' } },
        { icon: 'mdi-webhook', text: 'Webhooks', route: { name: 'webhooks-overview' } },
        { icon: 'mdi-account-settings', text: 'Account Settings', route: { name: 'account-settings' }}
      ]
    }
  },
  methods: {
    selectedBucket(bucket) {
      console.dir(bucket)
    }
  }
}
</script>
