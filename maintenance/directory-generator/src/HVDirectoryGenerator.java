import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

public class HVDirectoryGenerator {

	private static String[] categories = new String[]{	
		"wetenschap", "geschiedenis", "natuur", "mensen",
		"faitsdivers", "entertainment"
	};
	
	public static void main(String[] args) throws IOException {
		for (String cat : categories) {
			File d = new File("../../"+cat);
			String path = d.getCanonicalPath();
			ArrayList<HVArticle> articles = HVDirectoryReader.read(path);
			HVDirectoryWriter.write(path, articles);
		}
	}
}
