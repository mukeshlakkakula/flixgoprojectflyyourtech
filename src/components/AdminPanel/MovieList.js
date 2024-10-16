// src/components/MovieList.js
import React, { useEffect, useState } from "react";
import { databases } from "../config/appwriteConfig";
import MovieUpdateForm from "./MovieUpdateForm";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_COLLECTION_ID
        );
        setMovies(response.documents);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (movieId) => {
    try {
      await databases.deleteDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        movieId
      );
      setMovies(movies.filter((movie) => movie.movie_id !== movieId));
      console.log("Movie deleted successfully!");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleUpdateClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseUpdateForm = () => {
    setSelectedMovieId(null);
  };

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.movie_id}>
            {movie.movie_name}
            <button onClick={() => handleUpdateClick(movie.movie_id)}>
              Update
            </button>
            <button onClick={() => handleDelete(movie.movie_id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedMovieId && (
        <MovieUpdateForm
          movieId={selectedMovieId}
          onClose={handleCloseUpdateForm}
        />
      )}
    </div>
  );
};

export default MovieList;
