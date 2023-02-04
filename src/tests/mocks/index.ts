import { ICustomerLogin, ICustomerRequest } from "../../interfaces/customers"
import { IContactRequest } from "../../interfaces/contacts"

export const mockedCustomer: ICustomerRequest = {
  fullname: "Carlos Roberto Blanco Filho",
  email: "carlos@email.com",
  password: "1234567",
  phone: "37984071925",
  createdAt: new Date("2022-02-04"),
}

export const mockedCustomerLogin: ICustomerLogin = {
  email: "carlos@email.com",
  password: "1234567",
}

export const mockedContact: IContactRequest = {
  customerId: "",
  fullname: "Alessandra Rosa Silva Blanco",
  email: "alessandra@email.com",
  phone: "37998592149",
  isActive: true,
}

export const mockedContactPhoneExist: IContactRequest = {
  customerId: "",
  fullname: "Anna Karla",
  email: "anna@email.com",
  phone: "37998592149",
  isActive: true,
}

export const mockedContactEmailExist: IContactRequest = {
  customerId: "",
  fullname: "Angela Maria da Silva",
  email: "anna@email.com",
  phone: "37984113142",
  isActive: true,
}
