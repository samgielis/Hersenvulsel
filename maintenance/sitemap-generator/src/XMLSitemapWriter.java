import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;

public class XMLSitemapWriter {
	

	public static void generateSitemap(String path, String category){
		
		String sitemap = XMLDresser.XMLVersion();
		
		String[] urlSet = XMLDresser.urlSet();
		sitemap += urlSet[0];
		
		for (String article : HVCategoryReader.getArticleIDs(path))
			if( !article.contains("#TEMPLATE"))
				sitemap += XMLDresser.url(article, category);
		
		sitemap += urlSet[1];
		
		System.out.println(sitemap);
		
		File smFile = new File(path +"/sitemap.xml");
		try {
			smFile.createNewFile();
			try {
				PrintWriter out = new PrintWriter(smFile);
				out.println(sitemap);
				out.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
	}
}
