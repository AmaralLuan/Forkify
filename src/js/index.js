import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global state */
/*
    -Search object
    -Current recipe object
    -shopping list object
    -Liked recipes
*/

const state = {};

const controlSearch = async () => {
    // 1 - Get query from view
    const query = searchView.getInput(); // todo

    if (query) {
        // 2- New search object and add to state
        state.search = new Search(query);

        // 3- Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4- Search for recipes
        await state.search.getResults();

        // 5- render results on the UI
        clearLoader();
        searchView.renderResults(state.search.result);

        } catch (error) {
            alert('Something went wrong');
            clearLoader();
        }
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();

});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * recipe controler
 * 
 */

const controlRecipe = async () => {
    // GET ID
    
    const id = window.location.hash.replace("#", '');
    console.log(id);

    if (id) {
        // prepare UI for changes
            recipeView.clearRecipe();
            renderLoader(elements.recipe);

        // highlight selected search
            if (state) {state.recipe = new Recipe(id)};


        // create new recipe object
            state.recipe = new Recipe(id);

            try {
            // get recipe data and parse ingredients
                await state.recipe.getRecipe();
                state.recipe.parseIngredients();
            // calculate servings and time
                state.recipe.calcTime();
                state.recipe.calcServings();
            // render the recipe    
            clearLoader();
            recipeView.renderRecipe(state.recipe);

            } catch (error) {
                alert('Error processing recipe :(')
        }
    }
}


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// handling recipe button clicks

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

    console.log(state.recipe);
})

