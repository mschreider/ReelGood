import axios from "axios"
import Router from "./Router"
import qs from 'qs'
 
/**
 * Singleton class for managing web request using Axios  
 */
class ApiManager {
    constructor() {
        // Setup axios instance
        this.axiosInstance = axios.create({
            timeout: 10000,
            "Access-Control-Allow-Origin": "*"
        })
        this.axiosRefreshInstance = axios.create()

        this.config = undefined

        // Setup router
        this.router = new Router(this.axiosInstance)       
    }

    /**
     * @description Takes in params and returns a REST API friendly search query
     * @param {Object} params Function parameters
     * @param {Object} params.searchFilters Current search filters
     * @returns {string} REST API friendly Search Query
     */
    getQuery({searchFilters = null} = {}) {
        return qs.stringify(searchFilters)
    }

    async setTmdbConfig(config) {
        this.config = await config
    }

    getTmdbConfig() {
        return this.config
    }
}
 
export default new ApiManager()