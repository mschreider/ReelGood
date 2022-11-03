import React, { useState, useEffect, forwardRef } from "react";
import ApiManager from '../Api/ApiManager'
import { Group, Avatar, Text, Autocomplete } from '@mantine/core';

function SearchMovies(props) {
    const [ searchData, setSearchData ] = useState([])
    const [ searchValue, setSearchValue ] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching...')
            let response = await ApiManager.router.movie.getMoviesByTitle({query: searchValue})
            if (response.isSuccess) {
                let results = modifyResults(response.data.results)
                setSearchData(results)
            }
            else {
                console.error(response.statusText)
            }
        }

        if (searchValue.length > 3) {
            fetchData()
       }
    }, [searchValue])

    const handleItemSubmit = async (movie) => {
        props.onMovieSelect(movie)
    }

    const onDropdownClose = () => {
        setSearchValue("") 
        setSearchData([])
    }

    const modifyResults = (results) => {
        return results.map((obj) => {
            obj.label = obj.title 
            obj.value = obj.title
            return obj
        })
    }
    
    const selectItem = forwardRef(({poster_path, id, release_date, title, overview, ...others}, ref) => {
        let config = ApiManager.getTmdbConfig()
        let base_url = config.images.base_url
        let logo_size = config.images.logo_sizes[1]
        let moviePoster =  base_url + logo_size + poster_path
        return (
            <div ref={ref} {...others} key={id}>
                <Group noWrap>
                    <Avatar src={moviePoster}/>
                    <div>
                        <Text size='sm'>{title}</Text>
                        <Text size="xs" color="dimmed">
                            {overview}
                        </Text>
                    </div>
                </Group>
            </div>
        )
    })

    return (
        
        searchData && 
            <Autocomplete
                label="Review a movie"
                placeholder="Search movie database"
                itemComponent={selectItem}
                data={searchData}
                maxDropdownHeight={400}
                nothingFound="Nobody here"
                onItemSubmit={handleItemSubmit}
                onChange={(value) => setSearchValue(value)}
                onDropdownClose={onDropdownClose}
                value={searchValue}
                //filter={(searchTerm, item) =>
                //    item.value.toLowerCase().includes(searchTerm.toLowerCase().trim())
                //}
                filter={(searchTerm, item) =>
                    item.value.toLowerCase().indexOf(searchTerm) > -1
                }
            /> 
            
            
        
    )
}

export default SearchMovies
