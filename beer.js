const mongoose = require('mongoose')
const express = require('express');
const Joi = require('joi');
const router = express.Router();

mongoose.connect('mongodb+srv://robinvandenbroucke2:MaMTsORgBD24erKY@node.ckpcixi.mongodb.net/')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log("Error connecting to DB: " + err));


