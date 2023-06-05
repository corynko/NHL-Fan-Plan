newsCall();

function newsCall() {
  var requestOptions = {
    method: "GET",
  };

  var params = {
    //these parameters allow the app to search the news API and find relevant news. It narrows it down to NHL and retrieves the 3 most recent articles in English.
    api_token: "s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N",
    // categories: "sports",
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
    //fetching here allows us to retrieve the news data, so that we can then display it.
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result);
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
        //We append to add these elements to the HTML structure. This allows the user to view the data after it has been parsed and retrieved
      }
    })
    .catch((error) => console.log("error", error));
}

// ============================================================================================================================================================================================
// API Token for The News API: s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N
// The News API Documentation: https://www.thenewsapi.com/documentation

//global variables
var myTeams = [];
var newCheck = [];
var checkData = window.localStorage.getItem("newCheck");
var correctionEl = $("#correction");
var modalJObj = $("#staticBackdrop");

correctionEl.hide();
// console.log(checkData);

if (checkData == null) {
  console.log("New User");
  //When the page loads, if localStorage is found to be null, the string "New User is console logged."
} else {
  //if localStorage is populated with relevant content, we parse through the JSON string and get the items that have the key "My-Teams".
  myTeams = JSON.parse(window.localStorage.getItem("My-Teams"));
  handlePageLoad();
}

function handlePageLoad() {
  //on pageload, we search localStorage for any userdata contain the key "My-Teams" and retrive it.
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


// NHL Stats API Documentation: https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
// Can pull an INSANE amount of information from this API. Teams, rosters, player stats, schedules, scores, all the way from the beginning of the league to present

function getTeamID() {
  var userCity = window.localStorage.getItem("City");
  var cityID = "";
  var notFound = false;

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
          notFound = false;
          //hide modal
          modalJObj.modal("hide");
          break;
        } else {
          notFound = true;
        }
      }
      if (notFound) {
        correctionEl.show();
      } else {
        // console.log("Eep!");
        correctionEl.hide();
      }
    })
    .catch((error) => console.log("error", error));
}

// function appendTeamData() {}

//adds team information to main chart
function renderMyTeams() {
  var teamID = window.localStorage.getItem("TeamID");

  newCheck.push(1);
  window.localStorage.setItem("newCheck", newCheck);

  myTeams.push(teamID);
  window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));

  checkNull();
  
  //for the duration of the variable myTeam's length, we iterate parsing the data from local storage

  for (var i = 0; i < myTeams.length; i++) {
    var getTeams = window.localStorage.getItem("My-Teams");
    var gotTeams = JSON.parse(getTeams);
    if (gotTeams[i] == null) {
      $("#dashboard").empty();
      break;
    } else {
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
}

function getAllTeams() {
  myTeams = [];
  fetch("https://statsapi.web.nhl.com/api/v1/teams", {
    method: "GET",
    //using the get method here allows us to get information from all teams from the API without getting the extra information.
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
      //Here, we make a change to the localStorage by stringifying the new data into the JSON string.
      renderMyTeams();
    })
    .catch((error) => console.log("error", error));
}

function getEastTeams() {
  myTeams = [];
  fetch("https://statsapi.web.nhl.com/api/v1/teams", {
    method: "GET",
    //using the GET method here allows us to specifically grab the East teams from the API.
  })
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result);
      for (var i = 0; i < result.teams.length; i++) {
        var conCheck = result.teams[i].conference.name;
        if (conCheck == "Eastern") {
          //The conference is represented by the above variable. if The team is identified as an "Eastern" team, then that data is set in local storage."
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
    //Same with the East teams, this GET method allows us to
  })
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result);
      for (var i = 0; i < result.teams.length; i++) {
        var conCheck = result.teams[i].conference.name;
        if (conCheck == "Western") {
          //The conference is represented by the above variable. if The team is identified as an "Western" team, then that data is set in local storage."
          cityID = result.teams[i].id;
          myTeams.push(cityID);
        }
        // console.log(cityID);
      }
      window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
      renderMyTeams();
    })
    .catch((error) => console.log("error", error));
  //if there is an error, the console log displays a string with the value of "error"
}

//This is how the functionality of the button works. When the Get 10 teams button is pressed. The ID's of 10 teams are given back to the user in the console log.
function get10Teams() {
  myTeams = [];
  teamIdCheck = [];
  var i = 0;
  do {
    var randoNum = Math.floor(Math.random() * 32);
    if (!teamIdCheck.includes(randoNum)) {
      teamIdCheck.push(randoNum);

      // console.log(myTeams);
      i++;
      //the i++ here makes it so that the console log displays myTeams, while iterating through the variable.
    }
  } while (i < 10);
  fetch("https://statsapi.web.nhl.com/api/v1/teams", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result);
      for (var i = 0; i < teamIdCheck.length; i++) {
        cityID = result.teams[teamIdCheck[i]].id;
        myTeams.push(cityID);
        // console.log(cityID);
      }
      window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
      renderMyTeams();
    });
  window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
  renderMyTeams();
}

function checkNull() {
  var checkNull = JSON.parse(window.localStorage.getItem("My-Teams"));
  for (var i = 0; i < checkNull.length; i++) {
    if (!checkNull[i]) {
      // console.log("null");
      checkNull.splice(i, 1);
    }
  }
  window.localStorage.setItem("My-Teams", JSON.stringify(checkNull));
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
  // console.log(typeof clickedID);
  //   console.log(clickedID);
  // console.log(e.currentTarget.id);
  clickedParent.empty();
});

var allTeamsEl = $("#allTeams");
var random10El = $("#random10");
var easternEl = $("#eastern");
var westernEl = $("#western");
var deleteEl = $("#deleteAll");

//These are click events for the buttons displayed on the page. We used Jquery here for ease of implementation, and presentation's sake.
allTeamsEl.on("click", getAllTeams);
random10El.on("click", get10Teams);
easternEl.on("click", getEastTeams);
westernEl.on("click", getWestTeams);

//when the X buttons are clicked, rows are deleted accordingly. When pressed, the row is not rendered.
deleteEl.on("click", function () {
  myTeams = [];
  window.localStorage.setItem("My-Teams", JSON.stringify(myTeams));
  window.localStorage.removeItem("My-Teams");
  window.localStorage.removeItem("TeamID");
  renderMyTeams();
  newCheck = [];
  window.localStorage.setItem("newCheck", newCheck);
  window.localStorage.removeItem("newCheck");
});

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

var modalFormEl = $("#modalInput");
var addTeamEl = $("#addTeam");
var modalEl = document.getElementById("staticBackdrop");

addTeamEl.on("click", function () {
  modalEl.focus();
  console.log(modalFormEl);
});
