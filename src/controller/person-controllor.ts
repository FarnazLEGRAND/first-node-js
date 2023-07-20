import { Router } from "express";
import Joi from "joi";
import { ObjectId } from "mongodb";
import { checkId } from "../middleware";
import { personRepository } from "../repository/person-repository";

const personValidation = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().positive().required(),
    address: Joi.object({
        number: Joi.string().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});


export const personController = Router();

personController.get('/', async (req, res) => {
    const person = await personRepository.findAll();
    res.json(person);
})

// inja yek moshkel ast ke agar Id bedam khe khoutah bashe ya eshtebah hame server ghati mikone pas code ra tagir midaham
// personController.get('/:id', async (req, res) => {
  
//     const person = await personRepository.findById(req.params.id);
//     if (!person) {
//         res.status(404).end('Not Found');
//         // pour sortir de la boucle a la place de else j'ai ecrie return
//         return;
//     }
//     res.json(person);
// });


// personController.get('/:id', async (req, res) => {
    // juste pour controler si id :string dorost ast agar nist kharej beshe va bege id masala andazeh dorost nist
//     if(!ObjectId.isValid(req.params.id)){
//         res.status (400).end('Invalid id');
//         return;
//     }
//     const person = await personRepository.findById(req.params.id);
//     if (!person) {
//         res.status(404).end('Not Found');
//         // pour sortir de la boucle a la place de else j'ai ecrie return
//         return;
//     }
//     res.json(person);
// });


personController.get('/:id', checkId, async (req,res) => {
    
    const person = await personRepository.findById(req.params.id);
    if(!person) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(person);
});



personController.post('/', async (req,res) => {
    const person = await personRepository.persist(req.body);
    res.status(201).json(person);
});