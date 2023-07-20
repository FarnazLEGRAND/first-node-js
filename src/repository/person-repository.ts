// je ramen Person entities- auto complet ba cheragh mi ayad
import { ObjectId } from "mongodb";
import { Person } from "../entities";
import { connection } from "./connection";

// person entre () : vien de mon data base 
// collection dans le mango db c'est le table en mySQL
const collection=connection.db('first').collection<Person>('person')
export const personRepository={
     findAll() {
    return collection.find().toArray();
    },
    //chercher _id :_id id az id 
    findById(_id:string){
        // return collection.findOne({_id})
        return collection.findOne(new ObjectId(_id));     
    },

    // in faghat id person jadid ra mide etelatesh ra neshoun nemide
    // persist(person:Person){
    //     return collection.insertOne(person);
    // }

    async persist(person:Person) {
        const result= await collection.insertOne(person);
        person._id = result.insertedId; //On assigne l'id auto-généré à l'objet person
        return person;
    }
};
