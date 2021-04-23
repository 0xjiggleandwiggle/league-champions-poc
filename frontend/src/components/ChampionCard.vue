<template>
    <v-card
        class="pa-5"
        color="accent"
        light
        elevation="2"
        :loading="deleteLoading"
    >

        <!--<v-img
            height="250"
            :src="'http://localhost:3000'+champData.picture"
        ></v-img> -->
        <v-row dense>
            <v-col cols="12" class="d-flex  align-center justify-center">
                    <v-avatar
                    size="100"
                    color="primary"
                >
                    <img :src="champData.picture" :alt="champData.name">
                </v-avatar>
            </v-col>
        </v-row>

        <v-card-title class="d-flex  align-center justify-center">{{champData.name}}</v-card-title>

        <v-card-text class="d-flex  align-center justify-center">
        <div class=" subtitle-1">
            <span class="font-weight-bold">Release date: </span> {{champData.data.release_date}}
        </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-text>
        <v-row dense >
            <v-col class="d-flex  align-center justify-center" cols="12">Class(es): </v-col>
            <v-col class="d-flex  align-center justify-center">
                <v-chip-group >
                    <v-chip color="primary" v-for="cl in champData.data.class" :key="cl">{{cl}}</v-chip>
                </v-chip-group>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12" class="d-flex  align-center justify-center">Position(s): </v-col>
            <v-col class="d-flex  align-center justify-center">
                <v-chip-group>
                    <v-chip color="primary" v-for="po in champData.data.position" :key="po">{{po}}</v-chip>
                </v-chip-group>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="6">
                <v-row dense> 
                    <v-col cols="12" class="d-flex  align-center justify-center">Range type: </v-col>
                    <v-col class="d-flex  align-center justify-center">
                        <v-chip color="primary" >{{champData.data.range_type}}</v-chip>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row dense> 
                    <v-col cols="12" class="d-flex  align-center justify-center">Adaptive type: </v-col>
                    <v-col class="d-flex  align-center justify-center">
                        <v-chip color="primary" >{{champData.data.adaptive_type}}</v-chip>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        </v-card-text>

        <v-card-actions>
        <v-btn
            v-if="!json"
                color="red darken-4"
                dark
                depressed
                block
                @click="removeChampion"
                
            >
            <v-icon left>mdi-delete</v-icon>
            Remove
        </v-btn>
        <v-btn
            v-else
            color="red darken-4"
            dark
            depressed
            block
            @click="removeJsonChampion"
                
            >
            <v-icon left>mdi-delete</v-icon>
            Remove
        </v-btn>
        </v-card-actions> 
    </v-card>
</template>
<script>
// imports
import { mapActions } from 'vuex';
import { APIAxios } from '../config/axios'
export default {
    data: () => ({
        deleteLoading: false
    }),
    props: {
        champData: {
            type: Object,
            required: true
        },
        json: {
            type: Boolean,
            required: true
        }
    },
    methods:{
        ...mapActions(["FETCH_CHAMPIONS_LIST", "FETCH_JSON_CHAMPIONS_LIST"]),
        removeChampion(){
            this.deleteLoading = true;
             APIAxios.delete(`/api/champions/delete/${this.champData.id}`)
            .then(res => {
                if(res.status === 200){
                    console.log("deleted");
                    this.deleteLoading = false;
                }
                return this.FETCH_CHAMPIONS_LIST();
            })
            .then(() => {
                console.log("fetched");
            })
            .catch(err => {
                this.deleteLoading = false;
                console.log(err)
            })
        },
        removeJsonChampion(){
            this.deleteLoading = true;
             APIAxios.delete(`/api/champions/json/delete/${this.champData.name}`)
            .then(res => {
                if(res.status === 200){
                    console.log("deleted");
                    this.deleteLoading = false;
                }
                return this.FETCH_JSON_CHAMPIONS_LIST();
            })
            .then(() => {
                console.log("fetched");
            })
            .catch(err => {
                this.deleteLoading = false;
                console.log(err)
            })
        }
    }
}
</script>