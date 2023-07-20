import { Router } from "express";
import Joi from "joi";
import { ObjectId } from "mongodb";
import { checkId } from "../middleware";
import { personRepository } from "../repository/person-repository";



// find All
export const personController = Router();

personController.get('/', async (req,res) => {
    const persons = await personRepository.findAll();
    res.json(persons);
});

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

// findById
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

personController.get('/:id', checkId, async (req,res) => {
    
    const person = await personRepository.findById(req.params.id);
    if(!person) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(person);
});


// persist
// personController.post('/', async (req,res) => {
//     const person = await personRepository.persist(req.body);
//     res.status(201).json(person);
// });

personController.post('/', async (req,res) => {
    const validation = personValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const person = await personRepository.persist(req.body);
    res.status(201).json(person);
});

// delet
personController.delete('/:id', checkId, async (req,res)=> {
    await personRepository.remove(req.params.id);
    res.status(204).end();
});

// update c'est mieux faire un PUT que Patch si on a pas Joi pour controler
const personPatchValidation = Joi.object({
    name: Joi.string(),
    age: Joi.number().positive(),
    address: Joi.object({
        number: Joi.string(),
        street: Joi.string(),
        city: Joi.string(),
        country: Joi.string()
    })
});
personController.patch('/:id', checkId, async (req,res)=> {
    const validation = personPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await personRepository.update(req.params.id, req.body);
    res.json(req.body);
});