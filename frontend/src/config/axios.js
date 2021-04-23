import axios from "axios"

const APIAxios = axios.create({
    /* Put your server api address */
    baseURL: process.env.VUE_APP_API_ENDPOINT || "VUE_APP_API_KUBERNETES"
});

export{
    APIAxios
}

