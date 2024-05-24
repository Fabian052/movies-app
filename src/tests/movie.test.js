const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

let id;

test("GET /movies debe traer todas las películas", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una película", async () => {
  const createMovie = {
    name: "Piratas del Caribe",
    image:
      "https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2017/07/25/5fa3cb8807a98.jpeg",
    synopsis: "Son muchos piratas en el mar",
    releaseYear: 2008,
  };
  const res = await request(app).post("/movies").send(createMovie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(createMovie.name);
});

test("PUT /movies/:id debe actualizar 1 o más propiedades de una película", async () => {
  const updateMovie = {
    synopsis:
      "Son piratas con muchas aventuras y ganas de explorar muchas islas y el mar",
  };
  const res = await request(app).put(`/movies/${id}`).send(updateMovie);
  expect(res.status).toBe(200);
  expect(res.body.synopsis).toBe(updateMovie.synopsis);
});

test("POST /movies/:id/genres debe insertar los géneros de una película", async () => {
  const genre = await Genre.create({
    name: "Ciencia Ficción",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/actors debe insertar los actores de una película", async () => {
  const actor = await Actor.create({
    firstName: "Fabian",
    lastName: "Ramos",
    nationality: "Colombia",
    image:
      "https://i.pinimg.com/236x/fc/32/74/fc32745a113e995550b129863b303357.jpg",
    birthday: "2003-03-21",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors debe insertar los directores de una película", async () => {
  const director = await Director.create({
    firstName: "Fabian",
    lastName: "Ramos",
    nationality: "Colombia",
    image:
      "https://i.pinimg.com/236x/fc/32/74/fc32745a113e995550b129863b303357.jpg",
    birthday: "2003-03-21",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("DELETE /movies/:id debe eliminar una película", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
