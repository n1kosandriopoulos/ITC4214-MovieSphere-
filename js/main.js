//Theme Toggle Functionality

const movieContainer = document.querySelector(".movie-grid");

async function fetchTrendingMovies() {

    try {

        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

        const data = await response.json();

        displayMovies(data.results);

    }

    catch(error) {

        console.log("Error fetching movies:", error);

        movieContainer.innerHTML = `
        
            <div class="error-message">

                Failed to load trending movies.
                Please try again later.

            </div>

        `;

    }

}

function displayMovies(movies) {

    movieContainer.innerHTML = "";
    movies.slice(0,8).forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
        
            <img src="${IMAGE_URL + movie.poster_path}"
                 alt="${movie.title}">

            <div class="movie-info">
                
                 <h3>${movie.title}</h3>

                 <p>⭐ ${movie.vote_average.toFixed(1)}</p>                
            
            </div>        
        `;

        movieContainer.appendChild(movieCard);

    });

}

fetchTrendingMovies();







    








