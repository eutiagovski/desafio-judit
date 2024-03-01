const request = require("supertest");
const baseURL = "http://localhost:4000";

const captures = [
  "0002287-77.2010.5.02.0462",
  "0002288-65.2010.5.02.0461",
  "0002292-96.2010.5.02.0463",
  "0002293-81.2010.5.02.0463",
  "0002294-60.2010.5.02.0465",
  "0002295-45.2010.5.02.0465",
  "0002295-48.2010.5.02.0464",
  "0002295-54.2010.5.02.0462",
  "0002296-30.2010.5.02.0465",
  "0002304-13.2010.5.02.0463",
];

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
