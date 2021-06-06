# API ARDUINO
Notre projet consiste à détecter le nombre de personnes entrantes dans une pièce et vérifier si elles se désinfectent les mains.

Pour installer le projet :
- npm install
- node app.js  
- avoir un serveur wamp ou xamp pour pouvoir ouvrir le backoffice (index.php)

Attention, il ne faut pas oublier d'être sur le même réseau wifi pour l'ordinateur et l'arduino donc n'oubliez pas de changer les identifiants wifi dans les fichiers arduino.
De même pour les url vers l'api dans l'arduino avec l'ipv4 de votre machine.

## ROUTE /users (GET) 
    get all users data
    
## ROUTE /users/in (GET)
    get all users currently in the room

## ROUTE /users/stats (GET)
    get all stats

## ROUTE /users/:uid (GET)
    get a specific user data
    *need to pass a uid value
    
## ROUTE /users/new (POST)
    Create user
    
## ROUTE /users/:uid (PUT)
    Update user
    
## ROUTE /users/:uid (DELETE) 
    Delete user   
    
## ROUTE /users/:uid/enter (PUT)
    Update user
    isHere => true
    lastVisit => get current date
    
## ROUTE /users/:uid/wash (PUT)
    Update user
    isClean => true

## ROUTE /users/:uid/exit (PUT)
    Update user
    isHere => false
    isClean => false


