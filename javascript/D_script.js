var topic = window.location.search.split("=")[1].split("-")[0]
var order = window.location.search.split("=")[1].split("-")[1]
var firstletter = topic[0].toUpperCase();
$(".topic").text(firstletter+topic.slice(1,10))
var key = apikey


function DataGettingBrain() {

}


function GetDataAlphabetical(){
    var dataurl = "https://sheets.googleapis.com/v4/spreadsheets/1IvTyuL4NnXcuQ8kCzdiVMWzKtC71bjD9u5IXQ6sWtmo/values/"+topic+"/?key="+key
    axios.get(dataurl).then(function(response){

        var data = response.data.values

        for (var i = 0; i < data.length; i++){

            if(i > 0) {
                var name = data[i][0]
                var score = data[i][1]
                var note = data[i][2]
                if (note === undefined){
                    note = " "
                } 
                var template = "<tr><td scope='row' class='head'>"+(i)+"</td><td class='tablename'>"+name+"</td><td class='tablescore'>"+score+"</td><td>"+note+"</td></tr>"
                $("table").find('tbody').append(template);
            }
        }
    });
}

var watching = []
var scored = []

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}



function GetDataByScore() {
    var databyscoreurl = "https://sheets.googleapis.com/v4/spreadsheets/1IvTyuL4NnXcuQ8kCzdiVMWzKtC71bjD9u5IXQ6sWtmo/values/"+topic+"/?key="+key
    axios.get(databyscoreurl).then(function(response){
        var test = response.data.values

       

        for (var i = 0; i < test.length; i++){
            
            if(i > 0) { 
                if (isNumeric(test[i][1][0])) {
                    var scorestr = test[i][1].split("/")[0]
                    test[i].splice(1, 1)
                    test[i].splice(1,0, scorestr)
                    scored.push(test[i])     
                } else {
                    watching.push(test[i])
                }
            }
        }

        scored.sort(
            function(a,b) {
                return a[1] - b[1];
            }
        ).reverse();
        scored = scored.concat(watching)
        
        var onlynamearray = []

        for (var i = 0; i < scored.length; i++){
            onlynamearray.push(scored[i][0])
        }
        let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
        var nameswithseason = findDuplicates(onlynamearray)
        var pickedarray = []
        for (var i = 0; i < scored.length; i++){

            var sname = scored[i][0]
            var sscore = scored[i][1]
            var snote = scored[i][2]

            if (snote === undefined){
                snote = " "
            }
            
            if (!pickedarray.includes(sname)) {
                if (nameswithseason.includes(sname)) {
                    
                    var dropdownitempatern = ""
                    multiseasonthing = []
                    function locator(name) {
                        for (var j = 0; j < test.length; j++) {
                            if (name == test[j][0]) {
                                multiseasonthing.push(test[j])
                                var modstring = "Season "+test[j][3]+":     "+test[j][1]+"/10"
                                var item = '<a class="dropdown-item" href="#">'+modstring+'</a>'
                                dropdownitempatern += item
                            }
                        }
                    }
                    locator(sname)

                    var score = 0
                    for (var j = 0; j < multiseasonthing.length; j++) {
                        score += parseInt(multiseasonthing[j][1])
                    }
                    console.log(score)
                    score = score / multiseasonthing.length

                    if (isNumeric(score)) {
                        sscore = score + "/10"
                    }

                    snote = multiseasonthing[0][2]


                    var namewithdropdownbutton = '<div class="dropdown"><button id="marginnull" class="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+sname+'</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'+dropdownitempatern+'</div></div>'
                    var template = "<tr><td scope='row' class='head'>"+(i+1)+"</td><td class='tablename'>"+namewithdropdownbutton+"</td><td class='tablescore'>"+sscore+"</td><td>"+snote+"</td></tr>"
                    pickedarray.push(sname)
                }
                
                else {

                    if (isNumeric(sscore)) {
                        sscore = sscore + "/10"
                    }

                    var template = "<tr><td scope='row' class='head'>"+(i+1)+"</td><td class='tablename'>"+sname+"</td><td class='tablescore'>"+sscore+"</td><td>"+snote+"</td></tr>"
                    pickedarray.push(sname)
                }
                $("table").find('tbody').append(template);
            }
        }

    });
}

if (order === "alphabetical") {
    GetDataAlphabetical()
}
else if (order === "score") {
    GetDataByScore()
}

$(".byalphabetical").attr("href", "data.html?topic="+topic+"-alphabetical")
$(".byscore").attr("href", "data.html?topic="+topic+"-score")

if (topic === "anime") {
    $(".nextlist").attr("href", "data.html?topic=book-alphabetical")
}
if (topic === "book") {
    $(".nextlist").attr("href", "data.html?topic=movie-alphabetical")
}
if (topic === "movie") {
    $(".nextlist").attr("href", "data.html?topic=game-alphabetical")
}
if (topic === "game") {
    $(".nextlist").attr("href", "data.html?topic=anime-alphabetical")
}

var number = Math.floor(Math.random() * 8) + 1
var image = "/images/"+number+".jpg"

$('.img').css('background-image','url('+image+')');
$(window).resize(function(){location.reload();});