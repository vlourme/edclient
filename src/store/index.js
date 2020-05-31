import Vue from 'vue';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import userStore from './module/userStore'
import messageStore from './module/messageStore';

// Enable usage of Vuex
Vue.use(Vuex);

// Export our store
export default new Vuex.Store({
  modules: {
    user: userStore,
    message: messageStore
  },
  plugins: [new VuexPersistence().plugin]
})
