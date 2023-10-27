const {Server} = require("../configs/Server.js");
const S = new Server()
const {Pacotes} = require("../configs/Packages.js");
let P = new Pacotes()
const {Utils} = require("../components/utils.js");
let U = new Utils()
const db = require("../configs/Bd.js")
let io = S.io
S.start()

io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    socket.on('chat',( message) => {
        const dataAgora = new Date()
        message.hora = formatarData(dataAgora)
        io.emit('chatreceive',message)
    });
})
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
    let passa = false
    data.users.forEach(user => {
        console.log(user)
        if(user.id === req.body.id){
            passa =  user
        }
    });
    res.send(passa)
})

function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear()).slice(-2);
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
}