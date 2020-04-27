<template>
  <div class="buckets">
    <div class="mb-3">
      <router-link :to="{ name: 'buckets-overview' }">
        <v-btn text class="primary--text float-left pl-0 ml-0">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <span class="pb-4 ml-4 title font-weight-light">Bucket details</span>

      <router-link :to="{ name: 'create-bucket' }">
        <v-btn text class="primary--text float-right">
          Edit
          <v-icon left dark class="pl-4">mdi-pencil</v-icon>
        </v-btn>
      </router-link>
    </div>

    <v-divider></v-divider>

    <v-container fluid>
      <v-row>
          <v-col cols="12" x="6" md="6">
            <v-icon
              large
              left
              color="success"
              class="pr-4 pb-1"
            >mdi-cloud-check</v-icon>
            <span class="font-weight-light title">skincare</span>
          </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="6" md="6">
          <div class="caption grey--text">Bucket name</div>
          <div>My skincare campaign</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="6" md="6">
          <div class="caption grey--text">Public API Key</div>
          <div>ObGsEG4x</div>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>
