require("express-async-errors");

const routes = require("./routes");
const AppError = require("./utils/AppErrors");
const express = require("express");
const database = require("./database/sqlite");

const app = express();
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })

    return response.status(500).json({
      status: "error",
      message: "Internal server error"
    })
  }
})

database()

const port = 3333;
app.listen(port, () => console.log(`Server is running in ${port}`));