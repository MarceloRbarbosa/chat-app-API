import dotenv from "dotenv";
dotenv.config();
import app from "./app";


const port = process.env.PORT || 7000;
app.listen(port, () => 
    console.log(`Server is up and running on ${port}`
    ));