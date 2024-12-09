import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const {
        data: {
          data: { movies },
        },
      } = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
      );
      setMovies(movies);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

  return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : movies.length ? (
        <div className="movies">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
            />
          ))}
        </div>
      ) : (
        <div className="error">
          Failed to load movies. Please try again later.
        </div>
      )}
    </section>
  );
}

export default Home;
