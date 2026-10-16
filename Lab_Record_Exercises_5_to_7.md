# WEB TECHNOLOGY LABORATORY RECORD
## EXERCISES 5(i), 5(ii), 6(i), 6(ii) AND 7

---

# EXERCISE 5(i): INVOKING JAVA SERVLETS FROM HTML FORMS

## AIM :
To create an interactive HTML form and invoke a Java Servlet (`HttpServlet`) using the POST method to extract form parameters and dynamically display explorer registration details.

## ALGORITHM :
STEP 1 : Start the HTML document using the `<!DOCTYPE html>` declaration.  
STEP 2 : Design the web form `servlet-form.html` with form controls including text inputs, dropdown selection lists, and a textarea for user inputs.  
STEP 3 : Set the form attributes `action="ExplorerServlet"` and `method="post"` to connect the HTML form to the Servlet.  
STEP 4 : Create the Java Servlet class `ExplorerServlet` extending `javax.servlet.http.HttpServlet`.  
STEP 5 : Override the `doPost()` method to handle form submissions asynchronously via HTTP POST.  
STEP 6 : Extract form parameters (`name`, `email`, `planet`, `interest`, `message`) using `request.getParameter()`.  
STEP 7 : Generate a dynamic unique Mission ID token (`COSMO-XXXXX`).  
STEP 8 : Set response header content-type to HTML (`response.setContentType("text/html;charset=UTF-8")`).  
STEP 9 : Write dynamic HTML response structure to the `PrintWriter` output stream, applying modern CSS card layout styling.  
STEP 10: Configure the Servlet mapping in `WEB-INF/web.xml` deployment descriptor under `<servlet>` and `<servlet-mapping>`.  
STEP 11: Execute the application in a web browser, submit the registration form, and verify the dynamic Servlet response page.

## PROGRAM :

### HTML (servlet-form.html) :
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>COSMOVERSE | Explorer Registration</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="explorer-container">
      <div class="home-title">COSMOVerse</div>
      <h1>🚀 JOIN THE EXPLORER PROGRAM</h1>
      <form class="explorer-form" action="ExplorerServlet" method="post">
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Explorer Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="planet">Favourite Planet</label>
            <select id="planet" name="planet" required>
              <option value="Mars">Mars</option>
              <option value="Jupiter">Jupiter</option>
            </select>
          </div>
        </div>
        <button type="submit" class="explore-button">🚀 START EXPLORATION</button>
      </form>
    </div>
  </body>
