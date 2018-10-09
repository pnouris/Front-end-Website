/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
/////////////////Loading icon functions////////////////////////////
var timeOut;
function stopLoader() {
  timeOut = setTimeout(showLoader, 800);
}

function showLoader() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("table_box").style.display = "block";
}
///////////////////////team ranking table/////////////////////

var rankIndex; //this var is used as a counter to create the index(Ranking numbers 1-10) column
function getTable(data)
{
  var imgLogo = data.logo_url;
  var Team_name = data.name;
  var Wins = data.wins;
  var losses = data.losses;
  var Rating_points = data.rating;

  var output =
  '<tr>'+
  '<td class="indexRank">'+rankIndex+'</td>'+
  '<td class="cellsR"><span class="team-img"><img class="theLogoImg" src="'+imgLogo+'"></span><span>'+Team_name+'</span></td>'+
  '<td class="cellsR">'+Wins+'</td>'+
  '<td class="cellsR">'+losses+'</td>'+
  '<td class="cellsR">'+Rating_points+'</td>'+
  '</tr>'+
  '';

  return output;
}

///////////////////////////GET REQ section/////////////////////////////////////////////
var API = "h0G2hnwdzBY_blf9abhF2C4Klo6HcMTPeP4e3XBmCsBQgklweUo";

var dota_url = "https://api.opendota.com/api/teams";
param = {
  // token: API,
  // videogame_id: "4",
}

var assembleQuery = function(parameters){
  var query_strings = [];
  for(var key in parameters) {
    if(parameters.hasOwnProperty(key)){
      var param_string = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
      query_strings.push(param_string);
    }
  }
  return query_strings.join("&");
}

var query_url = dota_url + "?" + assembleQuery(param);
//console.log(query_url);

var xhttp = new XMLHttpRequest();
xhttp.open("GET" , query_url);
xhttp.addEventListener('load' , function(){
  var data = JSON.parse(this.response)
  //console.log(data);
  //top 10 dota teams
  for (var i = 0; i < 20; i++)
  {   //count the rows of the table <tr>
    var rowCount = document.getElementById('theTbody').getElementsByTagName('tr');
    rankIndex = rowCount.length + 1 ;
    //call function getTable and put its return output in the #table_teams
    var output = getTable(data[i]);
    document.getElementById('theTbody').innerHTML += output;
  }
});
xhttp.send();
////////////////////////////////////////////////////////////////////////////////////////////////
