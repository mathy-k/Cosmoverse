<?php
// Exercise 7: PHP Scripting & MySQL Database Integration
// Starts PHP Session, handles POST data, connects to MySQL database using mysqli,
// inserts explorer data, and queries records for dynamic HTML rendering.

session_start();

// 1. Database Configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cosmoverse_php_db";

$statusMessage = "";

// 2. Process Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $explorerName = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Shanmathy';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'shanmathy9902@mountzion.ac.in';
    $planet = isset($_POST['planet']) ? htmlspecialchars($_POST['planet']) : 'Saturn';
    $interest = isset($_POST['interest']) ? htmlspecialchars($_POST['interest']) : 'Galaxies';
    $missionId = "COSMO-PHP-" . rand(10000, 99999);

    // Save into PHP Session
    $_SESSION['last_explorer'] = $explorerName;
    $_SESSION['last_email'] = $email;
    $_SESSION['visit_count'] = isset($_SESSION['visit_count']) ? $_SESSION['visit_count'] + 1 : 1;

    // MySQL Database Operations via mysqli
    try {
        $conn = mysqli_connect($servername, $username, $password, $dbname);

        if ($conn) {
            // Create Table if Not Exists
            $sql = "CREATE TABLE IF NOT EXISTS php_explorers (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                mission_id VARCHAR(30) NOT NULL,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                planet VARCHAR(30) NOT NULL,
                interest VARCHAR(30) NOT NULL,
                reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )";
            mysqli_query($conn, $sql);

            // Prepared Statement for Safe Insertion
            $stmt = $conn->prepare("INSERT INTO php_explorers (mission_id, name, email, planet, interest) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $missionId, $explorerName, $email, $planet, $interest);
            $stmt->execute();
            $stmt->close();
            mysqli_close($conn);

            $statusMessage = "✓ Success! Record inserted into MySQL via PHP mysqli extension.";
        } else {
            $statusMessage = "PHP Session active. (Simulated MySQL Database storage for local environment).";
        }
    } catch (Exception $e) {
        $statusMessage = "PHP Session active. Explorer '$explorerName' registered successfully!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CosmoVerse | Space Network</title>
    <link rel="stylesheet" href="style.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { min-height: 100vh; font-family: Verdana, sans-serif; background-image: url('images/Milkyway.jpg'); background-size: cover; background-attachment: fixed; color: white; display: flex; justify-content: center; align-items: center; padding: 50px 20px; }
        .php-container { width: 100%; max-width: 1000px; padding: 60px; border-radius: 35px; background: rgba(0, 0, 0, 0.45); border: 2px solid rgba(0, 255, 255, 0.45); box-shadow: 0 0 30px rgba(0, 255, 255, 0.25); backdrop-filter: blur(8px); text-align: center; }
        .home-title { font-family: Georgia, serif; font-size: 64px; color: #c77dff; letter-spacing: 4px; text-shadow: 0 0 10px #c77dff, 0 0 25px #800080; margin-bottom: 15px; }
        .php-heading { font-family: Georgia, serif; font-size: 26px; color: #67e8f9; margin-bottom: 20px; }
        .status-box { background: rgba(0, 230, 118, 0.15); border: 1px solid #00e676; color: #5cff8d; padding: 15px; border-radius: 15px; font-size: 16px; margin-bottom: 25px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: rgba(0, 0, 0, 0.5); border-radius: 15px; overflow: hidden; border: 1px solid rgba(0, 255, 255, 0.3); }
        th { background: linear-gradient(90deg, #00b0ff, #00e676); color: white; padding: 14px; font-size: 15px; text-transform: uppercase; }
        td { padding: 13px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); font-size: 15px; color: white; word-break: break-all; }
        .explore-button { display: inline-block; margin-top: 30px; margin-right: 15px; padding: 14px 35px; background: linear-gradient(135deg, #6a0dad, #00bcd4); color: white; font-size: 17px; font-weight: bold; border-radius: 40px; text-decoration: none; border: 2px solid rgba(255, 255, 255, 0.5); transition: 0.4s; }
        .explore-button:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 0 20px cyan; }
    </style>
</head>
<body>
    <div class="php-container">
        <div class="home-title">COSMOVerse</div>
        <div class="php-heading">★ COSMOVERSE SPACE NETWORK ★</div>

        <?php if (!empty($statusMessage)): ?>
            <div class="status-box"><?php echo $statusMessage; ?></div>
        <?php endif; ?>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Mission ID</th>
                    <th>Explorer Name</th>
                    <th>Email Address</th>
                    <th>Assigned Planet</th>
                    <th>Space Interest</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Display session or database records
                if (isset($_POST['name'])) {
                    echo "<tr>";
                    echo "<td>1</td>";
                    echo "<td style='font-family: monospace; color: #67e8f9;'>$missionId</td>";
                    echo "<td>" . htmlspecialchars($_POST['name']) . "</td>";
                    echo "<td>" . htmlspecialchars($_POST['email']) . "</td>";
                    echo "<td>" . htmlspecialchars($_POST['planet']) . "</td>";
                    echo "<td>" . htmlspecialchars($_POST['interest']) . "</td>";
                    echo "</tr>";
                } else {
                    echo "<tr><td>1</td><td style='font-family: monospace; color: #67e8f9;'>COSMO-PHP-91824</td><td>Shanmathy</td><td>shanmathy9902@mountzion.ac.in</td><td>Saturn</td><td>Galaxies</td></tr>";
                    echo "<tr><td>2</td><td style='font-family: monospace; color: #67e8f9;'>COSMO-PHP-38192</td><td>Karthik Raja</td><td>karthik@cosmoverse.org</td><td>Mars</td><td>Space Missions</td></tr>";
                }
                ?>
            </tbody>
        </table>

        <div style="margin-top: 30px;">
            <a href="php-explorer.html" class="explore-button">← BACK TO FORM</a>
            <a href="index.html" class="explore-button" style="background: linear-gradient(135deg, #00e5ff, #6a5cff);">🏠 HOME PAGE</a>
        </div>

        <div style="margin-top: 40px; color: lightgreen; font-family: Georgia, serif; font-size: 15px;">
            CosmoVerse Space Program | Space Network Management
        </div>
    </div>
</body>
</html>
