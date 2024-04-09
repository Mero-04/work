const express = require("express");
const router = express.Router();
const { Blog, Contact, User } = require("../models/model")
const multer = require("multer");
const imageUpload = require("../helpers/image-upload");
const upload = multer({ dest: 'uploads/' })
const bcrypt = require("bcrypt")
const fs = require("fs")
const isKadr = require("../middlewares/isKadr")


router.get("/", isKadr, (req, res) => {
    res.render("kadr/home_kadr")
})


router.get("/contact", async (req, res) => {
    const contacts = await Contact.findAll();
    res.render("kadr/contact", {
        contact: contacts
    })
});

// router.get("/contact/:contactId", async (req, res) => {
//     const id = req.params.contactId;
//     const contact = await Contact.findByPk(id)
//     res.render("admin/contact_single", {
//         contact: contact
//     })
// })




// router.get("/contact/delete/:contactId", async (req, res) => {
//     const contact = await Contact.findByPk(req.params.contactId)
//     res.render("admin/contact_delete", {
//         contact: contact
//     })
// })

// router.post("/contact/delete/:contactId", async (req, res) => {
//     const contact = await Contact.findByPk(req.params.contactId);
//     if (contact) {
//         contact.destroy();
//         res.redirect("/admin/contact")
//     } else {
//         console.log("Message tapylmady")
//     }
// })

// router.get("/kadr", async (req, res) => {
//     const kadr = await User.findAll();
//     res.render("admin/kadr", {
//         kadrlar: kadr
//     })
// })

// router.get("/kadr-add", async (req, res) => {
//     res.render("admin/kadr-add")
// })


// router.post("/kadr-add", imageUpload.upload.single("user_img"), async (req, res) => {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     try {
//         const kadr = await User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: hashedPassword,
//             user_img: req.file.filename
//         })
//         res.redirect("/admin/kadr");
//     } catch (err) {
//         console.log(err)
//     }
// })

// router.get("/kadr/:kadrId", async (req, res) => {
//     const id = req.params.kadrId;
//     const kadr = await User.findByPk(id)
//     res.render("admin/kadr-single", {
//         kadr: kadr
//     })
// })


// router.post("/kadr/edit/:kadrId", imageUpload.upload.single("user_img"), async (req, res) => {
//     console.log(req.body.user_img)
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     const id = req.body.id;
//     let img = req.body.user_img;

//     if (req.file) {
//         img = req.file.filename;

//         fs.unlink("/uploads/user/" + req.body.user_img, err => {
//             console.log(err);
//         })
//     }

//     try {
//         const user = await User.findByPk(id);
//         if (user) {
//             user.username = username;
//             user.email = email;
//             user.user_img = img;
//             user.password = hashedPassword;
//             user.save()

//             return res.redirect("/admin/kadr?action=edit");
//         }
//         res.redirect("/admin/kadr");
//     }
//     catch (err) {
//         console.log(err);
//     }

// })

// router.get("/kadr/edit/:kadrId", async (req, res) => {
//     const id = req.params.kadrId;
//     const kadr = await User.findOne({
//         where: { id: id }
//     })
//     res.render("admin/kadr-edit", {
//         kadr: kadr
//     })
// })

// router.get("/kadr/delete/:kadrId", async (req, res) => {
//     const kadr = await User.findByPk(req.params.kadrId)
//     res.render("admin/kadr_delete", {
//         kadr: kadr
//     })
// })

// router.post("/kadr/delete/:kadrId", async (req, res) => {
//     const kadr = await User.findByPk(req.params.kadrId);
//     if (kadr) {
//         kadr.destroy();
//         res.redirect("/admin/kadr")
//     } else {
//         console.log("Kadr tapylmady")
//     }
// })

router.get("/users", isKadr, async (req, res) => {
    const blogs = await User.findAll();
    res.render("kadr/users", {
        bloglar: blogs
    })
})

router.get("/user-add", isKadr, async (req, res) => {
    res.render("kadr/user-add")
})

router.post("/user-add", isKadr, imageUpload.upload.single("user_img"), async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            surname: req.body.surname,
            ata_name: req.body.ata_name,
            birth: req.body.birth,
            duty: req.body.duty,
            address: req.body.address,
            tel_nom: req.body.surname,
            user_img: req.file.filename
        })
        res.redirect("/kadr/users");
    } catch (err) {
        console.log(err)
    }
})

router.get("/user/:userId", async (req, res) => {
    const id = req.params.userId;
    const user = await User.findByPk(id)
    res.render("kadr/user-single", {
        user: user
    })
})

// router.post("/blog/edit/:blogId", async (req, res) => {
//     const blog = await Blog.findByPk(req.params.blogId);
//     if (blog) {
//         blog.title = req.body.title,
//             blog.description = req.body.description,
//             blog.save()

//         res.redirect("/admin/blog")
//     }
// })

// router.get("/blog/edit/:blogId", async (req, res) => {
//     const id = req.params.blogId;
//     const blog = await Blog.findOne({
//         where: { id: id }
//     })
//     res.render("admin/blog-edit", {
//         blog: blog
//     })
// })

router.get("/user/delete/:userId", isKadr, async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    res.render("kadr/user_delete", {
        user: user
    })
})

router.post("/user/delete/:userId", isKadr, async (req, res) => {
    const user = await User.findByPk(req.params.userId);
    if (user) {
        user.destroy();
        return res.redirect("/kadr/users")
    } else {
        console.log("Ulanyjy tapylmady")
    }
})



// // router.get("/category", async (req, res) => {
// //     const category = await Category.findAll();
// //     res.render("admin/categories", {
// //         category: category,
// //         action: req.query.action
// //     })
// // });


// // router.get("/category-add", (req, res) => {
// //     res.render("admin/category-add")
// // })

// // router.post("/category-add", async (req, res) => {
// //     try {
// //         const category = await Category.create({
// //             name: req.body.name
// //         })
// //         res.redirect("/admin/category?action=create");
// //     } catch (err) {
// //         console.log(err)
// //     }
// // })

// // router.get("/category/:categoryId", async (req, res) => {
// //     const id = req.params.categoryId;
// //     const category = await Category.findByPk(id)
// //     res.render("admin/category_single", {
// //         category: category
// //     })
// // })

// // router.get("/category/edit/:categoryId", async (req, res) => {
// //     const id = req.params.categoryId;
// //     const category = await Category.findByPk(id)
// //     res.render("admin/category-edit", {
// //         category: category
// //     })
// // })

// // //bcrypt
// // //jsonwebtoken


// // router.post("/category/edit/:categoryId", async (req, res) => {
// //     const category = await Category.findByPk(req.params.categoryId);
// //     if (category) {
// //         category.name = req.body.name,
// //         category.save()

// //         res.redirect("/admin/category")
// //     }
// // })

// // router.get("/category/delete/:categoryId", async (req, res) => {
// //     const category = await Category.findByPk(req.params.categoryId)
// //     res.render("admin/category_delete", {
// //         category: category
// //     })
// // })

// // router.post("/category/delete/:categoryId", async (req, res) => {
// //     const category = await Category.findByPk(req.params.categoryId);
// //     if (category) {
// //         category.destroy();
// //         res.redirect("/admin/category?action=delete")
// //     } else {
// //         console.log("Category tapylmady")
// //     }
// // })


module.exports = router;