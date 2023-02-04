import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinTable,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { Exclude } from "class-transformer"
import { Contact } from "./contact"

@Entity("customers")
export class Customer {
  find(arg0: () => void) {
    throw new Error("Method not implemented.")
  }
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
  @Exclude()
  password: string

  @Column()
  phone: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @OneToMany((type) => Contact, (contact) => contact.customer, {
    eager: true,
  })
  @JoinTable()
  contacts: Contact[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
