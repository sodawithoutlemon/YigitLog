var topic = window.location.search.split("=")[1].split("-")[0]
var order = window.location.search.split("=")[1].split("-")[1]
var firstletter = topic[0].toUpperCase();
$(".topic").text(firstletter+topic.slice(1,10))
var key = apikey

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


    })
}


var watching = []
var unfinished = []
var scored = []

function GetDataByScore() {
    var databyscoreurl = "https://sheets.googleapis.com/v4/spreadsheets/1IvTyuL4NnXcuQ8kCzdiVMWzKtC71bjD9u5IXQ6sWtmo/values/"+topic+"/?key="+key
    axios.get(databyscoreurl).then(function(response){
        var test = response.data.values
        for (var i = 0; i < test.length; i++){
            
            if(i > 0) {
                if (test[i][1] === "izliyorum") {
                    watching.push(test[i])
                }
                else if (test[i][1] === "okuyorum") {
                    watching.push(test[i])
                }
                else if (test[i][1] === "oynuyorum") {
                    watching.push(test[i])
                }
                else if (test[i][1] === "Nostalji") {
                    watching.push(test[i])
                }
                else if (test[i][1] === "-") {
                    unfinished.push(test[i])
                }

                else {
                    var scorestr = test[i][1].split("/")[0]
                    test[i].splice(1, 1)
                    test[i].splice(1,0, scorestr)
                    scored.push(test[i])
                }
            }
        }

        scored.sort(
            function(a,b) {
                return a[1] - b[1];
            }
        ).reverse();

        scored = scored.concat(watching)
        scored = scored.concat(unfinished)

        for (var i = 0; i < scored.length; i++){
            console.log(scored[i])
            var sname = scored[i][0]
            var sscore = scored[i][1]
            var snote = scored[i][2]
            if (snote === undefined){
                snote = " "
            }
            var template = "<tr><td scope='row' class='head'>"+(i+1)+"</td><td class='tablename'>"+sname+"</td><td class='tablescore'>"+sscore+"</td><td>"+snote+"</td></tr>"
            $("table").find('tbody').append(template);
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
$(window).resize(function(){location.reload();})


