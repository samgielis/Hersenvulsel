import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.swing.JOptionPane;

import org.json.simple.parser.ParseException;


public class HVAuthorDirectoryGenerator {

	private static String[] categories = new String[]{	
		"wetenschap", "geschiedenis", "natuur", "mensen",
		"faitsdivers", "entertainment"
	};
	
	public static void generate() {
		try {
			File a = new File("../../a/");
			String apath = a.getCanonicalPath();
			String[] authors = HVDirectoryReader.getDirectoryEntries(apath);
			for (String authorid : authors) {
				ArrayList<HVArticle> entries = getArticlesFor(authorid);
				File aid = new File("../../a/" + authorid+"/");
				File adesc = new File("../../a/" + authorid+"/descriptor.json");
				HVAuthor author;
				try {
					author = HVAuthor.fromJSON(adesc.getCanonicalPath());
					for (HVArticle art : entries) {
						switch (art.cat) {
						case "wetenschap":
							author.count++;
							author.wcount++;
							break;
						case "geschiedenis":
							author.count++;
							author.gcount++;
							break;
						case "mensen":
							author.count++;
							author.mcount++;
							break;
						case "natuur":
							author.count++;
							author.ncount++;
							break;
						case "entertainment":
							author.count++;
							author.ecount++;
							break;
						case "faitsdivers":
							author.count++;
							author.fcount++;
							break;
						}
					}
					HVAuthor.write(author);
				} catch (ParseException e) {
					JOptionPane.showMessageDialog(null, "Fout bij het lezen van de descriptor voor auteur "+authorid, "Error",
			                JOptionPane.ERROR_MESSAGE);
				}
				String authorpath = aid.getCanonicalPath();
				HVDirectoryWriter.write(authorpath, entries);
			}
		} catch (IOException e1) {
			JOptionPane.showMessageDialog(null, "Het genereren van de directories voor de auteurs is mislukt.", "Error",
	                JOptionPane.ERROR_MESSAGE);
		}
	}
	
	public static ArrayList<HVArticle> getArticlesFor(String authorid){
		ArrayList<HVArticle> directory = new ArrayList<HVArticle>();
		for (String cat : categories) {
			File d = new File("../../"+cat);
			String path;
			try {
				path = d.getCanonicalPath();
				ArrayList<HVArticle> articles = HVDirectoryReader.read(path);
				HVDirectoryWriter.write(path, articles);
				for (HVArticle art : articles)
					if(art.authid.equalsIgnoreCase(authorid))
						directory.add(art);
												
			} catch (IOException e) {
				JOptionPane.showMessageDialog(null, "Het checken van de categorie " + cat + " voor de auteur met id " + authorid + " is mislukt", "Error",
		                JOptionPane.ERROR_MESSAGE);
			}	
		}
		
		return directory;
	}
}
