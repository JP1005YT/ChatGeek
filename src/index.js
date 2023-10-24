const {Server} = require("../configs/Server.js");
const S = new Server()
const {Pacotes} = require("../configs/Packages.js");
let P = new Pacotes()
const {Utils} = require("../components/utils.js");
let U = new Utils()
const db = require("../configs/Bd.js")

S.start()

const app = S.app
// Banco de dados
app.post("/login",async (req,res) => {
    res.send()
})