/*
  THE CATEGORY BUILDER OBJECT
  Constructs the index page for a given category and its elements.
*/
var hv_category = function(){

  hv_category.prototype.load = function(cat){


  }

  hv_category.prototype.titlethumb =  function(article_id, category, callback){
    var navbar="";
        navbar += "<div id=\"nav\"  >";
        navbar += "    <div class=\"navbar navbar-inverse navbar-static\" style=\"z-index: 10;\">";
        navbar += "      <div class=\"container\">";
        navbar += "        <!-- .btn-navbar is used as the toggle for collapsed navbar content -->";
        navbar += "        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">";
        navbar += "          <span class=\"icon-bar\"><\/span><span class=\"icon-bar\"><\/span><span class=\"icon-bar\"><\/span>";
        navbar += "        <\/button>";
        navbar += "    <div class=\"navbar-collapse collapse\" >";
        navbar += "      <ul class=\"nav  navbar-nav\">";
        navbar += "        <li><a href=\"" + prefix +"\">Home<\/a><\/li>";
        navbar += "        <li><a href=\"" + prefix + "wetenschap\">Wetenschap<\/a><\/li>";
        navbar += "        <li><a href=\"" + prefix + "geschiedenis\">Geschiedenis<\/a><\/li>";
        navbar += "        <li><a href=\"" + prefix + "mensen\">Mensen<\/a><\/li>";
        navbar += "        <li><a href=\"" + prefix + "natuur\">Natuur<\/a><\/li>";
        navbar += "        <li><a href=\"" + prefix + "entertainment\">Entertainment<\/a><\/li>";
        navbar += "        <li><a href=\"" + prefix + "faitsdivers\">Faits Divers<\/a><\/li>";
        navbar += "      <\/ul>";
        navbar += "      <ul class=\"nav pull-right navbar-nav\">";
        navbar += "        <li><a href=\"https:\/\/facebook.com\/hersenvulsel\" target=\"_blank\" ><i class=\"fa fa-facebook fa-lg\"><\/i><\/a><\/li>";
        navbar += "        <li><a href=\"#\"><i class=\"fa fa-envelope fa-lg\"><\/i>  <\/a><\/li>";
        navbar += "      <\/ul>";
        navbar += "    <\/div><\/div><\/div><\/div>";
        document.getElementById('nav-wrapper').innerHTML = navbar;
        $('#nav').affix({
          offset: {
            top: $('header').height()
          }});
  }

  hv_category.prototype.most_recent = function(art_id, cat){

    // set category title
    $( "#hv-most-recent-cat-title" ).addClass( "hv-c-" + cat);
    $( "#hv-most-recent-cat-title" ).text(cat);

    // set lees meer
    $( "#hv-lees-meer-b" ).addClass( "hv-c-" + cat);
    $( "#hv-lees-meer-a" ).attr("href","../" + cat + "/" + art_id );

    // set main image
    $( "#most_recent_img" ).attr("src","../" + cat + "/" + art_id + "/img/main.jpg");

    // get article data
    alert("../"+cat+"/"+art_id+"/descriptor.json");
    $.getJSON("../"+cat+"/"+art_id+"/descriptor.json", function(article) {

      // set most recent title
      $("#hv-most-recent-title").text(article.title);

      // set author and date
      var date = article.day.split("/");
      $("#author-date-most-recent").text(date[2] + "/" + date[1] + "/" + date[0] +" - " + article.authorname);

      // set most recent source
      $( "#hv-most-recent-source-a").addClass("hv-c-" + cat);
      $( "#hv-most-recent-source-a" ).attr("href",article.source_url);
      $( "#hv-most-recent-source-a" ).text(article.source_name);

      // set first 225 content characters (or full content if < 225 characters).
      var fullcontent =""
      for (var i = 0; i < article.content.length; i++) {
        switch (article.content[i].type) {
          case "paragraph":
            fullcontent += article.content[i].content + " ";
            break;
          default:
            console.log("ignoring unsupported content-type: " + article.content[i].type);
        }
      }
      if(fullcontent.length < 225){
        $("#most-recent-content").text(fullcontent);
      }
      else{
        $("#most-recent-content").text(fullcontent.substring(0,224) + " [...]");
      }


    })
    .error(function() { alert("error loading article: "+art_id); })

  }



}
