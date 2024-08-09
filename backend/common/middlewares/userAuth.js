const express = require('express');
const db = require('../models');
const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        const username = await User.findOne({ 
            where: { 
                username: req.body.username 
            } 
        });
        const email = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (username) {
            return res.status(409).json({ message: "Username already exists" });
        }
        if (email) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const emailcheck = await User.findOne({ 
            where: { 
                email: req.body.email 
            } 
        });
        if (emailcheck) {
            return res.json(409).send("Authenication failed. Email already exists");
        }
        next();
    } catch (error) {
        console.log(error);
    }
    };

    module.exports = {
        saveUser
    };