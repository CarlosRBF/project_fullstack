import * as express from "express"

declare global {
  namespace Express {
    interface Request {
      customerEmail: string
      customer: {
        id: string
      }
    }
  }
}
