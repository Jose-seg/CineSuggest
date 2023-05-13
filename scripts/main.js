// Map moods to MovieDB genre IDs
var genreId = {
    'Romantic': [10749],
    'Exciting': [28, 12], // Adventure and Action
    'Dramatic': [18],
    'Inspiring': [99, 36], // Documentary and Biograpghy
    'Humorous': [35],
    'Mysterious': [9648],
    'Scary': [27],
    'Feel-good': [10751, 35] // Family and Comedy
 };

// Code for handling the mood buttons
document.addEventListener('DOMContentLoaded', function() {
    var moodButtons = document.querySelectorAll('.mood-btn');

    moodButtons.forEach(function(btn) {
        btn.addEventListener('click', function(){
            var mood = this.getAttribute('data-mood');
            fetchMovies(mood);
        });
    });
});

// Function for getting the recommendations
// function getRecommendation() {
//     var mood = document.getElementById('mood').ariaValueMax;
//     if (mood) {
//         document.getElementById('loading').classList.remove('hidden');
//         fetchMovies(mood);
//     }
// }

// Function for getting the movie data using TMDB Api 
function fetchMovies(mood) {
    let genreIds = genreId[mood].join(','); // Joins the array of genre ids into a comma separated string
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f669fc2df3cf018311cf3d1af01eca67&with_genres=${genreIds}`)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log data to the console 
        document.getElementById('loading').classList.add('hidden');
        displayMovies(data);
    })
    .catch(error => {
        console.error('Error', error);
        document.getElementById('loading').classList.add('hidden');
    });
}

// Function for displaying the movies on the page
function displayMovies(data) {
    var movieContainer = document.getElementById('movie');
    movieContainer.innerHTML = ''; // Clear out any old movies

    // Shuffle the array and slice it the get random 5 movies
let shuffleMovies = data.results.sort(() => 0.5 - Math.random()).slice(0, 5);

shuffleMovies.forEach(function(movie) {
    var movieElement = document.createElement('div');

    // Create an image element for the movie poster
    var img = document.createElement('img');
    img.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    movieElement.appendChild(img);

    // Add the movie title
    var title = document.createElement('h2');
    title.textContent = movie.title;
    movieElement.appendChild(title);

    // Add the movie description
    var description = document.createElement('p');
    description.textContent = movie.overview;
    movieElement.appendChild(description);

    // Add the movie rating
    var rating = document.createElement('p');
    rating.textContent = 'Rating: ' + movie.vote_average;
    movieElement.appendChild(rating);

    movieContainer.appendChild(movieElement);
})
}