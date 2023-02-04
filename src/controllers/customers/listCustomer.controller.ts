import { instanceToPlain } from "class-transformer"
import { Response, Request } from "express"
import { AppError, handleError } from "../../errors/appError"
import { customerListService } from "../../services/customers/listCustomer.service"

export const customerListController = async (req: Request, res: Response) => {
  try {
    const id = req.customer.id
    const customer = await customerListService(id)

    return res.status(200).send(instanceToPlain(customer))
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res)
    }
  }
}
