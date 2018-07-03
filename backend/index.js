const fs = require('fs');
const randomstring = require('randomstring');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

let validTokens = [];

let users = JSON.parse(fs.readFileSync("users.json"));
let usersSequence = users.map(x => x.id).pop() || 0;

let recipes = JSON.parse(fs.readFileSync("recipes.json"));
let recipeSequence = recipes.map(x => x.id).pop() || 0;

let ingredients = JSON.parse(fs.readFileSync("ingredients.json"));
let ingredientSequence = ingredients.map(x => x.id).pop() || 0;

app.use(bodyParser.json());
app.use(cors());

let verifyToken = function(req, res) {
    let requestToken = req.query.token;
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

app.get('/', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    res.send('Hello World!')
});

app.post('/auth', (req, res) => {
    let authRequest = req.body;
    let email = authRequest.email;
    let password = authRequest.password;

    let user = users.filter(x => x.email == email).pop();
    if (!user) {
        res.send(JSON.stringify({
            "ok": false,
            "message": "Invalid username or password"
        }));
        return;
    }

    if (user.password != password) {
        res.send(JSON.stringify({
            "ok": false,
            "message": "Invalid username or password"
        }));
        return;
    }

    let token = randomstring.generate();
    validTokens.push({
        "token": token,
        "id": user.id
    });

    res.send(JSON.stringify({
        "ok": true,
        "token": token
    }));
});

app.get('/recipe', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    res.send(JSON.stringify(recipes));
});

app.get('/recipe/:id', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    let recipe = recipes.filter(x => x.id == req.params.id).pop();
    res.send(JSON.stringify(recipe));
});

app.post('/recipe', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    let recipe = req.body;
    recipe.id = recipeSequence++;
    recipes.push(recipe);

    fs.writeFile("recipes.json", JSON.stringify(recipes), function() {
        console.log("recipes.json written");
    });

    res.send(JSON.stringify(recipe));
});

app.get('/ingredient', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    res.send(JSON.stringify(ingredients));
});
app.post('/ingredient', (req, res) => {
    if (!verifyToken(req, res)) {
        return;
    }

    let ingredient = req.body;
    ingredient.id = ingredientSequence++;
    ingredients.push(ingredient);

    fs.writeFile("ingredients.json", JSON.stringify(ingredients), function() {
        console.log("ingredients.json written");
    });

    res.send(JSON.stringify(ingredient));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
