const express = require("express");

const router = express.Router();

const burger = require("../models/burgers.js");

router.get("/", (req, res) => {
    burger.selectAll(function(data) {
        const hbsObject = {
            burgers: data
        }
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/burgers", (req, res) => {
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name,
    ], (result) => {
    res.redirect("/");
    });
});

router.put("/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;

    console.log("condition ", condition);

    burger.updateOne({
        devoured: true
      }, condition, function(data) {
       res.redirect("/");
      });
});

module.exports = router;