<template>
    <v-app-bar 
        app
        color="transparent"
        dark
        elevation="0"
        v-if="$vuetify.breakpoint.mobile"
     >
        <v-app-bar-nav-icon @click.stop="activateDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="font-weight-bold">League <span class="font-weight-light">Champions</span></v-toolbar-title>

        <v-spacer></v-spacer>

        
    </v-app-bar>
</template>
<script>

export default {
    methods:{
        activateDrawer(){
            this.$store.dispatch("activateDrawer", !this.$store.getters.getDrawer)
        },
    }
}
</script>