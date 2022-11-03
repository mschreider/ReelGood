import React, { useEffect, useState } from "react"
import { TitleStyle } from '../Utilities/ComponentStyles'
import { Title, Image } from '@mantine/core';
import ApiManager from "../Api/ApiManager";
import ReviewModal from "./ReviewModal";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DisplayMovie(props) {
    const { movieData } = props

    const [ showModal, setShowModal ] = useState(false)

    const release_date = new Date(movieData.release_date).getFullYear()

    let config = ApiManager.getTmdbConfig()
    let moviePoster

    if (config) {
        let base_url = config.images.base_url
        let logo_size = "w300"
        moviePoster =  base_url + logo_size + movieData.poster_path
        console.log(moviePoster)
    }
    
    return (
        <React.Fragment>
            { Object.keys(movieData).length !== 0 &&
                <div className='movie-container'>
                    <div className='movie-metadata'>
                        <Title sx={TitleStyle} className='movie-title'>
                            {movieData.title}
                        </Title>
                        <div className=''>
                            {release_date} • {movieData.runtime}min 
                        </div>
                    </div>
                    <div className='movie-content'>
                        <Image src={moviePoster} width={300} alt="Movie Poster" withPlaceholder />
                        <div className='movie-info'>
                                <div className='rating-container'>
                                    <div className="rating-content">
                                        <div className='rating-header'>
                                            TMDB Rating
                                        </div>
                                        <div className='tmdb-rating-content'>
                                            <FontAwesomeIcon className='tmdbRating-icon' icon={faSolidStar} size="xl"/>
                                            <div className='rating-values-container'>
                                                <div className='rating-values'>
                                                    <div className='vote-average'>{movieData.vote_average.toFixed(1)}</div>
                                                    <div className='vote-range'>
                                                        /10
                                                    </div>
                                                </div>
                                                
                                                <div className='vote-count'>{movieData.vote_count}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rating-content">
                                        <div className='rating-header'>
                                            Your Rating
                                        </div>
                                        <div className='your-rating-content' onClick={() => setShowModal(true)}>
                                            <FontAwesomeIcon className='myRating-icon' icon={faStar} size="xl"/>
                                            Rate
                                        </div>
                                    </div>
                                </div>
                                <div className='movie-overview'>
                                    {movieData.overview}
                                </div>
                        </div>
                    </div>
                </div>
            }
            <ReviewModal title={movieData.title} show={showModal} close={(close) => setShowModal(close)} />
        </React.Fragment>
    )
}

export default DisplayMovie