<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
        <head>
            <title>CosmoVerse | XML-XSLT Rendered Cadet Directory</title>
            <style>
                body { font-family: Verdana, sans-serif; background: #040a1e; color: white; padding: 30px; }
                h1 { color: #00e5ff; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { background: rgba(0, 229, 255, 0.25); color: #00e5ff; padding: 12px; border: 1px solid #00e5ff; text-align: left; }
                td { padding: 10px; border: 1px solid rgba(255,255,255,0.2); }
                tr:nth-child(even) { background: rgba(255,255,255,0.05); }
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
