
//class contato
// 1. Definição da classe Contato com seu construtor
class Contato {
    constructor(nome_do_usuario, email_para_contato, telefone, tipo_de_contato, mensagem) {
        this.nome_do_usuario = nome_do_usuario;
        this.email_para_contato = email_para_contato;
        this.telefone = telefone;
        this.tipo_de_contato = tipo_de_contato;
        this.mensagem = mensagem;
    }
}

// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    // IMPORTANTE: Verifique se o ID no seu HTML é exatamente "form-contato" ou "form"
    const form = document.getElementById("form-contato") || document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (event) => {
            // Evita o recarregamento padrão da página
            event.preventDefault();

            // 2. Captura dos dados informados pelo usuário utilizando os elementos do formulário
            // Nota: Os nomes abaixo devem corresponder ao atributo 'id' ou 'name' dos inputs no HTML
            const nome_do_usuario = document.getElementById("nome_do_usuario")?.value || form.elements.namedItem("nome_do_usuario")?.value;
            const email_para_contato = document.getElementById("email_para_contato")?.value || form.elements.namedItem("email_para_contato")?.value;
            const cpf = document.getElementById("cpf")?.value || form.elements.namedItem("cpf")?.value;
            const telefone = document.getElementById("telefone")?.value || form.elements.namedItem("telefone")?.value;
            const tipo_de_contato = document.getElementById("tipo_de_contato")?.value || form.elements.namedItem("tipo_de_contato")?.value;
            const mensagem = document.getElementById("mensagem")?.value || form.elements.namedItem("mensagem")?.value;

            // 3. Criando a instância da classe Contato (Orientação a Objetos)
            // Exibe no console o objeto estruturado
            console.log("Objeto Contato criado com sucesso:", novoContato);

            // Mensagem de feedback para o usuário
            alert(`Obrigado sr(a). ${novoContato.nome} ${novoContato.sobrenome}, seus dados foram encaminhados com sucesso!`);
            
            // Limpa o formulário após o envio
            form.reset();
        });
    }
});