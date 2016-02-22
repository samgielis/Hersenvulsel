/*
  THE HOME BUILDER OBJECT
  Constructs the homepage and its elements.
*/
var hv_home = function(){

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

  hv_home.prototype.carousel = function(entries){

    var self = this;

    for (var i = 0; i < entries.length; i++) {
      $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')
      $.getJSON("./" + entries[i][0] + "/" + entries[i][1] + "/descriptor.json", function(article, i) {
        $( "#carousel-entries" ).append(self.carousel_entry(article, i));
        $('.item').removeClass('active');
        $('.item').first().addClass('active');
        $('.carousel-indicators > li').removeClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#carousel-example-generic').carousel();

      }).error(function() { alert("error loading article: "+art_id); });
    }

  }

}
