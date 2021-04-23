import Vue from 'vue'
import VueRouter from 'vue-router'

// Layouts 

// Views
import StaticData from "../views/StaticData.vue"
import JsonData from "../views/JsonData.vue"
import DatabaseData from "../views/DatabaseData.vue"



// Views
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/champions/static"
  },
  {
    path: "/champions/static",
    name: "static-data",
    component: StaticData
  },
  {
    path: "/champions/json",
    name: "json-data",
    component: JsonData
  },
  {
    path: "/champions/database",
    name: "database-data",
    component: DatabaseData
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
