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
      self.set_random_first();
      self.show_directory(supercat);

    })
    .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het ophalen van de artikelen in deze categorie. Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})});
  }


  /*
    (RE-)FILLS THE DIRECTORY WITH THUMBLINKS
  */
  hv_directory.prototype.show_directory = function(supercat) {
    $( "#hv-directory-container").empty();

    var i = 0;
    this.add_tile(i, supercat);
  
  }
  
  hv_directory.prototype.add_tile = function(i, supercat) {
	
	var self = this;
	var hasAppeared = false;
    this.article_tile(this.directory[i].id, this.directory[i].category, supercat, i, function(article_tile){
		$(article_tile).hide().appendTo("#hv-directory-container").fadeIn(1000);
		var waypoint = new Waypoint({
		  element: document.getElementById('directory-item-' + i),
		  handler: function(direction) {
			if( i + 1 < self.directory.length && !hasAppeared){
				hasAppeared = true;
				self.add_tile(i+1, supercat);
			}
		  },
		  offset: 'bottom-in-view'
		});
    });
  }

	/*
	hv_directory.prototype.show_directory = function(supercat) {
		$( "#hv-directory-container").empty();

		for (var i = 0; i < this.directory.length; i++) {
		  this.article_tile(this.directory[i].id, this.directory[i].category, supercat, function(article_tile){
			$( "#hv-directory-container").append(article_tile);
		  });
		}
	  }
	*/

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

  hv_directory.prototype.set_newest_first = function() {
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
    this.directory.sort(newest_first);
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

    $.getJSON("../" + cat + "/" + article_id + "/descriptor.json", function(article) {

      var article_tile = "";
      article_tile += "<div class=\"col-sm-4 pad-bot-20\" id=\"directory-item-" + id_no + "\">";
      article_tile += "              <div class=\"hv-tile-image-container\" >";
      article_tile += "                <img alt=\"\" src=\"../" + cat + "/" + article_id + "\/img\/main.jpg\" style=\"width: 100%; height: 100%; background-color: black;\">";
      if(cat != supercat){
        article_tile += "                <b><p class=\"hv-tile-category\">"+ supercat.toUpperCase() +" \/ " + cat.toUpperCase() + "<\/p><\/b>";
      } else {
        article_tile += "                <b><p class=\"hv-tile-category\">"+ supercat.toUpperCase() + "<\/p><\/b>";
      }
      article_tile += "                <div class=\"hv-tile-title-container\">";
      article_tile += "                    <h2 class=\"hv-tile-title hv-tile-title-" + supercat + "\">";
      article_tile += "                      <span>";
      article_tile += "                        <a href=\"..\/" + cat + "/" + article_id + "\" class=\"thumblink\"> " + article.title + " <\/a>";
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
