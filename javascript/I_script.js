var add = window.location.search
console.log(add)

$(window).resize(function(){location.reload();})
var number = Math.floor(Math.random() * 8) + 1
var image = "/images/"+number+".jpg"

$('.img').css('background-image','url('+image+')');

if (window.innerWidth <= 720) {
    
    $(".phone-first").html('<a href="https://www.instagram.com/tcyigitozdemir/"><div class="butdivside"><button type="button" class="btn btn-outline-light btn-lg fifth"><i class="bi bi-instagram"></i><br><h5>Instagram</h5></button></div></a><a href="mailto:yyigitoozdemir@gmail.com"><div class="butdivside"><button type="button" class="btn btn-outline-light btn-lg sixth"><i class="bi bi-send-fill"></i><br><h5>Contact Me</h5></button></div></a>')
    $(".phone-second").html('<a class="git" href="https://apps.apple.com/us/developer/yigit-ozdemir/id1790956332"><div class="butdivmiddle"><button type="button" class="btn btn-outline-light btn-lg third"><i class="bi bi-apple"></i><br><h5>A&Y Creations</h5></button></div></a><a class="inst" href="https://play.google.com/store/apps/dev?id=8654064472652463037"><div class="butdivmiddle"><button type="button" class="btn btn-outline-light btn-lg fourth"><i class="bi bi-google-play"></i><br><h5 class="instagram">A&Y Creations</h5></button></div></a>')
    $(".phone-middle").html("<div class='midinfo'><h1>YigitLog</h1></div>")
    $(".phone-fourth").html('<a href="https://github.com/sodawithoutlemon"><div class="butdivmiddle"><button type="button" class="btn btn-outline-light btn-lg seventh"><i class="bi bi-github"></i><br><h5>GitHub</h5></button></div></a><a href="https://www.instagram.com/tcyigitozdemir/"><div class="butdivmiddle"><button type="button" class="btn btn-outline-light btn-lg eighth lucky"><i class="bi bi-linkedin"></i><br><h5>LinkedIn</h5></button></div></a>')

}

if (window.innerWidth > 720) {
    $(window).resize(function(){
        location.reload();
    })
}
