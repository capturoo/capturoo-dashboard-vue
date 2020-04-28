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
                <v-list-item-title class="headline mb-1">Jon Doe</v-list-item-title>
                <v-list-item-subtitle>andyfusniak@gmail.com</v-list-item-subtitle>
                <p class="grey--text darken-12 pt-4">Created: 28 April 2020 4:25pm</p>
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
                <v-list-item-subtitle>Crl1Ml8BtiWD1CISVLQeaSgZ6tzZHObZN6tu9dukcf3</v-list-item-subtitle>
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
  data () {
    return {
      tab: null
    }
  }
}
</script>
