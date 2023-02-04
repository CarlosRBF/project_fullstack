import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedCustomer, mockedCustomerLogin } from "../../mocks"

describe("/customers", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /customers - Musr be able to create a customer", async () => {
    const response = await request(app).post("/customers").send(mockedCustomer)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("fullname")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("isActive")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.fullname).toEqual("Carlos Roberto Blanco Filho")
    expect(response.body.email).toEqual("carlos@email.com")
    expect(response.body.phone).toEqual("37984071925")
    expect(response.body.isActive).toEqual(true)
    expect(response.status).toBe(201)
  })

  test("POST /customers -  should not be able to create a customer that already exists", async () => {
    const response = await request(app).post("/customers").send(mockedCustomer)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
  })

  test("GET /customers -  Must be able to list customer", async () => {
    await request(app).post("/customers").send(mockedCustomerLogin)
    const loginResponse = await request(app)
      .post("/customers/login")
      .send(mockedCustomerLogin)
    const response = await request(app)
      .get("/customers")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)

    expect(response.body)
  })

  test("GET /customers -  should not be able to list customer without authentication", async () => {
    const response = await request(app).get("/customers")

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("DELETE /customers -  should not be able to list client not being authenticated", async () => {
    const loginResponse = await request(app)
      .post("/customers/login")
      .send(mockedCustomerLogin)
    const CustomerTobeDeleted = await request(app)
      .get("/customers")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)

    const response = await request(app).delete(
      `/customers/`
    )

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("DELETE /customers/ -  Must be able to soft delete customer", async () => {
    await request(app).post("/customer").send(mockedCustomer)

    const loginResponse = await request(app)
      .post("customers/login")
      .send(mockedCustomerLogin)
    const CustomersTobeDeleted = await request(app)
      .get("/customers")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)

    const response = await request(app)
      .delete(`/customers/${CustomersTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
    const findCustomers = await request(app)
      .get("/customers")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
    expect(response.status).toBe(204)
    expect(findCustomers.body[0].isActive).toBe(false)
  })

  test("DELETE /customers -  shouldn't be able to delete customer with isActive = false", async () => {
    await request(app).post("/customers").send(mockedCustomer)

    const loginResponse = await request(app)
      .post("customers/login")
      .send(mockedCustomerLogin)
    const CustomerToDeleted = await request(app)
      .get("/customers")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)

    const response = await request(app)
      .delete(`/customers/${CustomerToDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })

  test("DELETE -  should not be able to delete user with invalid id", async () => {
    await request(app).post("/customers").send(mockedCustomer)

    const loginResponse = await request(app)
      .post("customers/login")
      .send(mockedCustomerLogin)

    const response = await request(app)
      .delete(`/customers/d7b87033-54bd-4217-93db-1a3c84bd4939`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
  })

  test("PATCH /customers -  should not be able to update customer without authentication", async () => {
    const loginResponse = await request(app)
      .post("customers/login")
      .send(mockedCustomerLogin)
    const customerToBeUpdate = await request(app)
      .get("/customers")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
    const response = await request(app).patch(
      `/customers/${customerToBeUpdate.body[0].id}`
    )

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("PATCH /customers - should not be able to update customer with invalid id", async () => {
    const newValues = {
      fullname: "Carlos Roberto",
      email: "carlosroberto@mail.com",
    }

    const loginResponse = await request(app)
      .post("customers/login")
      .send(mockedCustomerLogin)
    const token = `Bearer ${loginResponse.body.token}`

    const customerTobeUpdateRequest = await request(app)
      .get("/customers")
      .set("Authorization", token)
    const customerTobeUpdateId = customerTobeUpdateRequest.body[0].id

    const response = await request(app)
      .patch(`/customers/d7b87033-54bd-4217-93db-1a3c84bd4939`)
      .set("Authorization", token)
      .send(newValues)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(404)
  })

  test("PATCH /customers - should not be able to update id field value", async () => {
    const newValues = { id: false }

    const admingLoginResponse = await request(app)
      .post("customers/login")
      .send(mockedCustomerLogin)
    const token = `Bearer ${admingLoginResponse.body.token}`

    const customerToBeUpdateRequest = await request(app)
      .get("/customers")
      .set("Authorization", token)
    const customerTobeUpdateId = customerToBeUpdateRequest.body[0].id

    const response = await request(app)
      .patch(`/customers/${customerTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("PATCH /customers - should not be able to update id field value", async () => {
    const newValues = { id: false }

    const loginResponse = await request(app)
      .post("customers/login")
      .send(mockedCustomerLogin)
    const token = `Bearer ${loginResponse.body.token}`

    const customerTobeUpdateRequest = await request(app)
      .get("/users")
      .set("Authorization", token)
    const customerTobeUpdateId = customerTobeUpdateRequest.body[0].id

    const response = await request(app)
      .patch(`/customers/${customerTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("PATCH /customers -  should be able to update customer", async () => {
    const newValues = {
      name: "Carlos Roberto",
      email: "carlosroberto@mail.com",
    }

    const loginResponse = await request(app)
      .post("customers/login")
      .send(mockedCustomerLogin)
    const token = `Bearer ${loginResponse.body.token}`

    const customerTobeUpdateRequest = await request(app)
      .get("/customers")
      .set("Authorization", token)
    const customerTobeUpdateId = customerTobeUpdateRequest.body[0].id

    const response = await request(app)
      .patch(`/customers/${customerTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues)

    const customerUpdated = await request(app)
      .get("/customers")
      .set("Authorization", token)

    expect(response.status).toBe(200)
    expect(customerUpdated.body[0].name).toEqual("Carlos Roberto")
    expect(customerUpdated.body[0]).not.toHaveProperty("password")
  })
})
