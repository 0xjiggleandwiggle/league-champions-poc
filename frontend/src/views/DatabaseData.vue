<template>
    <v-container
        class="pa-lg-9 pa-xs-12 "
        fluid
      >
       <v-row class=" d-flex align-baseline mb-8">
          <h4 class="text-h6 font-weight-bold">Database <span class="font-weight-light">Data</span></h4>
          <v-spacer></v-spacer>
           <modal-add-form :json="false" />
        </v-row>
        <v-row class="mt-5" v-if="fetchLoading">
            <v-col xl="3" lg="3" md="4" sm="12">
               <champion-card-skeleton />
            </v-col>
            <v-col xl="3" lg="3" md="4" sm="12">
               <champion-card-skeleton />
            </v-col>
            <v-col xl="3" lg="3" md="4" sm="12">
               <champion-card-skeleton />
            </v-col>
            <v-col xl="3" lg="3" md="4" sm="12">
               <champion-card-skeleton />
            </v-col>
        </v-row>
         <v-row class="mt-5" v-else>
             <v-col xl="3" lg="3" md="4" sm="12" v-for="champion in getChampions" :key="champion.name" >
                <champion-card :champData="champion" :json="false"/>
            </v-col>
         </v-row>
    </v-container>
</template>
<script>
// imports
 import {mapGetters, mapActions} from "vuex"
 
// import components
import ChampionCard from '../components/ChampionCard.vue'
import ChampionCardSkeleton from '../components/ChampionCardSkeleton.vue'
import ModalAddForm from '../components/ModalAddForm.vue'


export default {
    name: "database-data",
    data: () => ({
        champions: [],
        fetchLoading: false
    }),
    computed:{
        ...mapGetters(["getChampions"])
    },
    methods:{
        ...mapActions(["FETCH_CHAMPIONS_LIST"])
    },
    components: {
        "champion-card": ChampionCard,
        "modal-add-form": ModalAddForm,
        "champion-card-skeleton": ChampionCardSkeleton
    },
    mounted() {
        this.fetchLoading = true;
        this.FETCH_CHAMPIONS_LIST()
            .then(() => { this.fetchLoading = false;})
            .catch(err => { 
                this.fetchLoading = false;
                console.log(err);
            } )
    },
        
}
</script>