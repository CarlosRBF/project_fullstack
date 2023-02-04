import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { customerDeleteService } from "../../services/customers/deleteCustomer.service"

export const customerDeleteController = async (req: Request, res: Response) => {
  try {
    const id = req.customer.id
    const customers = await customerDeleteService(id)

    return res.status(204).send({
      message: "Customer deleted with success!",
      customers,
    })
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res)
    }
  }
}
