<template>
  <div>
    <div class="mb-3">
      <span class="ml-4 title font-weight-light">Leads</span>
      <router-link :to="{ name: 'create-lead' }">
        <v-btn text class="primary--text float-right">
          Create Lead
          <v-icon left dark class="pl-4">mdi-plus-box</v-icon>
        </v-btn>
      </router-link>
    </div>

    <v-divider></v-divider>

  </div>
</template>

<script lang="ts">
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$root.$data.showBucketSelector = true
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$root.$data.showBucketSelector = false
    next()
  }
}
</script>
