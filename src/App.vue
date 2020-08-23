<template>
  <v-app>
    <v-app-bar
      app
      :hide-on-scroll="true"
    >
      <v-app-bar-nav-icon @click.stop="navOpen = !navOpen" />
      <v-btn v-if="$route.path !== '/'" icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="navOpen"
      app
    >
      <v-list>
        <v-list-item @click="clearTimeline">
          <v-list-item-icon>
            <v-icon>mdi-delete-forever-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Clear Timeline
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    navOpen: false
  }),
  methods: {
    clearTimeline: function (): void {
      this.$store.commit('setTimelineItems', [])
    }
  },
  beforeCreate () {
    this.$store.commit('initialize')
  }
})
</script>
