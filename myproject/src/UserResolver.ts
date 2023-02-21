import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./entity/User";
import { hash } from "bcryptjs";

@Resolver()
export class UserResolver{
    @Query(()=> String)
    hello(){
        return 'hi!';
    }
 
    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg ('passowrd') password: string,
    ){
        const hashedPassword = await hash(password, 12);
        try{

        await User.insert({
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
