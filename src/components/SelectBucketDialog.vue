<template>
<div>
  <v-btn text
    @click.stop="openDialog"
    @click:outside="cancel"
    class="ml-4"
    id="button"
  >
    <v-icon>mdi-bucket-outline</v-icon>
    <span class="pl-1 pr-1">{{ bucketName }}</span>
    <v-icon large>mdi-menu-down</v-icon>
  </v-btn>

  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="900px">
      <v-card v-if="!buckets" class="text-center" justify="center" height="300px">
        <v-card-text>
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
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

      <v-card v-if="buckets">
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
                  @click="rowClicked(bucket)"
                  v-for="bucket in buckets"
                  :key="bucket.bucketId"
                  :class="isSelectedRow(bucket.bucketId) ? 'blue lighten-4' : ''"
                >
                  <td class="text-left">
                    <v-icon
                      v-show="isCurrentContext(bucket.bucketId)"
                      color="success"
                    >mdi-check</v-icon>
                  </td>
                  <td class="text-left">
                    <v-icon>mdi-bucket-outline</v-icon>
                  </td>
                  <td>{{ bucket.bucketName }}</td>
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

<script lang="ts">
export default {
  props: {
    'bucket-name': String
  },
  data () {
    return {
      disabled: true,
      dialog: false,
      selectedRow: null
    }
  },
  computed: {
    buckets() {
      const buckets = this.$store.getters.dialogBuckets
      if (buckets) {
        return buckets.map(b => b.data())
      }
      return null
    },
    bucketContext() {
      return this.$store.getters.bucketContext
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.$store.dispatch('resetDialogBuckets')
      }
    }
  },
  methods: {
    isSelectedRow(bucketId) {
      const selectedRow = this.selectedRow
      if (!selectedRow) {
        return false
      }
      if (selectedRow.bucketId === bucketId) {
        return true
      }
      return false
    },
    isCurrentContext(bucketId) {
      const bucketContext = this.bucketContext
      if (!bucketContext) {
        return false
      }
      if (bucketContext.bucketId === bucketId) {
        return true
      }
      return false
    },
    async openDialog() {
      try {
        this.dialog = true
        await this.$store.dispatch('getDialogBuckets')
      } catch (err) {
        throw err
      }
    },
    rowClicked(row) {
      this.selectedRow = row
      this.disabled = false
    },
    cancel() {
      this.$store.dispatch('resetDialogBuckets')
      this.dialog = false
      this.disabled = true
    },
    selectBucket() {
      this.$emit('selected', this.selectedRow)
      this.$store.dispatch('resetDialogBuckets')
      this.disabled = true
      this.dialog = false
    }
  }
}
</script>

<style>
  #button {
    text-transform: none !important;
  }
</style>
