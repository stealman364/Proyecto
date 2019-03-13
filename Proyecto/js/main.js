var movie = [];
$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=f12ba140')
 
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
		
		<figure class="col-md-4">
     
          <img alt="picture" src="${movie.Poster}"
            class="img-fluid">
          <h3 class="text-center my-3">${movie.Title}</h3>
			<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Detalles</a>
        </a>
      </figure>

        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=f12ba140')
    
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
	  		<div class="card" style="width: 40rem;">
		<img class="card-img-top" src="${movie.Poster}" alt="Poster">
		<div class="card-body">
			<h5 class="card-title">${movie.Title}</h5>
			<ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
			  <li class="list-group-item"><strong>Descripccion:</strong> ${movie.Plot}</li>
            </ul>
			<hr>
			<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="http://imdb.com/title/${movie.imdbID}">Detalles</a>
			<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="index.html">Volver</a>
		</div>
      `;
	  sessionStorage(output)

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });

function sesionStorage(){
	
}
}
