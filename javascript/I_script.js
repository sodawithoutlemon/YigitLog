$(window).resize(function(){location.reload();})
var number = Math.floor(Math.random() * 8) + 1
var image = "/images/"+number+".jpg"

$('.img').css('background-image','url('+image+')');

if (window.innerWidth <= 720) {
    
    $(".phone-first").html("<a href='https://github.com/sodawithoutlemon'><div class='butdivmiddle'><button type='button' class='btn btn-outline-light btn-lg third'><i class='bi bi-github'></i><br><h5>GitHub</h5></button></div></a><a href='https://www.instagram.com/grindwithyigit/'><div class='butdivmiddle'><button type='button' class='btn btn-outline-light btn-lg fourth'><i class='bi bi-instagram'></i><br><h5 class='instagram'>Instagram</h5></button></div></a>")

    $(".phone-second").html("<a href='data.html?topic=anime-alphabetical'><div class='butdivside'><button type='button' class='btn btn-outline-light btn-lg first'><h5>Anime</h5></button></div></a><a href='data.html?topic=book-alphabetical'><div class='butdivside'><button type='button' class='btn btn-outline-light btn-lg second'><h5>Book</h5></button></div></a>")
    $(".phone-middle").html("<div class='midinfo'><h1>YigitLog</h1></div>")
    $(".phone-fourth").html("<a href='data.html?topic=movie-alphabetical'><div class='butdivside'><button type='button' class='btn btn-outline-light btn-lg fifth'><h5>Movie</h5></button></div></a><a href='data.html?topic=game-alphabetical'><div class='butdivside'><button type='button' class='btn btn-outline-light btn-lg sixth'><h5>Game</h5></button></div></a>")

}
$(window).resize(function(){location.reload();})