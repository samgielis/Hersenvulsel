/*
  THE HV_ARTICLE OBJECT
  Constructs HV article pages and their elements.
*/
var hv_article = function(){

  hv_article.prototype.load = function(){
    $.getJSON("./descriptor.json", function(article) {
      $( "#hv-article-title" ).text(article.title);
      $( "#hv-category-title" ).text(article.category);
      $( "#hv-article-figcaption" ).html("<b>Credit: <\/b>" + article.img_credit);
      hv_article.sharesocial(article.id, article.category);
      $('#fb-comments').data('href', "http://samgielis.github.io/Hersenvulsel/c/" + article.category + "/" + article.id);
    })
    .error(function() { alert("error loading article"); })
  }

/*
  Constructs the social sharing buttons for a given article in a given category.
*/
  hv_article.prototype.sharesocial = function(artid, cat){
    var soc="";
        soc += "<!-- Facebook -->";
        soc += "<a href=\"http:\/\/www.facebook.com\/sharer.php?u=http:\/\/samgielis.github.io\/Hersenvulsel\/c\/" + cat + "\/" + artid + "\" target=\"_blank\" style=\" text-decoration: none !important\">";
        soc += "    <img src=\"..\/..\/..\/img\/soc\/fb.png\" alt=\"Share on Facebook\" onmouseover=\"this.src='..\/..\/..\/img\/soc\/fb_hov.png';\"";
        soc += "     onmouseout=\"this.src='..\/..\/..\/img\/soc\/fb.png';\" title=\"Share on Facebook\" \/>";
        soc += "<\/a>";
        soc += "<!-- Twitter -->";
        soc += "<a href=\"https:\/\/twitter.com\/share?url=http:\/\/samgielis.github.io\/Hersenvulsel\/c\/" + cat + "\/" + artid +"&amp;text=Simple%20Share%20Buttons&amp;hashtags=hersenvulsel\" target=\"_blank\" style=\" text-decoration: none !important\">";
        soc += "    <img src=\"..\/..\/..\/img\/soc\/twit.png\" alt=\"Share on Twitter\" onmouseover=\"this.src='..\/..\/..\/img\/soc\/twit_hov.png';\"";
        soc += "    onmouseout=\"this.src='..\/..\/..\/img\/soc\/twit.png';\" title=\"Share on Twitter\"\/>";
        soc += "<\/a>";
        soc += "<!-- Google+ -->";
        soc += "<a href=\"https:\/\/plus.google.com\/share?url=http:\/\/samgielis.github.io\/Hersenvulsel\/c\/" + cat + "\/" + artid +"\" target=\"_blank\" style=\" text-decoration: none !important\">";
        soc += "    <img src=\"..\/..\/..\/img\/soc\/g+.png\" alt=\"Share on Google+\" onmouseover=\"this.src='..\/..\/..\/img\/soc\/g+_hov.png';\"";
        soc += "    onmouseout=\"this.src='..\/..\/..\/img\/soc\/g+.png';\" title=\"Share on Google+\"\/>";
        soc += "<\/a>";

      $("#share-buttons").html(soc);
  }
}
