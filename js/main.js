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

//Latest Activity
function loadActivities() {

    const activityContainer = document.querySelector(".activity-container");

    const activities = JSON.parse(localStorage.getItem("movieActivity")) || [];

    if (activities.length === 0) {

        activityContainer.innerHTML = `

            <div class="activity-item">

                <i class="bi bi-info-circle-fill activity-icon"></i>

                <div>

                    <h4 class="activity-title">No activity yet</h4>

                    <p class="activity-time">Start using MovieSphere to see your latest activity here.</p>

                </div>

            </div>

        `;

        return;

    }

    activityContainer.innerHTML = "";

    activities.slice(0, 5).forEach(activity => {

        activityContainer.innerHTML += `

            <div class="activity-item">

                <i class="bi bi-bookmark-check-fill activity-icon"></i>

                <div> 

                    <h4 class="activity-title">${activity.action}</h4>

                    <p class="activity-time">${activity.time}</p>

                </div>

            </div>

        `;

    });

}

loadActivities();