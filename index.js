const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Recipe = require('./models/RecipeModel');

mongoose.connect(process.env.MONGOURI);

const corsOptions = {
    origin: "https://my-cheesy-app.nawagest.repl.co",
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.send('This is the api for my cheesy app')
});

app.get('/recipes', cors(corsOptions), (req, res) => {
  res.json(Recipe.find({}));
});

app.post('/recipes', cors(corsOptions), (req, res) => {
    const data = req.body;
    console.log(data);
    const recipe = new Recipe(data);
    recipe.save((err) => {
        if(err) {
            res.status(404).send('Something went wrong');
        }
    })
});

app.get('/recipes/:id', cors(corsOptions), (req, res) => {
    const { id } = req.params
    Recipe.find({ recipeID: id }, (value) => {
        if(value) res.json(value)
        else res.status(404).json({msg: 'Could not find recipe with this id'});
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('api running')
});