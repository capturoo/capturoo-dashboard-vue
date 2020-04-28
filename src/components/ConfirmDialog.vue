<template>
  <v-row justify="center">
    <v-icon
      @click.stop="dialog = true"
      color="primary"
      dark
    >{{ icon }}</v-icon>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>

        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >
            {{ cancel }}
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="actionSubmit"
          >
            {{ action }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
      'icon': String,
      'id': String,
      'cancel': String,
      'action': String,
      'title': String
    },
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      actionSubmit() {
        this.$emit('confirm', this.id)
        this.dialog = false

      }
    }
  }
</script>
