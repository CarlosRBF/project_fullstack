import { AppDataSource } from "../../data-source"
import { Customer } from "../../entities/customer.entity"


export const customerListService = async (id: string) => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const customers = await customerRepository.findOneBy({
    id,
  })

  return customers
}
