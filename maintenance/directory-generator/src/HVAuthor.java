import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

import javax.swing.JOptionPane;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


public class HVAuthor {
	
	public String id;
	private String fname;
	private String lname;
	private String url;
	public String urlname;
	private String contact;
	private String bio;
	public int count = 0;
	public int wcount = 0;
	public int gcount = 0;
	public int mcount = 0;
	public int ncount = 0;
	public int ecount = 0;
	public int fcount = 0;
	
	private static String nl = System.lineSeparator();
	
	public HVAuthor(String id, String fname, String lname, String url, String urlname, String contact, String bio){
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.url = url;
		this.urlname = urlname;
		this.contact = contact;
		this.bio = bio;
	}
	
	public static HVAuthor fromJSON(String path) throws FileNotFoundException, IOException, ParseException{
		
		String id, fname, lname, url, urlname, contact, bio;

		JSONParser parser = new JSONParser();
		JSONObject author;

		author = (JSONObject) parser.parse(new InputStreamReader(new FileInputStream(path),  StandardCharsets.UTF_8));
		id 		= (String) author.get("id");
		fname 	= (String) author.get("fname");
		lname 	= (String) author.get("lname");
		url 	= (String) author.get("url");
		urlname	= (String) author.get("urlname");
		contact	= (String) author.get("contact");
		bio		= (String) author.get("bio");
		
		return new HVAuthor(id, fname, lname, url, urlname, contact, bio);
	}

	public String toJSON() {
		
		String tabs1 = "\t";
		String tabs2 = "\t\t";
		String tabs3 = "\t\t\t";
	
		String json = tabs2 + "{" + nl;
		json += tabs3 + "\"id\":" + tabs2 + "\"" + this.id + "\"," + nl;
		json += tabs3 + "\"fname\":" + tabs1 + "\"" + this.fname + "\"," + nl;
		json += tabs3 + "\"lname\":" + tabs2 + "\"" + this.lname + "\"," + nl;
		json += tabs3 + "\"url\":" + tabs1 + "\"" + this.url + "\"," + nl;
		json += tabs3 + "\"urlname\":" + tabs2 + "\"" + this.urlname + "\"," + nl;
		json += tabs3 + "\"contact\":" + tabs1 + "\"" + this.contact + "\"," + nl;
		json += tabs3 + "\"bio\":" + tabs1 + "\"" + this.bio + "\"," + nl;
		json += tabs3 + "\"count\":" + tabs1 + "\"" + this.count + "\"," + nl;
		json += tabs3 + "\"wcount\":" + tabs1 + "\"" + this.wcount + "\"," + nl;
		json += tabs3 + "\"gcount\":" + tabs1 + "\"" + this.gcount + "\"," + nl;
		json += tabs3 + "\"mcount\":" + tabs1 + "\"" + this.mcount + "\"," + nl;
		json += tabs3 + "\"ncount\":" + tabs1 + "\"" + this.ncount + "\"," + nl;
		json += tabs3 + "\"ecount\":" + tabs1 + "\"" + this.ecount + "\"," + nl;
		json += tabs3 + "\"fcount\":" + tabs1 + "\"" + this.fcount + "\"" + nl;
		json += tabs2 + "}";
	
		return json;
	}
	
	public static void write(HVAuthor author){
		File oldDirectory = new File("../../a/" + author.id + "/descriptor.json");
		oldDirectory.delete();

		File newDirectory = new File("../../a/" + author.id + "/descriptor.json");
		try {
			newDirectory.createNewFile();
			try {
				PrintWriter out = new PrintWriter(new OutputStreamWriter(
						new FileOutputStream(newDirectory), StandardCharsets.UTF_8), true);
				out.println(author.toJSON());
				out.close();
			} catch (FileNotFoundException e) {
				JOptionPane.showMessageDialog(null, "Fout bij het schrijven van de descriptor voor auteur " + author.id, "Error",
		                JOptionPane.ERROR_MESSAGE);
			}
		} catch (IOException e1) {
			JOptionPane.showMessageDialog(null, "Fout bij het schrijven van de descriptor voor auteur " + author.id, "Error",
	                JOptionPane.ERROR_MESSAGE);
		}
	}
}
