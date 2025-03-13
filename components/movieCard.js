// Global variable to store movie data
let cachedMovies = [];

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDJkZGE2MGZjYWFlNGIxMzg1YzgxYWJlNjdkNTRjZSIsIm5iZiI6MTczOTkwMDE2MS44Miwic3ViIjoiNjdiNGM1MDEyZjVkZTE1NTczZTBlMjIzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rK4icB01qwjG4VCsn0CUVsa5wpyA9_IMzzyKmc59ajw'
    }
  };


//fetch popular movies from API
async function fetchMovies() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    const data = await response.json();

    localStorage.setItem("movies", JSON.stringify(data.results));
    cachedMovies = data.results;
    displayMovies(cachedMovies);
}

//function for a bootstrap card
function createMovieCard(movie){
    const card=document.createElement("div");
    card.className="col-md-3 mb-4";
    card.innerHTML=`
    <div class="card shadow-sm">
        <div class="card-body">
            <img src="http://image.tmdb.org/t/p/w500/${movie.backdrop_path}" class="img-fluid rounded-start" alt="${movie.title}">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.id}</p>
            <a href="" class="btn btn-primary">View Movie Details</a>
        </div>
    </div>
    `;
    return card;
}
// Function to display users in the DOM
function displayMovies(movies) {
    const container = document.getElementById("movieContain");
    container.innerHTML = ""; // Clear existing content

    movies.forEach(movie => {
    container.appendChild(createMovieCard(movie));
    });
}

// Load users from cache or fetch new ones
if (localStorage.getItem("movies")) {
    cachedMovies = JSON.parse(localStorage.getItem("movies"));
    displayMovies(cachedMovies);
} else {
    fetchMovies();
}