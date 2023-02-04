import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors/appError"
import { Customer } from "../../entities/customer.entity"

export const customerDeleteService = async (id: string) => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const customers = await customerRepository.findOneBy({
    id,
  })

  if (!customers?.isActive) {
    throw new AppError(409, "Customer already deactived")
  }

  customers!.isActive = false

  await customerRepository.save(customers!)

  return false
}
