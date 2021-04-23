<template>
    <v-container
        class="pa-lg-9 pa-xs-12 "
        fluid
      >
       <v-row class=" d-flex align-baseline mb-8">
          <h4 class="text-h6 font-weight-bold">JSON <span class="font-weight-light">Data</span></h4>
           <v-spacer></v-spacer>
           <modal-add-form :json="true" />
        </v-row>
         <v-row class="mt-5">
             <v-col xl="3" lg="3" md="4" sm="12" v-for="champion in getJsonChampions" :key="champion.name">
                <champion-card :champData="champion" :json="true"/>
            </v-col>
         </v-row>
    </v-container>
</template>
<script>
// imports
import { mapActions, mapGetters } from 'vuex'

// import components
import ChampionCard from '../components/ChampionCard.vue'
import ModalAddForm from '../components/ModalAddForm.vue'

export default {
    name: "json-data",
    data: () => ({
        
    }),
    computed:{
        ...mapGetters(["getJsonChampions"])
    },
    methods: {
        ...mapActions(["FETCH_JSON_CHAMPIONS_LIST"])
    },
    components:{
        "champion-card": ChampionCard,
        "modal-add-form": ModalAddForm
    },
    mounted() {
        this.FETCH_JSON_CHAMPIONS_LIST()
            .then(() => {console.log("fetched")})
            .catch(err => { console.log(err)} )
    },
}
</script>