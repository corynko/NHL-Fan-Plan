// newsCall();

function newsCall() {
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
    .then((response) => response.json())
    .then(function (result) {
      console.log(result);
      var newsParent = $("#news");
      for (var i = 0; i < 3; i++) {
        var imageAdd = $("<img>").attr("src", result.data[i].image_url);
        imageAdd.attr("height", 100);
        imageAdd.attr("width", 100);
        newsParent.append(imageAdd);

        var headlineAdd = $("<h4>").addClass("link" + i);
        var anchorAdd = $("<a>").attr("href", result.data[i].url);
        anchorAdd.text(result.data[i].title);
        headlineAdd.append(anchorAdd);
        headlineAdd.addClass("newsArticle");
        // console.log(headlineAdd);
        newsParent.append(headlineAdd);

        var snippetAdd = $("<p>").addClass("py-4");
        snippetAdd.text(result.data[i].snippet);
        newsParent.append(snippetAdd);
      }
    })
    .catch((error) => console.log("error", error));
}

// ============================================================================================================================================================================================
// API Token for The News API: s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N
// The News API Documentation: https://www.thenewsapi.com/documentation

//global variables
var myTeams = [];
var checkData = window.localStorage.getItem("My-Teams");
// console.log(checkData);

if (checkData == null) {
  console.log("New User");
} else {
  myTeams = JSON.parse(window.localStorage.getItem("My-Teams"));
  handlePageLoad();
}

function handlePageLoad() {
  var savedTeams = JSON.parse(window.localStorage.getItem("My-Teams"));

  for (var i = 0; i < savedTeams.length; i++) {
    var getTeams = window.localStorage.getItem("My-Teams");
    var gotTeams = JSON.parse(getTeams);
    $("#dashboard").empty();
    // console.log(gotTeams);
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
        // console.log(result);
        var trEl = $("<tr>").attr("id", savedTeams[i]);
        var thRow = $("<th>").attr("scope", "row");
        var tdCity = $("<td>").attr("id", "city" + i);
        var tdRecord = $("<td>").attr("id", "record" + i);
        var tdGPG = $("<td>").attr("id", "GPG" + i);
        var tdSPG = $("<td>").attr("id", "SPG" + i);
        var removeRow = $("<td>").attr("id", "remove" + i);
        var removeEl = $("<button>").attr("id", result.teams[0].id);
        removeEl.addClass("removeBtn");
        // console.log(result.teams[0].name);
        thRow.text(result.teams[0].name);
        $("#dashboard").append(trEl);
        trEl.append(thRow);
        tdCity.text(result.teams[0].venue.city);
        tdRecord.text(
          result.teams[0].teamStats[0].splits[0].stat.wins +
            "-" +
            result.teams[0].teamStats[0].splits[0].stat.losses
        );
        tdGPG.text(result.teams[0].teamStats[0].splits[0].stat.goalsPerGame);
        tdSPG.text(result.teams[0].teamStats[0].splits[0].stat.shotsPerGame);

        removeEl.text("X");

        trEl.append(tdCity);
        trEl.append(tdRecord);
        trEl.append(tdGPG);
        trEl.append(tdSPG);
        removeRow.append(removeEl);
        trEl.append(removeEl);
      });
  }
}

// allTeamsEl.on("click", function () {
// for (var i = 0; i < )

//   window.localStorage.setItem("City", userCity);
//   // window.localStorage.setItem("Name", userTeam);

//   getTeamID();

//   // Resets input field
//   $('input[name="formCity"]').val("");
//   // $('input[name="formTeam"]').val("");
// });

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
      // console.log(result);
      for (var i = 0; i < result.teams.length; i++) {
        if (result.teams[i].venue.city == userCity) {
          // console.log("Found your city");
          cityID = result.teams[i].id;
          // console.log(cityID);
          window.localStorage.setItem("TeamID", cityID);
          renderMyTeams();
        }
      }
    })
    .catch((error) => console.log("error", error));
}

// function appendTeamData() {}

