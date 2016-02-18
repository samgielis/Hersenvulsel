import java.io.File;
import java.io.IOException;

public class HVSitemapBuilder {
	
	public static String path2 = "D:/programming/Hersenvulsel/git-repository/Hersenvulsel/";

	private static String[] categories = new String[]{	
														"wetenschap", "geschiedenis", "natuur", "mensen",
														"faitsdivers", "entertainment"
													};
	public static void buildAll(String path){
		for (String cat : categories) {
			deleteSitemap(path + cat);
			XMLSitemapWriter.generateSitemap(path + cat, cat);
		}
	}
	
	private static void deleteSitemap(String path){
		File oldSitemap = new File(path +  "/sitemap.xml");
		oldSitemap.delete();
	}

	public static void main(String[] args) {
		try {
			File f = new File("../../");
			String path = f.getCanonicalPath() +"/";
			HVSitemapBuilder.buildAll(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
