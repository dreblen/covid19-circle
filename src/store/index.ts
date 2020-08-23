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
    addTimelineItem: function (state, payload) {
      state.timelineItems.unshift(payload)
      localStorage.setItem('timelineItems', JSON.stringify(state.timelineItems))
    }
  },
  actions: {
  }
})
