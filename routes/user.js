const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Ruter içinden bidiriyorum :)");
});

module.exports = router;
