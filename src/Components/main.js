import React, { useEffect, useState } from "react";
import Card from "./card";  // Ensure correct import for Card component

const apiKey = "c4fecd27cae3afbdf1d0a6e9a1cd605a";  // Correct API key parameter
const baseUrl = "https://api.themoviedb.org/3";
const defaultUrl = `${baseUrl}/movie/popular?api_key=${apiKey}`;

const categories = ["Popular", "Theatre", "Kids", "Comedy", "Drama"];

const Main = () => {
    const [movieData, setMovieData] = useState([]);
    const [url, setUrl] = useState(defaultUrl);
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [notification, setNotification] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMovieData(data.results || []);
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    }, [url]);

    const getData = (movieType) => {
        let newUrl;
        if (movieType === "Popular") {
            newUrl = `${baseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
        } else if (movieType === "Theatre") {
            newUrl = `${baseUrl}/discover/movie?primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-12-31&api_key=${apiKey}`;
        } else if (movieType === "Kids") {
            newUrl = `${baseUrl}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${apiKey}`;
        } else if (movieType === "Comedy") {
            newUrl = `${baseUrl}/discover/movie?with_genres=35&sort_by=popularity.desc&api_key=${apiKey}`;
        } else if (movieType === "Drama") {
            newUrl = `${baseUrl}/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=${apiKey}`;
        }
        setUrl(newUrl);
    };

    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            const searchUrl = `${baseUrl}/search/movie?query=${encodeURIComponent(search)}&api_key=${apiKey}`;
            setUrl(searchUrl);
            setSearch("");
        }
    };

    const addToFavorites = (movie) => {
        setFavorites([...favorites, movie]);
        setNotification(`${movie.title} has been added to favorites!`);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Hide notification after 3 seconds
    };

    return (
        <>
            <div className="header">
                <nav>
                    <ul>
                        {categories.map((value, index) => (
                            <li key={index}>
                                <a href="#" name={value} onClick={(e) => { getData(e.target.name) }}>{value}</a>
                            </li>
                        ))}
                        <li>
                            <a href="#" onClick={() => setMovieData(favorites)}>Favorites</a>
                        </li>
                    </ul>
                </nav>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="search-btn">
                        <input 
                            type="text" 
                            placeholder="Enter Movie Name" 
                            className="inputText" 
                            onChange={(e) => setSearch(e.target.value)} 
                            value={search} 
                            onKeyPress={searchMovie} 
                        />
                        <button type="button" onClick={() => searchMovie({ key: "Enter" })}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="container">
                {movieData.length === 0
                    ? <p className="notfound">Not Found</p>
                    : movieData.map((res, pos) => (
                        <Card movie={{ info: res }} key={pos} addToFavorites={addToFavorites} />
                    ))
                }
            </div>
            {showNotification && <div className="notification">{notification}</div>}
        </>
    );
};

export default Main;
