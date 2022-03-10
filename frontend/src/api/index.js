import axios from 'axios'
import { store } from '@/store';
import { computed } from "vue";
const setLoading = (params) => store.dispatch('common/setLoading', params)
const authToken = computed(() => store.getters['session/getAuthToken'])

export const authResource = `auth`
export const listResource = `list`
export const cardResource = `card`
export const boardResource = `board`
export const chatResource = `chat`
export const colorResource = `color`


export default class api {

    setInterceptors(instance) {
        instance.interceptors.request.use(
            function(config) {
                setLoading({ isLoading: true })
                config.headers.Authorization = `Bearer ${authToken.value}`;
                return config;
            },
            function(error) {
                setLoading({ isLoading: false })
                return Promise.reject(error);
            },
        );
        instance.interceptors.response.use(
            function(response) {
                setLoading({ isLoading: false })
                return response;
            },
            function(error) {
                setLoading({ isLoading: false })
                // store.dispatch('common/setLoading', { isLoading: false })
                console.log("=========== ERROR ===========")
                console.log("> error : ", error)
                console.log("> error.response : ", error.response)
                console.log("=========== // ERROR ===========")
                if (error.response && error.response.status === 401) {
                    // console.log('the error response status is:', error.response.status);
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('email')
                    localStorage.removeItem('name')
                    location.href = '/login'
                }
                if (error.response && error.response.status === 404) {
                    console.log("> error.response.data : ", error.response.data)
                    //return Promise.reject(error.response.data);
                }
                return Promise.reject(error);
            },
        );
        return instance;
    }

    api() {
        const baseUrl = process.env.VUE_APP_API_URL

        const instance = axios.create({
            baseURL: baseUrl,
            timeout: 60000,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
        })
        return this.setInterceptors(instance)
    }

    async getAPI(url, payload) {
        const res = await this.api().get(url, { params: payload })
        return res.data
    }
    async postAPI(url, payload) {
        const res = await this.api().post(url, payload)
        return res.data
    }
    async putAPI(url, payload) {
        const res = await this.api().put(url, payload)
        return res.data
    }
    async deleteAPI(url, payload) {
        const res = await this.api().delete(url, { data: payload })
        return res.data
    }

    /* 로그인 */
    login(payload)         { return this.postAPI(`${authResource}/signin`, payload) }

    /* list */
    getListWithCard()      { return this.getAPI(`${listResource}/withCard`) }
    createList(payload)    { return this.postAPI(`${listResource}/`, payload) }
    updateList(payload)    { return this.putAPI(`${listResource}/${payload.listId}`, payload) }
    deleteList(payload)    { return this.deleteAPI(`${listResource}/${payload.listId}`) }

    /* card */
    createCard(payload)    { return this.postAPI(`${cardResource}/`, payload) }

    /* board */
    getBoardList()         { return this.getAPI(`${boardResource}/list`) }
    createBoard(payload)   { return this.postAPI(`${boardResource}/`, payload) }
    updateBoard(payload)   { return this.putAPI(`${boardResource}/${payload.id}`, payload) }
    deleteBoard(payload)   { return this.deleteAPI(`${boardResource}/${payload.id}`) }

    /* chat */
    getChatList()          { return this.getAPI(`${chatResource}/list`) }
    createChat(payload)    { return this.postAPI(`${chatResource}/`, payload) }

    /* color */
    getColorList()         { return this.getAPI(`${colorResource}/list`) }
}