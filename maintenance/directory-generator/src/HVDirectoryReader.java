import java.io.File;
import java.io.FileNotFoundException;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;

import javax.swing.JOptionPane;

import org.json.simple.parser.ParseException;


public class HVDirectoryReader {
	
	public static ArrayList<HVArticle> read(String path){
		
		String[] articles = getDirectoryEntries(path);
		
		ArrayList<HVArticle> directory = new ArrayList<HVArticle>();
		
		for (String article : articles)
			if( !article.contains("#TEMPLATE"))
				try {
					directory.add(HVArticle.fromJSON(path + "/" + article + "/descriptor.json"));
				} catch (ParseException e) {
					JOptionPane.showMessageDialog(null, "Er is een probleem met de codering van " + article + "/descriptor.json", "Error",
			                JOptionPane.ERROR_MESSAGE);
				} catch (FileNotFoundException e) {
					JOptionPane.showMessageDialog(null, "Het bestand " + path + "/" + article +" bestaat niet.", "Error",
			                JOptionPane.ERROR_MESSAGE);
				} catch (IOException e) {
					JOptionPane.showMessageDialog(null, "Er is een probleem met het inlezen van " + article, "Error",
			                JOptionPane.ERROR_MESSAGE);
				} 
		return directory;
	}

	static String[] getDirectoryEntries(String path) {
		File file = new File(path);
		
		String[] articles = file.list(new FilenameFilter() {
		  @Override
		  public boolean accept(File current, String name) {
		    return new File(current, name).isDirectory();
		  }
		});
		return articles;
	}
}
