import express from "express";
import request from "supertest";
import fooRouter from "../fooRouter";

import { rest } from "msw";
import { setupServer } from "msw/node";

describe("Session token route", function () {
  const api = request(express().use(fooRouter).use(express.json()));
  const server = setupServer();
  const expectedStubbedResponse = {
    response: "expected",
  };

  beforeAll(() => {
    server.listen({ onUnhandledRequest: "bypass" });
  });
  afterAll(() => {
    server.close();
  });

  it("Shows the error when stubbing a POST request", async () => {
    server.use(
      rest.post("https://example.com/v1/create", async (_, res, ctx) => {
        // This does not stub the response body correctly
        return res(ctx.json(expectedStubbedResponse));
      })
    );

    const response = await api.get("/api/foo/failing");

    expect(response.body).toEqual(
      expect.objectContaining(expectedStubbedResponse)
    );
  });

  it("Shows a successful result when stubbing a GET request", async () => {
    server.use(
      rest.get("https://example.com/v1/item", async (_, res, ctx) => {
        // This will stub the response body correctly
        return res(ctx.json(expectedStubbedResponse));
      })
    );

    const response = await api.get("/api/foo/succeeding");

    expect(response.body).toEqual(
      expect.objectContaining(expectedStubbedResponse)
    );
  });
});