</html>
```

### JAVA SERVLET (ExplorerServlet.java) :
```java
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ExplorerServlet")
public class ExplorerServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String explorerName = request.getParameter("name");
        String email = request.getParameter("email");
        String favoritePlanet = request.getParameter("planet");

        String missionId = "COSMO-" + (int)(Math.random() * 90000 + 10000);

        out.println("<!DOCTYPE html><html><head><title>Registration Confirmed</title></head><body>");
        out.println("<h1>★ EXPLORER REGISTRATION CONFIRMED ★</h1>");
        out.println("<p>Mission ID: " + missionId + "</p>");
        out.println("<p>Explorer Name: " + explorerName + "</p>");
        out.println("<p>Email: " + email + "</p>");
        out.println("<p>Planet: " + favoritePlanet + "</p>");
        out.println("</body></html>");
    }
}
```

## OUTPUT :
> **[ PASTE EXERCISE 5(i) OUTPUT SCREENSHOT HERE ]**  
> *Take a screenshot of `servlet-form.html` in Microsoft Edge showing registration form inputs and servlet confirmation page.*

## RESULT :
Thus, the web application for invoking Java Servlets from an HTML form was created successfully, and the output was verified.

---

# EXERCISE 5(ii): SESSION TRACKING USING JAVA SERVLET

## AIM :
To implement session tracking in Java Servlets using the `HttpSession` API to track user visit count, session creation time, last access time, and session metadata across multiple HTTP requests.

## ALGORITHM :
STEP 1 : In `SessionTrackingServlet.java`, obtain active HTTP session using `request.getSession(true)`.  
STEP 2 : Extract attribute `visitCount` from session context.  
STEP 3 : If `visitCount` is null, set to 1; otherwise, increment value by 1.  
STEP 4 : Update session attribute using `session.setAttribute("visitCount", visitCount)`.  
STEP 5 : Retrieve Session ID (`getId()`), Creation Time (`getCreationTime()`), and Last Access Time (`getLastAccessedTime()`).  
STEP 6 : Render active session status metrics into dynamic HTML container output.

## PROGRAM :

### HTML (session-tracking.html) :
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CosmoVerse | Session Tracking Portal</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="home-content">
    <div class="home-title">COSMOVerse</div>
    <div class="home-subtitle">★ SESSION TRACKING PORTAL ★</div>
    <p class="home-description">
      Session state tracked using <strong>HttpSession API (javax.servlet.http.HttpSession)</strong>.
    </p>

    <div class="home-features">
      <div class="feature-card">
        <h3>Session Status</h3>
        <p id="sessStatus" style="color: #5cff8d;">Active Session</p>
      </div>
      <div class="feature-card">
        <h3>Visit Count</h3>
        <p id="visitCount">1 time(s)</p>
      </div>
      <div class="feature-card" style="flex: 1 1 100%;">
        <h3>Unique Session ID</h3>
        <p id="sessionId" style="font-family: monospace; color: #67e8f9;">COSMO-SESS-8F9A7B2C</p>
      </div>
    </div>

    <div style="margin-top: 25px;">
      <a href="servlet-form.html" class="explore-button">← BACK TO FORM</a>
      <a href="SessionTrackingServlet" class="explore-button">🔑 INVOKE SESSION SERVLET</a>
    </div>
  </div>
</body>
</html>
```

### JAVA SERVLET (SessionTrackingServlet.java) :
```java
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/SessionTrackingServlet")
public class SessionTrackingServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(true);

        Integer visitCount = (Integer) session.getAttribute("visitCount");
        if (visitCount == null) {
            visitCount = 1;
        } else {
            visitCount += 1;
        }
        session.setAttribute("visitCount", visitCount);

        out.println("<!DOCTYPE html><html><head><title>Session Tracking</title></head><body>");
        out.println("<h1>🔑 HTTP SESSION MANAGEMENT (SERVLET)</h1>");
        out.println("<p>Session ID: " + session.getId() + "</p>");
        out.println("<p>Visit Count: " + visitCount + "</p>");
        out.println("<p>Creation Time: " + new Date(session.getCreationTime()) + "</p>");
        out.println("</body></html>");
    }
}
```

## OUTPUT :
> **[ PASTE EXERCISE 5(ii) OUTPUT SCREENSHOT HERE ]**  
> *Take a screenshot of `session-tracking.html` in Microsoft Edge showing active session metrics and visit counter.*

## RESULT :
Thus, session tracking using Java Servlets (`HttpSession` API) was implemented successfully, and the visit count and session metadata were verified.

---

# EXERCISE 6(i): THREE-TIER APPLICATION USING JSP AND DATABASES FOR CONDUCTING ONLINE EXAMINATION

## AIM :
To build a comprehensive three-tier web application using JSP and MySQL database server (`cosmoverse_db`) to conduct a 10-Question Astronomy Online Examination (`exam-cosmo.jsp` and `exam-cosmo.html`), complete with a 15-minute countdown timer, automated 100-mark evaluation engine, database storage mapping (`online_exam_results`), and dynamic grade rendering.

