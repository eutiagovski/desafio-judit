const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("POST /capture", () => {
  const create = {
    lawsuit_cnj: "0002304-13.2010.5.02.0463",
  };
  it("should create an item", async () => {
    const response = await request(baseURL).post("/capture").send(create);

    expect(response.statusCode).toBe(200);
  });
});

describe("POST /capture/move", () => {
  const move = {
    lawsuit_cnj: "0002304-13.2010.5.02.0463",
    new_list: "archived",
  };
  it("should move an item in capured array", async () => {
    const response = await request(baseURL).post("/capture/move").send(move);

    expect(response.statusCode).toBe(200);
  });
});

describe("GET /capture/list", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/capture/list");

    expect(response.statusCode).toBe(200);
  });
});

describe("GET /capture/list", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/capture/list?filter=backlog");

    expect(response.statusCode).toBe(200);
  });
});
