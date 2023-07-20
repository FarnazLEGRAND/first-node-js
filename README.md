# Node Express Mongodb
Un projet node.js utilisant express pour la partie contrôleurs et mongodb pour la partie data

## How To Use
1. Cloner le projet
2. Faire un `npm i`
3. Créer un fichier .env avec une variable d'environnement 
DATABASE_URL (exemple    :DATABASE_URL=mongodb://127.0.0.1:27017")
4. Lancer avec `npm start`


_____________
       ## Petit exo contrôleur express :

1. Créer un nouveau fichier first.ts dans le dossier controller, et dedans créer un Router express qu'on export.
	
2. Importer ce contrôleur dans le app.ts et l'assigner à la route /api/first
	
3. Dans le fichier first.ts, créer un tableau avec 3-4 noms en string à l'intérieur
	
4. Et sur le firstController, créer une route en get qui va renvoyer en json le tableau de noms

5. Dans le app.ts, rajouter une ligne app.use(express.json()) (pour permettre à express de convertir automatiquement le body des requêtes en json en objet js)
	
6. Dans le firstController, rajouter une route en post et récupérer dans le body un champ name avec req.body.name qu'on pushera dans le tableau de noms. Tester la requête avec thunderclient en lui mettant en body un {"name":"test"}

_____________________
     ## Person Repository

1. Créer un fichier src/entities.ts et dans ce fichier déclarer une interface Address et une interface Person qui correspondent à ce qu'on a mis dans la base de données mongodb
	
2. Dans le dossier repository, créer un fichier person-repository.ts et dans ce fichier déclarer et exporter une const personRepository qui contiendra un objet pour le moment vide
	
3. Au dessus de cet objet vide, comme dans l'example.ts, faire appel à la connection pour récupérer la db et la collection person et l'assigner à une variable
	
4. Dans le personRepository, rajouter un findAll() {} et dedans faire un return du find().toArray()
	
5. Créer un personController dans son propre fichier, le charger sur la route /api/person dans le app.ts et dans ce contrôleur déclarer une route async en get sur / qui va await le personRepository.findAll() et faire un res.json du resultat

______________________
     ## findById et persist

1. Dans le personRepository, rajouter une méthode findById(_id:string) qui va faire un findOne avec la collection pour rechercher un élément par son _id
	
2. Dans le personController, créer une nouvelle route sur /:id et récupérer la valeur de l'id avec req.params.id et utiliser cette valeur dans le findById
	
3. Faire une petite vérification que la person renvoyé n'est pas null, si elle l'est, on fait un res.status(404).end('Not Found') sinon on fait le res.json classique
	
4. Dans personRepository, on rajoute un persist(person:Person) et on l'utilise dans un insertOne
	
5. On fait une route en post dans le personController et on donne le req.body à manger au persist.

_______________________
     ## Delete et update
	
1. Dans le personRepository, créer une méthode remove(_id:string) qui va faire une suppression sur la collection person en se basant sur l'id/ObjectId
	
2. Dans le personController, rajouter une route de type delete sur /:id, avec le middleware checkId pour s'assurer que l'id est bien un ObjectId valide
	
3. Dans cette route, appeler la méthode remove du repository et faire une réponse 204 sans contenu si ça a marché
	
4. Dans le personRepository, faire une méthode update qui va attendre un _id:string et un person:Person et utiliser la collection pour faire un updateOne({_id:new ObjectId(_id)}, {$set:person})
	
5. Côté contrôleur, rajouter une nouvelle route /:id avec un checkId et appeler le update dedans avec le req.params.id et le req.body et avec la validation

# Pour le delete, modifier le entities.ts et passer le type de _id? à any.
# Et pour faire le deleteOne il faudra lui donner un objet en argument avec {_id:new ObjectId(_id)}