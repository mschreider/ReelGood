import ApiManager from "./ApiManager"

class Movie {
    /**
     * Initialize class
     * @param {object} axios Axios instance
     * @param {object} session User session handler
     */
    constructor(axios) {
        this.axios = axios
    }

    async getMoviesByTitle({query = '', language = 'en-US', page = '1', region = null, year = null, primary_release_year = null} = {}) {
        let searchFilters = {
            ...(query !== "") && {query: query},
            ...(language !== "") && {language: language},
            ...(page !== "") && {page: page},
            ...(region !== null && {region: region}),
            ...(year !== null && {year: year}),
            ...(primary_release_year !== null && {primary_release_year: primary_release_year}),
        } 

        let query_str = ApiManager.getQuery({searchFilters})
        
        let config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&${query_str}`
        }

        let res = await this.axios(config)
        
        return ({
            status: res.status, 
            statusText: res.statusText,
            isSuccess: (res.status >= 200 && res.status < 300),
            data: res.data
        })
    }

    async getMovieById({id = null} = {}) {
        let config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
        }

        let res = await this.axios(config)

        return ({
            status: res.status, 
            statusText: res.statusText,
            isSuccess: (res.status >= 200 && res.status < 300),
            data: res.data
        })
    }
}

export default Movie