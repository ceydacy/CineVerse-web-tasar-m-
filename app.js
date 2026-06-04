const movieContainer = document.getElementById("movieContainer");
const favoriteContainer = document.getElementById("favoriteContainer");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");
const movieCount = document.getElementById("movieCount");

let movies = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Toast
function showToast(message) {
  document.getElementById("toastText").textContent = message;

  const toast = new bootstrap.Toast(document.getElementById("liveToast"));

  toast.show();
}

// Filmleri Çek
async function getMovies() {
  loading.style.display = "block";

  try {
    const response = await fetch("https://api.tvmaze.com/shows");

    const data = await response.json();

    movies = data.slice(0, 60);

    displayMovies(movies);
  } catch (error) {
    showToast("API bağlantı hatası");

    console.error(error);
  }

  loading.style.display = "none";
}

// Kartları Göster
function displayMovies(movieList) {
  movieContainer.innerHTML = "";

  movieCount.innerHTML = `${movieList.length} Film`;

  movieList.forEach((movie) => {
    const image = movie.image
      ? movie.image.medium
      : "https://via.placeholder.com/300x450";

    const isFav = favorites.some((f) => f.id === movie.id);

    movieContainer.innerHTML += `

<div class="col-lg-3 col-md-4 col-sm-6">

<div class="movie-card">

<img src="${image}">

<div class="movie-body">

<div class="movie-title">
${movie.name}
</div>

<div class="movie-rating">
⭐ ${movie.rating.average || "N/A"}
</div>

<div class="action-buttons">

<button
class="btn btn-danger"
onclick="addFavorite(${movie.id})">

${isFav ? "Favoride" : "Favori"}

</button>

<button
class="btn btn-warning"
onclick="editMovie(${movie.id})">

Düzenle

</button>

<button
class="btn btn-secondary"
onclick="showDetail(${movie.id})">

Detay

</button>

<button
class="btn btn-dark"
onclick="deleteMovie(${movie.id})">

Sil

</button>

</div>

</div>

</div>

</div>

`;
  });
}

// Favorilere Ekle
function addFavorite(id) {
  const movie = movies.find((m) => m.id === id);

  if (!movie) return;

  const exists = favorites.some((f) => f.id === id);

  if (exists) {
    showToast("Zaten favorilerde");

    return;
  }

  favorites.push(movie);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  renderFavorites();

  showToast("Favorilere eklendi");
}

// Favorileri Göster
function renderFavorites() {
  favoriteContainer.innerHTML = "";

  favorites.forEach((movie) => {
    const image = movie.image
      ? movie.image.medium
      : "https://via.placeholder.com/300x450";

    favoriteContainer.innerHTML += `

<div class="col-lg-2 col-md-3 col-sm-4">

<div class="movie-card favorite-card">

<img src="${image}">

<div class="movie-body">

<div class="movie-title">
${movie.name}
</div>

<button
class="btn btn-danger w-100"
onclick="removeFavorite(${movie.id})">

Kaldır

</button>

</div>

</div>

</div>

`;
  });
}

// Favori Sil
function removeFavorite(id) {
  favorites = favorites.filter((movie) => movie.id !== id);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  renderFavorites();

  showToast("Favorilerden kaldırıldı");
}

// Film Sil
function deleteMovie(id) {
  movies = movies.filter((movie) => movie.id !== id);

  displayMovies(movies);

  showToast("Film silindi");
}

// Film Güncelle
function editMovie(id) {
  const movie = movies.find((m) => m.id === id);

  if (!movie) return;

  const newTitle = prompt("Yeni Film Adı:", movie.name);

  if (!newTitle) return;

  movie.name = newTitle;

  displayMovies(movies);

  showToast("Film güncellendi");
}

// Film Ekle
document.getElementById("saveMovie").addEventListener("click", () => {
  const title = document.getElementById("movieName").value;

  const image = document.getElementById("movieImage").value;

  if (title === "") {
    showToast("Film adı boş bırakılamaz");

    return;
  }

  const newMovie = {
    id: Date.now(),

    name: title,

    image: {
      medium: image || "https://via.placeholder.com/300x450",
    },

    rating: {
      average: "Yeni",
    },
  };

  movies.unshift(newMovie);

  displayMovies(movies);

  showToast("Film eklendi");

  document.getElementById("movieName").value = "";

  document.getElementById("movieImage").value = "";
});

// Arama
searchInput.addEventListener("keyup", () => {
  const text = searchInput.value.toLowerCase();

  const filtered = movies.filter((movie) =>
    movie.name.toLowerCase().includes(text),
  );

  displayMovies(filtered);
});

// Detay Modal
function showDetail(id) {
  const movie = movies.find((m) => m.id === id);

  if (!movie) return;

  const image = movie.image ? movie.image.original || movie.image.medium : "";

  document.getElementById("detailBody").innerHTML = `

<img src="${image}">

<h2>${movie.name}</h2>

<p class="mt-3">

${movie.summary || "Açıklama bulunamadı."}

</p>

`;

  new bootstrap.Modal(document.getElementById("detailModal")).show();
}

// Tema
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark",
  );
});

// Tema Yükle
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// Başlat
getMovies();

renderFavorites();
