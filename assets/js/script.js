// API Token for The News API: s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N
// The News API Documentation: https://www.thenewsapi.com/documentation

var requestOptions = {
  method: "GET",
};

var params = {
  api_token: "s2MrFnpSyjoXrUViZDIeLTMvwAwsjDrlNnTdBq0N",
  categories: "health",
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

// NPPES NPI API Documentation: https://npiregistry.cms.hhs.gov/api-page
// NPPES NPI API Demo Page: https://npiregistry.cms.hhs.gov/demo-api
// Define what user info/search criteria we want to use

// For testing purposes:

var params = {
  taxonomy_description: "GeneralPractice",
  city: "Denver",
  postal_code: "80019",
};

var esc = encodeURIComponent;
var query = Object.keys(params)
  .map(function (k) {
    return esc(k) + "=" + esc(params[k]);
  })
  .join("&");

fetch("https://npiregistry.cms.hhs.gov/api/?version=2.1&" + query)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

// document.getElementByClass("#btn-primary").addEventListener("onclick", function(
//     //Saving user information to local storage
//     localstorage.setItem('form-label', 'form-check-input')
//     //Where to declare these classes?
// );
