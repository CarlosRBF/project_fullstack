export interface ICustomerRequest {
  fullname: string
  email: string
  password: string
  phone: string
  createdAt: Date
}

export interface ICustomer {
  id: string
  fullname: string
  email: string
  password: string
  phone: string
  createdAt: Date
}

export interface ICustomerLogin {
  email: string
  password: string
}

export interface ICustomerUpdate {
  fullname?: string
  email?: string
  password?: string
  phone?: string
}
