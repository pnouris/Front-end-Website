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
    timeOut = setTimeout(showLoader, 1000); //amount of time the icon is shown
}

function showLoader() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("table_box").style.display = "block";
}
///////////////////////team ranking table/////////////////////

var rankIndex; //this var is used as a counter to create the index(Ranking numbers 1-10) column
function getTable(dataR)
{
  var avatar = dataR.avatar;
  var PlayerName = dataR.personaname;
  var PlayerScore = dataR.score;

  var output =

  '<tr>'+
  '<td class="indexRank">'+rankIndex+'</td>'+
  '<td class="cellsR"><span class="team-img"><img class="theLogoImg" src="'+avatar+'"></span><span>'+PlayerName+'</span></td>'+
  '<td class="cellsR">'+PlayerScore+'</td>'+
  '</tr>'+
  '';

  return output;
}

///////////////////////////GET REQ section/////////////////////////////////////////////
//var API = "h0G2hnwdzBY_blf9abhF2C4Klo6HcMTPeP4e3XBmCsBQgklweUo";
var API = "38740CF87F50AFB4120702F5937FB032"; //steam
var dota_url = "https://api.opendota.com/api/rankings";
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
  var data = JSON.parse(this.response);

  var dataR = data.rankings;
  //console.log(dataR);
  //top 100 players

  for (var i = 0; i < 100; i++)
  {   //count the rows of the table <tr>
    var rowCount = document.getElementById('theTbody').getElementsByTagName('tr');
    rankIndex = rowCount.length + 1 ;

    //call function getTable and put its return output in the #table_teams
    var output = getTable(dataR[i]);
    document.getElementById('theTbody').innerHTML += output;
  }
});
xhttp.send();
