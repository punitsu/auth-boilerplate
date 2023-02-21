import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    firstName: string

    @Column("text")
    lastName: string

    @Column("text")
    email: string

    @Column("text")
    password: string;

}
