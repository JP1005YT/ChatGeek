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
       document.querySelector("#user").innerHTML = userdata.name 
    }else{
        window.location.href = '../'
    }

}
Check()

addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        let input = document.querySelector(".chatInput")
        input.value
        socket.emit("chat",Id_Chat,message);
    }
})