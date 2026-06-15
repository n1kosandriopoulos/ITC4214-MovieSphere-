//Select elements
const searchInput = document.querySelector(".movie-search-input");
const searchButton = document.querySelector(".search-btn");
const resultsContainer = document.querySelector(".movie-results-container");
const savedMoviesContainer = document.querySelector(".saved-movies-container");
const clearWatchlistButton = document.querySelector(".clear-watchlist-btn");
const filterButtons = document.querySelectorAll(".filter-btn");
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

let currentMovies = [];
let currentFilter = "all";

//Search  Movies Function
async function searchMovies() {

    //Get user input
    const searchTerm = searchInput.value.trim();

    //Prevent empty search
    if (searchTerm === "") {

        resultsContainer.innerHTML = `

            <p class="error-message">
                Please enter a movie name.
            </p>

        `;

        return;

    }

    try {

        //Loading Message
        resultsContainer.innerHTML = `

            <p class="loading-message">
                Loading Movies...
            </p>

        `;
        
        //Fetch API data
        const response = await fetch(SEARCH_URL + searchTerm);
        const data = await response.json();

        //Display Movies 
        displayMovies(data.results);

    }

    catch(error) {

        console.log("Error fetching movie:", error);

        resultsContainer.innerHTML = `

            <div class="error-message">

                Failed to load movies.
                Please try again later.

            </div>

        `;

    }

}

//Display Movies Function
function displayMovies(movies) {

    currentMovies = movies;
    resultsContainer.innerHTML = "";
    
    movies.forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `

            <img 
                src="${IMAGE_URL + movie.poster_path}"
                alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>⭐ ${movie.vote_average.toFixed(1)}</p>

                <button
                    class="add-btn"
                    onclick="saveMovie(${movie.id})">

                    Add to Watchlist

                </button>

            </div>

        `;

        resultsContainer.appendChild(movieCard);

    });

}

//Save Movie function
function saveMovie(movieId) {

    //Get existing movies
    let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    //Check if movie already exists
    const movieExists = savedMovies.some(movie => movie.id === movieId);

    if (movieExists) {

        alert("Movie already saved.");
        return;

    }

    //Find selected movie
    const selectedMovie = currentMovies.find(movie => movie.id === movieId);

    //Genre Map
    const genreMap = {

        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        18: "Drama",
        14: "Fantasy",
        27: "Horror",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        53: "Thriller"

    };
    
    //Convert IDs to names for pie chart
    const genreNames = selectedMovie.genre_ids
        .map(id => genreMap[id])
        .filter(Boolean);
    
    //Create custom movie object 
    const movieData = {

        id: selectedMovie.id,
        title: selectedMovie.title,
        poster_path: selectedMovie.poster_path,
        genre_names: genreNames,
        vote_average: selectedMovie.vote_average,
        watched: false

    };

    //Add movie
    savedMovies.push(movieData);

    //Save to localStorage
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

    //Refresh UI
    displaySavedMovies();

    alert("Movie saved!");

}

//Remove Movie function
function removeMovie(movieId) {

    //Get saved movies
    let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    //Remove selected movie
    savedMovies = savedMovies.filter(movie => movie.id !== movieId);

    //Update localStorage
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

    //Refresh UI
    displaySavedMovies();

}

//Clear Watchlist function
function clearWatchlist() {

    //Confirmation Message
    const confirmClear = confirm("Are you sure you want to clear your watchlist?");

    //Check user's choice
    if (!confirmClear) {

        return;

    }

    //Clear localStorage
    localStorage.removeItem("savedMovies");

    //Refresh UI
    displaySavedMovies();

}

//Display Saved Movies function
function displaySavedMovies() {

    //Get saved movies
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    //Filtering
    let filteredMovies = savedMovies;

    if (currentFilter === "watched") {

        filteredMovies = savedMovies.filter(movie => movie.watched);

    }

    else if (currentFilter === "unwatched") {

        filteredMovies = savedMovies.filter(movie => !movie.watched);

    }

    //Empty Filter States
    if (filteredMovies.length === 0) {

        let message = "";

        if (currentFilter === "watched") {


            message = "No watched movies yet.";
        }

        else if (currentFilter === "unwatched") {

            message = "No unwatched movies yet.";

        }

        savedMoviesContainer.innerHTML = `

            <p class="empty-message">

                ${message}

            </p>

        `;

        return;

    }

    //Clear container
    savedMoviesContainer.innerHTML = "";

    //Check if watchlist is empty
    if (savedMovies.length === 0) {

        savedMoviesContainer.innerHTML = `

            <p class="empty-message">
                No movies saved yet.
            </p>

        `;

        return;

    }

    //Alphabetical Sorting
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));

    //Loop through movies
    filteredMovies.forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        //Watched Movies
        if (movie.watched) {

            movieCard.classList.add("watched-movie");

        }

        movieCard.innerHTML = `

            <img 
                src="${IMAGE_URL + movie.poster_path}"
                alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>
                
                <p>⭐ ${movie.vote_average.toFixed(1)}</p>

                <button
                    class="watch-btn">

                    ${movie.watched ? "Watched" : "Mark as Watched"}

                </button>   

                <button 
                    class="remove-btn"
                    onclick="removeMovie(${movie.id})">

                    Remove

                </button>

            </div>

        `;

        //Watch Button
        const watchButton = movieCard.querySelector(".watch-btn");

        watchButton.addEventListener("click", () => {

            movie.watched = !movie.watched;
            localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
            displaySavedMovies();

        });

        savedMoviesContainer.appendChild(movieCard);

    });

}

//Search Button Event
searchButton.addEventListener("click", searchMovies);

//Enter Key
searchInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        searchMovies();

    }

});

console.log("watchlist.js loaded")

displaySavedMovies();

//Clear Watchlist Button Event
clearWatchlistButton.addEventListener("click", clearWatchlist);

//Filter Buttons
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        //Get filter value
        currentFilter = button.dataset.filter;

        //Remove active class
        filterButtons.forEach(btn => {

            btn.classList.remove("active-filter");

        }); 

        //Add active class
        button.classList.add("active-filter");

        //Refresh Movies
        displaySavedMovies();
    
    });
    
});