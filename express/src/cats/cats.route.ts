import {Cat, CatType} from './cats.model';
import * as express from 'express';
import {Router} from 'express';

const router = Router();

// READ 고양이 전체 데이터 다 조회
router.get('/cats', (req: express.Request, res:express.Response)=> {
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
router.get('/cats/:id', (req: express.Request, res:express.Response)=> {
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
router.post('/cats', (req: express.Request, res:express.Response)=> {
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

// UPDATE 고양이 데이터 업데이트
router.put('/cats/:id', (req: express.Request, res:express.Response)=> {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        Cat.forEach((cat: CatType) => {
            if (cat.id === params.id) {
                cat = body;
                result = cat;
            }
        });


        res.status(200).send({
            success: true,
            data: {
                cat: result
            }
        });
    } catch (e){
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
})

// UPDATE 고양이 데이터 부분적 업데이트
router.patch('/cats/:id', (req: express.Request, res: express.Response) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        Cat.forEach((cat: CatType) => {
            if (cat.id === params.id) {
                cat = {...cat, ...body};
                result = cat;
            }
        });


        res.status(200).send({
            success: true,
            data: {
                cat: result
            }
        });
    } catch (e){
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
})

router.delete('/cats/:id', (req: express.Request, res: express.Response) => {
    const params = req.params;

    try {
        const result = Cat.filter((cat) => {
            return cat.id !== params.id
        });

        res.status(200).send({
            success: true,
            data: {
                Cat: result,
            }
        })

    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
});


export default router;