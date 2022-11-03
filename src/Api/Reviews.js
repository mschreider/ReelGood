class Reviews {
    /**
     * Initialize class
     * @param {object} axios Axios instance
     * @param {object} session User session handler
     */
    constructor(axios) {
        this.axios = axios
    }

    /**
     * @description Gets alerts
     * @param {string} siteId Filter by siteId
     * @param {object} searchFilters
     * @param {number} searchFilters.page Filter by page number
     * @param {string} searchFilters.order Order by ASC (ascending) or DESC (descending)
     * @param {string} searchFilters.search Search by value
     * @param {string} searchFilters.sortBy Sort by field type
     * @param {string[]} searchFilters.type Filter by detection type
     * @param {string} searchFilters.startTime Filter by start time
     * @param {string} searchFilters.endTime Filter by end time
     * @param {string[]} searchFilters.deviceIds Filter device ids to get alerts for
     * @returns {ResponseObject} Api response object
     */
    async getAlerts(siteId = null, {page = 0, order = "DESC", search = "", sortBy = "", type = [], startTime = "", endTime = "", deviceIds = [] } = {}) {
        let searchFilters = {
            order,
            ...(search === "") ? {} : {search},
            ...(sortBy === "") ? {} : {sortBy},
            type,
            ...((startTime === "" || startTime === undefined) ? {} : {startTime: new Date(startTime).getTime()}),
            ...((endTime === "" || endTime === undefined) ? {} : {endTime: new Date(endTime).getTime()}),
            deviceId: deviceIds
        }
        
        let query = this.session.getQuery({page, siteId, searchFilters})
        
        let config = {
            method: 'get',
            url: `/api/alerts${"?Method=Range&populate=simple&" + query}`,
        }

        let res = await this.axios(config)
        
        return ({
            status: res.status, 
            statusText: res.statusText,
            isSuccess: (res.status >= 200 && res.status < 300),
            data: res.data
        })
    }

    /**
     * @description Gets alerts
     * @param {string} siteId Filter by siteId
     * @param {object} searchFilters
     * @param {string[]} searchFilters.type Filter by detection type
     * @param {string} searchFilters.startTime Filter by start time
     * @param {string} searchFilters.endTime Filter by end time
     * @param {string} searchFilters.mode Mode for specifying min or max results
     * @param {numeber} searchFilters.results Length of results to be returned
     * @returns {ResponseObject} Api response object
     */
    async getDeviceWithMaxAlerts(siteId = null, {type = [], startTime = "", endTime = "", mode = 'Max', results = 1} = {}) {
        let searchFilters = {
            mode,
            results,
            populate: 'simple',
            ...(type.length < 1 && {type: type}),
            ...((startTime === "" || startTime === undefined) ? {} : {startTime: new Date(startTime).getTime()}),
            ...((endTime === "" || endTime === undefined) ? {} : {endTime: new Date(endTime).getTime()})
        }
        
        let query = this.session.getQuery({siteId, searchFilters})

        let config = {
            method: 'get',
            url: `/api/analyticsdata/alerts/bydevice${"?Method=Range&populate=simple&" + query}`,
        }

        let res = await this.axios(config)
        
        return ({
            status: res.status, 
            statusText: res.statusText,
            isSuccess: (res.status >= 200 && res.status < 300),
            data: res.data
        })
    }

    /**
     * @description Gets recent alerts
     * @param {string} siteId Filter by siteId
     * @param {object} searchFilters
     * @param {number} searchFilters.page Filter by page number
     * @param {string} searchFilters.order Order by ASC (ascending) or DESC (descending)
     * @param {string} searchFilters.search Search by value
     * @param {string} searchFilters.sortBy Sort by field type
     * @param {string[]} searchFilters.type Filter by detection type
     * @param {boolean} searchFilters.countOnly On true get count only
     * @returns {ResponseObject} Api response object
     */
    async getRecentAlerts(siteId = null, {page = 0, order = "DESC", search = "", sortBy = "", type = [], countOnly = false} = {}) {
        let startTime = new Date()
        startTime.setDate(startTime.getDate() - 1)

        let searchFilters = {
            order,
            ...(search === "") ? {} : {search},
            ...(sortBy === "") ? {} : {sortBy},
            type,
            startTime: startTime.getTime(),
            countOnly
        }

        let query = this.session.getQuery({page, siteId, searchFilters})
        
        let config = {
            method: 'get',
            url: `/api/alerts${"?Method=Range&" + query}`,
        }

        let res = await this.axios(config)

        return ({
            status: res.status, 
            statusText: res.statusText,
            isSuccess: (res.status >= 200 && res.status < 300),
            data: res.data
        })
    }

    /**
     * @description Get a single alert's information by id
     * @param {string} id Alert uuid  
     * @returns {ResponseObject} Api response object
     */
    async getAlert({id}) {
        let config = {
            method: "get",
            url: `/api/alerts/${id}`
        }

        let res = await this.axios(config)

        return ({
            status: res.status, 
            statusText: res.statusText,
            isSuccess: (res.status >= 200 && res.status < 300),
            data: res.data
        })
    }
    
    /**
     * @description Saves alert settings by id
     * @param {Object} param
     * @param {string} param.id Alert id
     * @param {string} param.description Alert description
     * @returns {ResponseObject} Api response object
     */
    async saveAlert({id, description = null, confirmed = null} = {}) {
        let data = {
            Comment: description,
            Confirmed: confirmed
        }

        let config = {
            method: "put",
            url: `/api/alerts/${id}`,
            data: data, 
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

export default Reviews