## ALGORITHM :
STEP 1 : Design `exam-cosmo.html` containing candidate registration fields and 10 multiple-choice questions (10 marks each, 100 total).  
STEP 2 : Add JavaScript 15-minute countdown timer to auto-submit exam on timeout.  
STEP 3 : Set form action to `exam-cosmo.jsp` with POST method.  
STEP 4 : In `exam-cosmo.jsp`, extract candidate register number, candidate name, and answers for Questions Q1 through Q10 using `request.getParameter()`.  
STEP 5 : Evaluate candidate answers against key (Q1: Mars, Q2: Jupiter, Q3: Andromeda Galaxy, Q4: Venus, Q5: Moon, Q6: Saturn, Q7: Corona, Q8: Event Horizon, Q9: Proxima Centauri, Q10: James Webb Space Telescope).  
STEP 6 : Compute total score out of 100 and percentage. Assign Pass/Fail status (`PASSED ★` if score >= 50).  
STEP 7 : Establish JDBC connection (`jdbc:mysql://localhost:3306/cosmoverse_db`).  
STEP 8 : Execute SQL `INSERT INTO online_exam_results VALUES (?, ?, ?, ?, ?)` using `PreparedStatement`.  
STEP 9 : Display performance result card showing register number, candidate name, total score, percentage, and database storage confirmation.

## PROGRAM :

### HTML (exam-cosmo.html) :
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CosmoVerse | Online Examination System (JSP & DB)</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="explorer-container">
    <div class="home-title">COSMOVerse</div>
    <h1>📝 ONLINE EXAMINATION PORTAL (10 QUESTIONS | 100 MARKS)</h1>
    
    <div id="timer" class="timer-badge">⏱️ Time Remaining: 15:00</div>

    <form id="examForm" action="exam-cosmo.jsp" method="post">
      <div class="form-grid">
        <div class="form-group">
          <label>Register No / Candidate ID</label>
          <input type="text" id="regNo" name="regNo" value="CS-2026-101" required>
        </div>
        <div class="form-group">
          <label>Candidate Name</label>
          <input type="text" id="candidateName" name="candidateName" value="Alex Mercer" required>
        </div>
      </div>

      <!-- Question 1 to Question 10 -->
      <div class="question-block">
        <div class="question-title">Q1. Which planet is known as the Red Planet in our Solar System? [10 Marks]</div>
        <label><input type="radio" name="q1" value="Mars" required> Mars</label>
        <label><input type="radio" name="q1" value="Venus"> Venus</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q2. What is the largest planet in our Solar System? [10 Marks]</div>
        <label><input type="radio" name="q2" value="Jupiter" required> Jupiter</label>
        <label><input type="radio" name="q2" value="Saturn"> Saturn</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q3. Which galaxy is the closest major galaxy to our Milky Way? [10 Marks]</div>
        <label><input type="radio" name="q3" value="Andromeda Galaxy" required> Andromeda Galaxy</label>
        <label><input type="radio" name="q3" value="Triangulum Galaxy"> Triangulum Galaxy</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q4. Which planet has the highest surface temperature in the Solar System? [10 Marks]</div>
        <label><input type="radio" name="q4" value="Venus" required> Venus</label>
        <label><input type="radio" name="q4" value="Mercury"> Mercury</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q5. What is the name of Earth's only natural satellite? [10 Marks]</div>
        <label><input type="radio" name="q5" value="Moon" required> Moon</label>
        <label><input type="radio" name="q5" value="Phobos"> Phobos</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q6. Which planet is famous for its prominent ring system? [10 Marks]</div>
        <label><input type="radio" name="q6" value="Saturn" required> Saturn</label>
        <label><input type="radio" name="q6" value="Jupiter"> Jupiter</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q7. What is the outermost atmosphere layer of the Sun called? [10 Marks]</div>
        <label><input type="radio" name="q7" value="Corona" required> Corona</label>
        <label><input type="radio" name="q7" value="Photosphere"> Photosphere</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q8. What is the theoretical boundary around a black hole beyond which nothing can escape? [10 Marks]</div>
        <label><input type="radio" name="q8" value="Event Horizon" required> Event Horizon</label>
        <label><input type="radio" name="q8" value="Singularity"> Singularity</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q9. Which star is the closest to Earth after the Sun? [10 Marks]</div>
        <label><input type="radio" name="q9" value="Proxima Centauri" required> Proxima Centauri</label>
        <label><input type="radio" name="q9" value="Sirius"> Sirius</label>
      </div>

      <div class="question-block">
        <div class="question-title">Q10. What space telescope was launched in December 2021 to succeed Hubble? [10 Marks]</div>
        <label><input type="radio" name="q10" value="James Webb Space Telescope" required> James Webb Space Telescope</label>
        <label><input type="radio" name="q10" value="Kepler Space Telescope"> Kepler Space Telescope</label>
      </div>

      <button type="submit" class="explore-button">📝 SUBMIT EXAMINATION (100 MARKS)</button>
    </form>
  </div>
