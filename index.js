const searchInput = document.getElementById("searchInput"); 
const searchButton = document.getElementById("drink-button");


fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
.then(response => response.json())
.then(response => console.log(response))
// .then(drinksArray => {
//     drinksArray.forEach(drinkObject => {
//         renderDrink(drinkObject)
//         console.log(renderDrink[0]); 
//     });
// });



// searchButton.addEventListener("click", () => {
//     const searchButton = searchInput.value;
//     getCocktails(searchTerm);
//     console.log("does this work?")
//   });

