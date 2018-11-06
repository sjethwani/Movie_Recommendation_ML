
function buildRatedMovies(userId) {

  let appSummaryUrl = `/api/watched/user/${userId}`
  console.log(appSummaryUrl)

  //read the data from json/api
  d3.json(appSummaryUrl).then(function(data) {
    console.log("Average Info:");
    console.log(data);
    console.log(data[0].movieId);
    console.log(data[0].title);
    console.log(data[0].tmdbId);
    console.log(data[0].rating);
    console.log(data[0].tmdbposter)
    for (let i=0;i<=5;i++) {
      hrefurl = "https://www.themoviedb.org/movie/"+data[i].tmdbId;
      console.log(hrefurl);
      id = "watch"+i;
      console.log(id);
      var a = document.getElementById(id);
      a.setAttribute("href",hrefurl);

      //https://image.tmdb.org/t/p/w185/8zw8IL4zEPjkh8Aysdcd0FwGMb0.jpg
      imgurl = "https://image.tmdb.org/t/p/w185"+data[i].tmdbposter;
      console.log(imgurl);
      id = "watchimg"+i;
      console.log(id);
      var b = document.getElementById(id);
      b.setAttribute("src",imgurl);
    }

  });
  
  id = "watchapi";
  var apiurl = "/api/watched/user/"+userId
  var c = document.getElementById(id);
  c.setAttribute("href",apiurl);

};

function buildRecommendedMovies(userId) {

  let appSummaryUrl = `/api/recommended/user/${userId}`
  console.log(appSummaryUrl)

  //read the data from json/api
  d3.json(appSummaryUrl).then(function(data) {
    console.log("Average Info:");
    console.log(data.length);
    console.log(data[0].movieId);
    console.log(data[0].movieName);
    console.log(data[0].tmdbId);
    console.log(data[0].rating);
    console.log(data[0].moviePoster)

    unshuffled = data;

    let shuffled = unshuffled
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    data = shuffled;

    for (let i=0;i<=5;i++) {
      hrefurl = "https://www.themoviedb.org/movie/"+data[i].tmdbId;
      console.log(hrefurl);
      id = "recommend"+i;
      console.log(id);
      var a = document.getElementById(id);
      a.setAttribute("href",hrefurl);

      //https://image.tmdb.org/t/p/w185/8zw8IL4zEPjkh8Aysdcd0FwGMb0.jpg
      imgurl = "https://image.tmdb.org/t/p/w185"+data[i].moviePoster;
      console.log(imgurl);
      id = "recommendimg"+i;
      console.log(id);
      var b = document.getElementById(id);
      b.setAttribute("src",imgurl);
    }
  });

  id = "recommendapi";
  var apiurl = "/api/recommended/user/"+userId
  var c = document.getElementById(id);
  c.setAttribute("href",apiurl);

};

function recommendAgain() {
  var userId = d3.select("#selDataApp").property("value")
  buildRecommendedMovies(userId);
};

function init() {

  // Grab a reference to the dropdown select element
  //var appSelection = d3.select("#selDataApp").property("value")
  var userId = 2
  console.log(userId)

  //build html page
  buildRatedMovies(userId);
  buildRecommendedMovies(userId);
  
};


function optionChanged () {

  // Grab a reference to the dropdown select element
  //var userId = d3.select("#search-field").property("value")
  var userId = d3.select("#selDataApp").property("value")
  console.log(userId)
  buildRatedMovies(userId);
  buildRecommendedMovies(userId);
  
};

// Initialize the dashboard

var form = document.getElementById("userid");
init();