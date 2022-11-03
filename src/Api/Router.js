import Movie from "./Movie"
import Reviews from './Reviews'
import TmdbConfig from "./TmdbConfig"

/**
 * Class for routing REST request
 */
class Router {
    /**
     * Initialize request router 
     * @param {object} axios Axios instance
     */
    constructor(axios) {
        this.movie = new Movie(axios)
        this.reviews = new Reviews(axios)
        this.tmdbConfig = new TmdbConfig(axios)
    }
}

export default Router