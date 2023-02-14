const searchButtonElement = document.querySelector('#search-button');
const searchInputElement = document.querySelector('#search-bar');
const recipeCardsContainer = document.querySelector('.recipes-container');

//Disable the search button on initial page load
searchButtonElement.disabled = true;

//Enable the search button when a user types in the search field
searchInputElement.addEventListener('keyup', (event) => {
    searchButtonElement.disabled = false;
});

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
      //only execute the forEach loop if the data object is not empty, else show "No results found" message
      if(data.drinks != null) {
        data.drinks.forEach(addRecipeCard);
      } else {
        recipeCardsContainer.innerHTML = '<h2 style="color: pink;">No resuts, loser!</h2><iframe src="https://giphy.com/embed/lBm6rHWoBEpaw" width="480" height="313" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/lBm6rHWoBEpaw">via GIPHY</a></p>';
      }
  });
}

// function to clear the recipe cards container
function clearRecipeCardsContainer() {
  recipeCardsContainer.innerHTML = '';
}

//function to handle a user mousing over a recipe card
function handleRecipeCardMouseOver(event) {

}

// function to add a recipe card for a drink to the recipe cards container
function addRecipeCard(drink) {
  // Create a new recipe card element
  const recipeCardElement = document.createElement('div');
  recipeCardElement.classList.add('recipe-card');

  // Set the inner HTML of the recipe card to display the drink information
  recipeCardElement.innerHTML = buildRecipeCardHTML(drink);

  recipeCardElement.addEventListener("mouseout", function (event) {
    recipeCardElement.innerHTML = buildRecipeCardHTML(drink);
  })
  
  recipeCardElement.addEventListener("mouseover", function (event) {
    recipeCardElement.style.backgroundColor = 'lightgray';
    let target = event.target;
    let parent = target.parentElement;
    let ingredientArray = [];
    
    recipeCardElement.innerHTML =  `<h2 align="center">Glass:</h2>`
    recipeCardElement.innerHTML += `<p align="center">${drink.strGlass}</p>`
    recipeCardElement.innerHTML +=  `<h2 align="center">Ingredients:</h2>`
    const loopTimes = 16;
    for (let i = 1; i < loopTimes; i++) {
      let ingredient = "strIngredient" + i;
      let measurement = "strMeasure" + i;
      if (drink[ingredient] != null) {
        if(drink[measurement] != null) {
        //ingredientArray.push(ingredient.strIngredient[i]);
        recipeCardElement.innerHTML += `<p align="center">${drink[measurement]} ${drink[ingredient]}</p>`
        } else {
          recipeCardElement.innerHTML += `<p align="center">${drink[ingredient]}</p>`
        }
    }
  }});
  
  // Append the recipe card to the recipe cards container
  recipeCardsContainer.appendChild(recipeCardElement);
}

// function to build the HTML for a recipe card based on a drink object
function buildRecipeCardHTML(drink) {
  return `
    <img src="${drink.strDrinkThumb}" />
    <h2 align="center">${drink.strDrink}</h2>
  `;
}

// Add a click event listener to the search button
searchButtonElement.addEventListener('click', handleSearchButtonClick);

// Execute a function when the user presses a key on the keyboard
searchInputElement.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchButtonElement.click();
  }
});

//Set focus to the search input element
searchInputElement.focus();
