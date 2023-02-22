import { Field, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, BeforeInsert, Unique } from "typeorm"

@ObjectType()
@Entity("users")
@Unique(["username", "email"])

export class User extends BaseEntity {
    @Field(() => String)
    @PrimaryColumn() 
    username: string 

    @Field()
    @Column("text")
    firstName: string

    @Field()
    @Column("text")
    lastName: string

    @Field()
    @Column("text")
    email: string

    @Column("text")
    password: string;

    @BeforeInsert()
    validateUsername() {
        if (!this.username && !this.firstName && !this.lastName && !this.email && !this.password) {
            throw new Error("Some field is missing");
        }
    }

}

@Entity("topics")
export class Topics extends BaseEntity {

    @PrimaryGeneratedColumn()
    topic_id: number

    @Column("text")
    topic: string;

}