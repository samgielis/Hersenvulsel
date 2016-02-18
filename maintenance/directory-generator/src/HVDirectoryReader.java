import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;

import org.json.simple.parser.ParseException;


public class HVDirectoryReader {
	
	public static ArrayList<HVArticle> read(String path){
		
		File file = new File(path);
		
		String[] articles = file.list(new FilenameFilter() {
		  @Override
		  public boolean accept(File current, String name) {
		    return new File(current, name).isDirectory();
		  }
		});
		
		ArrayList<HVArticle> directory = new ArrayList<HVArticle>();
		
		for (String article : articles)
			if( !article.contains("#TEMPLATE"))
				try {
					directory.add(HVArticle.fromJSON(path + "/" + article + "/descriptor.json"));
				} catch (IOException | ParseException e) {
					e.printStackTrace();
				} 
		return directory;
	}
}
