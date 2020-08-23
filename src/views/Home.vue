<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-timeline dense>
          <v-timeline-item
            v-for="(item, i) in timelineItems"
            :key="i"
            right
            small
          >
            <v-card>
              <v-card-title>{{ item.description }}</v-card-title>
              <v-card-subtitle>{{ getFormattedDateString(item.when) }}</v-card-subtitle>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
      <v-bottom-navigation app fixed>
        <v-layout row wrap justify-center>
          <v-flex xs10>
            <v-text-field
              v-model="pendingDescription"
              append-outer-icon="mdi-plus-circle-outline"
              @click:append-outer="addItem"
            />
          </v-flex>
        </v-layout>
      </v-bottom-navigation>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { DateTime } from 'luxon'

export default Vue.extend({
  name: 'Home',
  data: () => ({
    pendingDescription: '' as string
  }),
  computed: {
    ...mapState([
      'timelineItems'
    ])
  },
  methods: {
    getFormattedDateString: function (iso: string): string {
      return DateTime.fromISO(iso).toLocaleString(DateTime.DATETIME_SHORT)
    },
    addItem: function (): void {
      // Add a new item
      this.$store.dispatch('addTimelineItem', {
        when: DateTime.local().toString(),
        description: this.pendingDescription
      })

      // Reset our text field
      this.pendingDescription = ''
    }
  },
  mounted (): void {
  }
})
</script>
