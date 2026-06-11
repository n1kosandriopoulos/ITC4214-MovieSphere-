//Get Saved Movies
const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

//Genre map
const genreMap = {

    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    53: "Thriller",
    10752: "War"

};

//Statistics Elements
const totalMovies = document.querySelector("#totalMovies");
const averageRating = document.querySelector("#averageRating");
const highestRated = document.querySelector("#highestRated");
const lowestRated = document.querySelector("#lowestRated");

//Display statistics
function displayStatistics() {

    //Total Movies
    totalMovies.textContent = savedMovies.length;

    //Check if movies exist
    if (savedMovies.length === 0) {

        averageRating.textContent = "0";
        highestRated.textContent = "N/A";
        lowestRated.textContent = "N/A";
        return;

    }

    //Average Rating
    const totalRating =
        savedMovies.reduce(

            (sum, movie) => 
                sum + movie.vote_average,

            0

        );

    const avg = 
        (totalRating / savedMovies.length)
        .toFixed(1);

    averageRating.textContent = avg;

    //Highest Rated Movie
    const highest = 
        savedMovies.reduce((a, b) =>
            Number(a.vote_average) > Number(b.vote_average)
                ? a
                : b

        );

    highestRated.textContent = `${highest.title} (${Number(highest.vote_average).toFixed(1)})`;

    //Lowest Rated Movie 
    const lowest = 
        savedMovies.reduce((a, b) =>
            Number(a.vote_average) < Number(b.vote_average)
                ? a
                : b

        );

    lowestRated.textContent = `${lowest.title} (${Number(lowest.vote_average).toFixed(1)})`;

}

//Ratings Chart
function createRatingsChart() {

    const ctx = document.querySelector("#ratingsChart");

    if (!ctx) return;

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: 
                savedMovies.map(movie => movie.title),

            datasets: [{

                label: "Movie Ratings",

                data: 
                    savedMovies.map(movie => movie.vote_average),

                backgroundColor: "rgba(54, 162, 235, 0.5)",

                borderColor: "rgba(54, 162, 235, 1)", 

                borderWidth: 2,
                
                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: document.body.classList.contains("light-mode")
                            ? "black"
                            : "white"

                    }

                },

                title: {

                    display: true,

                    text: "Movie Ratings Comparison",

                    color: document.body.classList.contains("light-mode")
                        ? "black"
                        : "white",

                    font: {

                        size: 20

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: document.body.classList.contains("light-mode")
                            ? "black"
                            : "white"

                    }

                },

                y: {

                    beginAtZero: true,

                    max: 10,

                    ticks: {

                        color: document.body.classList.contains("light-mode")
                            ? "black"
                            : "white"

                    }

                }

            }

        }

    });

}

//Genres Chart
function createGenresChart() {

    const ctx = document.querySelector("#genresChart");

    if (!ctx) return;

    //Genre Counter
    const genreCount = {};

    savedMovies.forEach(movie => {

        if (movie.genre_ids) {

            movie.genre_ids.forEach(id => {

                const genreName = genreMap[id] || "Other";

                genreCount[genreName] = (genreCount[genreName] || 0) + 1;

            });


        }

    });

    new Chart(ctx, {

        type: "pie", 

        data: {

            labels: Object.keys(genreCount),

            datasets: [{

                label: "Movie Genres",

                data: Object.values(genreCount),

                borderWidth: 2

            }]

        },

        options: {

            responsive: true, 

            plugins: {

                legend: {

                    position: "bottom", 

                    labels: {

                        color: document.body.classList.contains("light-mode")
                            ? "black"
                            : "white",

                        padding: 20,

                        font: {

                            size: 14

                        }

                    }

                },

                title: {

                    display: true,

                    text: "Movie Genres Distribution",

                    color: document.body.classList.contains("light-mode")
                        ? "black"
                        : "white",

                    font: {

                        size: 18

                    }

                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return `${context.label}: ${context.raw} movie(s)`;

                        }

                    }

                }

            }

        }

    });

}

//Initialize 
displayStatistics();

if (savedMovies.length > 0) {

    createRatingsChart();
    createGenresChart();

}