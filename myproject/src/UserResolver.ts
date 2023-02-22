import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./entity/User";
import { hash } from "bcryptjs";

@Resolver()
export class UserResolver{
    @Query(()=> [User])
    users(){
        return User.find();
    }
 
    @Mutation(() => Boolean)
    async register(
        @Arg('username') username: string,
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg ('password') password: string,
    ){
        const hashedPassword = await hash(password, 12);
        try{

        await User.insert({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword 
        });
        return true;

    } catch(error) {
        console.log(error);
        return false;
         }
    }
}
