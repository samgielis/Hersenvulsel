/*
  THE CATEGORY BUILDER OBJECT
  Constructs the index page for a given category and its elements.
*/
var hv_category = function(){

  hv_category.prototype.most_recent = function(art_id, cat, supercat){

    // set category title
    $( "#hv-most-recent-mr" ).addClass( "hv-c-" + supercat);
    $( "#hv-most-recent-cat-title" ).addClass( "hv-c-" + supercat);
	if(cat == "faitsdivers"){
		$( "#hv-most-recent-cat-title" ).text("faits divers");
	} else {
		$( "#hv-most-recent-cat-title" ).text(cat);
	}

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
      $("#hv-most-recent-title").html("<a style=\"color: inherit;\" href=\"../" + article.category + "/" + article.id + "\"> " + article.title + " </a>");

      // set author and date
      var date = article.day.split("/");
      $("#author-date-most-recent").html(date[2] + "/" + date[1] + "/" + date[0] +" - <a style=\"color: #333333; !important;\" href=\"../a/" + article.authorid + "\">" + article.authorname + "</a>");

      // set most recent source
      $( "#hv-most-recent-source-a").addClass("hv-c-" + supercat);
      $( "#hv-most-recent-source-a" ).attr("href",article.source_url);
      $( "#hv-most-recent-source-a" ).text(article.source_name);

      $("#most-recent-content").text(article_text_preview(article, 225) + " [...]");


    })
    .error(function() { alert("error loading article: "+art_id); })

  }



}

function article_text_preview(article, n){
	var fullcontent =""
    for (var i = 0; i < article.content.length; i++) {
      if (article.content[i].type == "paragraph") {
          fullcontent += article.content[i].content + " ";
      }
    }
	//trim the string to the maximum length
	var preview = fullcontent.substr(0, n);

	//re-trim if we are in the middle of a word
	preview = preview.substr(0, Math.min(preview.length, preview.lastIndexOf(" ")));	
		
	return preview;
}