<template>
<div>
  <v-btn text @click.stop="dialog = true" class="ml-4">
    <v-icon>mdi-bucket-outline</v-icon>
    <span class="text-capitalize pl-1 pr-1">{{ bucketName }}</span>
    <v-icon large>mdi-menu-down</v-icon>
  </v-btn>

  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="900px">

      <v-card v-show="!loaded" class="text-center" justify="center" height="300px">
        <v-card-text>
          <v-container fill-height fluid>
                  <v-row align="center"
      justify="center">
      <v-col>

        <v-progress-circular
                    :size="70"
                    :width="3"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
      </v-col>
  </v-row>
          </v-container>

        </v-card-text>
      </v-card>

      <v-card v-show="loaded">
        <v-card-title>Select a bucket</v-card-title>
        <v-card-text>
          <v-simple-table height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th width="1%" class="text-left">&nbsp;</th>
                  <th class="text-left">&nbsp;</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Code</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  @click="rowClicked(bucket.bucketId)"
                  v-for="bucket in buckets"
                  :key="bucket.bucketId"
                  :class="bucket.bucketId == selectedRow ? 'blue lighten-4' : ''"
                >
                  <td class="text-left">
                    <v-icon
                      v-show="Math.floor(Math.random() * 100) < 50"
                      color="success"
                    >mdi-check</v-icon>
                  </td>
                  <td class="text-left">
                    <v-icon>mdi-bucket-outline</v-icon>
                  </td>
                  <td>{{ bucket.name }}</td>
                  <td><span class="grey--text text--darken-2">{{ bucket.resourceName }}</span></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="cancel"
            text>Cancel</v-btn>
          <v-btn
            @click="selectBucket"
            :disabled="disabled"
            text
          >Open</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</div>
</template>

<script>
export default {
  props: {
    'bucket-name': String
  },
  data () {
    return {
      loaded: false,
      disabled: true,
      dialog: false,
      selectedRow: '',
      buckets: [
        { bucketId: 'xyz12346', resourceName: '89233482:woofy', name: 'Woofy Woofy Project', publicApiKey: 'e46FGb1A', status: 'online', created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
        { bucketId: 'def34534', resourceName: '89233482:skincare', name: 'My skincare campaign', publicApiKey: 'ObGsEG4x', status: 'locked', created: '2020-04-13 11:04:23.682 +0000 UTC', modified: '2020-04-13 11:04:23.682 +0000 UTC' },
        { bucketId: 'xyz12347', resourceName: '89233482:Pinapple', name: 'asdfasdf Project', publicApiKey: 'e46FGb1A', status: 'online', created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
        { bucketId: 'def34538', resourceName: '89233482:bread', name: 'My skincare campaign', publicApiKey: 'ObGsEG4x', status: 'locked', created: '2020-04-13 11:04:23.682 +0000 UTC', modified: '2020-04-13 11:04:23.682 +0000 UTC' },
        { bucketId: 'xyz12349', resourceName: '89233482:grapefruit', name: 'dfghjgfh Project', publicApiKey: 'e46FGb1A', status: 'online', created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
        { bucketId: 'def34530', resourceName: '89233482:banana', name: 'Dgsdgf campaign', publicApiKey: 'ObGsEG4x', status: 'locked', created: '2020-04-13 11:04:23.682 +0000 UTC', modified: '2020-04-13 11:04:23.682 +0000 UTC' },
        { bucketId: 'xyz12341', resourceName: '89233482:grapes', name: 'dsgsdfgProject', publicApiKey: 'e46FGb1A', status: 'online', created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
        { bucketId: 'def34532', resourceName: '89233482:pears', name: 'dsgfsdfg campaign', publicApiKey: 'ObGsEG4x', status: 'locked', created: '2020-04-13 11:04:23.682 +0000 UTC', modified: '2020-04-13 11:04:23.682 +0000 UTC' },
        { bucketId: 'xyz12343', resourceName: '89233482:oranges', name: 'sdfgsdgfProject', publicApiKey: 'e46FGb1A', status: 'online', created: '2020-04-13 09:40:55.29 +0000 UTC', modified: '2020-04-15 10:45:47.952 +0000 UTC' },
        { bucketId: 'def34535', resourceName: '89233482:apples', name: 'ewrtwert campaign', publicApiKey: 'ObGsEG4x', status: 'locked', created: '2020-04-13 11:04:23.682 +0000 UTC', modified: '2020-04-13 11:04:23.682 +0000 UTC' }

      ]
    }
  },
  beforeUpdate() {
    setTimeout(() => {
      console.log('loaded')
      this.loaded = true
    }, 2000)
  },
  methods: {
    rowClicked(row) {
      this.selectedRow = row
      this.disabled = false
    },
    cancel() {
      this.dialog = false
      this.disabled = true
    },
    selectBucket() {
      this.$emit('selected', {
        bucketId: this.selectedRow
      })
      this.disabled = true
      this.dialog = false
    }
  }
}
</script>