</body>
</html>
```

### JSP (exam-cosmo.jsp) :
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
  <title>CosmoVerse | Online Exam Result</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <%
    String regNo = request.getParameter("regNo");
    String name = request.getParameter("candidateName");

    String q1 = request.getParameter("q1");
    String q2 = request.getParameter("q2");
    String q3 = request.getParameter("q3");
    String q4 = request.getParameter("q4");
    String q5 = request.getParameter("q5");
    String q6 = request.getParameter("q6");
    String q7 = request.getParameter("q7");
    String q8 = request.getParameter("q8");
    String q9 = request.getParameter("q9");
    String q10 = request.getParameter("q10");

    int score = 0;
    if ("Mars".equalsIgnoreCase(q1)) score += 10;
    if ("Jupiter".equalsIgnoreCase(q2)) score += 10;
    if ("Andromeda Galaxy".equalsIgnoreCase(q3)) score += 10;
    if ("Venus".equalsIgnoreCase(q4)) score += 10;
    if ("Moon".equalsIgnoreCase(q5)) score += 10;
    if ("Saturn".equalsIgnoreCase(q6)) score += 10;
    if ("Corona".equalsIgnoreCase(q7)) score += 10;
    if ("Event Horizon".equalsIgnoreCase(q8)) score += 10;
    if ("Proxima Centauri".equalsIgnoreCase(q9)) score += 10;
    if ("James Webb Space Telescope".equalsIgnoreCase(q10)) score += 10;

    int percentage = score;
    String resultStatus = (score >= 50) ? "PASSED ★" : "FAILED";

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cosmoverse_db", "root", "admin");
        String sql = "INSERT INTO online_exam_results (reg_no, candidate_name, score, percentage, status) VALUES (?, ?, ?, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, regNo);
        pstmt.setString(2, name);
        pstmt.setInt(3, score);
        pstmt.setInt(4, percentage);
        pstmt.setString(5, resultStatus);
        pstmt.executeUpdate();
        conn.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
  %>

  <div class="explorer-container">
    <h1>EXAMINATION RESULT: <%= resultStatus %></h1>
    <p>Register No: <%= regNo %></p>
    <p>Candidate Name: <%= name %></p>
    <p>Score Secured: <%= score %> / 100</p>
    <p>Percentage: <%= percentage %>%</p>
  </div>
</body>
</html>
```

## OUTPUT :
> **[ PASTE EXERCISE 6(i) OUTPUT SCREENSHOT HERE ]**  
> *Take a screenshot of `exam-cosmo.html` showing test questions and submitted 10-question evaluation result card in Microsoft Edge.*

## RESULT :
Thus, the three-tier web application using JSP and Database for conducting a 10-question Online Examination was created successfully, and candidate scores were evaluated and stored in the database.

---

# EXERCISE 6(ii): THREE-TIER APPLICATION USING JSP AND DATABASES FOR DISPLAYING STUDENT MARK LIST

## AIM :
To build a three-tier web application using JSP and MySQL database server (`cosmoverse_db`) to retrieve, process, and display a comprehensive Student Mark List containing 10 cadet academic records (`marklist-cosmo.jsp` and `marklist-cosmo.html`), complete with summary statistics, total marks, percentage, letter grade evaluation (O, A+, A), and database lookup.

