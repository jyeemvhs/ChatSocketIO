

let path = require("path");
let express = require("express");
let router = express.Router();

router.get("/",function(req,res) {
  console.log("here i am");
  res.sendFile(path.resolve(__dirname,"index.html"));
});


module.exports = router;
