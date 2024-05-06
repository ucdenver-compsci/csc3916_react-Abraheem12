import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovie } from "../actions/movieActions";
import MovieDetail from "../components/moviedetail";

function Movie() {
    const { movieId } = useParams(); // Get movieId from the URL
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movie.selectedMovie); // Accessing the selected movie from Redux state

    useEffect(() => {
        if (movieId && (!movie || movie._id !== movieId)) {
            dispatch(fetchMovie(movieId)); // Fetch movie details if not already loaded or if different movieId
        }
    }, [movieId, movie, dispatch]); // Dependency array includes movieId and movie to handle updates

    // Conditional rendering to show loading state or movie details
    return (
        movie ? <MovieDetail movie={movie} /> : <div>Loading...</div>
    );
}

export default Movie;
