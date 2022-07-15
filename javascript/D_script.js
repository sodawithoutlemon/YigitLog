var topic = window.location.search.split("=")[1]
var firstletter = topic[0].toUpperCase();
$(".topic").text(firstletter+topic.slice(1,10))
var key = apikey

function GetData(){
    var dataurl = "https://sheets.googleapis.com/v4/spreadsheets/1IvTyuL4NnXcuQ8kCzdiVMWzKtC71bjD9u5IXQ6sWtmo/values/"+topic+"/?key="+key
    axios.get(dataurl).then(function(response){
        for (var i = 0; i < response.data.values.length; i++){
            if(i > 0) {
                var name = response.data.values[i][0]
                var score = response.data.values[i][1]
                var note = response.data.values[i][2]
                if (note === undefined){
                    note = " "
                } 
                var template = "<tr><td scope='row' class='head'>"+(i)+"</td><td>"+name+"</td><td>"+score+"</td><td>"+note+"</td></tr>"
                $("table").find('tbody').append(template);
            }
        }
    })
}

GetData()

var number = Math.floor(Math.random() * 8) + 1
var image = "/images/"+number+".jpg"

$('.img').css('background-image','url('+image+')');
$(window).resize(function(){location.reload();})


