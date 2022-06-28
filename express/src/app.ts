import * as express from "express"
import catsRouter from "./cats/cats.route";

const port: number = 8000;
const app: express.Express = express()

app.use((req: express.Request, res: express.Response, next: any) => {
    console.log(req.rawHeaders[1]);
    console.log('this is logging middleware');
    next();
});

app.use(express.json());
app.use(catsRouter);


app.use((req:express.Request, res:express.Response) => {
    console.log('this is error middleware');
    res.send({error: '404 not found error'});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})