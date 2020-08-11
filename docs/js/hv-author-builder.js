/*
THE HV_AUTHOR OBJECT
Constructs HV author pages and their elements.
*/
var hv_author = function(){

  // LOADS AND CONSTRUCTS AN ENTIRE AUTHOR PAGE
  hv_author.prototype.load = function(){
    $.getJSON("./descriptor.json", function(author) {

      // author name
      $( '#hv-auth-name').html(author.fname + " " + author.lname);

      // author bio
      $( '#hv-auth-bio').html(author.bio);

      // author website
      $( '#hv-auth-link').attr('href', author.url);
      $( '#hv-auth-link').text(author.urlname);

      // author mail
      $( '#hv-auth-mail').attr('href', "mailto:"+author.contact);
      $( '#hv-auth-mail').text(author.contact);

      // author total work
      $( '#hv-most-recent-mr').append(" " + author.fname + " (" + author.count + ")")

      // author work chart
      var others = [parseFloat(author.wcount),parseFloat(author.gcount),parseFloat(author.mcount),
                    parseFloat(author.ncount),parseFloat(author.ecount),parseFloat(author.fcount)];

      $(function () {
      $('#author-chart').highcharts({
          credits: false,
          colors: ['#2869a4', '#e9d822', '#de3737', '#4ea648', '#8833af', '#ff8534'],
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
			  margin: [0, 0, 0, 0],
			  spacingTop: 0,
			  spacingBottom: 0,
			  spacingLeft: 0,
			  spacingRight: 0
			  /*
              spacingTop: -50,
              spacingBottom: -50,
              spacingLeft: 0,
              spacingRight: 0,
              marginTop: -50,
              marginBottom: -50,
              marginLeft: 0,
              marginRight: 0*/
          },
          title: {
              text: ''
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
					  size:'100%',
                      enabled: true,
                      format: '<b>{point.name}</b>: <b>{point.y:1f} art.</b>',
                      style: {
                          color: '#222222'
                      }
                  }
              }
          },
          series: [{
              name: 'Categorie',
              colorByPoint: true,
              data: [{
                  name: 'Wetenschap',
                  y: parseFloat(author.wcount),
                  sliced: isHighest(parseFloat(author.wcount), others),
                  selected: isHighest(parseFloat(author.wcount), others)
              }, {
                  name: 'Geschiedenis',
                  y: parseFloat(author.gcount),
                  sliced: isHighest(parseFloat(author.gcount), others),
                  selected: isHighest(parseFloat(author.gcount), others)
              }, {
                  name: 'Mensen',
                  y: parseFloat(author.mcount),
                  sliced: isHighest(parseFloat(author.mcount), others),
                  selected: isHighest(parseFloat(author.mcount), others)
              }, {
                  name: 'Natuur',
                  y: parseFloat(author.ncount),
                  sliced: isHighest(parseFloat(author.ncount), others),
                  selected: isHighest(parseFloat(author.ncount), others)
              }, {
                  name: 'Entertainment',
                  y: parseFloat(author.ecount),
                  sliced: isHighest(parseFloat(author.ecount), others),
                  selected: isHighest(parseFloat(author.ecount), others)
              }, {
                  name: 'Faits Divers',
                  y: parseFloat(author.fcount),
                  sliced: isHighest(parseFloat(author.fcount), others),
                  selected: isHighest(parseFloat(author.fcount), others)
              }]
          }]
      });
  });

    })
    .error(function() {  swal({   title: "Oeps...", type: "error", html: true, text:"Er heeft zich een probleem voorgedaan bij het ophalen van de gegevens voor deze auteur. Dat spijt ons, waarschijnlijk hebben we ergens een dom foutje gemaakt. Laat jij het even weten op <a href=\"mailto:bugs@hersenvulsel.be\">bugs@hersenvulsel.be</a>? Dan lossen wij het zo snel mogelijk op. Bedankt!"}); })
  }

  function isHighest(val, others){
    for (var i = 0; i < others.length; i++) {
      if (val < others[i]) {
        return false;
      }
    }
    return true;
  }
}
