<template>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-plus</v-icon>
            Add new champion
          </v-btn>
        </template>

        <v-card :loading="add_loading">
          <v-card-title class="headline grey lighten-2">
            Add new champion
          </v-card-title>

          <v-card-text class="pa-8">
            <v-form
                  ref="form"
              >
                  <v-alert type="info">
                    Get champion link from leagueoflegends.fandom.com
                  </v-alert>
                  <v-text-field
                      v-model="champ_data.name"
                      label="Name"
                      required
                      filled
                      :disabled="add_loading"
                      ></v-text-field>

                  <v-text-field
                      v-model="champ_data.picture"
                      label="Picture url"
                      required
                      filled
                      :disabled="add_loading"
                      ></v-text-field>

                  <v-text-field
                      v-model="champ_data.scrap_url"
                      label="Scrap url"
                      required
                      filled
                      :disabled="add_loading"
                      ></v-text-field>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              v-if="!json"
              color="primary"
              text
              @click="addChampion"
            >
              Add
            </v-btn>
            <v-btn
              v-else
              color="primary"
              text
              @click="addJsonChampion"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
import { mapActions } from 'vuex';
import { APIAxios } from '../config/axios';

export default {
    props:{
      json:{
        type: Boolean,
        required: true
      }
    },
    data: () => ({
        dialog: false,
        champ_data:{
            name: "",
            picture: "",
            scrap_url: ""
        },
        add_loading: false
    }),
    methods: {
      ...mapActions(["FETCH_CHAMPIONS_LIST", "FETCH_JSON_CHAMPIONS_LIST"]),
      addChampion(){
        this.add_loading = true;
        APIAxios.post("/api/champions/add", this.champ_data)
          .then(res => {
            if(res.status == 201){
              return this.FETCH_CHAMPIONS_LIST();
            }
          })
          .then(() => {
              this.add_loading = false;
              this.dialog = false;
          })
          .catch(err => {
            this.add_loading = false;
            console.log(err);
          })
      },
      addJsonChampion(){
        this.add_loading = true;
        APIAxios.post("/api/champions/json/add", this.champ_data)
          .then(res => {
            if(res.status == 201){
              return this.FETCH_JSON_CHAMPIONS_LIST();
            }
          })
          .then(() => {
              this.add_loading = false;
              this.dialog = false;
          })
          .catch(err => {
            this.add_loading = false;
            console.log(err);
          })
      }
    }
}
</script>