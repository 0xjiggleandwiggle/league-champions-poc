// imports
import {APIAxios} from "../../config/axios"



// module
const state = {
    champions_list: [],
    json_champions_list: []
};
const getters = {
    getChampions: state => {
        return state.champions_list;
    },
    getJsonChampions: state => {
        return state.json_champions_list;
    }
};
const mutations = {
    SET_CHAMPIONS_LIST: (state, payload) =>{
        state.champions_list = payload;
    },
    SET_JSON_CHAMPIONS_LIST: (state, payload) => {
        state.json_champions_list = payload;
    }
};
const actions = {
    FETCH_CHAMPIONS_LIST: ({commit})=> new Promise((resolve, reject) => {
        APIAxios.get("/api/champions/all")
            .then(response => {
                commit("SET_CHAMPIONS_LIST", response.data);
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    }),
    FETCH_JSON_CHAMPIONS_LIST: ({commit})=> new Promise((resolve, reject) => {
        APIAxios.get("/api/champions/json/all")
            .then(response => {
                commit("SET_JSON_CHAMPIONS_LIST", response.data);
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
};
export default {
    state,
    getters,
    mutations,
    actions
}