import express from "express";
import fetch from "node-fetch";

const fooRouter = express.Router();

fooRouter.get("/api/foo/failing", async (_, res) => {
  // this POST request body is not properly stubbed by msw
  const response = await fetch("https://example.com/v1/create", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      params: "params",
    }),
  });

  // Issues happen while parsing response from msw stub
  // response.json() will hang
  const jsonBody = await response.json();
  res.status(200).json(jsonBody);
});

fooRouter.get("/api/foo/succeeding", async (_, res) => {
  // this GET request body is successfully stubbed
  const response = await fetch("https://example.com/v1/item");
  res.status(200).json(await response.json());
});

export default fooRouter;
