async function pass(){
    const dados = await fetch('../login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({'name':document.querySelector("input").value})
    });
    resposta = await dados.json();
}