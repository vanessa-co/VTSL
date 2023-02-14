const searchButtonElement = document.querySelector('#search-button');
const searchInputElement = document.querySelector('#search-bar');
const recipeCardsContainer = document.querySelector('.recipes-container');

// function to handle the search button click
function handleSearchButtonClick() {
  // Get the value of the search bar
  const searchTerm = searchInputElement.value;

  // Use the fetch API to get data from the Cocktail API
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Clear the recipe cards container
      clearRecipeCardsContainer();

      // Loop through the drinks in the data and add a recipe card for each one
      data.drinks.forEach(addRecipeCard);
    });
}

// function to clear the recipe cards container
function clearRecipeCardsContainer() {
  recipeCardsContainer.innerHTML = '';
}

// function to add a recipe card for a drink to the recipe cards container
function addRecipeCard(drink) {
  // Create a new recipe card element
  const recipeCardElement = document.createElement('div');
  recipeCardElement.classList.add('recipe-card');

  // Set the inner HTML of the recipe card to display the drink information
  recipeCardElement.innerHTML = buildRecipeCardHTML(drink);

  // Append the recipe card to the recipe cards container
  recipeCardsContainer.appendChild(recipeCardElement);
}

// function to build the HTML for a recipe card based on a drink object
function buildRecipeCardHTML(drink) {
  return `
    <img src="${drink.strDrinkThumb}" />
    <h2>${drink.strDrink}</h2>
    <div class="recipe-details">
      <p>${drink.strInstructions}</p>
    </div>
  `;
}

// Add a click event listener to the search button
searchButtonElement.addEventListener('click', handleSearchButtonClick);
