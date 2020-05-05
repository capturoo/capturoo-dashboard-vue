<template>
  <div class="buckets">
    <div class="mb-3">
      <router-link :to="{ name: 'buckets-overview' }">
        <v-btn
          :disabled="disabled"
          text
          class="primary--text float-left pl-0 ml-0">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <span class="pb-4 ml-4 title font-weight-light">Create a bucket</span>
    </div>

    <v-divider></v-divider>

    <v-container fluid>
      <p class="text--secondary">A bucket is a container for a collection of leads.</p>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12" sm="6" lg="3">
            <v-text-field
              v-model="bucketCode"
              placeholder="example-bucket-code"
              :rules="bucketCodeRules"
              label="Bucket code"
              dense
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="bucketName"
              placeholder="My example bucket"
              :rules="bucketNameRules"
              label="Bucket name"
              dense
              outlined
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              @click="createBucket"
              class="primary ml-0"
            >
              Create
            </v-btn>
            <v-btn
              @click="cancel"
              depressed
              class="ml-4"
            >Cancel</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    valid: false,
    loading: false,
    disabled: false,
    bucketCode: '',
    bucketCodeRules: [
      (v: string) => !!v || 'Bucket code is required'
    ],
    bucketName: '',
    bucketNameRules: [
      (v: string) => !!v || 'Bucket name is required'
    ]
  }),
  methods: {
    async createBucket() {
      try {
        this.loading = true
        this.disabled = true
        const bucket = await this.$store.dispatch('createBucket', {
          bucketCode: this.bucketCode,
          bucketName: this.bucketName
        })
        this.loading = false
        this.$router.replace({ name: 'buckets-overview' })
      } catch (err) {
        this.loading = false
        throw err
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.$router.replace({ name: 'buckets-overview' })
    }
  }
}
</script>
