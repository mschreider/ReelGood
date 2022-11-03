class TmdbConfig {
    /**
     * Initialize class
     * @param {object} axios Axios instance
     * @param {object} session User session handler
     */
    constructor(axios) {
        this.axios = axios
    }

    async fetchTmdbConfig() {
        let config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/configuration?api_key=df5e81abd543da9360362eb3416580bf`
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

export default TmdbConfig