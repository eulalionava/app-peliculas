import React, { useEffect, useState } from 'react'
import { movieDB } from '../api/MovieDB';
import { Cast, creditResponse } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';

interface Moviedetails{
    isLoading:boolean;
    movieFull?:MovieFull;
    cast:Cast[]
}


export const useMoviesDetail = (movieId:number)=> {

    const [state,setState ] = useState<Moviedetails>({
        isLoading:true,
        movieFull:undefined,
        cast:[]
    });

    const getMoviesDetails = async ()=>{
        const movieDetailPromise = await movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = await movieDB.get<creditResponse>(`/${movieId}/credits`);

        const[movieDetailResp,castResp] = await Promise.all([movieDetailPromise,castPromise]);

        setState({
            isLoading:false,
            movieFull:movieDetailResp.data,
            cast:castResp.data.cast
        })

    }

    useEffect( () => {
        getMoviesDetails();
    },[])

    return{
        ...state
    }

}
