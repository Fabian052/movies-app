const request = require("supertest");
const app = require("../app");

let id;

test("GET /actors debe traer todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async () => {
  const createActor = {
    firstName: "Fabian",
    lastName: "Ramos",
    nationality: "Colombia",
    image:
      "https://i.pinimg.com/236x/fc/32/74/fc32745a113e995550b129863b303357.jpg",
    birthday: "2003-03-21",
  };
  const res = await request(app).post("/actors").send(createActor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(createActor.firstName);
});

test("PUT /actors/:id debe actualizar 1 o más propiedades de un actor", async () => {
  const updateActor = {
    lastName: "Joyas",
  };
  const res = await request(app).put(`/actors/${id}`).send(updateActor);
  expect(res.status).toBe(200);
  expect(res.body.lastName).toBe(updateActor.lastName);
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
