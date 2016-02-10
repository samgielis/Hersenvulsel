/*
  THE INDEX BUILDER (HV) OBJECT
  Constructs elements of the different Indexes (home and separate category indexes).
*/
var hv_index = function(){

  hv_index.prototype.titlethumb =  function(article_id, category, callback){
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

  hv_index.prototype.header = function(cat, prefix){
    var header="";
        if(cat != ""){
          header += "<div class=\"hv-pagehead header-" + cat + "\">";
        }
        else {
          header += "<div class=\"hv-pagehead" + cat + "\">";
        }
        header += "    <img  style=\"min-height: 90%; max-width: 95%; max-height: 14vw\" src=\"" + prefix + "img\/hv2-seethrough.png\"";
        //header += "    onmouseover=\"this.src='..\/..\/img\/hv3.png';\"";
        //header += "    onmouseout=\"this.src='..\/..\/img\/hv2.png';\"\/>";
        header += "  <\/div>";

      $( "#hv-header" ).html(header);
  }



}
