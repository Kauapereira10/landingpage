// Scroll Suave (Navegação Suave entre Seções)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if(destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  })
})

// Botão Flutuante de WhatsApp
const botaoWhatsApp = document.createElement('div');
botaoWhatsApp.innerHTML = `
    <a href="https://wa.me/5511987979722?text=Olá!%20Tenho%20interesse%20no%20produto." target="_blank">
        <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="WhatsApp">
    </a>
`;
botaoWhatsApp.style.position = 'fixed';
botaoWhatsApp.style.bottom = '20px';
botaoWhatsApp.style.right = '20px';
botaoWhatsApp.style.zIndex = '9999';
document.body.appendChild(botaoWhatsApp);

// Contagem Regressiva (Senso de Urgência)
// Criação do container do contador
const contagemContainer = document.createElement('div');
contagemContainer.id = 'contador';
contagemContainer.innerHTML = `
    <div style="
        display: flex;
        align-items: center;
        gap: 10px;
    ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24">
            <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1Zm0 20a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9Zm.5-9.75V7a.5.5 0 0 0-1 0v5.25a.5.5 0 0 0 .146.354l3.5 3.5a.5.5 0 0 0 .708-.708L12.5 11.25Z"/>
        </svg>
        <span id="textoContagem" style="font-family: 'Segoe UI', sans-serif; font-weight: 500;">
            Calculando...
        </span>
    </div>
`;

// Estilo principal do container 
Object.assign(contagemContainer.style, {
  position: 'fixed',
  top: '20px',
  right: '20px',
  background: 'linear-gradient(135deg, #25D366, #128C7E)',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '12px',
  boxShadow: '12px',
  zIndex: '9999',
  cursor: 'default',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
});

// Efeito de hover (escala leve)
contagemContainer.addEventListener('mouseenter', () => {
  contagemContainer.style.transform ='scale(1.05)';
  contagemContainer.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.4)';
});
contagemContainer.addEventListener('mouseleave', () => {
  contagemContainer.style.transform = 'scale(1)';
  contagemContainer.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
})

// Adiciona no Body
document.body.appendChild(contagemContainer);

// Definição da data limite (6 horas a partir de agora)
const dataLimite = new Date();
dataLimite.setHours(dataLimite.getHours() + 6); 

// Função que atualiza a contagem
function atualizarContagem() {
  const agora = new Date();
  const tempoRestante = dataLimite - agora;

  const textoContagem = document.getElementById('textoContagem');

  if(tempoRestante <= 0) {
    textoContagem.textContent = '⛔ Oferta encerrada!';
    return;
  }

  const horas = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((tempoRestante / (1000 * 60)) % 60);
  const segundos = Math.floor((tempoRestante / 1000) % 60);

  textoContagem.textContent = `Oferta acaba em: ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(atualizarContagem, 1000);
atualizarContagem();

// Animação no Scroll (Elementos que Aparecem Suavemente)
const elementosReveal = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => { 
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); 
    }
  });
}, { threshold: 0.2 });

elementosReveal.forEach(el => {
  observer.observe(el);
});

// Pop-up de Oferta Automático
setTimeout(() => {
  const popup = document.createElement('div');
  popup.innerHTML = `
    <div style="
      background-color: var(--cor-primaria);
      padding: 20px;
      border-radius: 10px;
      max-width: 300px;
      box-shadow: 0 0 15px rgba(0,0,0,0.7);
      text-aligh: center;
      color: var(--cor-branco);
    ">
    <h4 style="margin-top: 0;">🎁 Oferta Especial!</h4>
    <p>Ganhe uma planilha exclusiva se comprar nas próximas horas!</p>
    <button id="fecharPopup" style="
      background-color: var(--cor-secundaria);
      color: white;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      ">Fechar</button>
    </div>
  `;

  popup.style.position = 'fixed';
  popup.style.bottom = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, 50%)';
  popup.style.backgroundColor = 'rgba(0,0,0,0.5)';
  popup.style.padding = '20px';
  popup.style.zIndex = '9999';

  document.body.appendChild(popup)

  document.getElementById('fecharPopup').onclick = () => {
    popup.remove();
  };
}, 20000);


// Carrouse da lista de beneficios
const imagens = [
  "assets/img/beneficios (1).jpg",
    "assets/img/beneficios (2).jpg",
    "assets/img/beneficios (3).jpg",
    "assets/img/beneficios (4).png"
];

let index = 0;
const carrouselImage = document.getElementById("carrousel-image");

function trocarImagem() {
  index = (index + 1) % imagens.length;
  carrouselImage.src = imagens[index];
}

setInterval(trocarImagem, 3000);

// Validação de Formulário (Opcional para quando tiver formulário)
// const form = document.getElementById('formulario');
// form.addEventListener('submit', function (e) {
//     e.preventDefault();

//     const nome = document.getElementById('nome').value.trim();
//     const email = document.getElementById('email').value.trim();

//     if (nome === '' || email === '') {
//         alert('Por favor, preencha todos os campos.');
//         return;
//     }

//     alert('Formulário enviado com sucesso!');
//     form.reset();
// });
