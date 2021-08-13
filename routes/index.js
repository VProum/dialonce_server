var express = require("express");
var router = express.Router();
const Url = require("../models/Url");

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/api/url", async(req, res, next) => {
    try {
        const dbResult = await Url.find();
        console.log(dbResult);
        res.status(200).json(dbResult);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post("/api/saveurl", async(req, res, next) => {
    try {
        const dbResult = await Url.create(req.body);
        console.log(dbResult);
        res.status(200).json(dbResult);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get("/:id", async(req, res, next) => {
    try {
        const dbResult = await Url.findById(req.params.id);
        console.log(dbResult);
        res.redirect(dbResult.longUrl);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete("/api/url/:id", async function(req, res, next) {
    try {
        await Url.findByIdAndDelete(req.params.id);
        const dbResult = await Url.find();
        res.status(200).json(dbResult);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;