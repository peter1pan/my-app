import Search from "./models/Search";
import { elements } from "./base";
import * as searchView from "./views/searchView";
import * as movieView from "./views/movieView";
import { Movie } from "./models/Movie";

const state = {};

// Search Controller

const searchController = async () => {
  const keyword = elements.searchInput.value;

  if (keyword) {
    state.search = new Search(keyword);

    await state.search.getResults();

    searchView.clearInput();
    searchView.clearResults();
    searchView.displayResults(keyword, state.search.data);
  } else {
    alert("type a movie name");
  }
};

elements.searchForm.addEventListener("submit", function (e) {
  elements.loading_icon.classList.remove("d-none");
  e.preventDefault();
  searchController();
});

// Movie Controller

const movieController = async () => {
  const id = window.location.hash.replace("#", "");

  if (id) {
    state.movie = new Movie(id);

    await state.movie.getMovie();

    movieView.displayMovie(state.movie.data);
    movieView.backToTop();
  }
};

window.addEventListener("hashchange", movieController);

elements.movie_close.addEventListener("click", movieView.movieClose);
