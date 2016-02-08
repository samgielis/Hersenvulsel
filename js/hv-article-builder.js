/*
THE HV_ARTICLE OBJECT
Constructs HV article pages and their elements.
*/
var hv_article = function(){

  // LOADS AND CONSTRUCTS AN ENTIRE ARTICLE PAGE
  hv_article.prototype.load = function(){
    $.getJSON("./descriptor.json", function(article) {
      hv.header(article.category, "../../");
      hv_article.title(article.title, article.category)
      $( "#hv-article-figcaption" ).html("<b>Credit: <\/b>" + article.img_credit);
      hv_article.share_social(article.id, article.category);
      hv_article.author_date(article.authorid, article.authorname, article.day);
      hv_article.article_content(article.content);
      hv_article.sidebar(article.category);

    })
    .error(function() { alert("error loading article"); })
  }

  // CONSTRUCTS THE TITLE AND CATEGORY TITLE
  hv_article.prototype.title = function(title, cat){
    $( "#hv-title-container" ).append("<h3 style=\"padding-top: 15px;\" class=\"hv-category-title hv-c-" + cat +"\">" + cat + "</h3>");
    $( "#hv-title-container" ).append("<h1 class=\"hv-article-title\" id=\"hv-article-title\">" + title + "</h1>");
  }

  // CONSTRUCTS THE SOCIAL SHARING BUTTONS FOR A GIVEN ARTICLE IN A GIVEN CATEGORY
  hv_article.prototype.share_social = function(artid, cat){
    var soc="";
    soc += "<!-- Facebook -->";
    soc += "<a href=\"http:\/\/www.facebook.com\/sharer.php?u=http:\/\/samgielis.github.io\/Hersenvulsel\/" + cat + "\/" + artid + "\" target=\"_blank\" style=\" text-decoration: none !important\">";
    soc += "    <img src=\"..\/..\/img\/soc\/fb.png\" alt=\"Share on Facebook\" onmouseover=\"this.src='..\/..\/img\/soc\/fb_hov.png';\"";
    soc += "     onmouseout=\"this.src='..\/..\/img\/soc\/fb.png';\" title=\"Share on Facebook\" \/>";
    soc += "<\/a>";
    soc += "<!-- Twitter -->";
    soc += "<a href=\"https:\/\/twitter.com\/share?url=http:\/\/samgielis.github.io\/Hersenvulsel\/" + cat + "\/" + artid +"&amp;text=Simple%20Share%20Buttons&amp;hashtags=hersenvulsel\" target=\"_blank\" style=\" text-decoration: none !important\">";
    soc += "    <img src=\"..\/..\/img\/soc\/twit.png\" alt=\"Share on Twitter\" onmouseover=\"this.src='..\/..\/img\/soc\/twit_hov.png';\"";
    soc += "    onmouseout=\"this.src='..\/..\/img\/soc\/twit.png';\" title=\"Share on Twitter\"\/>";
    soc += "<\/a>";
    soc += "<!-- Google+ -->";
    soc += "<a href=\"https:\/\/plus.google.com\/share?url=http:\/\/samgielis.github.io\/Hersenvulsel\/" + cat + "\/" + artid +"\" target=\"_blank\" style=\" text-decoration: none !important\">";
    soc += "    <img src=\"..\/..\/img\/soc\/g+.png\" alt=\"Share on Google+\" onmouseover=\"this.src='..\/..\/img\/soc\/g+_hov.png';\"";
    soc += "    onmouseout=\"this.src='..\/..\/img\/soc\/g+.png';\" title=\"Share on Google+\"\/>";
    soc += "<\/a>";

    $("#share-buttons").html(soc);
  }

  // CONSTRUCTS THE AUTHOR & DATE HEADER
  hv_article.prototype.author_date = function(authid, authname, date){
    $( "#author-and-date" ).html(hv_article.decorate_author_date(authid, authname, date));
  }

  hv_article.prototype.decorate_author_date = function(authid, name, date){
    var auth="";
    auth += "<div class=\"hv-author-thumbnail-container pull-left\">";
    auth += "            <a href=\"..\/..\/a\/" + authid + "\">";
    auth += "              <img title=\"" + name + "\" class=\"hv-author-thumbnail\" src=\"..\/..\/a\/" + authid + "\/" + authid + ".png\"\/>";
    auth += "            <\/a>";
    auth += "          <\/div>";
    auth += "          <div style=\"padding-left: 10px\">";
    auth += "            <p class=\"hv-author-name\"><a class=\"hv-author-name-link\" href=\"..\/..\/a\/" + authid + "\">" + name + "<\/a><\/p>";
    auth += "            <p class=\"hv-date-line\">18 Januari 2016<\/p>";
    auth += "          <\/div>";
    return auth;
  }

  // CONSTRUCTS THE "NIEUW" SIDEBAR FOR ARTICLES
  // contains the 4 newest articles that have been published on the website
  hv_article.prototype.sidebar = function(cat){
    $( ".hv-sidebar-head" ).addClass("header-" + cat);
    $( "#hv-sidebar-ads" ).text("RECLAME");
    $( "#hv-sidebar-newest" ).text("NIEUW");
    this.sidebar_more_x(cat);

  }

  hv_article.prototype.sidebar_more_x = function(cat){
    $( "#hv-sidebar-more-x" ).text("MEER " + cat.toUpperCase());


  }
  // CONSTRUCTS THE ARTICLE'S MAIN CONTENT
  // uses the content-type constructers as implemented below
  hv_article.prototype.article_content = function(content){
    for (var i = 0; i < content.length; i++) {
      switch (content[i].type) {
        case "paragraph":
          hv_article.paragraph(content[i].content);
          break;
        default:
          console.log("ignoring unsupported content-type: " + content[i].type);

      }
    }
  }



  ////////////////////////////////
  // CONTENT TYPES FOR ARTICLES //
  ////////////////////////////////

  // PARAGRAPH
  hv_article.prototype.paragraph = function(content){
    var p = "<p class=\"hv-content-body-p hv-10bot\">"
    p += content;
    p += "</p>"
    $( "#article_body" ).append(p);
  }

}
