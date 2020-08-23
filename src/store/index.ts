import Vue from 'vue'
import Vuex from 'vuex'
import { DateTime } from 'luxon'

Vue.use(Vuex)

interface TimelineItem {
  when: string;
  description: string;
}

// Define our actual data store
export default new Vuex.Store({
  state: {
    timelineItems: [] as Array<TimelineItem>
  },
  getters: {
  },
  mutations: {
    initialize: function (state) {
      const i = localStorage.getItem('timelineItems')
      if (i) {
        state.timelineItems = JSON.parse(i)
      }
    },
    setTimelineItems: function (state, payload) {
      state.timelineItems = payload
      localStorage.setItem('timelineItems', JSON.stringify(state.timelineItems))
    }
  },
  actions: {
    purgeOldTimelineItems: function ({ state, commit }) {
      // Remove anything older than 72 hours
      const cutoff = DateTime.local().minus(1000 * 60 * 60 * 72).toString()
      const items = state.timelineItems.filter((i) => {
        return i.when > cutoff
      })
      commit('setTimelineItems', items)
    },
    addTimelineItem: function ({ state, commit }, payload) {
      const items = state.timelineItems.slice()
      items.unshift(payload)
      commit('setTimelineItems', items)
    }
  }
})
