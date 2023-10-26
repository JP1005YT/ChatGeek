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
    const data = await P.Buscar("./data/users.json")
    let passa
    data.users.forEach(user => {
        if(user.name.toLowerCase() === req.body.name.toLowerCase()){
            passa =  false
        }else{
            passa =  true
        }
    });

    if(passa){
        novoUsuario = {
            "name" : req.body.name.toLowerCase(),
            "id" : P.uid.v4()
        }
    
        data.users.push(novoUsuario)

        P.Guardar("./data/users.json",data)
        res.send({"id":novoUsuario.id})
    }else{        
        res.send({"erro":"Usuario Ja existe"})
    }
})

app.post("/check",async (req,res) => {
    const data = await P.Buscar("./data/users.json")
    let passa
    data.users.forEach(user => {
        if(user.id === req.body.id){
            passa =  user
        }else{
            passa =  false
        }
    });
    res.send(passa)
})