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
      $( "#hv-article-figcaption" ).html("<i class=\"fa fa-camera\"></i> <b>Credit: <\/b>" + article.img_credit);
      hv_article.share_social(article.id, article.category, article.title);
      hv_article.author_date(article.authorid, article.authorname, article.day);
      hv_article.article_content(article);
      hv_article.sidebar(article.category);

    })
    .error(function() { alert("error loading article"); })
  }

  // CONSTRUCTS THE TITLE AND CATEGORY TITLE
  hv_article.prototype.title = function(title, cat){
	if(cat == "faitsdivers"){
		$( "#hv-title-container" ).append("<h3 class=\"hv-category-title-15px hv-c-" + cat +"\">faits divers</h3>");
	}
	else{
		$( "#hv-title-container" ).append("<h3 class=\"hv-category-title-15px hv-c-" + cat +"\">" + cat + "</h3>");
	}
    $( "#hv-title-container" ).append("<h1 class=\"hv-article-title\" id=\"hv-article-title\">" + title + "</h1>");
  }

  // CONSTRUCTS THE SOCIAL SHARING BUTTONS FOR A GIVEN ARTICLE IN A GIVEN CATEGORY
  hv_article.prototype.share_social = function(artid, cat, title){
    var soc="";
    soc += "<!-- Facebook -->";
    soc += "<a href=\"https:\/\/www.facebook.com\/sharer.php?u=https:\/\/hersenvulsel.be\/" + cat + "\/" + artid + "\" target=\"_blank\" style=\" text-decoration: none !important\">";
    soc += "    <img src=\"..\/..\/img\/soc\/fb.png\" alt=\"Share on Facebook\" onmouseover=\"this.src='..\/..\/img\/soc\/fb_hov.png';\"";
    soc += "     onmouseout=\"this.src='..\/..\/img\/soc\/fb.png';\" title=\"Share on Facebook\" \/>";
    soc += "<\/a>";
    soc += "<!-- Twitter -->";
    soc += "<a href=\"https:\/\/twitter.com\/share?url=https:\/\/hersenvulsel.be\/" + cat + "\/" + artid +"&amp;text=Hersenvulsel - " + title + "&amp;hashtags=hersenvulsel\" target=\"_blank\" style=\" text-decoration: none !important\">";
    soc += "    <img src=\"..\/..\/img\/soc\/twit.png\" alt=\"Share on Twitter\" onmouseover=\"this.src='..\/..\/img\/soc\/twit_hov.png';\"";
    soc += "    onmouseout=\"this.src='..\/..\/img\/soc\/twit.png';\" title=\"Share on Twitter\"\/>";
    soc += "<\/a>";
    soc += "<!-- Google+ -->";
    soc += "<a href=\"https:\/\/plus.google.com\/share?url=https:\/\/hersenvulsel.be\/" + cat + "\/" + artid +"\" target=\"_blank\" style=\" text-decoration: none !important\">";
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
    var datum = date.split("/");
    var auth="";
    auth += "<div class=\"hv-author-thumbnail-container pull-left\">";
    auth += "            <a href=\"..\/..\/a\/" + authid + "\">";
    auth += "              <img title=\"" + name + "\" class=\"hv-author-thumbnail\" src=\"..\/..\/a\/" + authid + "\/" + "profiel.png\"\/>";
    auth += "            <\/a>";
    auth += "          <\/div>";
    auth += "          <div style=\"padding-left: 10px\">";
    auth += "            <p class=\"hv-author-name\"><a class=\"hv-author-name-link\" href=\"..\/..\/a\/" + authid + "\">" + name + "<\/a><\/p>";
	if(datum[2].charAt(0) == "0"){
		datum[2] = datum[2].charAt(1);
	}
    auth += "            <p class=\"hv-date-line\">" + datum[2] + " " + this.month_to_monthname(datum[1]) + " " + datum[0] + "<\/p>";
    auth += "          <\/div>";
    return auth;
  }

  // TRANSFORMS A MONTH NUMERAL TO ITS DUTCH NAME
  hv_article.prototype.month_to_monthname = function(month_numeral){
    var res = "";
    switch (month_numeral) {
      case "01":
        res = "Januari";
        break;
      case "02":
        res = "Februari";
        break;
      case "03":
        res = "Maart";
        break;
      case "04":
        res = "April";
        break;
      case "05":
        res = "Mei";
        break;
      case "06":
        res = "Juni";
        break;
      case "07":
        res = "Juli";
        break;
      case "08":
        res = "Augustus";
        break;
      case "09":
        res = "September";
        break;
      case "10":
        res = "Oktober";
        break;
      case "11":
        res = "November";
        break;
      case "12":
        res = "December";
        break;
      default:
        res = "Onbekend"

    }
    return res;
  }

  // CONSTRUCTS THE "NIEUW" & "MEER ARTIKELS" SIDEBARS FOR ARTICLES
  hv_article.prototype.sidebar = function(cat){
    $( ".hv-sidebar-head" ).addClass("header-" + cat);
    $( "#hv-sidebar-ads" ).text("RECLAME");
    $( "#hv-sidebar-newest" ).text("NIEUW");
    this.sidebar_more_x(cat);
    this.sidebar_newest(cat);
  }


  // FILLS 'MEER ARTIKELS' WITH RANDOM SUGGESTIONS WITHIN THE SAME CATEGORY.
  hv_article.prototype.sidebar_more_x = function(cat){
	if(cat == "faitsdivers"){
		$( "#hv-sidebar-more-x-title" ).text("MEER " + "faits divers".toUpperCase());
	} else {
		$( "#hv-sidebar-more-x-title" ).text("MEER " + cat.toUpperCase());
	}

    $.getJSON("../directory.json", function(directory) {

      var suggestions = directory.articles;
      suggestions = randomize(suggestions);

      var suggamt = 4;

      if(suggestions.length < suggamt){
        suggamt = suggestions.length
      }
      for (var i = 0; i <= suggamt; i++) {
        $.getJSON("../../" + suggestions[i].category + "/" + suggestions[i].id + "/descriptor.json", function(article) {
          var entry = "<a href=\"../../" + article.category + "/" + article.id + "\" class=\"list-group-item sidebar-article-entry\">" + article.title + "</a>";
          $( "#hv-sidebar-more-x-list" ).append(entry);
        })
        .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het suggereren van andere artikelen binnen deze categorie. Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})})

      }
    })
    .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het suggereren van andere artikelen binnen deze categorie. Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})})

  }

  // contains the 6 newest articles that have been published on the website
  hv_article.prototype.sidebar_newest = function(cat){
    $( "#hv-sidebar-newest-title" ).text("NIEUW");

    var cats = ["wetenschap", "natuur", "mensen", "geschiedenis", "entertainment", "faitsdivers"];
    var allarticles = [];
    var count = 0;
    for (var i = 0; i < cats.length; i++) {
      $.getJSON("../../" + cats[i] + "/directory.json", function(directory) {
        var newest = directory.articles;
        set_newest_first(newest);
        newest = newest.slice(0,5);
        $.merge(allarticles, newest);
        count = count + 1;
        if(count >= 6){
          set_newest_first(allarticles);
          allarticles = allarticles.slice(0,5);

          for (var i = 0; i < allarticles.length; i++) {
            $.getJSON("../../" + allarticles[i].category + "/" + allarticles[i].id + "/descriptor.json", function(article) {
              var entry = "<a href=\"../../" + article.category + "/" + article.id + "\" class=\"list-group-item sidebar-article-entry\">" + article.title + "</a>";
              $( "#hv-sidebar-newest-list" ).append(entry);
            })
            .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het maken van de suggestie voor het artikels met de link: " + allarticles[i].category + "/" + allarticles[i].id + ". Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})})
          }
        }
      })
      .error(function() { swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het ophalen van de nieuwste artikels. Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"})})
    }

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

  // RANDOMIZES AN ARRAY
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




  // CONSTRUCTS THE ARTICLE'S MAIN CONTENT
  // uses the content-type constructers as implemented below
  hv_article.prototype.article_content = function(article){
    var content = article.content;
    for (var i = 0; i < content.length; i++) {
      switch (content[i].type) {
        case "paragraph":
          hv_article.paragraph(content[i].content);
          break;
        case "embed":
          hv_article.embed(content[i].code);
          break;
        case "image":
          hv_article.image(content[i].name, content[i].credit);
          break;
        default:
          console.log("ignoring unsupported content-type: " + content[i].type);

      }
    }
	
	hv_article.source_ref(article, $( "#article_body" ));
	hv_article.facebook_cta($( "#article_body" ));
  }

  hv_article.prototype.source_ref = function(article, elementToAppendTo) {
	  var source = "<span id=\"hv-most-recent-source-p\" style=\"text-transform: uppercase; font-size: 0.6em !important; padding-top: 22px; display: table;\">";
		source    +=    "<img src=\"../../img/source.png\" title=\"Bron\" style=\"width: 23px;\"/>";
		source    +=    "<a id=\"hv-most-recent-source-a\" href=\"" + article.source_url + "\" target=\"_blank\" style=\"padding-left: 10px; display: table-cell;  vertical-align: middle;\">";
		source    +=      article.source_name;
		source    +=    "</a>";
		source    += "</span>";
		elementToAppendTo.append(source);
  }

  hv_article.prototype.facebook_cta = function(elementToAppendTo) {
	  var cta = "<p style='text-align: center; margin-top: 1.5em;'>";
	  cta	+= "<a href='https://facebook.com/hersenvulsel' onclick='hv_article.handle_fb_cta_click()' target='_blank'><i>Interessant? Zin in meer? Volg ons via Facebook!</i></a>";
	  cta	+= "</p>";
	  elementToAppendTo.append(cta);
  }
  
  hv_article.prototype.handle_fb_cta_click = function () {
	  ga('send', 'event', {
			eventCategory: 'Outbound Link',
			eventAction: 'fb_cta_click',
			eventLabel: window.location.pathname
		});
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

  // EMBED
  hv_article.prototype.embed = function(code){
    var div = "<div style=\"padding-top: 35px; margin-top:30px; margin-bottom: 10px\" class=\"hv-10bot embed-responsive embed-responsive-16by9\">";
    div += code;
    div += "</div>"
    $( "#article_body" ).append(div);
  }

  // IMAGE
  hv_article.prototype.image = function(name, credit){
    var img = "<figure style=\"padding-top: 20px; padding-bottom: 20px;\">";
        img +=  "<img src=\"./img/" + name + "\" style=\"max-width: 100%\"/>";
        if(credit != ""){
          img +=      "<figcaption class=\"hv-article-figcaption\" style=\"font-size: 0.4em;\">";
          img +=        "<i class=\"fa fa-camera\"></i><b> credit: </b>" + credit;
          img +=      "</figcaption>";
        }
        img += "</figure>";
    $( "#article_body" ).append(img);
  }
}
