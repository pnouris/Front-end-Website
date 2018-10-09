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
/////////////////////////////get tournament table matches//////////////////////////////////
var z = 0; //counter for tournaments[]

function getTable(data)
{
  var Dire_Team_Name = data.dire_name;
  var Radiant_Team_Name = data.radiant_name;
  var Dire_side_win;
  var Radiant_side_win = data.radiant_win;
  var Dire_Score = data.dire_score;
  var Radiant_Score = data.radiant_score;
  var League_Name = data.league_name;

  var output =
  '<tr>'+
  '<td class="cellsR">'+League_Name+'</td>'+
  '<td class="cellsR" align="right">'+Dire_Score+'</td>'+
  '<td class="cellsR" align="center"><a class="teamLink" href="DotaTeam.html">'+Dire_Team_Name+'</a> vs <a class="teamLink" href="DotaTeam.html">'+Radiant_Team_Name+'</a></td>'+
  '<td class="cellsR" align="right">'+Radiant_Score+'</td>'+
  '</tr>'+
  '';

  return output;
}
////////////////////////////////////////Table FOR TOURANMENTS/////////////////////////////
//teams attended the tournament
function getTournamentTeams (tourni){
  var teams_att = tourni.teams;
  var Attended = "";

  for(var i= 0; i < teams_att.length;i++)
  {
    Attended += '<li class="teamL"><img class="EsportTLogo" src="'+teams_att[i].image_url+'">'+teams_att[i].name+'</li>';
  }
  return Attended;
}

//game matches took/will take place in the tournament
function getTournamentMatches(tourni){
  var matches_play = tourni.matches;
  var played = "";

  for(var i= 0; i < matches_play.length;i++){
    if(matches_play[i].name != "") {
      played += '<li class="teamMc">'+matches_play[i].name+'</li>';
  }
}
  if(played == "") {
      played += 'N/A';
    }
  return played;
}

//THE WHOLE TOURNAMENT TABLE
function getTourniTable(tourni)
{
  var Tournament_Series_Name = tourni[z].serie.name;
  var Tournament_name = tourni[z].name;
  var end_date = tourni[z].end_at;
  var TeamsGO = getTournamentTeams(tourni[z]);
  var matches = getTournamentMatches(tourni[z]);


  var output =
  '<td class="cellsR" align="left">'+Tournament_Series_Name+'</td>'+
  '<td class="cellsR" align="left">'+Tournament_name+'</td>'+
  '<td class="cellsR" align="left">'+end_date+'</td>'+
  '<td class="theTeamL"><ul>'+TeamsGO+'</ul></td>'+
  '<td class="theTeamL"><ul>'+matches+'</ul></td>'+
  '';
  return output;
}
///////////////////////////GET REQ section/////////////////////////////////////////////
var API = "38740CF87F50AFB4120702F5937FB032"; //steam

var dota_url = "https://api.opendota.com/api/proMatches";
param = {

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
  for (var i = 0; i < 20; i++)
  {
    var output = getTable(data[i]);
    document.getElementById('theTbody').innerHTML += output;
  }
});
xhttp.send();
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////GET REQ section from pandascore/////////////////////////////////////////////
var API = "h0G2hnwdzBY_blf9abhF2C4Klo6HcMTPeP4e3XBmCsBQgklweUo"; //pandascore api

var tournaments_url = "https://api.pandascore.co/tournaments";
param = {
  token: API,
  videogame_id: "4",
  "search[name]": "Playoffs"
}

var assembleTournaments = function(parameters){
  var query_strings = [];
  for(var key in parameters) {
    if(parameters.hasOwnProperty(key)){
      var param_string = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
      query_strings.push(param_string);
    }
  }
  return query_strings.join("&");
}

var tourni_url = tournaments_url + "?" + assembleTournaments(param);
//console.log(tourni_url);

var request = new XMLHttpRequest();
request.open("GET" , tourni_url);
request.addEventListener('load' , function(){
  var tourni = JSON.parse(this.response)
  //console.log(tourni);
  for(var i = 0; i < 8;i++){
    var output = getTourniTable(tourni);

    document.getElementsByClassName('theTournamentbody')[0].innerHTML += output;
    z++;
  }

});
request.send();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
