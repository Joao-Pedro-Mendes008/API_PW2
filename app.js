
const express = require('express');
const app = express();


const testUser = require('./Routes/userRoute');

const sequelize = require('./Config/config');

const testSearchUser = require("./Routes/searchUserRoute")

const auth = require("./Routes/authRoute");

app.use(express.json());
app.use("/api", testUser);
app.use("/api", testSearchUser)
app.use("/api", auth)



sequelize.sync().then(
    () => {console.log("Banco conectado com Sucesso");}
).catch(
    (error) => {console.error("Conexão não estabelecida", error)}
);


module.exports = app; 