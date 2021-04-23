<template>
    <v-navigation-drawer
            v-model="drawer"
            app
            :color="$vuetify.breakpoint.mobile ? 'accent': 'transparent'"
            :dark="!$vuetify.breakpoint.mobile" 
            :light="$vuetify.breakpoint.mobile" 
              
            hide-overlay
          >
        <v-row class="d-flex flex-column align-center justify-center mb-lg-10 mb-sm-5">
            <v-flex class="mt-10">
                <v-avatar
                    size="100"
                    color="red"
                >
                    <img :src="require('@/assets/logo.png')" >
                </v-avatar>
            </v-flex>
        </v-row>
        <v-divider></v-divider>
        <v-list nav dense>
            <v-subheader>General</v-subheader>
            <v-list-item link class="py-2" v-for="(item, index) in menuItems" :key="index" router :to="item.route">
            <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title v-text="item.label"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from "vuex"

export default {
    data: () => ({
        menuItems: [
            {
                icon: "mdi-language-html5",
                label: "Static Data",
                route: "/champions/static"
            },
            {
                icon: "mdi-code-json",
                label: "JSON Data",
                route: "/champions/json"
            },
            {
                icon: "mdi-database",
                label: "Database Data",
                route: "/champions/database"
            },
        ],
       
    }),
    computed: {
         ...mapGetters(["getDrawer"]),
         drawer:{
             get(){
                 return this.getDrawer;
             },
             set(value){
                 this.$store.dispatch("activateDrawer", value)
             }
         },
         drawerColour(){
             switch (this.$vuetify.breakpoint.name) {
                case 'lgAndUp': return "transparent"
                case 'mdAndDown': return "accent"
                default: return "accent"
            }
         }
    },
    methods: {
        check(e){
            console.log(e);
        }
    },
    mounted(){
        console.log(this.$vuetify.breakpoint.name)
    }
}
</script>