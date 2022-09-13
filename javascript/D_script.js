var topic = window.location.search.split("=")[1].split("-")[0]
var order = window.location.search.split("=")[1].split("-")[1]
var firstletter = topic[0].toUpperCase();
$(".topic").text(firstletter+topic.slice(1,10))
var key = apikey

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
numberforalphordering = 1
var numberfororder = 1

var alphabeticalarray = []
var arraywithscores = []
var arraywithother = []
var scored = []

async function TemplateMaker() {
    var databyscoreurl = "https://sheets.googleapis.com/v4/spreadsheets/1IvTyuL4NnXcuQ8kCzdiVMWzKtC71bjD9u5IXQ6sWtmo/values/"+topic+"/?key="+key

    const test = await axios.get(databyscoreurl).then(function(response){
        return response.data.values
    });

    test.shift()
    scored = test

    var onlynamearray = []
    var pickedarray = []

    for (var i = 0; i < scored.length; i++){
        onlynamearray.push(scored[i][0])
    }
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    var nameswithseason = findDuplicates(onlynamearray)
    
    
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
                            if (isNumeric(test[j][3])) {
                                var modstring = "Season "+test[j][3]+": 󠀠󠀠 󠀠 󠀠 󠀠"+test[j][1]+" 󠀠 󠀠 󠀠 󠀠"+test[j][2]
                            } else {
                                var modstring = " 󠀠 󠀠 󠀠 󠀠"+test[j][3]+": 󠀠󠀠 󠀠 󠀠 󠀠"+test[j][1]+" 󠀠 󠀠 󠀠 󠀠"+test[j][2]  
                            }
                            var item = '<a class="dropdown-item">'+modstring+'</a>'
                            dropdownitempatern += item
                        }
                    }
                }
                locator(sname)
                
                var score = 0
                var len = multiseasonthing.length
                for (var j = 0; j < multiseasonthing.length; j++) {
                    if(isNumeric(multiseasonthing[j][1].split("/")[0])) {
                        score += parseInt(multiseasonthing[j][1].split("/")[0])    
                    } else {
                        len -= 1
                    }
                }
                score = score / len

                if (isNumeric(score)) {

                    var te = String(score)

                    try {
                        te = te.slice(0,3)
                    }
                    catch(err) {}

                    dictforscoreing = {
                        title: sname,
                        score: te,
                        note: snote,
                        isdd: true,
                        patern: dropdownitempatern 
                    }
                    alphabeticalarray.push(dictforscoreing)    
                    arraywithscores.push(dictforscoreing)

                    sscore = te + "/10"
                }
                snote = multiseasonthing[0][4]
                pickedarray.push(sname)
            }
            
            else {

                if (isNumeric(sscore.split("/")[0])) {
                    dictforscoreing = {
                        title: sname,
                        score: sscore.split("/")[0],
                        isdd: false,
                        note: snote
                    }
                    alphabeticalarray.push(dictforscoreing)
                    arraywithscores.push(dictforscoreing)
                } else {
                    dictforscoreing = {
                        title: sname,
                        isdd: false,
                        score: sscore, 
                        note: snote
                    }
                    alphabeticalarray.push(dictforscoreing)
                    arraywithother.push(dictforscoreing)

                }
                
                if (isNumeric(sscore)) {
                    sscore = sscore + "/10"
                }

                pickedarray.push(sname)
            }
            
        }

    }
    
}

async function GetDataAlphabetical(){
    await TemplateMaker()
    for (var i = 0; i < alphabeticalarray.length; i++){

        if (isNumeric(alphabeticalarray[i]["score"])){
            var writtenscore = alphabeticalarray[i]["score"] + "/10"
        } else {
            var writtenscore = alphabeticalarray[i]["score"]
        }

        if (alphabeticalarray[i]["isdd"] === true) {
            var namewithdropdownbutton = '<div class="dropdown"><button id="marginnull" class="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+alphabeticalarray[i]["title"]+'</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'+alphabeticalarray[i]["patern"]+'</div></div>'

            var template = "<tr><td scope='row' class='head'>"+numberforalphordering+"</td></td><td class='tablename'>"+namewithdropdownbutton+"</td><td class='tablescore'>"+writtenscore+"</td><td>"+alphabeticalarray[i]["note"]+"</td></tr>"

            $("table").find('tbody').append(template);

        } else {
            var template = "<tr><td scope='row' class='head'>"+numberforalphordering+"</td><td class='tablename'>"+alphabeticalarray[i]["title"]+"</td><td class='tablescore'>"+writtenscore+"</td><td>"+alphabeticalarray[i]["note"]+"</td></tr>"
            
            $("table").find('tbody').append(template);
        }
        numberforalphordering += 1
    }
}

async function GetDataByScore() {
    await TemplateMaker()
    
    var orderedarray = []

    arraywithscores.sort(
        function(a,b) {
            return parseFloat(a["score"]) - parseFloat(b["score"]);
        }
    ).reverse();

    orderedarray = arraywithscores.concat(arraywithother)

    for (var i = 0; i < orderedarray.length; i++){

        if (isNumeric(orderedarray[i]["score"])){
            var writtenscore = orderedarray[i]["score"] + "/10"
        } else {
            var writtenscore = orderedarray[i]["score"]
        }

        if (orderedarray[i]["isdd"] === true) {

            var namewithdropdownbutton = '<div class="dropdown"><button id="marginnull" class="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+orderedarray[i]["title"]+'</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'+orderedarray[i]["patern"]+'</div></div>'
            var template = "<tr><td scope='row' class='head'>"+numberfororder+"</td></td><td class='tablename'>"+namewithdropdownbutton+"</td><td class='tablescore'>"+writtenscore+"</td><td>"+orderedarray[i]["note"]+"</td></tr>"
            $("table").find('tbody').append(template);

        } else {
            var template = "<tr><td scope='row' class='head'>"+numberfororder+"</td><td class='tablename'>"+orderedarray[i]["title"]+"</td><td class='tablescore'>"+writtenscore+"</td><td>"+orderedarray[i]["note"]+"</td></tr>"
            $("table").find('tbody').append(template);
        }
        numberfororder += 1
    }

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