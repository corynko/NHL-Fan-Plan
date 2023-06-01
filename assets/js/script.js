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
