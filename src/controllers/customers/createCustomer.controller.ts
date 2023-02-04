import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { customerCreateService } from "../../services/customers/createCustomer.service"

export const customerCreateController = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, phone, createdAt } = req.body

    const newCustomer = await customerCreateService({
      fullname,
      email,
      password,
      phone,
      createdAt,
    })

    return res.status(201).send(instanceToPlain(newCustomer))
  } catch (err) {
    if (err instanceof AppError) {
      return handleError(err, res)
    }
  }
}
