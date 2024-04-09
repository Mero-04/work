const express = require("express");
const router = express.Router();
const { Worker, Admin } = require("../models/model");
const bcrypt = require("bcrypt")

const AuthController = require("../controllers/auth.controller")

router.get("/login", (req, res) => {
    res.render("auth/login")
})

router.post("/login", async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: { email: req.body.email }
        });

        if (!admin) {
            return res.render("auth/login", {
                message: "Email yalnys"
            })
        }

        const match = await bcrypt.compare(req.body.password, admin.password)
        if (match) {
            req.session.isAuth = true;
            req.session.role = admin.role;
            res.redirect("/admin");
        } else {
            return res.render("auth/login", {
                message: "password yalnys"
            })
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.get("/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

router.get("/kadr/login", (req, res) => {
    res.render("auth/kadr-login")
})

router.post("/kadr/login", async (req, res) => {
    try {
        const kadr = await Worker.findOne({
            where: { email: req.body.email }
        });

        if (!kadr) {
            return res.render("auth/kadr-login", {
                message: "Email yalnys"
            })
        }
        const match = await bcrypt.compare(req.body.password, kadr.password)
        if (match) {
            req.session.isAuth = true;
            req.session.role = kadr.role;
            req.session.userId = kadr.id;
            res.redirect("/kadr");
        } else {
            return res.render("auth/kadr-login", {
                message: "password yalnys"
            })
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.get("/kadr/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;