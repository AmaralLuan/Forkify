// const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// FOR RECIPES.js ===  const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

import axios from 'axios';

// Global app controller
async function getResults(query) {
    try {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
        
}
getResults('chicken');