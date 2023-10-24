const {Pacotes} = require("../configs/Packages.js")
let P = new Pacotes()

class Utils{
    Mensagem(response,code){
        let msg = {
            "code" : "",
            "response" : ""
        }
    }
    Guardar(Local,Conteudo) {
        P.fs.writeFileSync(Local, JSON.stringify(Conteudo))
    }
    Buscar(Local){
        return JSON.parse(P.fs.readFileSync(Local))
    }
    Excluir(Local){
        P.fs.unlink(Local, (err) => {
            if (err) {
              console.error('Erro ao excluir o arquivo:', err);
              return;
            }
          
            console.log('Arquivo excluído com sucesso!');
          });
    }
    SendMessage(type,data){
        if(type === "error"){
            return {
                "code" : "0001",
                "response" : "Ocorreu um erro ao comunicar-se com o Banco",
                "error" : data
            }
        }
        if(type === "success"){
            return{
                "code": "0000",
                "response" : "Tudo certo!",
                "body" : data
            }
        }
    }
}

module.exports = {
    Utils
}