// import { AppDataSource } from "./data-source";
// import { User } from "./entity/User";
import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { AppDataSource } from "./data-source";

const PORT = process.env.PORT || 5000;

(async () => {
    const app = express();
    app.get("/", (_req, res) => res.send("Hello"));

    await AppDataSource.initialize();

    const apolloServer = new ApolloServer({
       schema: await buildSchema({
        resolvers: [UserResolver]
       })
    });

    await apolloServer.start();
 
    apolloServer.applyMiddleware({app});

    app.listen(PORT, () => {
        console.log(`Server is listening to localhost:${PORT}`);
    })
})()

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

