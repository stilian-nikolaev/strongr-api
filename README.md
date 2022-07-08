
<img src="https://user-images.githubusercontent.com/74594156/177553319-ad7ebdc1-936b-4596-ac44-e5f8fdaf2d66.jpg" align="left" alt="strongr-logo" width="100">
<h1>Strongr / api</h1> 

<br/>

[Api link](https://api-strongr.herokuapp.com/)

## Project Description

- Api used by the Strongr frontend application
- Implementing MVC Design Pattern
- Routes are nested following the REST architectural style
- Most routes are guarded with authentication and/or authorization middlewares
- Validation and error handling return a json object with the corresponding error and a descriptive message

## Tech stack
- NodeJs
- Express - simplify api structure
- MongoDB - a non-relational database is suitable to the structure of the data 
- Mongoose - design schemas for models and facilitate queries
- Bcrypt - hash passwords
- JsonWebToken - used for authorization and to determine if a user is the owner of a certain workout 
- Joi - validate incoming mutating data

## Functionality

- /auth - route for logging in, registering or changing password
- /workouts/id/exercises/id/sets/id - nested RESTful api structure for accessing workouts and their exercises and sets
- /user - route for getting user data such as name, activity, avatar, theme color choice or editing or deleting user
- when authenticated a token is returned, containing the user id, and it is used to associate the workouts created by the user and return them when requested
- most routes are guarded with an authorization middleware checking if the user sending the request is the owner of the entity
- an additional helper delete service is provided in order to decouple code and keep the principle of separation of concerns - this service is for deleting children entities when deleting a parent entity(for example when deleting an exercise we call this service in order to delete all the sets that were associated with this exercise) 
