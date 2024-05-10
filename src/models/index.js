const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Genre.belongsToMany(Movie, { through: "genres_movies" });
Movie.belongsToMany(Genre, { through: "genres_movies" });

Actor.belongsToMany(Movie, { through: "actors_movies" });
Movie.belongsToMany(Actor, { through: "actors_movies" });

Director.belongsToMany(Movie, { through: "directors_movies" });
Movie.belongsToMany(Director, { through: "directors_movies" });
