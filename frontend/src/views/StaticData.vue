<template>
    <v-container
        class="pa-lg-9 pa-xs-12 "
        fluid
      >
       <v-row class=" d-flex align-baseline mb-8">
          <h4 class="text-h6 font-weight-bold">Static <span class="font-weight-light">Data</span></h4>
          <v-spacer></v-spacer>
        </v-row>
         <v-row class="mt-5">
            <v-col xl="3" lg="3" md="4" sm="12" v-for="champion in champions" :key="champion.name">
                <champion-card :champData="champion"/>
            </v-col>
         </v-row>
    </v-container>
</template>
<script>
import ChampionCardVue from '../components/ChampionCard.vue'
export default {
    name: "static-data",
    data: () => ({
        champions: [
            {
                name: 'Diana',
                picture: "https://preview.redd.it/c8brh9xcu8161.png?auto=webp&s=01ecb82b619f12796c9c1ec4efe9a1dea0207ebe",
                data: {
                    release_date: "2012-08-07",
                    class: ["Assassin", "Diver"],
                    position: ["Middle"],
                    Ressource: "Mana",
                    range_type: "Melee",
                    adaptive_type: "Magic"
                }
            },
            {
                name: 'Lux',
                picture: "https://preview.redd.it/zhatmcoo2qv21.png?width=323&format=png&auto=webp&s=1368742a493ca7eaab1904e83ded885b7aee3195",
                data: {
                    release_date: "2010-10-19",
                    class: ["Burst", "Artilery"],
                    position: ["Middle", "Support"],
                    Ressource: "Mana",
                    range_type: "Ranged",
                    adaptive_type: "Magic"
                }
            }
        ]
    }),
    components: {
        "champion-card": ChampionCardVue
    },
    
}
</script>