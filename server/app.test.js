const app = require("./app");
const request = require("supertest");
const { User, sequelize } = require("./models");
const { queryInterface } = sequelize;

const newUser = {
  firstName: "Messi",
  lastName: "Lionel",
  email: "LionelMessi@gmail.com",
  mobileNumber: "085255085255",
  gender: "Male",
  dateOfBirth: "2000-02-02",
};
describe("Register Routes Test", () => {
  describe("POST /register - create newUser", () => {
    test("400 failed create user - should return error if email null", (done) => {
      request(app)
        .post("/register")
        .send({
          firstName: "Messi",
          lastName: "Lionel",
          mobileNumber: "085255085255",
          gender: "Male",
          dateOfBirth: "2000-02-02",
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "User.email cannot be null");
          done();
        });
    });

    test("400 failed create user - should return error if Mobile Number null", (done) => {
      request(app)
        .post("/register")
        .send({
          firstName: "Messi",
          lastName: "Lionel",
          email: "LionelMessi@gmail.com",
          gender: "Male",
          dateOfBirth: "2000-02-02",
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "User.mobileNumber cannot be null"
          );
          done();
        });
    });

    test("400 failed create user - should return error if firstName null", (done) => {
      request(app)
        .post("/register")
        .send({
          lastName: "Lionel",
          email: "LionelMessi@gmail.com",
          mobileNumber: "085255085255",
          gender: "Male",
          dateOfBirth: "2000-02-02",
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "User.firstName cannot be null"
          );
          done();
        });
    });

    test("400 failed create user - should return error if firstName empty", (done) => {
      request(app)
        .post("/register")
        .send({
          firstName: "",
          lastName: "Lionel",
          email: "LionelMessi@gmail.com",
          mobileNumber: "085255085255",
          gender: "Male",
          dateOfBirth: "2000-02-02",
        })
        .then((response) => {
          const { body, status } = response;
          console.log(body);
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "First Name is required");
          done();
        });
    });

    test("400 failed create user - should return error if lastName null", (done) => {
      request(app)
        .post("/register")
        .send({
          firstName: "Lionel",
          email: "LionelMessi@gmail.com",
          mobileNumber: "085255085255",
          gender: "Male",
          dateOfBirth: "2000-02-02",
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "User.lastName cannot be null"
          );
          done();
        });
    });

    test("400 failed create user - should return error if lastName empty", (done) => {
      request(app)
        .post("/register")
        .send({
          firstName: "Lionel",
          lastName: "",
          email: "LionelMessi@gmail.com",
          mobileNumber: "085255085255",
          gender: "Male",
          dateOfBirth: "2000-02-02",
        })
        .then((response) => {
          const { body, status } = response;
          console.log(body);
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Last Name is required");
          done();
        });
    });

    test("201 success create user - should return data user", (done) => {
      request(app)
        .post("/register")
        .send(newUser)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty("firstName", "Messi");
          expect(body).toHaveProperty("lastName", "Lionel");
          expect(body).toHaveProperty("mobileNumber", "085255085255");
          expect(body).toHaveProperty("email", "LionelMessi@gmail.com");
          expect(body).toHaveProperty("gender", "Male");
          expect(body).toHaveProperty("dateOfBirth", "2000-02-02");
          done();
        });
    });

    test("400 failed create user - should return error if Mobile Number not unique", (done) => {
      request(app)
        .post("/register")
        .send({
          firstName: "Messi",
          lastName: "Lionel",
          email: "LionelMessi17@gmail.com",
          mobileNumber: "085255085255",
          gender: "Male",
          dateOfBirth: "2000-02-02",
        })
        .then((response) => {
          const { body, status } = response;
          console.log(body);
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "mobileNumber must be unique");
          done();
        });
    });

    test("400 failed create user - should return error if email not unique", (done) => {
      request(app)
        .post("/register")
        .send({
          firstName: "Messi",
          lastName: "Lionel",
          email: "LionelMessi@gmail.com",
          mobileNumber: "085255085244",
          gender: "Male",
          dateOfBirth: "2000-02-02",
        })
        .then((response) => {
          const { body, status } = response;
          console.log(body);
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "email must be unique");
          done();
        });
    });

    afterAll((done) => {
      queryInterface
        .bulkDelete("Users", {})
        .then(() => done())
        .catch((err) => done(err));
    });
  });
});
