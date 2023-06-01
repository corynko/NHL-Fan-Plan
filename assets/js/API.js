// API Token for The News API: s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N
// The News API Documentation: https://www.thenewsapi.com/documentation

var requestOptions = {
  method: "GET",
};

var params = {
  api_token: "s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N",
  categories: "sports",
  search: "nhl",
  limit: "3",
  locale: "us",
  language: "en",
};

var esc = encodeURIComponent;
var query = Object.keys(params)
  .map(function (k) {
    return esc(k) + "=" + esc(params[k]);
  })
  .join("&");

fetch("https://api.thenewsapi.com/v1/news/all?" + query, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

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
