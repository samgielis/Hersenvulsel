function filterUnpublishedArticles(article) {
    return new Date() >= new Date(article.pubtime);
}

/*
  THE INDEX BUILDER (HV) OBJECT
  Constructs elements of the different Indexes (home and separate category indexes).
*/
var hv_directory = function(){
  var directory = [];
  hv_directory.prototype.load_cat_directory = function(supercat){

    var self = this;
    $.getJSON("./directory.json", { as: this.object }, function(dir) {
      self.directory = dir.articles;
      self.directory = self.directory.filter(filterUnpublishedArticles);
      set_newest_first(self.directory);
      self.show_directory(supercat);

    })
    .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het ophalen van de artikelen in deze categorie. Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})});
  }

  hv_directory.prototype.load_default_directory = function(){

    var self = this;
    var cats = ["wetenschap", "natuur", "mensen", "geschiedenis", "entertainment", "faitsdivers"];
    var allarticles = [];
    var count = 0;
    for (i = 0; i < cats.length; i++) {
      $.getJSON("./" + cats[i] + "/directory.json", function(directory) {
        var newest = directory.articles;
        newest = newest.filter(filterUnpublishedArticles)
        set_newest_first(newest);
        newest = newest.slice(0,5);
        $.merge(allarticles, newest);
        count = count + 1;

        if(count >= 6){
          self.directory = allarticles;
          set_newest_first(self.directory);
          self.show_directory("default");
        }
      })
      .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het ophalen van de nieuwste artikels in de categorie " + cats[i] + ". Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})})
    }
}

  /*
    (RE-)FILLS THE DIRECTORY WITH THUMBLINKS
  */
  hv_directory.prototype.show_directory = function(supercat) {
    $( "#hv-directory-container").empty();
    // add the first row of 3 items.
    this.add_row_of_tiles(0, supercat);
  }

  hv_directory.prototype.add_row_of_tiles = function(i, supercat) {
    var self = this;
    for (var j = i; j < this.directory.length && j <= i + 2; j++) {
      if(j == i + 2 && j != this.directory.length - 1){
        // add a waypoint for the tile at the end of the row which will trigger the next row
        self.add_waypoint_tile(j, supercat);
      }
      else {
        // add a normal tile
        self.add_tile(j, supercat);
      }
    }
  }

  /*
    Adds a tile and creates a waypoint for it that will trigger once it appears on the screen.
    When triggered, the waypoint will load the next row.
  */
  hv_directory.prototype.add_waypoint_tile = function(i, supercat) {

    var self = this;
  	var hasAppeared = false;

    this.article_tile(this.directory[i].id, this.directory[i].category, supercat, i, function(article_tile){
      // add a random fade time for a more natural vibe
  	   $(article_tile).hide().appendTo("#hv-directory-container").fadeIn(Math.random()*1500+750);

       var waypoint = new Waypoint({
     	  element: document.getElementById('directory-item-' + i),
     	  handler: function(direction) {
          // don't add twice
           if( !hasAppeared ){
             // add the next row
             self.add_row_of_tiles(i+1, supercat);
           }
           hasAppeared = true;
     		},
     		offset: 'bottom-in-view'
     	});
     });
  }

  /*
    Adds a tile to the directory
  */
  hv_directory.prototype.add_tile = function(i, supercat) {
    this.article_tile(this.directory[i].id, this.directory[i].category, supercat, i, function(article_tile){
  	   $(article_tile).hide().appendTo("#hv-directory-container").fadeIn(1000);
     });
  }


  /*
    SORTING FUNCTIONS FOR THE DIRECTORY
  */
  hv_directory.prototype.set_oldest_first = function() {
    function oldest_first(a, b) {
      var key1 = new Date(a.pubtime).getTime();
      var key2 = new Date(b.pubtime).getTime();

      if (key1 < key2) {
          return -1;
      } else if (key1 == key2) {
          return 0;
      } else {
          return 1;
      }
    }
    this.directory.sort(oldest_first);
  }

  function set_newest_first(array) {
    function newest_first(a, b) {
      var key1 = new Date(a.pubtime).getTime();
      var key2 = new Date(b.pubtime).getTime();

      if (key1 < key2) {
          return 1;
      } else if (key1 == key2) {
          return 0;
      } else {
          return -1;
      }
    }
    array.sort(newest_first);
  }

  hv_directory.prototype.set_random_first = function() {
    this.directory = this.random_first(this.directory);
  }
  hv_directory.prototype.random_first = function(array) {
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



  hv_directory.prototype.article_tile =  function(article_id, cat, supercat, entrynumber, callback){

  	var id_no = entrynumber;
    var prefix = "../"
    if(supercat == "default"){
      prefix= "./"
    }
    if(supercat == "author"){
      prefix= "../../"
    }
	
    $.getJSON(prefix + cat + "/" + article_id + "/descriptor.json", function(article) {

      var article_tile = "";
      article_tile += "<div class=\"col-sm-4 pad-bot-20\" id=\"directory-item-" + id_no + "\">";
      article_tile += "              <div class=\"hv-tile-image-container\" >";
      article_tile += "                <img alt=\"\" src=\"" + prefix + cat + "/" + article_id + "\/img\/main.jpg\" style=\"width: 100%; height: 100%; background-color: black;\">";
      if(cat != supercat && !(supercat == "default" || supercat == "author")){
        article_tile += "                <b><p class=\"hv-tile-category\">"+ supercat.toUpperCase() +" \/ " + cat.toUpperCase() + "<\/p><\/b>";
      } else {
        article_tile += "                <b><p class=\"hv-tile-category\">"+ cat.toUpperCase() + "<\/p><\/b>";
      }
      article_tile += "                <div class=\"hv-tile-title-container\">";
	  if(supercat.trim() === "author"){
		  	  article_tile += "                    <h2 class=\"hv-tile-title hv-tile-title-default\">";
	  }
	  else {
		  article_tile += "                    <h2 class=\"hv-tile-title hv-tile-title-" + supercat + "\">";
	  }
      article_tile += "                      <span>";
      article_tile += "                        <a href=\"" + prefix + cat + "/" + article_id + "\" class=\"thumblink\"> " + article.title + " <\/a>";
      article_tile += "                      <\/span>";
      article_tile += "                     <\/h2>";
      article_tile += "                <\/div>";
      article_tile += "              <\/div>";
      article_tile += "            <\/div>";

      callback(article_tile);

    })
    .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het ophalen van het artikel met de link <b>" + article_id +"</b>. Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})});



  }

}
