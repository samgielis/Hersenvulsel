/*
  THE TOP-MOST HERSENVULSEL (HV) OBJECT
  Constructs HV pages and their elements.
*/
var hv = function(){

  hv.prototype.navbar =  function(cat){
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
        navbar += "        <li><a href=\"..\/..\/..\/\">Home<\/a><\/li>";
        if(cat == "wetenschap"){
          navbar+= "<li><a class=\"active\" href=\"..\/..\/wetenschap\">Wetenschap<\/a><\/li>";
        } else {
          navbar+= "<li><a href=\"..\/..\/wetenschap\">Wetenschap<\/a><\/li>";
        }
        if(cat == "geschiedenis"){
          navbar += "        <li><a class=\"active\" href=\"..\/..\/geschiedenis\">Geschiedenis<\/a><\/li>";
        } else {
          navbar += "        <li><a href=\"..\/..\/geschiedenis\">Geschiedenis<\/a><\/li>";
        }
        if(cat == "mensen"){
          navbar += "        <li><a class=\"active\" href=\"..\/..\/mensen\">Mensen<\/a><\/li>";
        } else {
          navbar += "        <li><a href=\"..\/..\/mensen\">Mensen<\/a><\/li>";
        }
        if(cat == "natuur"){
          navbar += "        <li><a class=\"active\" href=\"..\/..\/natuur\">Natuur<\/a><\/li>";
        } else {
          navbar += "        <li><a href=\"..\/..\/natuur\">Natuur<\/a><\/li>";
        }
        if(cat == "entertainment"){
          navbar += "        <li><a class=\"active\" href=\"..\/..\/entertainment\">Entertainment<\/a><\/li>";
        } else {
          navbar += "        <li><a href=\"..\/..\/entertainment\">Entertainment<\/a><\/li>";
        }
        if(cat == "faitsdivers"){
          navbar += "        <li><a class=\"active\" href=\"..\/..\/faitsdivers\">Faits Divers<\/a><\/li>";
        } else {
          navbar += "        <li><a href=\"..\/..\/faitsdivers\">Faits Divers<\/a><\/li>";
        }
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

  hv.prototype.footer =  function(){
    var footer="";
        footer += "<div class=\"row hv-footer-inner-container\">";
        footer += "        <div class=\"container\">";
        footer += "          <div class=\"row\">";
        footer += "            <div class=\"col-sm-4\">";
        footer += "              <img class=\"logo-footer pull-left\"src=\"..\/..\/..\/img\/logo\/hv-footr.png\" \/>";
        footer += "              <div class=\"credits-label\">";
        footer += "                © <a class=\"footer-link-red\" href=\"http:\/\/facebook.com\/hersenvulsel\" target=\"_blank\">Hersenvulsel<\/a> 2016 <br>";
        footer += "                Design: <a class=\"footer-link-red\" href=\"https:\/\/be.linkedin.com\/in\/samgielis\" target=\"_blank\">Sam Gielis<\/a>";
        footer += "                <div class=\"footer-spacer\"><\/div>";
        footer += "              <\/div>";
        footer += "            <\/div>";
        footer += "            <div class=\"col-sm-4\">";
        footer += "              <div class=\"hv-footer-link-container\">";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/..\/\">Home<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/wetenschap\">Wetenschap<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/geschiedenis\">Geschiedenis<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/mensen\">Mensen<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/natuur\">Natuur<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/entertainment\">Entertainment<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/faitsdivers\">Faits Divers<\/a><br>";
        footer += "              <\/div>";
        footer += "              <div class=\"footer-spacer\"><\/div>";
        footer += "            <\/div>";
        footer += "            <div class=\"col-sm-4\">";
        footer += "              <div class=\"hv-footer-link-container\">";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/..\/privacybeleid\">PrivacyBeleid<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/..\/gebruiksvoorwaarden\">Gebruiksvoorwaarden<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/..\/contact\">Contact<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"..\/..\/..\/adverteren\">Adverteren<\/a>";
        footer += "              <\/div>";
        footer += "              <div class=\"footer-spacer\"><\/div>";
        footer += "            <\/div>";
        footer += "          <\/div>";
        footer += "        <\/div>";
        footer += "      <\/div>";
        footer += "    <\/div>";
        document.getElementById('hv-footer').innerHTML = footer;

  }

}

/*
  THE HV_ARTICLE OBJECT
  Constructs HV article pages and their elements.
*/
var hv_article = function(){
  hv_article.prototype.load = function(){
    $.getJSON("./descriptor.json", function(article) {
      $( "#hv-article-title" ).text(article.title);
    })
    .error(function() { alert("error loading article"); })
  }
}
