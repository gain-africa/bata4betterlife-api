const supertest = require("supertest");
const app = require("../app");
const { SECRET } = require("../config/config");
const { connect, cleanup, disconnect } = require("./database");
const volunteerModel = require("../models/volunteer.model");

describe("Blog Route", () => {
  let contactID;

  const volunteer = {
    name: "Mr. Beans",
    phoneNo: "08012212332",
    email: "beans@example.com",
    skills: "HTML, CSS, JS",
    interest: "I would like to be involved in financial support",
  };

  beforeAll(() => connect());

  afterEach(() => cleanup());

  afterAll(() => disconnect());

  it("should get all contacts", async () => {
    const volunteerPost = await volunteerModel.create(volunteer);

    const response = await supertest(app)
      .get("/api/v0/volunteer/")
      .set("Authorization", `bearer ${SECRET}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("data");
  });

  it("should get a volunteer", async () => {
    const volunteerPost = await volunteerModel.create(volunteer);
    contactID = volunteerPost._id;

    const response = await supertest(app)
      .get(`/api/v0/volunteer/${contactID}`)
      .set("Authorization", `bearer ${SECRET}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("skills");
    expect(response.body.data).toHaveProperty("interest");
    expect(response.body.data).toHaveProperty("phoneNo");
  });

  it("should create a volunteer", async () => {
    const response = await supertest(app)
      .post("/api/v0/volunteer/")
      .set("content-type", "application/json")
      .send(volunteer);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe("Volunteer form submitted successfully");
  });
});

