Backend
=======

The backend is a simple REST-api based on express.js. 

In order to run the application, you need to download all dependencies. This is done by executing `npm install` in the backend folder. Once dependencies are installed, you can run the application using `node index.js`.

The application uses json files for storage. These files are:

 * ingredients.json
 * recipes.json
 * tokens.json
 * users.json

You can add your own user in `users.json` to get started.

The endpoints in the API are:
 
 * POST /auth - Authentication is done by posting a JSON object with the following structure: `{ "email": "", password: "" }`
 * GET /recipe - Returns all recipes
 * GET /recipe/:id - Returns a specific recipe
 * GET /ingredient - Returns all ingredients

The requests to `/recipe` and `/ingredient` need to authenticated using a token. The token is passed using the `Token` request header.