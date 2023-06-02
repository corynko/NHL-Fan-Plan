// API Token for The News API: s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N
// The News API Documentation: https://www.thenewsapi.com/documentation

//global variables
var myTeams = [];

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
      console.log(result);
      for (var i = 0; i < result.teams.length; i++) {
        if (result.teams[i].venue.city == userCity) {
          console.log("Found your city");
          cityID = result.teams[i].id;
          console.log(cityID);
          window.localStorage.setItem("TeamID", cityID);
          renderMyTeams();
        }
      }
    })
    .catch((error) => console.log("error", error));
}

// function appendTeamData() {}

function renderMyTeams() {
  var teamID = window.localStorage.getItem("TeamID");

  myTeams.push(teamID);
  window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));

  for (var i = 0; i < myTeams.length; i++) {
    var getTeams = window.localStorage.getItem("My-Teams");
    var gotTeams = JSON.parse(getTeams);
    console.log(gotTeams);
    fetch(
      "https://statsapi.web.nhl.com/api/v1/teams/" +
        gotTeams[i] +
        "?expand=team.stats",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(function (result) {
        console.log(result);

        var listName = $("#name");
        var listName2 = $("#name2");
        console.log(listName2);
        var listCity = $("#city");
        var listCity2 = $("#city2");
        var listRecord = $("#record");
        var listRecord2 = $("#record2");
        var listGoals = $("#GPG");
        var listShots = $("#SPG");

        listName.text(result.teams[0].name);
        listName2.text(result.teams[0].name);

        listCity.text(result.teams[0].venue.city);
        listCity2.text(result.teams[0].venue.city);

        listRecord.text(
          result.teams[0].teamStats[0].splits[0].stat.wins +
            "-" +
            result.teams[0].teamStats[0].splits[0].stat.losses
        );
        listRecord2.text(
          result.teams[0].teamStats[0].splits[0].stat.wins +
            "-" +
            result.teams[0].teamStats[0].splits[0].stat.losses
        );

        listGoals.text(
          result.teams[0].teamStats[0].splits[0].stat.goalsPerGame
        );

        listShots.text(
          result.teams[0].teamStats[0].splits[0].stat.shotsPerGame
        );
      });
  }
}
