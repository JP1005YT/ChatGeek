const socket = io();
// Pega a URL atual
const url = window.location.href;
let userdata
// Cria um objeto URL a partir da URL
const urlObj = new URL(url);

// Pega o valor do parâmetro 'tag' da URL
const id = urlObj.searchParams.get('id');

async function Check(){
    const dados = await fetch('../check', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({'id':id})
    });
    
    resposta = await dados.json();
    if(resposta != false){
        userdata = resposta
        console.log(userdata)
       document.querySelector("#user").innerHTML = userdata.name 
    }else{
        window.location.href = '../'
    }

}
Check()

addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        let input = document.querySelector(".chatInput")
        if(input.value.length > 0){
            let message = {
                "msg" : input.value,
                "user" : userdata.name
            }
            input.value = ''
            socket.emit("chat",message);
        }
        // console.log(message)
    }
})
socket.on("chatreceive",(msg)=>{
    ConstruirMSG(msg)
})
let chat = document.getElementById("chatGlobal");
function ConstruirMSG(msg){
    if(msg.user === userdata.name){
        let div = document.createElement("div");
        div.classList.value = 'message my';
        msg.hora = msg.hora.split(" ");
        div.innerHTML = `<div class="content"><span class="name">${msg.user}</span><span class="text">${msg.msg}</span><span class="time">${msg.hora[1]}</span></div>`;
        chat.appendChild(div);
        document.documentElement.scrollTop  = chat.scrollHeight
    }else{
        let div = document.createElement("div");
        div.classList.value = 'message';
        msg.hora = msg.hora.split(" ");
        div.innerHTML = `<div class="content"><span class="name">${msg.user}</span><span class="text">${msg.msg}</span><span class="time">${msg.hora[1]}</span></div>`;
        chat.appendChild(div);
        document.documentElement.scrollTop  = chat.scrollHeight
    }

}

