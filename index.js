/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */
// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
//create a function that adds all data from the  games array to the page
function addGamesToPage(games) {
  //reseting the game container

  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    const gamesel = document.createElement("div");
    // add the class game-card to the list
    gamesel.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    gamesel.innerHTML = `<img src=${games[i].img} /><h1>${games[i].name}</h1><p>${games[i].description}</p><p>${games[i].backers}</p>`;
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    // append the game to the games-container

    document.querySelector("#games-container").appendChild(gamesel);
  }
}
// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
const total_contributionsCard = GAMES_JSON.reduce((acc, game) => {
  return game.backers + acc;
}, 0);
// set the inner HTML using a templcolate literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = total_contributionsCard.toLocaleString("en-US");

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_raisedamount = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

//console.log(total_raisedamount)
// set inner HTML using template literal
console.log(raisedCard);
raisedCard.innerHTML = `$${total_raisedamount.toLocaleString("en-US")}`;
// .innerHTML =
console.log(raisedCard);
let number = total_raisedamount;

console.log(number);
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.textContent = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */
//add game to page

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  // use filter() to get a list of games that have not yet met their goal
  const unfunded = GAMES_JSON.filter((game) => {
    if (game.goal > game.pledged) {
      return game;
    }
  });
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfunded);
}
// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  // use filter() to get a list of games that have met or exceeded their goal
  const funded = GAMES_JSON.filter((game) => {
    if (game.goal <= game.pledged) {
      return game;
    }
  });
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(funded);
  // use the function we previously created to add unfunded games to the DOM
}
// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
  // add all games from the JSON data to the DOM
}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.onclick = () => {
  console.log("showing unfunded");
  filterUnfundedOnly();
};
fundedBtn.onclick = () => {
  filterFundedOnly();
};
allBtn.onclick = () => {
  showAllGames();
};
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container

const descriptionFunction = () => {
  const descriptionContainer = document.getElementById("description-container");

  // use filter or reduce to count the number of unfunded games
  const unfundedGames = GAMES_JSON.filter((game) => {
    if (game.goal > game.pledged) {
      return game;
    }
  });

  // create a string that explains the number of unfunded games using the ternary operator
  const templateTag = document.createElement("p");
  templateTag.innerHTML = `A total of $${total_raisedamount.toLocaleString(
    "en-US"
  )} has been raised for ${gamesCard.textContent} games. Currently, ${
    unfundedGames.length
  } games remain unfunded. We need your help to fund these amazing games!`;
  // create a new DOM element containing the template string and append it to the description container
  descriptionContainer.appendChild(templateTag);
};

descriptionFunction();

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});
// use destructuring and the spread operator to grab the first and second games
const [game1, game2] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
let { name: top } = game1;
const topGame = document.createElement("h2");
topGame.textContent = top;

firstGameContainer.appendChild(topGame);
// do the same for the runner up item
let { name: runner } = game2;
const runnerGame = document.createElement("h2");
runnerGame.textContent = runner;
secondGameContainer.appendChild(runnerGame);
