<template>
  <v-row justify="center">
    <v-icon
      @click.stop="dialog = true"
      color="primary"
      dark
    >
      mdi-delete
    </v-icon>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">Delete bucket?</v-card-title>

        <v-card-text>
          <p>You cannot undo this action.</p>
          <p>Do you want to delete {{ resourceName }}?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
      'resource-name': String
    },
    data () {
      return {
        dialog: false
      }
    }
  }
</script>
