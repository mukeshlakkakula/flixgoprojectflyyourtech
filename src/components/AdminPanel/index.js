// src/components/MovieForm.js
import React, { useState } from "react";
import { databases } from "../config/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import "./index.css"; // Import CSS file for styling

const AdminPanel = () => {
  const [movieName, setMovieName] = useState("");
  const [movieId, setMovieId] = useState(uuidv4()); // Generate unique ID
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [movieQuality, setMovieQuality] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [country, setCountry] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieMainImage, setMovieMainImage] = useState("");
  const [movieTrailerVideo, setMovieTrailerVideo] = useState("");
  const [movieSampleImages, setMovieSampleImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_name: movieName,
      movie_id: movieId,
      rating: parseFloat(rating),
      Genre: genre,
      movie_quality: movieQuality,
      Release_year: parseInt(releaseYear),
      Running_time: parseInt(runningTime),
      Country: country,
      movie_description: movieDescription,
      movie_main_image: movieMainImage,
      movie_trailer_video: movieTrailerVideo,
      movie_sample_images: movieSampleImages,
    };

    try {
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        movieId, // Use movieId as the document ID
        movieData
      );
      console.log("Movie details added successfully!");
      // Reset the form or handle further logic
      setMovieName("");
      setMovieId(uuidv4()); // Reset movie ID
      setRating("");
      setGenre("");
      setMovieQuality("");
      setReleaseYear("");
      setRunningTime("");
      setCountry("");
      setMovieDescription("");
      setMovieMainImage("");
      setMovieTrailerVideo("");
      setMovieSampleImages([]);
    } catch (error) {
      console.error("Error adding movie details:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Movie Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Movie Name"
          required
        />
        <input
          type="text"
          value={movieId}
          readOnly
          placeholder="Movie ID (Unique)"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating"
          required
        />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          required
        />
        <input
          type="text"
          value={movieQuality}
          onChange={(e) => setMovieQuality(e.target.value)}
          placeholder="Movie Quality"
          required
        />
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          placeholder="Release Year"
          required
        />
        <input
          type="number"
          value={runningTime}
          onChange={(e) => setRunningTime(e.target.value)}
          placeholder="Running Time (in mins)"
          required
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <textarea
          value={movieDescription}
          onChange={(e) => setMovieDescription(e.target.value)}
          placeholder="Movie Description"
          required
        />
        <input
          type="url"
          value={movieMainImage}
          onChange={(e) => setMovieMainImage(e.target.value)}
          placeholder="Main Image URL"
          required
        />
        <input
          type="url"
          value={movieTrailerVideo}
          onChange={(e) => setMovieTrailerVideo(e.target.value)}
          placeholder="Trailer Video URL"
          required
        />
        <input
          type="text"
          value={movieSampleImages}
          onChange={(e) => setMovieSampleImages(e.target.value.split(","))}
          placeholder="Sample Images URL (comma separated)"
          required
        />

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AdminPanel;
