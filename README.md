# API ARDUINO
Notre projet consiste à détecter le nombre de personnes entrantes dans une pièce et vérifier si elles se désinfectent les mains.

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


