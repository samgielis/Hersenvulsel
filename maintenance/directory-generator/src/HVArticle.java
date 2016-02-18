import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class HVArticle {

	public String id;
	private String cat;
	private String day;
	private String time;

	private static String nl = System.lineSeparator();

	public HVArticle(String id, String category, String day, String time){
		this.id = id;
		this.cat = category;
		this.day = day;
		this.time = time;
	}

	public static HVArticle fromJSON(String path) throws FileNotFoundException, IOException, ParseException{
		
		String id, cat, day, time;

		JSONParser parser = new JSONParser();
		JSONObject article;

		article = (JSONObject) parser.parse(new InputStreamReader(new FileInputStream(path),  StandardCharsets.UTF_8));
		id 		= (String) article.get("id");
		cat 	= (String) article.get("category");
		day 	= (String) article.get("day");
		time 	= (String) article.get("time");

		return new HVArticle(id, cat, day, time);
	}
	
	public String toJSON() {
		String tabs1 = "\t";
		String tabs2 = "\t\t";
		String tabs3 = "\t\t\t";

		String json = tabs2 + "{" + nl;
		json += tabs3 + "\"id\":" + tabs2 + "\"" + this.id + "\"," + nl;
		json += tabs3 + "\"category\":" + tabs1 + "\"" + this.cat + "\"," + nl;
		json += tabs3 + "\"pubtime\":" + tabs1 + "\"" + this.day + " " + this.time + "\"" + nl;
		json += tabs2 + "}";

		return json;
	}
}