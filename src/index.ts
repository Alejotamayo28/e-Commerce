import express from "express"
import mainRouter from "./routes/index"
import cors from "cors"
import bodyParser from "body-parser";

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mainRouter)
app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});

