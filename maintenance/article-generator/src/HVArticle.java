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
	public String title;
	public String keywords;

	public HVArticle(String id, String title, String keywords){
		this.id = id;
		this.title = title;
		this.keywords = keywords;
	}

	public static HVArticle fromJSON(String path) throws FileNotFoundException, IOException, ParseException{
		
		String id, title, keywords;

		JSONParser parser = new JSONParser();
		JSONObject article;

		article = (JSONObject) parser.parse(new InputStreamReader(new FileInputStream(path),  StandardCharsets.UTF_8));
		id 		= (String) article.get("id");
		title 	= (String) article.get("title");
		keywords 	= (String) article.get("keywords");

		return new HVArticle(id, title, keywords);
	}
}
