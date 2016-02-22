/*
  THE HOME BUILDER OBJECT
  Constructs the homepage and its elements.
*/
var hv_home = function(){

  hv_home.prototype.load = function(){
    var self = this;
    $.getJSON("./directory.json", function(dir){
      self.carousel(dir);
      self.articles(dir);
    });
  };


  ///////////////////////
  /* CODE FOR CAROUSEL */
  ///////////////////////
  hv_home.prototype.carousel = function(dir){

    var self = this;

    for (var i = 0; i < dir.carousel.length; i++) {
      $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
      $.getJSON("./" + dir.carousel[i][0] + "/" + dir.carousel[i][1] + "/descriptor.json", function(article, i) {
        $( "#carousel-entries" ).append(self.carousel_entry(article, i));
        $('.item').removeClass('active');
        $('.item').first().addClass('active');
        $('.carousel-indicators > li').removeClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#carousel-example-generic').carousel();
      }).error(function() { alert("error loading article: "+art_id); });
    }
  }

  hv_home.prototype.carousel_entry = function(article, i){
    var carousel_item="";
        carousel_item += "<div class=\"item\" id=\"citem-" + i + "\">";
        carousel_item += "              <div class=\"row\">";
        carousel_item += "                <div class=\"col-sm-8\" >";
        carousel_item += "                  <img style=\" width: 100%;\" src=\".\/" + article.category +"\/" + article.id + "\/img\/main.jpg\" alt=\"" + article.id + "\"><\/img>";
        carousel_item += "                <\/div>";
        carousel_item += "                <div class=\"col-sm-4 pad-bot-30\">";
        carousel_item += "                  <h1 class=\"hv-article-title-mostrecent\"  style=\"font-size: 2.7em !important\">";
        carousel_item += "                    <a style=\"color: #222222 !important;\" href=\".\/" + article.category +"\/" + article.id + "/\">" +   article.title + "</a>";
        carousel_item += "                  <\/h1>";
        carousel_item += "                  <h4 class=\"hv-author-date-most-recent\" ><b >";
        var date = article.day;
        date = date.split("/");
        carousel_item += "                    " + date[2] + "\/" + date[1] + "\/" + date[0] + " - <a style=\"color: #222222 !important; \" href=\"./a/" + article.authorid + "/\">" + article.authorname + "</a>";
        carousel_item += "                  <\/b><\/h4>";
        carousel_item += "                  <p class=\"hv-most-recent-content\">";

        var fullcontent =""
        for (var i = 0; i < article.content.length; i++) {
          if (article.content[i].type == "paragraph") {
              fullcontent += article.content[i].content + " ";
          }
        }
        if(fullcontent.length < 200){
          carousel_item += "                    " + fullcontent;
        }
        else{
          carousel_item += "                    " + fullcontent.substring(0,199) + "[...]";
        }

        carousel_item += "                  <\/p>";
        carousel_item += "                  <p class=\"hv-lees-meer\"><b><a href=\"./" + article.category + "/" + article.id + "/\">lees meer<\/a><\/b><\/p>";
        carousel_item += "                  <p style=\"text-transform: uppercase;\">";
        carousel_item += "                    <img src=\".\/img\/source.png\" title=\"Bron\" style=\"width: 23px;\"\/>";
        carousel_item += "                    <a href=\"" + article.source_url + "\" target=\"_blank\" style=\"padding-left: 10px\">";
        carousel_item += "                    " + article.source_name;
        carousel_item += "                    <\/a>";
        carousel_item += "                  <\/p>";
        carousel_item += "                <\/div>";
        carousel_item += "              <\/div>";
        carousel_item += "            <\/div>";

        return carousel_item;
  }



  ////////////////////////////////
  /* CODE FOR CATEGORY ARTICLES */
  ////////////////////////////////
  hv_home.prototype.articles = function(dir){
    var self = this;
    $.getJSON("./" + dir.articles[0][0] + "/" + dir.articles[0][1] + "/descriptor.json", function(art) {
      $("#hv-art123").append(self.article(art));
    });
    $.getJSON("./" + dir.articles[1][0] + "/" + dir.articles[1][1] + "/descriptor.json", function(art) {
      $("#hv-art123").append(self.article(art));
    });
    $.getJSON("./" + dir.articles[2][0] + "/" + dir.articles[2][1] + "/descriptor.json", function(art) {
      $("#hv-art123").append(self.article(art));
    });
    $.getJSON("./" + dir.articles[3][0] + "/" + dir.articles[3][1] + "/descriptor.json", function(art) {
      $("#hv-art456").append(self.article(art));
    });
    $.getJSON("./" + dir.articles[4][0] + "/" + dir.articles[4][1] + "/descriptor.json", function(art) {
      $("#hv-art456").append(self.article(art));
    });
    $.getJSON("./" + dir.articles[5][0] + "/" + dir.articles[5][1] + "/descriptor.json", function(art) {
      $("#hv-art456").append(self.article(art));
    });
  }

  hv_home.prototype.article = function(art){

    var catfull = art.category;
    if(art.category == "faitsdivers"){
      catfull= "faits divers";
    }
    var article="";
        article += "<div class=\"col-sm-4\">";
        article += "      <h2 class=\"hv-category-title pad-bot-20 hv-c-"+ art.category + "\"> <a style=\"color: inherit;\" href=\"./" + art.category + "/\">" + catfull + "</a><\/h2>";
        article += "      <img style=\" width: 100%;\" src=\".\/" + art.category + "\/" + art.id + "\/img\/main.jpg\"><\/img>";
        article += "      <h1 class=\"hv-article-title-mostrecent\" style=\"font-size: 2.5em !important\">";
        article += "        <a style=\"color: #222222 !important;\" href=\".\/" + art.category +"\/" + art.id + "/\">" +   art.title + "</a>";
        article += "      <\/h1>";
        article += "      <h4 class=\"hv-author-date-most-recent\" ><b >";
        var date = art.day;
        date = date.split("/");
        article += "        " + date[2] + "\/" + date[1] + "\/" + date[0] + " - <a style=\"color: #222222 !important; \" href=\"./a/" + art.authorid + "/\">" + art.authorname + "</a>";
        article += "      <\/b><\/h4>";
        article += "      <p class=\"hv-most-recent-content\">";

        var fullcontent =""
        for (var i = 0; i < art.content.length; i++) {
          if (art.content[i].type == "paragraph") {
              fullcontent += art.content[i].content + " ";
          }
        }
        if(fullcontent.length < 200){
          article += "                    " + fullcontent;
        }
        else{
          article += "                    " + fullcontent.substring(0,199) + "[...]";
        }
        article += "      <\/p>";
        article += "      <p class=\"hv-lees-meer\"><b><a href=\"./" + art.category + "/" + art.id + "/\">lees meer<\/a><\/b><\/p>";
        article += "        <p style=\"text-transform: uppercase;\">";
        article += "          <img src=\".\/img\/source.png\" title=\"Bron\" style=\"width: 23px;\"\/>";
        article += "          <a href=\"" + art.source_url + "\" target=\"_blank\" style=\"padding-left: 10px\">";
        article += "            " + art.source_name;
        article += "          <\/a>";
        article += "        <\/p>";
        article += "    <\/div>";

        return article;
  }
}