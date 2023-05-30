var sidebarEl = $("#sidebar-id");

var requestURL = "https://www.healthcare.gov/:blog.json";

function getApi(requestURL) {
  fetch(requestURL).then(function (response) {
    console.log(response);
    return response.json();
  });
}

getApi(requestURL);
