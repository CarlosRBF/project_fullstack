import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors/appError"
import { Customer } from "../../entities/customer.entity"
import { ICustomerLogin } from "../../interfaces/customers"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const customerLoginService = async ({
  email,
  password,
}: ICustomerLogin) => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const customers = await customerRepository.find()

  const account = customers.find((customer) => customer.email === email)

  if (!account) {
    throw new AppError(404, "Customer not found")
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new AppError(403, "Wrong email/password")
  }

  const token = jwt.sign({ id: account.id }, String(process.env.SECRET_KEY), {
    expiresIn: "24h",
  })

  return token
}
