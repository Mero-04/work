const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    blog_img: { type: DataTypes.STRING, allowNull: false }
});


const Contact = sequelize.define("contact", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// const Category = sequelize.define("category", {
//     id: {
//         type: DataTypes.INTEGER(10),
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "KADR"
    }
});

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ADMIN"
    }
});


User.hasMany(Blog)
Blog.belongsTo(User)


module.exports = {
    Blog,
    Contact,
    Admin,
    User
};