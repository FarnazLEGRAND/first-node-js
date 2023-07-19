import { Router } from "express";
export const firstController = Router();

const names = ['Jean', 'Maria', 'Souria', 'Albert'];
firstController.get('/', (req,res)=> {
    res.json(names);
})


// ajouter le nom avec simple push
firstController.post('/', (req,res)=> {
    names.push(req.body.name);
    res.json(names);
})
