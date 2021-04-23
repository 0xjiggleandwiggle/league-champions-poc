<template>

  <!-- Application -->
  <v-app >

    <!-- Paralax background image -->
    <v-parallax
        :src="require('./assets/app-bg.jpg')"
        class="parallax-bg"
        height="100%"
    >

      <!-- App Bar -->
      <app-bar />
      <!-- App Bar -->

      <!-- Navigation Drawer -->
      <navigation-drawer />
      <!-- Navigation Drawer -->

      <!-- Main Application Content-->
      <v-main>
        <router-view/>
      </v-main>
      <!-- Main Application Content-->

    </v-parallax>
    <!-- Paralax background image -->

  </v-app>
  <!-- Application -->
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer"
import AppBar from './components/AppBar.vue';

export default {
  name: 'App',

  components: {
    NavigationDrawer, 
    AppBar
  },
  data: () => ({
    //
  }),
  mounted(){
    console.log(process.env.VUE_APP_API_ENDPOINT)
  }
 
};
</script>
<style lang="scss">
  .parallax-bg{
    height: 100%!important;
  }
  .v-parallax__content {
    background-image: linear-gradient(to right top, rgba(20, 40, 80, .98), rgba(0, 65, 106, .95), rgba(0, 91, 128, .95), rgba(0, 117, 145, .85), rgba(0, 144, 158, .90));
  }
</style>
