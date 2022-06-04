import { test, expect, describe } from "@jest/globals";
import app from "../app.js";
import request from "supertest";
import {
  getUsers,
  getUsersByUsername,
  getUserById,
  createUser,
  deleteUserById,
} from "../models/users.js";

// TASK 3.6.1 GET /users

describe("GET /users", function () {
  test("check whether all users are returned and in JSON form", async function getUsers() {
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

// TASK 3.6.2 Specific username search

describe("GET /users?username=some_username", function () {
  test("check whether specific user is returned", async function getUsersByUsername() {
    const response = await request(app).get("/users?username=gregory");
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
          username: "Gregory",
        }),
      ])
    );
    console.log(response.body.payload);
  });
});

// TASK 3.6.3 Search user by ID

describe("GET /users/:id", function () {
  test("check whether user with specific ID is returned", async function getUserById() {
    const response = await request(app).get("/users/123");
    expect(response.statusCode).toBe(200);
    console.log(response.statusCode);

    expect(response.body.payload).toEqual(
      expect.objectContaining({
        id: 123,
        username: expect.any(String),
      })
    );
    console.log(response.body.payload);
  });
});

// TASK 3.6.4 Add a new user to database

describe("POST new user", function () {
  test("check whether new user is added to DB", async function createUser() {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    console.log(response.statusCode);
    expect(response.body).toMatchObject({
      success: true,
      payload: expect.any(Array),
    });
    // console.log(response.body);

    expect(response.body.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          username: "Kal",
        }),
      ])
    );
    console.log(response.body.payload);
  });
});

// TASK 3.6.5 DELETE user from database

describe("DELETE user with specific ID", function () {
  test("check whether user with specific ID is deleted", async function deleteUserById() {
    const response = await request(app).get("/users/204");
    expect(response.statusCode).toBe(404);
    console.log(response.statusCode);
    console.log(response.text);
  });
});
