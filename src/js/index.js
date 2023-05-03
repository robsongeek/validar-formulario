// Para encontrar todos os elementos html que tem o atributo required e coloca em uma lista (array)
const fields = document.querySelectorAll("[required]");

function validateField(field) {
    // logica para verificar se existe erros
    function verifyErrors() {
        let foundError = false;
        // Qual a diferença do (for of) vai iterar em uma lista de campos e (for in) vai iterar em elementos que são objetos ou seja as propriedades do objeto
        for (let chaveError in field.validity) {
            // se não for customError, então verifica se tem erro
            // aceitamos erros desde que !field.validity.valid seja falso
            if (field.validity[chaveError] && !field.validity.valid) {
                foundError = true;
            }
        }
        return foundError;
    }

    function setCustomMessage(message) {
        // suba ate o pai e pesquisa por a tag span com a classe mensagem-erro
        const spanError = field.parentNode.querySelector("span.mensagem-erro");
        if (message) {
            spanError.classList.add("active");
            spanError.innerHTNL = message;
        } else {
            spanError.classList.remove("active");
            spanError.innerHTNL = "";
        }
    }
    // return verifyErrors()
    return function(){
        if(verifyErrors()){
            field.style.borderColor = "#F52E2E"
            setCustomMessage("campo obrigatório");
        }else{
            field.style.borderColor = "#00C22B"
            setCustomMessage();
        }
    }
}

// Vamos utilizar um laço de repetição usando o for
for (let field of fields) {
    // podemos usar invalid por causa do required para executar a função customValidation
    field.addEventListener("invalid", event => {
        // elimina o bubble (não apresenta a menssagem se campo obrigatório)
        event.preventDefault();
        customValidation(event)
    })
    //Verifica quando o campo perde o foco e executa uma ação que é a função customValidation
    field.addEventListener("blur", customValidation)
}

// está função vai ser executada em dois momentos quando sair do campo e ou no clicar do botão
function customValidation(event) {
    const field = event.target;
    // validateField(field) jogou uma função para fora e colocamos dentro da variavel validation
    const validation = validateField(field);
    validation()
};

document.querySelector('form').addEventListener('submit', (event) => {
    // console.log("Enviar o formulário");
    // alert("Formulário enviado")
    // Não vai enviar o formulário ou seja não vai limpar os campos (reload)
    event.preventDefault();
});