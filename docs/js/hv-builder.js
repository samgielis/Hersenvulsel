/*
  THE TOP-MOST HERSENVULSEL (HV) OBJECT
  Constructs HV pages and their elements.
*/
var hv = function(){

  hv.prototype.navbar =  function(prefix){
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
        navbar += "        <li><a href=\"https:\/\/facebook.com\/hersenvulsel\" onclick='hv.handle_navbar_fbbutton_click()' target=\"_blank\" ><i class=\"fa fa-facebook fa-lg\"><\/i><\/a><\/li>";
        navbar += "        <li><a href=\"" + prefix + "contact" + "\"><i class=\"fa fa-envelope fa-lg\"><\/i>  <\/a><\/li>";
        navbar += "      <\/ul>";
        navbar += "    <\/div><\/div><\/div><\/div>";
        document.getElementById('nav-wrapper').innerHTML = navbar;
        $('#nav').affix({
          offset: {
            top: $('header').height()
          }});
  }
  
  hv.prototype.handle_navbar_fbbutton_click = function(){
	  ga('send', 'event', {
			eventCategory: 'Outbound Link',
			eventAction: 'navbar_fbbutton_click',
			eventLabel: window.location.pathname
		});
  }

  hv.prototype.header = function(cat, prefix){
    var header="";
        if(cat == ""){
          cat = "default"
        }
        header += "<div class=\"hv-pagehead header-" + cat + "\">";

        header += "    <img  style=\"padding-top: 0.49vw; max-width: 95%; max-height: 95%\" src=\"" + prefix + "img\/header-" + cat + ".png\"";
        //header += "    onmouseover=\"this.src='..\/..\/img\/hv3.png';\"";
        //header += "    onmouseout=\"this.src='..\/..\/img\/hv2.png';\"\/>";
        header += "  <\/div>";

      $( "#hv-header" ).html(header);
  }

  hv.prototype.footer =  function(prefix){
    var currentYear = new Date().getUTCFullYear();
    var footer="";
        footer += "<div class=\"row hv-footer-inner-container\">";
        footer += "        <div class=\"container\">";
        footer += "          <div class=\"row\">";
        footer += "            <div class=\"col-sm-4\">";
        footer += "              <img class=\"logo-footer pull-left\"src=\"" + prefix + "img\/logo\/hv-footr.png\" \/>";
        footer += "              <div class=\"credits-label\">";
        footer += "                © <a class=\"footer-link-red\" href=\"https:\/\/facebook.com\/hersenvulsel\" target=\"_blank\">Hersenvulsel<\/a> "+ currentYear + " <br>";
        footer += "                Design: <a class=\"footer-link-red\" href=\"https:\/\/be.linkedin.com\/in\/samgielis\" target=\"_blank\">Sam Gielis<\/a>";
        footer += "                <div class=\"footer-spacer\"><\/div>";
        footer += "              <\/div>";
        footer += "            <\/div>";
        footer += "            <div class=\"col-sm-4\">";
        footer += "              <div class=\"hv-footer-link-container\">";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "\">Home<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "wetenschap\">Wetenschap<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "geschiedenis\">Geschiedenis<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "mensen\">Mensen<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "natuur\">Natuur<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "entertainment\">Entertainment<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "faitsdivers\">Faits Divers<\/a><br>";
		footer += "                <a class=\"footer-link\" href=\"" + prefix + "random\">Random<\/a><br>";
        footer += "              <\/div>";
        footer += "              <div class=\"footer-spacer\"><\/div>";
        footer += "            <\/div>";
        footer += "            <div class=\"col-sm-4\">";
        footer += "              <div class=\"hv-footer-link-container\">";
		footer += "                <a class=\"footer-link\" href=\"" + prefix + "contact\">Contact<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "adverteren\">Adverteren<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "cookies-en-privacy\">Cookies & Privacy<\/a><br>";
        footer += "                <a class=\"footer-link\" href=\"" + prefix + "gebruiksvoorwaarden\">Gebruiksvoorwaarden<\/a>";
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
