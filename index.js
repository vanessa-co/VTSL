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
        recipeCardsContainer.innerHTML = '<h2 style="color: pink;">No results, loser!</h2><iframe src="https://giphy.com/embed/lBm6rHWoBEpaw" width="480" height="313" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/lBm6rHWoBEpaw">via GIPHY</a></p>';
      }
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

  //Get all of the divs with class "thumbnail", and add an event listener to each one
  thumbnailDiv = document.getElementById(`thumb-${drink.strDrink}`);
  thumbnailDiv.addEventListener('mouseenter', function (event) {
    thumbnailDiv.style.backgroundColor = 'lightgray';
    //console.log(drink);
    thumbnailDiv.innerHTML = `<h2 align="center">Glass:</h2>`
    thumbnailDiv.innerHTML += `<p align="center">${drink.strGlass}</p>`
    thumbnailDiv.innerHTML += `<h2 align="center">Ingredients:</h2>`
    
    const loopTimes = 16;
    for (let count = 1; count < loopTimes; count++) {
      let ingredient = "strIngredient" + count;
      let measurement = "strMeasure" + count;
      if (drink[ingredient] != null) {
        if(drink[measurement] != null) {
          thumbnailDiv.innerHTML += `<p align="center">${drink[measurement]} ${drink[ingredient]}</p>`
        } else {
          thumbnailDiv.innerHTML += `<p align="center">${drink[ingredient]}</p>`
        }
    }
  }
    });
    thumbnailDiv.addEventListener("mouseleave", function (event) {
      thumbnailDiv.innerHTML = `<img src="${drink.strDrinkThumb}" />`;
    })
    // code for buttons to work individually <- Tim
    let button = document.getElementById(`${drink.strDrink}`);
    button.addEventListener("click", function () {
        if (button.innerHTML === "Like Me!") {
          button.innerHTML = "You liked this!";
        } else {
          button.innerHTML = "Like Me!";
        }
      });
}

// function to build the HTML for a recipe card based on a drink object
function buildRecipeCardHTML(drink) {
  
  return `
    <div class="thumbnail" id="thumb-${drink.strDrink}"><img src="${drink.strDrinkThumb}" /></div>
    <div><h2 align="center">${drink.strDrink}</h2></div>
    <button type="button" class="like-button" id="${drink.strDrink}">Like Me!</button>`
  ;
  
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
