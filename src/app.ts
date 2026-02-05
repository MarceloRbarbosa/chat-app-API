import express, {json, Request, Response}  from "express"
import cors from "cors"
import  httpStatus  from "http-status";


const app = express();

app.use(cors());
app.use(json());

app.get("/health", (req: Request, res: Response) => res.status(httpStatus.OK).send(`I'm Okay!`));


export default app;