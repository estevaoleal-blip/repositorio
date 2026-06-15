/* ==========================================================================
   1. ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL ANIMATION)
   ========================================================================== */
// Cria o efeito de "surgimento" dos elementos quando entram na tela
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.pillar-card, .manifesto-box, .table-responsive, .cta-section');
    
    // Configura o estilo inicial de transição via JS para manter o CSS limpo
    elementsToAnimate.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight * 0.85; // Dispara quando o bloco atinge 85% da tela

        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };

    // Executa uma vez ao carregar e depois a cada scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});

/* ==========================================================================
   2. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CAPTAÇÃO (CTA)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.form-group');
    
    if (!form) return; // Garante que o script não quebra se o formulário não existir

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento padrão da página

        // Captura os inputs
        const nameInput = form.querySelector('input[type="text"]:nth-of-type(1)');
        const emailInput = form.querySelector('input[type="email"]');
        const sizeInput = form.querySelector('input[type="text"]:nth-of-type(2)');
        const submitBtn = form.querySelector('.btn-submit');

        // Validação básica de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            alert('Por favor, insira um endereço de e-mail válido.');
            emailInput.focus();
            return;
        }

        // Cria o objeto com os dados coletados (Pronto para enviar para uma API)
        const leadData = {
            nome: nameInput.value.trim(),
            email: emailInput.value.trim(),
            tamanhoPropriedade: sizeInput.value.trim(),
            dataCadastro: new Date().