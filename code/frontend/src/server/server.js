import path from "path"
import express from "express"
import {createProxyMiddleware} from "http-proxy-middleware"

const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, "index.html")
app.use(express.static(DIST_DIR))
app.use("/api", createProxyMiddleware({target: "http://backend:5000", changeOrigin: true}));

app.get("*", (req, res) => {
    res.sendFile(HTML_FILE)
})

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
    console.log(DIST_DIR)
    console.log(`App listening to ${PORT}....`)
    console.log(`Press Ctrl+C to quit.`)
})
