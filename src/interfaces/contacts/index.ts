export interface IContactRequest {
  customerId: string
  fullname: string
  email: string
  phone: string
  isActive: boolean
}

export interface IContact {
  id: string
  fullname: string
  email: string
  createdAt: Date
}

export interface IContactUpdate {
  fullname?: string
  email?: string
  phone?: string
}
