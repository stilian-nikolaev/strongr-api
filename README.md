
<img src="https://user-images.githubusercontent.com/74594156/177553319-ad7ebdc1-936b-4596-ac44-e5f8fdaf2d66.jpg" align="left" alt="strongr-logo" width="100">
<h1>Strongr / api</h1> 

<br/>

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

## Demo

[Api link](https://api-strongr.herokuapp.com/)




