// API Token for The News API: s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N
// The News API Documentation: https://www.thenewsapi.com/documentation

if (window.localStorage == null) {
  //what specific value do we need?
  //populate
  document.getElementById(formModal).style.form;
  //console log to make sure this is displayed properly as form
  console.log(formModal);
} else {
  //keep it hidden
  document.getElementById(formModal).style.display = "none";
  //how can the user edit this info later?
  //this else statement styles the display as none
  //prevents div formModal from appearing
}

// var requestOptions = {
//   method: "GET",
// };

// var params = {
//   api_token: "s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N",
//   categories: "sports",
//   search: "nhl",
//   limit: "3",
//   locale: "us",
//   language: "en",
// };

// var esc = encodeURIComponent;
// var query = Object.keys(params)
//   .map(function (k) {
//     return esc(k) + "=" + esc(params[k]);
//   })
//   .join("&");

// fetch("https://api.thenewsapi.com/v1/news/all?" + query, requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

//comment this out, we used daily limit. we're not directly working on it.

// ============================================================================================================================================================================================

// NHL Stats API Documentation: https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
// Can pull an INSANE amount of information from this API. Teams, rosters, player stats, schedules, scores, all the way from the beginning of the league to present

fetch("https://statsapi.web.nhl.com/api/v1/teams/17?expand=team.stats", {
  method: "GET",
})
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

// This function is for storing the values inputted in the 'add a team' section of the webpage
const userTeam = function (newTeamSubmit) {
  //setting this const is useful because on the user side, they most likely will not need to. How can they Change if need be?
  // is the 'formModal' element necessary here?
  formModal.addEventListener("onclick", formCity, formTeam);
  console.log("Data Collected!");
  //"onclick" was moved down here. put simply... the click IS the event.
  //This shows that 'on click' a new team is submitted, the event listener stores the data that was submitted.
};
//saving user input data from the onclick event

//edit accordingly
var teamRegistry = function (myTeams) {
  window.localStorage.getItem(userTeam);
  //go into local storage and get this item of userTeam

  //we need to DO something with this info
  //apply it to the myTeams section in  the HTML.
}  

// var textElement = document.getElementById("#contact");
// // this function is for the footer section. To add a contact link to a fake email.
// document.display(textElement);
// //this displays the text.
// document.