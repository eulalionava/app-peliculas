import axios from "axios";

export const movieDB = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key:'8fec448c533621996b193b90eccf5e77',
        language:'es-ES'
    }
});

