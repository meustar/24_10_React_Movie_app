import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detail.css";

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      console.error("location.state is undefined. Redirecting to home.");
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  if (!location.state) {
    return null; // Redirect will handle this
  }

  const { title, year, summary, poster, genres } = location.state;

  return (
    <div className="detail">
      <img src={poster} alt={title} className="detail__poster" />
      <div className="detail__info">
        <h1 className="detail__title">{title}</h1>
        <h3 className="detail__year">Year: {year}</h3>
        <ul className="detail__genres">
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
        <p className="detail__summary">{summary}</p>
      </div>
    </div>
  );
}

export default Detail;
