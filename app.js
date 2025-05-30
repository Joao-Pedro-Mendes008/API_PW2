
const express = require('express');
const app = express();


const sequelize = require('./Config/config');

const testSearchUser = require("./Routes/searchUserRoute");

const tasks = require("./Routes/taskRoute");

const auth = require("./Routes/authRoute");

app.use(express.json());
app.use("/api", testSearchUser)
app.use("/api", auth)
app.use("/api", tasks)



sequelize.sync().then(
    () => {console.log("Banco conectado com Sucesso");}
).catch(
    (error) => {console.error("Conexão não estabelecida", error)}
);


module.exports = app; 