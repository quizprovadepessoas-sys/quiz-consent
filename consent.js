document.addEventListener("DOMContentLoaded", () => {

    const termsBox = document.getElementById("termsBox");
    const agree = document.getElementById("agree");
    const btn = document.getElementById("btn");

    // Só libera o checkbox quando a pessoa rolar tudo
    termsBox.addEventListener("scroll", () => {
        const atBottom = termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 10;
        if (atBottom) agree.disabled = false;
    });

    // Só libera o botão quando marcar "concordo"
    agree.addEventListener("change", () => {
        btn.disabled = !agree.checked;
    });
});

// === IR PARA O QUIZ SEM QUALQUER ENVIO ===
function continuar() {

    const user = JSON.parse(sessionStorage.getItem("quiz_user") || "{}");

    if (!user.name || !user.email) {
        alert("Erro: dados do usuário não foram encontrados.");
        return;
    }

    // apenas salva localmente que aceitou o termo (se quiser)
    sessionStorage.setItem("quiz_consent", "true");

    // redireciona SEM CONTATO COM SERVIDOR
    window.location.href = "quiz.html";
}
