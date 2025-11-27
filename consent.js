// === LINK DO NOVO DEPLOY DO APPS SCRIPT ===
const API_URL = "https://script.google.com/macros/s/AKfycbxrt-fcNdn9NOdo4gol34cxFVuPo28p9hSyLL7VnihUTzO0_G6p6RULE83s_E76aUMDeA/exec";

document.addEventListener("DOMContentLoaded", () => {

    const termsBox = document.getElementById("termsBox");
    const agree = document.getElementById("agree");
    const btn = document.getElementById("btn");

    // Libera checkbox apenas após scroll completo
    termsBox.addEventListener("scroll", () => {
        const atBottom = termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 10;
        if (atBottom) agree.disabled = false;
    });

    // Libera botão após aceitar termo
    agree.addEventListener("change", () => {
        btn.disabled = !agree.checked;
    });
});


// === FUNÇÃO PRINCIPAL ===
async function continuar() {

    const user = JSON.parse(sessionStorage.getItem("quiz_user") || "{}");

    // Validação de segurança
    if (!user.name || !user.email) {
        alert("Erro: dados do usuário não foram encontrados.");
        return;
    }

    const payload = {
        action: "registerConsent", // AÇÃO CORRETA
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        department: user.department || "GERAL",
        consentText: "Usuário aceitou o termo de consentimento LGPD."
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("HTTP ERRO:", response.status, response.statusText);
            alert("Erro ao enviar dados para o servidor.");
            return;
        }

        const result = await response.json();

        // VERIFICA retorno padrão do Apps Script
        if (result.success === true) {
            window.location.href = "quiz.html";
        } else {
            alert("Erro ao registrar consentimento.");
            console.error("Resposta do servidor:", result);
        }

    } catch (error) {
        alert("Erro ao registrar consentimento (falha de conexão).");
        console.error("Erro no fetch:", error);
    }
}