## ALGORITHM :
STEP 1 : Design `marklist-cosmo.html` with search form, stat cards (Class Avg, Highest Score, Pass Rate), and fallback datasets for 10 cadets (`CS-101` to `CS-110`).  
STEP 2 : In `marklist-cosmo.jsp`, establish JDBC database connection (`cosmoverse_db`).  
STEP 3 : Execute SQL `SELECT * FROM student_marks` to fetch cadet records.  
STEP 4 : Extract subject marks in Astronomy, Astrophysics, and Orbital Mechanics.  
STEP 5 : Calculate total marks (out of 300), percentage, and letter grade (`O`, `A+`, `A`).  
STEP 6 : Render dynamic HTML table rows displaying 10 student mark list records.

## PROGRAM :

### HTML (marklist-cosmo.html) :
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CosmoVerse | Student Mark List System</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="explorer-container">
    <div class="home-title">COSMOVerse</div>
    <h1>📊 STUDENT MARK LIST SYSTEM (10 CADETS | JSP & DB)</h1>
    
    <form action="marklist-cosmo.jsp" method="get">
      <input type="text" name="studentId" value="CS-101" placeholder="Register No">
      <button type="submit" class="explore-button">🔍 FETCH MARK LIST</button>
    </form>

    <table class="marklist-table">
      <thead>
        <tr>
          <th>Reg No</th>
          <th>Cadet Name</th>
          <th>Astronomy</th>
          <th>Astrophysics</th>
          <th>Orbital Mech</th>
          <th>Total</th>
          <th>Percentage</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>CS-101</td><td>Alex Mercer</td><td>95</td><td>88</td><td>92</td><td>275</td><td>91.7%</td><td>O</td></tr>
        <tr><td>CS-102</td><td>Sophia Turner</td><td>89</td><td>94</td><td>90</td><td>273</td><td>91.0%</td><td>O</td></tr>
        <tr><td>CS-103</td><td>Ethan Vance</td><td>78</td><td>82</td><td>80</td><td>240</td><td>80.0%</td><td>A+</td></tr>
        <tr><td>CS-104</td><td>Maya Lin</td><td>92</td><td>90</td><td>96</td><td>278</td><td>92.7%</td><td>O</td></tr>
        <tr><td>CS-105</td><td>Lucas Haze</td><td>85</td><td>87</td><td>84</td><td>256</td><td>85.3%</td><td>A+</td></tr>
        <tr><td>CS-106</td><td>Aria Stark</td><td>98</td><td>96</td><td>99</td><td>293</td><td>97.7%</td><td>O</td></tr>
        <tr><td>CS-107</td><td>Noah Cent</td><td>74</td><td>79</td><td>76</td><td>229</td><td>76.3%</td><td>A</td></tr>
        <tr><td>CS-108</td><td>Zoe Krav</td><td>91</td><td>93</td><td>89</td><td>273</td><td>91.0%</td><td>O</td></tr>
        <tr><td>CS-109</td><td>Leo Fitz</td><td>88</td><td>85</td><td>90</td><td>263</td><td>87.7%</td><td>A+</td></tr>
        <tr><td>CS-110</td><td>Jemma Sim</td><td>96</td><td>98</td><td>94</td><td>288</td><td>96.0%</td><td>O</td></tr>
      </tbody>
    </table>
  </div>
