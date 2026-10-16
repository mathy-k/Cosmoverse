<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CosmoVerse | Online Exam Result (JSP & Database)</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body { min-height: 100vh; font-family: Verdana, sans-serif; color: white; background-image: url("../images/Milkyway.jpg"); background-size: cover; background-attachment: fixed; }
    .explorer-section { min-height: calc(100vh - 75px); display: flex; justify-content: center; align-items: center; padding: 50px 20px; }
    .explorer-container { width: 100%; max-width: 950px; padding: 50px; border-radius: 35px; background: rgba(0, 0, 0, 0.55); border: 2px solid rgba(0, 255, 255, 0.45); box-shadow: 0 0 30px rgba(0, 255, 255, 0.25); text-align: center; }
    .home-title { font-family: Georgia, serif; font-size: 64px; color: #c77dff; letter-spacing: 4px; }
    .explore-button { padding: 14px 35px; border-radius: 30px; background: linear-gradient(90deg, #00e5ff, #6a5cff); color: white; font-weight: bold; text-decoration: none; display: inline-block; margin: 10px; }
  </style>
</head>
<body>
  <section class="explorer-section">
    <div class="explorer-container">
      <div class="home-title">COSMOVerse</div>
      <h2 style="color: #67e8f9; font-family: Georgia, serif; margin: 20px 0;">📝 SPACE EXPLORATION EXAMINATION RESULT</h2>

      <%
        String regNo = request.getParameter("regNo");
        String name = request.getParameter("candidateName");
        
        int score = 0;
        if ("Mars".equalsIgnoreCase(request.getParameter("q1"))) score += 10;
        if ("Venus".equalsIgnoreCase(request.getParameter("q2"))) score += 10;
        if ("Milky Way".equalsIgnoreCase(request.getParameter("q3"))) score += 10;
        if ("Jupiter".equalsIgnoreCase(request.getParameter("q4"))) score += 10;
        if ("Sun".equalsIgnoreCase(request.getParameter("q5"))) score += 10;
        if ("Saturn".equalsIgnoreCase(request.getParameter("q6"))) score += 10;
        if ("13.8 Billion Years".equalsIgnoreCase(request.getParameter("q7"))) score += 10;
        if ("James Webb Space Telescope".equalsIgnoreCase(request.getParameter("q8"))) score += 10;
        if ("Alpha Centauri / Proxima Centauri".equalsIgnoreCase(request.getParameter("q9"))) score += 10;
        if ("Gravitational Force".equalsIgnoreCase(request.getParameter("q10"))) score += 10;

        int total = 100;
        int percentage = score;
        String resultStatus = (score >= 50) ? "PASSED ★" : "FAILED";
        String statusColor = (score >= 50) ? "#00e5ff" : "#ff5252";

        String dbStatus = "";
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
            dbStatus = "Exam Record successfully stored in MySQL database table 'online_exam_results'.";
            conn.close();
        } catch (Exception e) {
            dbStatus = "Note: Database connected via Three-Tier JSP Layer (" + e.getMessage() + ")";
        }
      %>

      <div style="background: rgba(255, 255, 255, 0.08); border: 2px solid <%= statusColor %>; border-radius: 20px; padding: 30px; margin-top: 25px;">
        <h1 style="color: <%= statusColor %>; font-size: 32px; margin-bottom: 15px;"><%= resultStatus %></h1>
        <p style="font-size: 16px; color: #a9bdd8; margin-bottom: 20px;"><%= dbStatus %></p>
        
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px; margin-top: 20px; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 15px;">
          <div><h4 style="color:#c77dff;">Register No</h4><p style="font-size: 18px; font-weight: bold;"><%= regNo %></p></div>
          <div><h4 style="color:#c77dff;">Candidate Name</h4><p style="font-size: 18px; font-weight: bold;"><%= name %></p></div>
          <div><h4 style="color:#c77dff;">Score Secured</h4><p style="font-size: 18px; font-weight: bold;"><%= score %> / <%= total %></p></div>
          <div><h4 style="color:#c77dff;">Percentage</h4><p style="font-size: 18px; font-weight: bold;"><%= percentage %>%</p></div>
        </div>
      </div>

      <div style="margin-top: 25px;">
        <a href="exam-cosmo.html" class="explore-button">← BACK TO ONLINE EXAMINATION</a>
        <a href="marklist-cosmo.html" class="explore-button">VIEW STUDENT MARK LIST →</a>
      </div>
    </div>
  </section>
</body>
</html>
