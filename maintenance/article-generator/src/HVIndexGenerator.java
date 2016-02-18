import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.swing.JOptionPane;

import org.json.simple.parser.ParseException;


public class HVIndexGenerator {

	public static void generate() throws FileNotFoundException, IOException, ParseException{
		HVArticle descriptor = HVArticle.fromJSON((new File("./descriptor.json")).getCanonicalPath());
		
		Path templatePath = Paths.get("./index.html");
		Charset charset = StandardCharsets.UTF_8;

		String template = new String(Files.readAllBytes(templatePath), charset);

		template = template.replaceAll("TITLE-ANCHOR", descriptor.title);
		template = template.replaceAll("ID-ANCHOR", descriptor.id);
		template = template.replaceAll("KEYWORD-ANCHOR", descriptor.keywords);
		System.out.println(template);

		Files.write(templatePath, template.getBytes(charset));
		JOptionPane.showMessageDialog(null, "sukzes", "Error",
                JOptionPane.ERROR_MESSAGE);
	}
	
	public static void main(String[] args){
		try {
			generate();
		} catch (IOException | ParseException e) {
			 
		}
	}
}
