function hv_404(){

  hv_404.prototype.set_random_link = function(){

    var cats = ["wetenschap", "natuur", "mensen", "geschiedenis", "entertainment", "faitsdivers"];
    var allarticles = [];
    var count = 0;
    for (var i = 0; i < cats.length; i++) {
      $.getJSON("http://hersenvulsel.be/" + cats[i] + "/directory.json", function(directory) {
        var newest = directory.articles;
        newest = randomize(newest);
        newest = newest.slice(0,10);
        $.merge(allarticles, newest);
        count = count + 1;
        if(count >= 6){
          allarticles = randomize(allarticles);
          $( "#404-random-link" ).attr("href", "http://hersenvulsel.be/" + allarticles[0].category + "/" + allarticles[0].id + "/");
        }
      })
      .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het ophalen van een random artikel. Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})})
    }
  }
}


function randomize(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