//adds team information to main chart
function renderMyTeams() {
  var teamID = window.localStorage.getItem("TeamID");

  myTeams.push(teamID);
  window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));

  for (var i = 0; i < myTeams.length; i++) {
    var getTeams = window.localStorage.getItem("My-Teams");
    var gotTeams = JSON.parse(getTeams);
    $("#dashboard").empty();
    // console.log(gotTeams);
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
        // console.log(result);
        var trEl = $("<tr>").attr("id", teamID);

        var thRow = $("<th>").attr("scope", "row");
        var tdCity = $("<td>").attr("id", "city" + i);
        var tdRecord = $("<td>").attr("id", "record" + i);
        var tdGPG = $("<td>").attr("id", "GPG" + i);
        var tdSPG = $("<td>").attr("id", "SPG" + i);
        var removeRow = $("<td>").attr("id", "remove" + i);
        var removeEl = $("<button>").attr("id", result.teams[0].id);
        removeEl.addClass("removeBtn");

        // console.log(result.teams[0].name);
        thRow.text(result.teams[0].name);
        $("#dashboard").append(trEl);
        trEl.append(thRow);
        tdCity.text(result.teams[0].venue.city);
        tdRecord.text(
          result.teams[0].teamStats[0].splits[0].stat.wins +
            "-" +
            result.teams[0].teamStats[0].splits[0].stat.losses
        );
        tdGPG.text(result.teams[0].teamStats[0].splits[0].stat.goalsPerGame);
        tdSPG.text(result.teams[0].teamStats[0].splits[0].stat.shotsPerGame);

        removeEl.text("X");

        trEl.append(tdCity);
        trEl.append(tdRecord);
        trEl.append(tdGPG);
        trEl.append(tdSPG);
        removeRow.append(removeEl);
        trEl.append(removeEl);
      });
  }
}

//event listener on submit button
var submitEl = $("#newTeamSubmit");

submitEl.on("click", function (e) {
  e.preventDefault();

  var userCity = $('input[name="formCity"]').val();
  // var userTeam = $('input[name="formTeam"]').val();

  window.localStorage.setItem("City", userCity);
  // window.localStorage.setItem("Name", userTeam);

  getTeamID();

  // Resets input field
  $('input[name="formCity"]').val("");
  // $('input[name="formTeam"]').val("");
});

function getAllTeams() {
  myTeams = [];
  fetch("https://statsapi.web.nhl.com/api/v1/teams", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result);
      for (var i = 0; i < result.teams.length; i++) {
        // console.log("Found your city");
        cityID = result.teams[i].id;
        myTeams.push(cityID);
        // console.log(cityID);
      }
      window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
      renderMyTeams();
    })
    .catch((error) => console.log("error", error));
}

function getEastTeams() {
  myTeams = [];
  fetch("https://statsapi.web.nhl.com/api/v1/teams", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result);
      for (var i = 0; i < result.teams.length; i++) {
        var conCheck = result.teams[i].conference.name;
        if (conCheck == "Eastern") {
          cityID = result.teams[i].id;
          myTeams.push(cityID);
        }
        // console.log(cityID);
      }
      window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
      renderMyTeams();
    })
    .catch((error) => console.log("error", error));
}

function getWestTeams() {
  myTeams = [];
  fetch("https://statsapi.web.nhl.com/api/v1/teams", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result);
      for (var i = 0; i < result.teams.length; i++) {
        var conCheck = result.teams[i].conference.name;
        if (conCheck == "Western") {
          cityID = result.teams[i].id;
          myTeams.push(cityID);
        }
        // console.log(cityID);
      }
      window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
      renderMyTeams();
    })
    .catch((error) => console.log("error", error));
}

function get10Teams() {
  myTeams = [];
  var i = 0;
  do {
    var randoNum = Math.floor(Math.random() * 31);
    if (!myTeams.includes(randoNum)) {
      myTeams.push(randoNum);

      console.log(myTeams);
      i++;
    }
  } while (i < 10);
  window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
  renderMyTeams();
}

//remove button functionality
$("#dashboard").on("click", ".removeBtn", function (e) {
  var clickedParent = $(e.currentTarget).parent();
  var clickedID = e.currentTarget.id;
  var compare = JSON.parse(window.localStorage.getItem("My-Teams"));

  for (var i = 0; i < compare.length; i++) {
    if (compare[i] == clickedID) {
      compare.splice(i, 1);
      // console.log(compare);
      myTeams = compare;
      window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
    }
  }
  console.log(typeof clickedID);
  //   console.log(clickedID);
  // console.log(e.currentTarget.id);
  clickedParent.empty();
});

var allTeamsEl = $("#allTeams");
var random10El = $("#random10");
var easternEl = $("#eastern");
var westernEl = $("#western");
var deleteEl = $("#deleteAll");

allTeamsEl.on("click", getAllTeams);
random10El.on("click", get10Teams);
easternEl.on("click", getEastTeams);
westernEl.on("click", getWestTeams);

deleteEl.on("click", function () {
  myTeams = [];
  window.localStorage.setItem("My-Teams", myTeams);
  renderMyTeams();
});
