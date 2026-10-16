<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Date, java.text.SimpleDateFormat" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CosmoVerse | Dynamic Explorer Portal</title>
    <link rel="stylesheet" href="style.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { min-height: 100vh; font-family: Verdana, sans-serif; background-image: url('images/Milkyway.jpg'); background-size: cover; background-attachment: fixed; color: white; display: flex; justify-content: center; align-items: center; padding: 50px 20px; }
        .jsp-container { width: 100%; max-width: 1000px; padding: 60px; border-radius: 35px; background: rgba(0, 0, 0, 0.45); border: 2px solid rgba(0, 255, 255, 0.45); box-shadow: 0 0 30px rgba(0, 255, 255, 0.25), inset 0 0 30px rgba(138, 43, 226, 0.12); backdrop-filter: blur(8px); text-align: center; }
        .home-title { font-family: Georgia, serif; font-size: 64px; color: #c77dff; letter-spacing: 4px; text-shadow: 0 0 10px #c77dff, 0 0 25px #800080; margin-bottom: 15px; }
        .jsp-heading { font-family: Georgia, serif; font-size: 26px; color: #67e8f9; margin-bottom: 20px; }
        .jsp-banner { background: rgba(106, 13, 173, 0.35); border: 1px solid #c77dff; padding: 20px; border-radius: 20px; margin-bottom: 30px; font-size: 18px; line-height: 1.6; }
        .grid-cards { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-top: 30px; }
        .card { flex: 1 1 240px; min-width: 240px; padding: 22px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(0, 255, 255, 0.35); border-radius: 22px; text-align: left; }
        .card h3 { color: #67e8f9; font-size: 15px; text-transform: uppercase; margin-bottom: 8px; }
        .card p { color: white; font-size: 18px; font-weight: bold; margin: 0; }
        .explore-button { display: inline-block; margin-top: 30px; margin-right: 15px; padding: 14px 35px; background: linear-gradient(135deg, #6a0dad, #00bcd4); color: white; font-size: 17px; font-weight: bold; border-radius: 40px; text-decoration: none; border: 2px solid rgba(255, 255, 255, 0.5); transition: 0.4s; }
        .explore-button:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 0 20px cyan; }
    </style>
</head>
<body>
    <div class="jsp-container">
        <div class="home-title">COSMOVerse</div>
        <div class="jsp-heading">★ SPACE EXPLORER PORTAL ★</div>

        <%-- JSP Scriptlet: Processing Server-Side Java Logic --%>
        <%
            String user = request.getParameter("name");
            if (user == null || user.trim().isEmpty()) {
                user = "Shanmathy";
            }
            
            SimpleDateFormat sdf = new SimpleDateFormat("EEEE, MMMM dd, yyyy - hh:mm:ss a");
            String currentTime = sdf.format(new Date());
            
            int activeMissions = 42;
            int totalExplorers = 1250;
            String status = "OPERATIONAL & SYNCED";
        %>

        <div class="jsp-banner">
            Welcome to CosmoVerse Portal, <strong><%= user %></strong>!<br>
            Processed dynamically on server using <strong>JSP Scriptlets & Expression Language</strong>.
        </div>

        <div class="grid-cards">
            <div class="card">
                <h3>Server Date & Time</h3>
                <p style="font-size: 15px; font-weight: normal;"><%= currentTime %></p>
            </div>
            <div class="card">
                <h3>Active Missions</h3>
                <p style="color: #5cff8d;"><%= activeMissions %> Active</p>
            </div>
            <div class="card">
                <h3>Total Registered Explorers</h3>
                <p style="color: #67e8f9;"><%= totalExplorers %> Explorers</p>
            </div>
            <div class="card">
                <h3>Portal System Status</h3>
                <p style="color: #c77dff;"><%= status %></p>
            </div>
        </div>

        <div style="margin-top: 30px;">
            <a href="db-explorer.html" class="explore-button">← EXPLORER DIRECTORY</a>
            <a href="explorer.php" class="explore-button" style="background: linear-gradient(135deg, #00b0ff, #00e676);">PHP NETWORK →</a>
        </div>

        <div style="margin-top: 40px; color: lightgreen; font-family: Georgia, serif; font-size: 15px;">
            CosmoVerse Space Program | Dynamic Space Portal
        </div>
    </div>
</body>
</html>
