export interface Address{
            number:string;
            street:string;
            city:string;
           country:string;
}

export interface Person{
    _id:string;
    name:string;
     age: number;
     address:Address;
}