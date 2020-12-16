import { Router, Request, Response  } from "express";

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: "Todo esta bien !!"
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const test = req.body.test;
    const test2 = req.body.test2;
    res.json({
        ok: true,
        test,
        test2
    });
});

router.get('/mensajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        id
    });
});

export default router;