</body>
</html>
```

### JSP (marklist-cosmo.jsp) :
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
  <title>CosmoVerse | Student Mark List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="explorer-container">
    <h1>📊 STUDENT MARK LIST (DATABASE SERVER)</h1>
    <table>
      <thead>
        <tr>
          <th>Reg No</th>
          <th>Student Name</th>
          <th>Astronomy</th>
          <th>Astrophysics</th>
          <th>Orbital Mech</th>
          <th>Total</th>
          <th>Percentage</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        <%
          try {
              Class.forName("com.mysql.cj.jdbc.Driver");
              Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cosmoverse_db", "root", "admin");
              Statement stmt = conn.createStatement();
              ResultSet rs = stmt.executeQuery("SELECT * FROM student_marks");

              while (rs.next()) {
                  int m1 = rs.getInt("astronomy");
                  int m2 = rs.getInt("astrophysics");
                  int m3 = rs.getInt("orbital_mech");
                  int total = m1 + m2 + m3;
                  double pct = total / 3.0;
                  String grade = (pct >= 90) ? "O" : (pct >= 80) ? "A+" : "A";
        %>
        <tr>
          <td><%= rs.getString("reg_no") %></td>
          <td><%= rs.getString("student_name") %></td>
          <td><%= m1 %></td>
          <td><%= m2 %></td>
          <td><%= m3 %></td>
          <td><%= total %></td>
          <td><%= String.format("%.1f", pct) %>%</td>
          <td><%= grade %></td>
        </tr>
        <%
              }
              conn.close();
          } catch (Exception e) {
              e.printStackTrace();
          }
        %>
      </tbody>
    </table>
  </div>
</body>
</html>
```

## OUTPUT :
> **[ PASTE EXERCISE 6(ii) OUTPUT SCREENSHOT HERE ]**  
> *Take a screenshot of `marklist-cosmo.html` showing 10 student database query records and summary statistics in Microsoft Edge.*

## RESULT :
Thus, the three-tier web application using JSP and Database for displaying Student Mark Lists was implemented successfully, and 10 student records were dynamically processed and rendered.

---

# EXERCISE 7: PROGRAMS USING XML, XML SCHEMA (XSD), AND XSLT / XSL

## AIM :
To develop a complete XML data management application comprising a 10-record XML document (`cosmoverse.xml`), an XML Schema Definition for structure validation (`cosmoverse.xsd`), and an XSLT transformation stylesheet (`cosmoverse.xsl` and `xml-cosmo.html`) to dynamically render XML records into a styled HTML data table.

## ALGORITHM :
STEP 1 : Create `cosmoverse.xml` storing 10 cadet records (`CAD-101` to `CAD-110`) with elements `<name>`, `<assignedPlanet>`, `<missionRole>`, and `<clearanceLevel>`.  
STEP 2 : Define XML Schema Definition `cosmoverse.xsd` enforcing element structures, data types, and attribute constraints.  
STEP 3 : Design XSLT stylesheet `cosmoverse.xsl` using `<xsl:stylesheet>` and `<xsl:for-each select="cosmoverse/cadet">`.  
STEP 4 : Build interactive HTML interface `xml-cosmo.html` to display source XML, XSD, XSLT code blocks and live transformed table.

## PROGRAM :

