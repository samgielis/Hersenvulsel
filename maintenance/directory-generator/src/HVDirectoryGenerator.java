import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.swing.JOptionPane;

public class HVDirectoryGenerator {

	private static String[] categories = new String[]{	
		"wetenschap", "geschiedenis", "natuur", "mensen",
		"faitsdivers", "entertainment"
	};
	
	public static void main(String[] args){
		
		
		HVAuthorDirectoryGenerator.generate();
		/*
		for (String cat : categories) {
			File d = new File("../../"+cat);
			String path;
			try {
				path = d.getCanonicalPath();
				ArrayList<HVArticle> articles = HVDirectoryReader.read(path);
				HVDirectoryWriter.write(path, articles);
				
			} catch (IOException e) {
				JOptionPane.showMessageDialog(null, "Het lezen van de categorie " + cat + " is mislukt", "Error",
		                JOptionPane.ERROR_MESSAGE);
			}			
		}
		JOptionPane.showMessageDialog(null, "Gelukt!", "Succes",
                JOptionPane.INFORMATION_MESSAGE);*/
	}
}
