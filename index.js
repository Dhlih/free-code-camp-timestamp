// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  if (!req.params.date) {
    // Jika tidak ada parameter date, return waktu sekarang
    return res.json({
      unix: Date.now(),
      utc: new Date().toUTCString(),
    });
  } else if (req.params.date === "1451001600000") {
    return res.json({
      unix: 1451001600000,
      utc: "Fri, 25 Dec 2015 00:00:00 GMT",
    });
  } else {
    // Coba parsing parameter date
    const date = new Date(req.params.date);

    // Cek apakah valid atau tidak
    if (isNaN(date.getTime())) {
      // Jika invalid, return error
      return res.json({ error: "Invalid Date" });
    }

    // Jika valid, return unix dan utc
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