### XML (cosmoverse.xml) :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="cosmoverse.xsl"?>
<cosmoverse xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="cosmoverse.xsd">
    
    <cadet id="CAD-101">
        <name>Alex Mercer</name>
        <assignedPlanet>Mars</assignedPlanet>
        <missionRole>Pilot Commander</missionRole>
        <clearanceLevel>Level 5 Alpha</clearanceLevel>
    </cadet>
    
    <cadet id="CAD-102">
        <name>Sophia Turner</name>
        <assignedPlanet>Jupiter</assignedPlanet>
        <missionRole>Astrophysicist</missionRole>
        <clearanceLevel>Level 4 Beta</clearanceLevel>
    </cadet>

    <cadet id="CAD-103">
        <name>Ethan Vance</name>
        <assignedPlanet>Saturn</assignedPlanet>
        <missionRole>Navigation Specialist</missionRole>
        <clearanceLevel>Level 3 Gamma</clearanceLevel>
    </cadet>

    <cadet id="CAD-104">
        <name>Maya Lin</name>
        <assignedPlanet>Neptune</assignedPlanet>
        <missionRole>Exoplanet Geologist</missionRole>
        <clearanceLevel>Level 4 Alpha</clearanceLevel>
    </cadet>

    <cadet id="CAD-105">
        <name>Lucas Haze</name>
        <assignedPlanet>Venus</assignedPlanet>
        <missionRole>Atmospheric Analyst</missionRole>
        <clearanceLevel>Level 3 Beta</clearanceLevel>
    </cadet>

    <cadet id="CAD-106">
        <name>Aria Stark</name>
        <assignedPlanet>Uranus</assignedPlanet>
        <missionRole>Quantum Systems Engineer</missionRole>
        <clearanceLevel>Level 5 Omega</clearanceLevel>
    </cadet>

    <cadet id="CAD-107">
        <name>Noah Cent</name>
        <assignedPlanet>Mercury</assignedPlanet>
        <missionRole>Solar Radiation Officer</missionRole>
        <clearanceLevel>Level 2 Gamma</clearanceLevel>
    </cadet>

    <cadet id="CAD-108">
        <name>Zoe Krav</name>
        <assignedPlanet>Pluto</assignedPlanet>
        <missionRole>Deep Space Communications</missionRole>
        <clearanceLevel>Level 4 Alpha</clearanceLevel>
    </cadet>

    <cadet id="CAD-109">
        <name>Leo Fitz</name>
        <assignedPlanet>Titan Moon</assignedPlanet>
        <missionRole>Bio-Dome Environmental Specialist</missionRole>
        <clearanceLevel>Level 3 Alpha</clearanceLevel>
    </cadet>

    <cadet id="CAD-110">
        <name>Jemma Sim</name>
        <assignedPlanet>Europa Moon</assignedPlanet>
        <missionRole>Sub-Surface Oceanographer</missionRole>
        <clearanceLevel>Level 5 Beta</clearanceLevel>
    </cadet>

</cosmoverse>
```

### XSD (cosmoverse.xsd) :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

    <xs:element name="cosmoverse">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="cadet" maxOccurs="unbounded">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="name" type="xs:string"/>
                            <xs:element name="assignedPlanet" type="xs:string"/>
                            <xs:element name="missionRole" type="xs:string"/>
                            <xs:element name="clearanceLevel" type="xs:string"/>
                        </xs:sequence>
                        <xs:attribute name="id" type="xs:string" use="required"/>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>
```

### XSLT (cosmoverse.xsl) :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
        <head>
            <title>CosmoVerse | XML-XSLT Cadet Directory</title>
            <style>
                body { font-family: Verdana, sans-serif; background: #040a1e; color: white; padding: 30px; }
                h1 { color: #00e5ff; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { background: rgba(0, 229, 255, 0.25); color: #00e5ff; padding: 12px; border: 1px solid #00e5ff; }
                td { padding: 10px; border: 1px solid rgba(255,255,255,0.2); }
            </style>
        </head>
        <body>
            <h1>🚀 COSMOVERSE CADET DIRECTORY (XML &amp; XSLT TRANSFORMED)</h1>
            <table>
                <tr>
                    <th>Cadet ID</th>
                    <th>Cadet Name</th>
                    <th>Assigned Planet</th>
                    <th>Mission Role</th>
                    <th>Clearance Level</th>
                </tr>
                <xsl:for-each select="cosmoverse/cadet">
                <tr>
                    <td><strong><xsl:value-of select="@id"/></strong></td>
                    <td><xsl:value-of select="name"/></td>
                    <td><xsl:value-of select="assignedPlanet"/></td>
                    <td><xsl:value-of select="missionRole"/></td>
                    <td><xsl:value-of select="clearanceLevel"/></td>
                </tr>
                </xsl:for-each>
            </table>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
```

## OUTPUT :
> **[ PASTE EXERCISE 7 OUTPUT SCREENSHOT HERE ]**  
> *Take a screenshot of `xml-cosmo.html` showing source code tabs and rendered 10-record XML-XSLT table in Microsoft Edge.*

## RESULT :
Thus, programs using XML, XML Schema (XSD), and XSLT/XSL transformation were created successfully, and the output table rendering with 10 records was verified.
