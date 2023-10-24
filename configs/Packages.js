class Pacotes{
    mysql = require("mysql2")
    express = require("express")
    bcrypt = require("bcrypt");
    uid = require("uuid");
    fs = require("fs");
    cors = require("cors")
    bodyparser = require("body-parser")
    multer = require("multer")
    path = require("path")
    io = require("socket.io")
    rimraf = require("rimraf")
}
module.exports = {
    Pacotes,
    multer: Pacotes.multer
}