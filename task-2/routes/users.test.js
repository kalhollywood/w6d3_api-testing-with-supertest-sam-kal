// Write your tests for task 2 in this file. Plan out what you need to import/require.
// Write your tests for task 2 in this file. Plan out what you need to import/require.
import { test, expect, describe } from "@jest/globals";
import app from "../app.js";
import request from "supertest";
import assert, { doesNotMatch } from "assert";
import { Router } from "express";
import { getUsers, getUserById } from "../models/users.js";

// TASK 2.3

describe("GET /users", function () {
  test("responds with json", async function getUsers() {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    console.log(response.statusCode);
    expect(response.body).toMatchObject({
      success: true,
      payload: expect.any(Array),
    });
    console.log(response.body);

    expect(response.body.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          username: expect.any(String),
        }),
      ])
    );
    console.log(response.body.payload);
  });
});

// TASK 2.4

describe("GET /users/4", function () {
  test("responds with 4th user", async function getUserById() {
    const response = await request(app).get("/users/4");
    expect(response.statusCode).toBe(200);
    console.log(response.statusCode);
    expect(response.body).toMatchObject({
      success: true,
      payload: expect.any(Object),
    });
    console.log(response.body);

    expect(response.body.payload).toEqual(
      expect.objectContaining({
        id: 4,
        username: expect.any(String),
      })
    );
    console.log(response.body.payload);
  });
});
