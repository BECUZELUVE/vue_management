import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import usersState from "./users/state.js"
import usersMutations from "./users/mutations.js"
import usersActions from "./users/actions.js"

Vue.use(Vuex);

//全局数据
const store = new Vuex.Store({
    state : {
        usersState
    },
    mutations:{
        ...usersMutations
    },
    actions:{
        ...usersActions
    },

    plugins:[createLogger()]
})

export default store;