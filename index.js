const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/get-video", (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "No URL provided" });
    }

    exec(`yt-dlp -f best -g "${url}" --no-playlist`, (err, stdout, stderr) => {
        if (err) {
            console.error(stderr);
            return res.status(500).json({ error: "Failed to fetch video" });
        }

        res.json({
            downloadUrl: stdout.trim()
        });
    });
});

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
