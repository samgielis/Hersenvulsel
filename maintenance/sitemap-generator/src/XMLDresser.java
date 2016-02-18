import java.util.Calendar;


public class XMLDresser {
	
	private static String changefreq = "hourly";
	private static String nl = System.lineSeparator();
	public static String XMLVersion(){
		return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+nl;
	}
	
	public static String[] urlSet(){
		String [] urlSet = new String[2];
		urlSet[0] = "<urlset" + nl;
		urlSet[0]+= "\t xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"" + nl;
		urlSet[0]+= "\t xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"";
		urlSet[0]+= "\t xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9" + nl;
		urlSet[0]+= "\t\t  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">" + nl + nl;

		urlSet[1] = "</urlset>";
			           
		return urlSet;
	}
	
	public static String url(String articleID, String category){
		String urlXML = "";
		
		urlXML += "<url>" + nl;
		urlXML += "\t<loc>http://hersenvulsel.be/" + category + "/" + articleID + "/</loc>" + nl;
		
		String 	year = padding(Calendar.getInstance().get(Calendar.YEAR)),
				month 	= padding(Calendar.getInstance().get(Calendar.MONTH)),
				day 	= padding(Calendar.getInstance().get(Calendar.DAY_OF_MONTH)),
				hour 	= padding(Calendar.getInstance().get(Calendar.HOUR_OF_DAY)),
				minute 	= padding(Calendar.getInstance().get(Calendar.MINUTE)),
				second 	= padding(Calendar.getInstance().get(Calendar.SECOND));
		
		urlXML += "\t<lastmod>" + year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "+00:00</lastmod>" + nl;
		urlXML += "\t<changefreq>" + changefreq + "</changefreq>" + nl;
		urlXML += "</url>" + nl;
		
		return urlXML;
	}
	
	private static String padding(int number){
		if(number < 10)
			return "0" + number;
		else
			return "" + number;
	}
}