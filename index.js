const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Recipe = require('./models/RecipeModel');
require('dotenv').config();

mongoose.connect(process.env.MONGOURI);

// const corsOptions = {
//     origin: "https://my-cheesy-app.nawagest.repl.co",
//     optionsSuccessStatus: 200
// }

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('This is the api for my cheesy app')
});

app.get('/recipes', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        if(err) {
            res.sendStatus(404);
        }
        res.status(200).json(recipes);
    });
});

app.post('/recipes', (req, res) => {
    const data = req.body;
    const recipe = new Recipe(data);

    recipe.save((err) => {
        if(err) {
            res.status(404).json({msg: 'Something went wrong'});
        } else {
            res.redirect('https://my-cheesy-app.nawagest.repl.co/app/index.html');
        }
    });
});

app.get('/recipes/:id', (req, res) => {
    const { id } = req.params
    Recipe.find({ recipeID: id }, (value) => {
        if(value) res.json(value)
        else res.status(404).json({msg: 'Could not find recipe with this id'});
    });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('api running');
});