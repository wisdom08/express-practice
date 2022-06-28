import * as express from "express"
const port: number = 8000;
import {Cat, CatType} from "./app.model";

const app: express.Express = express()

app.use((req: express.Request, res: express.Response, next: any) => {
    console.log(req.rawHeaders[1]);
    console.log('this is logging middleware');
    next();
});

app.use(express.json());

// READ 고양이 전체 데이터 다 조회
app.get('/cats', (req: express.Request, res:express.Response)=> {
    try {
        const cats = Cat;
        res.status(200).send({
            success: true,
            data: {
                cats
            }
        })
    } catch (e) {
        console.log('e', e);
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
})


// READ 고양이 특정 데이터 조회
app.get('/cats/:id', (req: express.Request, res:express.Response)=> {
    try {
        const cat = Cat.find((cat: CatType)  => {
            return cat.id === req.params.id;
        })

        res.status(200).send({
            success: true,
            data: {
                cat
            }
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
})

// CREATE 새로운 고양이 추가
app.post('/cats', (req: express.Request, res:express.Response)=> {
    try {
        const cat = req.body;
        Cat.push(cat);
        res.status(200).send({
            success: true,
            data: {
                cat
            }
        });
    } catch (e){
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
})


app.use((req:express.Request, res:express.Response) => {
    console.log('this is error middleware');
    res.send({error: '404 not found error'});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})