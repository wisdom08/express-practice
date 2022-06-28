import {Cat, CatType} from './cats.model';
import {Request, Response} from "express";

export const readAllCat = ((req: Request, res:Response)=> {
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

export const readCat = ((req: Request, res:Response)=> {
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

export const createCat = ((req: Request, res:Response)=> {
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

export const updateCat = ((req: Request, res:Response)=> {
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

export const updatePartialCat = ((req: Request, res: Response) => {
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

export const deleteCat = ((req: Request, res: Response) => {
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
