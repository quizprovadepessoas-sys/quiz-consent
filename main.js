// --- Config provisória ---
// Não usar isso em produção
const ADMIN_TEST_PASSWORD = "Admin@123";

function $(id){ return document.getElementById(id); }

// Inputs
const nameInput = $("name");
const emailInput = $("email");
const phoneInput = $("phone");
const continueBtn = $("continueBtn");

// Admin
const adminLink = $("adminLink");
const adminModal = $("adminModal");
const adminPass = $("adminPass");
const adminLoginBtn = $("adminLoginBtn");
const adminCancel = $("adminCancel");

function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    const emailValid = /\S+@\S+\.\S+/.test(email);

    const ok = name.length > 1 && emailValid && phone.length >= 8;

    continueBtn.disabled = !ok;
}

// validar enquanto digita
nameInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);
phoneInput.addEventListener("input", validateForm);

// Abrir modal admin
adminLink.addEventListener("click", (e) => {
    e.preventDefault();
    adminModal.classList.remove("hidden");
    adminPass.value = "";
    adminPass.focus();
});

// Fechar modal
adminCancel.addEventListener("click", () => {
    adminModal.classList.add("hidden");
});

// Login admin
adminLoginBtn.addEventListener("click", () => {
    if (adminPass.value === ADMIN_TEST_PASSWORD) {
        sessionStorage.setItem("quiz_admin", "1");
        adminModal.classList.add("hidden");
        window.location.href = "admin.html";
    } else {
        alert("Senha inválida.");
    }
});

// Continuar (usuário comum)
continueBtn.addEventListener("click", () => {
    const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
    };

    sessionStorage.setItem("quiz_user", JSON.stringify(user));

    window.location.href = "consent.html";
});
