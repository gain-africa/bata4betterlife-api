const supertest = require("supertest");
const app = require("../app");

test("requests to unknown endpoints should return a response with status code of 404", async () => {
  await supertest(app).get("/undefined").expect(404);
  await supertest(app).post("/undefined").expect(404);
  await supertest(app).put("/undefined").expect(404);
  await supertest(app).patch("/undefined").expect(404);
  await supertest(app).delete("/undefined").expect(404);
});

