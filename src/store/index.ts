import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface TimelineItem {
  when: Date;
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
    addTimelineItem: function ({ state, commit }, payload) {
      const items = state.timelineItems.slice()
      items.unshift(payload)
      commit('setTimelineItems', items)
    }
  }
})
