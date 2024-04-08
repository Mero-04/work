const express = require("express");
const { Contact, Blog, Category } = require("../models/model");
const router = express.Router();


router.get("/about", (req, res) => {

    res.render("about", {
        page: "about"
    })
})

router.get("/service", (req, res) => {

    res.render("services", {
        page: "service"
    })
})

router.get("/contact", (req, res) => {
    res.render("contact", {
        page: "contact"
    })
})

router.get("/blog/:categoryId", async (req,res)=>{
    const id = req.params.categoryId;
    const categories = await Category.findAll();
    const blogs = await Blog.findAll({
        where: { categoryId : id }
    }) 
    res.render("blogs", {
        page:"blog",
        blogs: blogs,
        categories:categories
    })
})

router.get("/blog", async (req, res) => {
    const blogs = await Blog.findAll();
    const categories = await Category.findAll();
    res.render("blogs", {
        page: "blog",
        blogs: blogs,
        categories:categories
    })
})



router.get("/", (req, res) => {
    res.render("index", {
        page: "home",
        isAuth: req.session.isAuth,
        username: req.session.username
    })
})

router.post("/send-message", async (req, res) => {
    const contact = await Contact.create({
        name: req.body.name,
        email: req.body.email,
        phone_num: req.body.phone_num,
        message: req.body.message
    })
    res.redirect("/")
})

router.get("/blog/blog-details/:blogId", async (req, res) => {
    const id = req.params.blogId;
    const blog = await Blog.findOne({
        where: { id: id }
    });
    res.render("blog-details", {
        blog: blog
    })
})


module.exports = router;