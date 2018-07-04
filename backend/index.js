const fs = require('fs');
const randomstring = require('randomstring');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Load all tokens from disk
let validTokens = JSON.parse(fs.readFileSync("tokens.json"));

// Load all users from disk
let users = JSON.parse(fs.readFileSync("users.json"));
let usersSequence = users.map(x => x.id).pop() || 0;

// Load all recipes from disk
let recipes = JSON.parse(fs.readFileSync("recipes.json"));
let recipeSequence = recipes.map(x => x.id).pop() || 0;

// Load all ingredients from disk
let ingredients = JSON.parse(fs.readFileSync("ingredients.json"));
let ingredientSequence = ingredients.map(x => x.id).pop() || 0;

// Parse request bodies as json using the body-parser middleware
app.use(bodyParser.json());
// Allow requests from any host by setting the Allow-Access-Control-Origin header
app.use(cors());

// Helper function for verifying the Token header
let verifyToken = function(req, res) {
    let requestToken = req.get("Token");
    let foundTokens = validTokens.filter(x => x.token == requestToken);
    if (foundTokens.length == 0) {
        res.status(403).send(JSON.stringify({
            "ok": false,
            "message": "Invalid token"
        }));
        return false;
    }

    return true;
};

// Friendly greeting
app.get('/', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    res.send('Hello World!')
});

// Handle authentication
app.post('/auth', (req, res) => {

    // The request body is a json object with an email and a password
    let authRequest = req.body;
    let email = authRequest.email;
    let password = authRequest.password;

    // Look up a user with a matching e-mail
    let user = users.filter(x => x.email == email).pop();
    if (!user) {
        res.send(JSON.stringify({
            "ok": false,
            "message": "Invalid username or password"
        }));
        return;
    }

    // Check the password
    // TODO: implement hashing using bcrypt2 or something similiar
    if (user.password != password) {
        res.send(JSON.stringify({
            "ok": false,
            "message": "Invalid username or password"
        }));
        return;
    }

    // Generate a random token (32 chars by default)
    let token = randomstring.generate();
    validTokens.push({
        "token": token,
        "id": user.id
    });

    // Write the updated token list to disk
    fs.writeFile("tokens.json", JSON.stringify(validTokens), function() {
        console.log("tokens.json written");
    });

    // Send a response indicating successful authentication. We construct a new user object
    // that does not include the password.
    res.send(JSON.stringify({
        "ok": true,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        },
        "token": token
    }));
});

// Return all recipes
app.get('/recipe', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    // TODO: optimize do not return ingredients for this method
    res.send(JSON.stringify(recipes));
});

// Return a specific recipe
app.get('/recipe/:id', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    let recipe = recipes.filter(x => x.id == req.params.id).pop();
    res.send(JSON.stringify(recipe));
});

// Create a new recipe
app.post('/recipe', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    // TODO: validate structure of submitted object

    let recipe = req.body;
    recipe.id = ++recipeSequence;
    recipes.push(recipe);

    fs.writeFile("recipes.json", JSON.stringify(recipes), function() {
        console.log("recipes.json written");
    });

    res.send(JSON.stringify(recipe));
});

// List all ingredients
app.get('/ingredient', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    res.send(JSON.stringify(ingredients));
});

// Create a new ingredient
app.post('/ingredient', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    // TODO: validate request object structure

    let ingredient = req.body;
    ingredient.id = ++ingredientSequence;
    ingredients.push(ingredient);

    fs.writeFile("ingredients.json", JSON.stringify(ingredients), function() {
        console.log("ingredients.json written");
    });

    res.send(JSON.stringify(ingredient));
});

// Start listening
const port = 3000;
app.listen(port, () => console.log(`Backend listening on port ${port}!`));
