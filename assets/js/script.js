const url =
  "https://newscatcher.p.rapidapi.com/v1/search_enterprise?q=Health&lang=en&sort_by=relevancy&country=US&topic=health&page=1&media=True";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "fd74d69c46msh75443648a01bff4p118236jsn4843662a2481",
    "X-RapidAPI-Host": "newscatcher.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}
