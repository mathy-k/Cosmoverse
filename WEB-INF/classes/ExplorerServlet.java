import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Exercise 5(i): Invoking Servlets from HTML Forms
 * Servlet implementation matching home.html exact CSS theme and styling
 */
@WebServlet("/ExplorerServlet")
public class ExplorerServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public ExplorerServlet() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Redirect GET requests to the form page
        response.sendRedirect("servlet-form.html");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        // 1. Set response content type
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        // 2. Extract form parameters
        String explorerName = request.getParameter("name");
        String email = request.getParameter("email");
        String favoritePlanet = request.getParameter("planet");
        String spaceInterest = request.getParameter("interest");
        String message = request.getParameter("message");

        // Fallback default values
        if (explorerName == null || explorerName.trim().isEmpty()) {
            explorerName = "Cosmic Explorer";
        }
        if (email == null || email.trim().isEmpty()) {
            email = "explorer@cosmoverse.org";
        }
        if (favoritePlanet == null || favoritePlanet.trim().isEmpty()) {
            favoritePlanet = "Mars";
        }
        if (spaceInterest == null || spaceInterest.trim().isEmpty()) {
            spaceInterest = "Planets & Galaxies";
        }
        if (message == null || message.trim().isEmpty()) {
            message = "Eager to explore the cosmos!";
        }

        // Generate Mission ID
        String missionId = "COSMO-" + (int)(Math.random() * 90000 + 10000);

        // 3. Generate dynamic HTML output matching home.html CSS exact theme
        try {
            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("    <meta charset='UTF-8'>");
            out.println("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            out.println("    <title>CosmoVerse | Explorer Registration Confirmation</title>");
            out.println("    <link rel='stylesheet' href='style.css'>");
            out.println("    <style>");
            out.println("        /* EXACT MATCH WITH home.html STYLES */");
            out.println("        body {");
            out.println("            margin: 0;");
            out.println("            padding: 0;");
            out.println("            min-height: 100vh;");
            out.println("            font-family: Verdana, sans-serif;");
            out.println("            background-image: url('../images/Milkyway.jpg');");
            out.println("            background-size: cover;");
            out.println("            background-attachment: fixed;");
            out.println("            background-position: center;");
            out.println("            color: white;");
            out.println("            display: flex;");
            out.println("            justify-content: center;");
            out.println("            align-items: center;");
            out.println("            padding: 60px 20px;");
            out.println("        }");
            out.println("        .home-content {");
            out.println("            width: 100%;");
            out.println("            max-width: 1000px;");
            out.println("            background: rgba(0, 0, 0, 0.45);");
            out.println("            padding: 60px;");
            out.println("            border-radius: 35px;");
            out.println("            border: 2px solid rgba(0, 255, 255, 0.45);");
            out.println("            box-shadow: 0 0 30px rgba(0, 255, 255, 0.25), inset 0 0 30px rgba(138, 43, 226, 0.12);");
            out.println("            backdrop-filter: blur(8px);");
            out.println("            text-align: center;");
            out.println("        }");
            out.println("        .home-title {");
            out.println("            font-family: Georgia, serif;");
            out.println("            font-size: 72px;");
            out.println("            color: #c77dff;");
            out.println("            letter-spacing: 5px;");
            out.println("            text-shadow: 0 0 10px #c77dff, 0 0 25px #800080;");
            out.println("            margin-bottom: 15px;");
            out.println("        }");
            out.println("        .home-subtitle {");
            out.println("            font-family: Georgia, serif;");
            out.println("            font-size: 26px;");
            out.println("            color: #67e8f9;");
            out.println("            margin-bottom: 25px;");
            out.println("        }");
            out.println("        .home-description {");
            out.println("            font-family: Arial, sans-serif;");
            out.println("            font-size: 18px;");
            out.println("            line-height: 1.8;");
            out.println("            color: white;");
            out.println("            margin: auto;");
            out.println("            max-width: 800px;");
            out.println("        }");
            out.println("        .home-features {");
            out.println("            display: flex;");
            out.println("            justify-content: center;");
            out.println("            flex-wrap: wrap;");
            out.println("            gap: 25px;");
            out.println("            margin-top: 40px;");
            out.println("        }");
            out.println("        .feature-card {");
            out.println("            flex: 1 1 240px;");
            out.println("            min-width: 240px;");
            out.println("            padding: 22px;");
            out.println("            background: rgba(255, 255, 255, 0.08);");
            out.println("            border: 1px solid rgba(0, 255, 255, 0.35);");
            out.println("            border-radius: 22px;");
            out.println("            transition: 0.4s;");
            out.println("            text-align: left;");
            out.println("        }");
            out.println("        .feature-card:hover {");
            out.println("            transform: translateY(-10px);");
            out.println("            background: rgba(106, 13, 173, 0.3);");
            out.println("            border-color: #00ffff;");
            out.println("            box-shadow: 0 0 25px rgba(0, 255, 255, 0.35);");
            out.println("        }");
            out.println("        .feature-card h3 {");
            out.println("            color: #67e8f9;");
            out.println("            font-size: 15px;");
            out.println("            text-transform: uppercase;");
            out.println("            margin-bottom: 8px;");
            out.println("            letter-spacing: 1px;");
            out.println("        }");
            out.println("        .feature-card p {");
            out.println("            color: white;");
            out.println("            font-size: 16px;");
            out.println("            font-weight: bold;");
            out.println("            line-height: 1.4;");
            out.println("            word-break: break-all;");
            out.println("            margin: 0;");
            out.println("        }");
            out.println("        .explore-button {");
            out.println("            display: inline-block;");
            out.println("            margin-top: 35px;");
            out.println("            margin-right: 15px;");
            out.println("            padding: 16px 35px;");
            out.println("            background: linear-gradient(135deg, #6a0dad, #00bcd4);");
            out.println("            color: white;");
            out.println("            font-family: Arial, sans-serif;");
            out.println("            font-size: 18px;");
            out.println("            font-weight: bold;");
            out.println("            border-radius: 40px;");
            out.println("            text-decoration: none;");
            out.println("            border: 2px solid rgba(255, 255, 255, 0.5);");
            out.println("            transition: 0.4s;");
            out.println("            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);");
            out.println("        }");
            out.println("        .explore-button:hover {");
            out.println("            transform: translateY(-6px) scale(1.05);");
            out.println("            box-shadow: 0 0 20px cyan, 0 0 40px violet;");
            out.println("            background: linear-gradient(135deg, #8a2be2, #00e5ff);");
            out.println("        }");
            out.println("        .home-footer {");
            out.println("            margin-top: 35px;");
            out.println("            color: lightgreen;");
            out.println("            font-family: Georgia, serif;");
            out.println("            font-size: 16px;");
            out.println("        }");
            out.println("    </style>");
            out.println("</head>");
            out.println("<body>");
            out.println("    <div class='home-content'>");
            out.println("        <div class='home-title'>COSMOVerse</div>");
            out.println("        <div class='home-subtitle'>★ EXPLORER REGISTRATION CONFIRMED ★</div>");
            out.println("        <p class='home-description'>");
            out.println("            Your registration data was successfully processed via <strong>Java HttpServlet (POST Request)</strong>.<br>");
            out.println("            Welcome to the CosmoVerse space program!");
            out.println("        </p>");

            out.println("        <div class='home-features'>");
            out.println("            <div class='feature-card'>");
            out.println("                <h3>Mission ID</h3>");
            out.println("                <p>" + missionId + "</p>");
            out.println("            </div>");
            out.println("            <div class='feature-card'>");
            out.println("                <h3>Explorer Name</h3>");
            out.println("                <p>" + explorerName + "</p>");
            out.println("            </div>");
            out.println("            <div class='feature-card'>");
            out.println("                <h3>Email Address</h3>");
            out.println("                <p>" + email + "</p>");
            out.println("            </div>");
            out.println("            <div class='feature-card'>");
            out.println("                <h3>Assigned Planet</h3>");
            out.println("                <p>" + favoritePlanet + "</p>");
            out.println("            </div>");
            out.println("            <div class='feature-card'>");
            out.println("                <h3>Space Interest</h3>");
            out.println("                <p>" + spaceInterest + "</p>");
            out.println("            </div>");
            out.println("            <div class='feature-card' style='flex: 1 1 100%;'>");
            out.println("                <h3>Exploration Message</h3>");
            out.println("                <p style='font-size: 16px; font-weight: normal;'>" + message + "</p>");
            out.println("            </div>");
            out.println("        </div>");

            out.println("        <div style='margin-top: 25px;'>");
            out.println("            <a href='servlet-form.html' class='explore-button'>← BACK TO FORM</a>");
            out.println("            <a href='SessionTrackingServlet' class='explore-button'>SESSION TRACKING PORTAL →</a>");
            out.println("        </div>");

            out.println("        <div class='home-footer' style='margin-top: 40px;'>");
            out.println("            CosmoVerse Space Program | Explorer Registration Portal");
            out.println("        </div>");
            out.println("    </div>");
            out.println("</body>");
            out.println("</html>");
        } finally {
            out.close();
        }
    }
}
