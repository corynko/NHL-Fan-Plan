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

// ============================================================================================================================================================================================

var submitEl = $("#newTeamSubmit");

submitEl.on("click", function (e) {
  e.preventDefault();

  var userCity = $('input[name="formCity"]').val();
  var userTeam = $('input[name="formTeam"]').val();

  window.localStorage.setItem("City", userCity);
  window.localStorage.setItem("Name", userTeam);

  getTeamID();

  // Resets input field
  $('input[name="formCity"]').val("");
  $('input[name="formTeam"]').val("");
});

// NHL Stats API Documentation: https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
// Can pull an INSANE amount of information from this API. Teams, rosters, player stats, schedules, scores, all the way from the beginning of the league to present

function getTeamID() {
  var userCity = window.localStorage.getItem("City");
  var cityID = "";

  fetch("https://statsapi.web.nhl.com/api/v1/teams", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (result) {
      console.log("Data fethced");
      for (var i = 0; i < result.teams.length; i++) {
        if (result.teams[i].venue.city == userCity) {
          console.log("Found your city");
          cityID = result.teams[i].id;
          console.log(cityID);
          window.localStorage.setItem("TeamID", cityID);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

function appendTeamData() {}
