import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { customerUpdateService } from "../../services/customers/updateCustomer.service"

export const customerUpdateController = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const id = req.customer.id

    const customer = await customerUpdateService(data, id)

    return res.status(200).send(instanceToPlain(customer))
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res)
    }
  }
}
