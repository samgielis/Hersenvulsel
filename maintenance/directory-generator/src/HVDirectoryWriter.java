import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


public class HVDirectoryWriter {

	private static String nl = System.lineSeparator();

	public static void write(String path, ArrayList<HVArticle>  articles){

		String json = "{" + nl;
		json += "\t"+"\"articles\":[" + nl;

		for (int i = 0; i < articles.size(); i++) {
			json += articles.get(i).toJSON();
			if(i != articles.size() - 1){
				json += ",";
			}
			json += nl;

		}

		json += "\t" + "]" + nl;
		json += "}";

		File oldDirectory = new File(path +  "/directory.json");
		oldDirectory.delete();

		File newDirectory = new File(path +  "/directory.json");
		try {
			newDirectory.createNewFile();
			try {
				PrintWriter out = new PrintWriter(newDirectory);
				out.println(json);
				out.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		System.out.println(json);
	}
}