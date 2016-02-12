/*
  THE CATEGORY BUILDER OBJECT
  Constructs the index page for a given category and its elements.
*/
var hv_category = function(){

  hv_category.prototype.most_recent = function(art_id, cat, supercat){

    // set category title
    $( "#hv-most-recent-mr" ).addClass( "hv-c-" + supercat);
    $( "#hv-most-recent-cat-title" ).addClass( "hv-c-" + supercat);
    $( "#hv-most-recent-cat-title" ).text(cat);

    // set lees meer
    $( "#hv-lees-meer-a" ).addClass( "hv-c-" + supercat);
    $( "#hv-lees-meer-a" ).attr("href","../" + cat + "/" + art_id );

    // set meer artikels
    $( "#hv-meer-artikels" ).addClass( "hv-c-" + supercat);

    // set main image
    $( "#most_recent_img" ).attr("src","../" + cat + "/" + art_id + "/img/main.jpg");

    // get article data
    $.getJSON("../"+cat+"/"+art_id+"/descriptor.json", function(article) {

      // set most recent title
      $("#hv-most-recent-title").text(article.title);

      // set author and date
      var date = article.day.split("/");
      $("#author-date-most-recent").html(date[2] + "/" + date[1] + "/" + date[0] +" - <a style=\"color: #333333; !important;\" href=\"../a/" + article.authorid + "\">" + article.authorname + "</a>");

      // set most recent source
      $( "#hv-most-recent-source-a").addClass("hv-c-" + supercat);
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
