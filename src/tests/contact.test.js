const supertest = require("supertest");
const app = require("../app");
const { SECRET } = require("../config/config");
const { connect, cleanup, disconnect } = require("./database");
const contactModel = require("../models/contact.model");

describe("Blog Route", () => {
  let contactID;

  const contact = {
    name: "Mr. Beans",
    phoneNo: "08012212332",
    message: "Hello,how are you.",
    email: "beans@example.com",
  };

  beforeAll(() => connect());

  afterEach(() => cleanup());

  afterAll(() => disconnect());

  it("should get all contacts", async () => {
    const contactPost = await contactModel.create(contact);

    const response = await supertest(app)
      .get("/api/v0/contact/")
      .set("Authorization", `bearer ${SECRET}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("data");
  });

  it("should get a contact", async () => {
    const contactPost = await contactModel.create(contact);
    contactID = contactPost._id;

    const response = await supertest(app)
      .get(`/api/v0/contact/${contactID}`)
      .set("Authorization", `bearer ${SECRET}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("message");
    expect(response.body.data).toHaveProperty("phoneNo");
  });

  it("should create a contact", async () => {
    const response = await supertest(app)
      .post("/api/v0/contact/")
      .set("content-type", "application/json")
      .send(contact);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe("Contact form submitted successfully");
  });
});

