import React, { useState, useEffect } from "react";
import { databases } from "../config/appwriteConfig";

const MovieUpdateForm = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  // Fetching movie details on component load or when movieId changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await databases.getDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_COLLECTION_ID,
          movieId
        );
        setMovieDetails(response);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) fetchMovieDetails();
  }, [movieId]);

  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Parse values for specific fields that require numbers
    const parsedValue =
      name === "rating" || name === "Release_year" || name === "Running_time"
        ? Number(value) // Convert to a number
        : value; // Keep as string for other fields

    setMovieDetails((prevDetails) => ({
      ...prevDetails,
      [name]: parsedValue,
    }));
  };

  // Handling the form submission for updating movie details
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Destructure the movieDetails to avoid sending movie_id and other metadata
    const {
      movie_name,
      rating,
      Genre,
      movie_quality,
      Release_year,
      Running_time,
      Country,
      movie_description,
      movie_main_image,
      movie_trailer_video,
      movie_sample_images,
    } = movieDetails;

    try {
      // Update document with the valid fields
      await databases.updateDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        movieId, // The document ID to update
        {
          movie_name,
          rating,
          Genre,
          movie_quality,
          Release_year,
          Running_time,
          Country,
          movie_description,
          movie_main_image,
          movie_trailer_video,
          movie_sample_images,
        }
      );
      console.log("Movie details updated successfully!");
      onClose(); // Close the form after successful update
    } catch (error) {
      console.error("Error updating movie details:", error.message);
    }
  };

  // Render loading state if movie details are still being fetched
  console.log("movies", movieDetails);
  if (!movieDetails) return <div>Loading movie details...</div>;

  return (
    <div className="form-container">
      <h2>Update Movie Details</h2>
      <form onSubmit={handleUpdate}>
        {/* Form fields for movie details */}
        <input
          type="text"
          name="movie_name"
          value={movieDetails.movie_name || ""}
          onChange={handleChange}
          placeholder="Movie Name"
          required
        />
        <input
          type="text"
          name="movie_id"
          value={movieDetails.movie_id || ""}
          readOnly
        />
        <input
          type="number"
          name="rating"
          value={movieDetails.rating || ""}
          onChange={handleChange}
          placeholder="Rating"
          required
        />
        <input
          type="text"
          name="Genre"
          value={movieDetails.Genre || ""}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <input
          type="text"
          name="movie_quality"
          value={movieDetails.movie_quality || ""}
          onChange={handleChange}
          placeholder="Movie Quality"
          required
        />
        <input
          type="number"
          name="Release_year"
          value={movieDetails.Release_year || ""}
          onChange={handleChange}
          placeholder="Release Year"
          required
        />
        <input
          type="number"
          name="Running_time"
          value={movieDetails.Running_time || ""}
          onChange={handleChange}
          placeholder="Running Time (in mins)"
          required
        />
        <input
          type="text"
          name="Country"
          value={movieDetails.Country || ""}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <textarea
          name="movie_description"
          value={movieDetails.movie_description || ""}
          onChange={handleChange}
          placeholder="Movie Description"
          required
        />
        <input
          type="url"
          name="movie_main_image"
          value={movieDetails.movie_main_image || ""}
          onChange={handleChange}
          placeholder="Main Image URL"
          required
        />
        <input
          type="url"
          name="movie_trailer_video"
          value={movieDetails.movie_trailer_video || ""}
          onChange={handleChange}
          placeholder="Trailer Video URL"
          required
        />
        <input
          type="text"
          name="movie_sample_images"
          value={movieDetails.movie_sample_images?.join(",") || ""}
          onChange={(e) =>
            handleChange({
              target: {
                name: "movie_sample_images",
                value: e.target.value.split(","),
              },
            })
          }
          placeholder="Sample Images URL (comma separated)"
          required
        />

        <button type="submit">Update Movie</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;
