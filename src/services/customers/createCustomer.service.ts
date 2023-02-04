import { AppDataSource } from "../../data-source"
import { Customer } from "../../entities/customer.entity"
import { ICustomer, ICustomerRequest } from "../../interfaces/customers"
import bcrypt from "bcrypt"
import { AppError } from "../../errors/appError"

export const customerCreateService = async ({
  fullname,
  email,
  password,
  phone,
  createdAt,
}: ICustomerRequest): Promise<ICustomer> => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const newCustomer = new Customer()
  newCustomer.fullname = fullname
  newCustomer.email = email
  newCustomer.password = bcrypt.hashSync(password, 10)
  newCustomer.phone = phone
  newCustomer.createdAt = createdAt

  const customerExists = await customerRepository.findOne({
    where: { email: email },
  })

  if (customerExists) {
    throw new AppError(400, "Customer already exists")
  }

  customerRepository.create(newCustomer)
  await customerRepository.save(newCustomer)

  return newCustomer
}
