const express = require("express");
const path = require("path");

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ---------------- View Engine ---------------- */
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

/* ---------------- Routes ---------------- */
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", urlRoute);

/* ---------------- Test Route ---------------- */
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

/* ---------------- Redirect Route ---------------- */
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send("URL not found");
  }

  res.redirect(entry.redirectURL);
});

/* ---------------- MongoDB Connection ---------------- */
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error(err));

/* ---------------- Server ---------------- */
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
