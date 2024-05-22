import React from "react";

const Card = ({ movie, addToFavorites }) => {
    if (!movie) {
        return null; 
    }

    const { info } = movie;
    let img_path = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="movie">
            <img src={img_path + info.poster_path} alt={info.title} className="poster" />
            <button className="add-btn" onClick={() => addToFavorites(info)}>+</button>
            <div className="movie-details">
                <div className="box">
                    <h4 className="title">{info.title}</h4>
                    <p className="rating">{info.vote_average}</p>
                </div>
                <div className="overview">
                    {info.overview}
                </div>
            </div>
        </div>
    );
};

export default Card;
