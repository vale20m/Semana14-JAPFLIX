// GUARDAMOS LA URL DEL JSON EN UNA CONSTANTE PARA POSTERIORMENTE REALIZAR EL FETCH

const URL = 'https://japceibal.github.io/japflix_api/movies-data.json'

let movies;

fetch(URL)
.then(response => response.json())
.then(data => {
    console.log(data);
    movies = data;
})
.catch(error => {
    console.error('Hubo un error al cargar las peliculas:', error);
});

const searchValue = document.getElementById("inputBuscar");

const searchButton = document.getElementById("btnBuscar");

function searchBy (movie, searchValue){
    
    if (movie.title.toLowerCase().includes(searchValue) || movie.tagline.toLowerCase().includes(searchValue) ||  movie.overview.toLowerCase().includes(searchValue)){
        return true;
    } else {
        for (const genre of movie.genres) {
            if (genre.name.toLowerCase().includes(searchValue)){
                return true;
            }
        }
    }
    return false;
}

searchButton.addEventListener("click", function(){
    if (searchValue.value){
        let filteredMovies = movies.filter((movie) => searchBy(movie, searchValue.value.toLowerCase()));
        console.log(filteredMovies);
        showElements(filteredMovies);
    }
});

const movieList = document.getElementById("lista");

function showStars(rating){
    rating = rating / 2;
    let stars = "";
    let cont = 5;
    debugger;
    while (rating >= 1 && cont > 1){
        stars += `<span class="fa fa-star checked"></span>`;
        rating--;
        cont--;
    }
    if (rating > 0){
        if (rating - 0.25 > 0 && rating - 0.25 < 0.5){
            stars += `<span class="fa fa-star-half-o checked"></span>`;
            cont--;
        } else if (rating - 0.25 >= 0.5){
            stars += `<span class="fa fa-star checked"></span>`;
            cont--;
        }
    }
    while (cont > 0){
        stars += `<span class="fa fa-star-o checked"></span>`;
        cont--;
    }
    return stars;
}

function getGenres(genres){
    let genresString = "";
    for (let i = 0; i < genres.length; i++) {
        genresString += genres[i].name;
        if (i != genres.length-1){
            genresString += " - ";
        }
    }
    return genresString;
}

function getYear(date){
    let year = "";
    for (let i = 0; i <= 3; i++){
        year += date[i];
    }
    return year;
}

function showElements(array){
    
    movieList.innerHTML = "";
    for (const movie of array) {
        
        movieList.innerHTML +=
        `<li class="container border my-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${movie.id}" aria-controls="offcanvasTop">
            <div class="row bg-secondary">
                <div class="col-8 text-white">${movie.title}</div>
                <div class="col-4 text-end">${showStars(movie.vote_average)}</div>
                <div class="col-12 text-white-50">${movie.tagline}</div>
            </div>
        </li>

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${movie.id}" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h3 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h3>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>${movie.overview}</div>
                <hr>
                <div class="row">
                    <div class="fw-light col">${getGenres(movie.genres)}</div>
                    <div class="dropdown col text-end">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">More</button>
                    <ul class="dropdown-menu">
                        <li><div class="dropdown-item">Year: ${getYear(movie.release_date)}</div></li>
                        <li><div class="dropdown-item">Runtime: ${movie.runtime}</div></li>
                        <li><div class="dropdown-item">Budget: ${movie.budget}</div></li>
                        <li><div class="dropdown-item">Revenue: ${movie.revenue}</div></li> 
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        
        `;

    }
}