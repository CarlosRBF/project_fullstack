import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { Customer } from "./customer.entity"

@Entity("contacts")
export class Contact {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column({
    length: 150,
  })
  fullname: string

  @Column({
    length: 150,
  })
  email: string

  @Column()
  phone: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne((type) => Customer)
  customer: Customer
  length: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
