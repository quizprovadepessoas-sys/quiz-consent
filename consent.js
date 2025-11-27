// === LINK DO NOVO DEPLOY DO APPS SCRIPT ===
const API_URL = "https://script.google.com/macros/s/AKfycbyMD7_W1Kw-r45GYMtpT3pZ_w-DrKfe7Jpsjh5CY4xjIB7STkeYOTYzFNtS54BQpQpJkA/exec";

document.addEventListener("DOMContentLoaded", () => {

    const termsBox = document.getElementById("termsBox");
    const agree = document.getElementById("agree");
    const btn = document.getElementById("btn");

    termsBox.addEventListener("scroll", () => {
        const atBottom = termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 10;
        if (atBottom) agree.disabled = false;
    });

    agree.addEventListener("change", () => {
        btn.disabled = !agree.checked;
    });
});

// === ENVIAR CONSENTIMENTO COM CORS OK ===
async function continuar() {

    const user = JSON.parse(sessionStorage.getItem("quiz_user") || "{}");

    if (!user.name || !user.email) {
        alert("Erro: dados do usuário não foram encontrados.");
        return;
    }

    const payload = {
        action: "registerConsent",
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
            console.error("HTTP ERROR:", response.status, response.statusText);
            throw new Error("Falha no servidor");
        }

        const result = await response.json();

        if (result.success) {
            window.location.href = "quiz.html";
        } else {
            alert("Erro ao registrar consentimento.");
            console.error("ERRO APPS SCRIPT:", result);
        }

    } catch (err) {
        alert("Erro ao registrar consentimento (CORS ou conexão).");
        console.error("ERRO NO FETCH:", err);
    }
}
