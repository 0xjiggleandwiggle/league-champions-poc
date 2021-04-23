import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes:{
            light: {
                accent: "#dae1e7",
                primary: "#27496d",
                secondary: "#27496d",
                dark: "#142850"
            }
        },
    }
});
