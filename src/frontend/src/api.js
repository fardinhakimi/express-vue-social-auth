
import axios from 'axios'
import store from './store'

import { SERVER_BASE_URL } from './constants'

export const GET_RESOURCE_USER = `account/user`

const api = axios.create({
    baseURL: SERVER_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+store.getters.user.token
    }
})

export default {

    getResource(url) {
        return api.get(url)
    },

    patchResource(url, data) {
        return api({
            method: 'patch',
            url: url,
            data: JSON.stringify(data)
        })
    },

    postResource(url, body) {
        
        return api({
            method: 'post',
            url: url,
            data: JSON.stringify(body)
        })
    },

    deleteResource(url) {
        return axios({
            method: 'delete',
            url: url
        })
    }
}