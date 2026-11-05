// Conteúdo do site em um só lugar: edite aqui sem mexer no HTML.

const whatsappNumber = '5531982925328';
const whatsappText = encodeURIComponent('Olá, Luh! Vim pelo site da NeuroArte e quero saber mais sobre as oficinas.');

export default {
  nome: 'NeuroArte',
  slogan: 'Estimulando a criatividade na infância',
  responsavel: 'Luh',
  responsavelNome: 'Luciana',
  cidade: 'Belo Horizonte e região',

  contato: {
    whatsapp: '(31) 98292-5328',
    whatsappLink: `https://wa.me/${whatsappNumber}?text=${whatsappText}`,
    email: 'neurooart@gmail.com',
    instagram: '@neurooarte',
    instagramLink: 'https://www.instagram.com/neurooarte/',
  },

  // Aviso no topo do site. Para esconder, troque por: evento: null,
  evento: {
    titulo: 'Oficina temática Urso',
    data: 'Disponível a partir de novembro',
    local: 'Agende sua data pelo WhatsApp',
  },

  // Modalidades (aparecem na home e na página de oficinas)
  oficinas: [
    {
      id: 'domicilio',
      cor: 'pink',
      icone: '🏠',
      titulo: 'Oficina a domicílio',
      resumo: 'Oficinas de arte criativas e inteligentes na sua casa, individuais ou em grupo, para seu filho e os amiguinhos.',
      itens: [
        'Individual ou em grupo',
        'Materiais para criar, explorar e se divertir',
        'Oficinas sensoriais para bebês',
      ],
    },
    {
      id: 'eventos',
      cor: 'orange',
      icone: '🎉',
      titulo: 'Oficina no seu evento',
      resumo: 'Aniversários e festas ganham um espaço de arte onde as crianças criam, brincam e levam a obra para casa.',
      itens: [
        'Oficinas temáticas (ex.: Urso, Fundo do Mar, Espaço)',
        'Decoração temática com chapéus, bandeirinhas e adesivos',
        'Ao ar livre ou em ambiente fechado',
      ],
    },
    {
      id: 'escolas',
      cor: 'blue',
      icone: '🏫',
      titulo: 'Escolas e espaços infantis',
      resumo: 'Levamos a oficina para escolas, espaços infantis e parceiros de BH, com propostas para turmas de todas as idades.',
      itens: [
        'Propostas para turmas e grupos',
        'Temas como reciclagem e cuidado com o planeta',
        'Datas de oficinas abertas divulgadas no Instagram',
      ],
    },
  ],

  // Temas de oficinas já realizadas (tirados dos posts do Instagram)
  temas: [
    { cor: 'orange', icone: '🐻', titulo: 'Urso articulado', texto: 'Um molde de papelão para inventar estampas e dar vida ao próprio ursinho.' },
    { cor: 'yellow', icone: '🐴', titulo: 'Cavalinho de pau', texto: 'Construir, pintar e depois brincar com aquilo que criou.' },
    { cor: 'purple', icone: '🚀', titulo: 'Foguete', texto: 'O papelão ganha uma nova missão: uma aventura pelo espaço.' },
    { cor: 'pink', icone: '🦋', titulo: 'Asas de borboleta', texto: 'Criar, pintar e escolher adesivos para as próprias asas.' },
    { cor: 'blue', icone: '🐠', titulo: 'Slime fundo do mar', texto: 'Cores, texturas e elementos que despertam a imaginação.' },
    { cor: 'green', icone: '♻️', titulo: 'Reciclar é divertido', texto: 'Conhecer os materiais recicláveis e cuidar do planeta brincando.' },
  ],

  // Benefícios da arte no desenvolvimento infantil
  beneficios: [
    { cor: 'yellow', titulo: 'Criatividade', texto: 'Experimentar cores, formas e materiais estimula a imaginação e novas formas de pensar.' },
    { cor: 'green', titulo: 'Coordenação motora', texto: 'Recortar, pintar e montar trabalham a motricidade fina de um jeito divertido.' },
    { cor: 'blue', titulo: 'Autonomia', texto: 'A criança participa de todo o processo e é protagonista da própria criação.' },
    { cor: 'purple', titulo: 'Percepção das cores', texto: 'Misturar, escolher e combinar cores aguça o olhar e a sensibilidade.' },
    { cor: 'pink', titulo: 'Expressão', texto: 'A arte dá forma ao que a criança sente e ainda não sabe dizer com palavras.' },
    { cor: 'orange', titulo: 'Brincar simbólico', texto: 'Depois da arte vem a melhor parte: brincar com aquilo que criou.' },
  ],

  // Equipe
  equipe: [
    { nome: 'Luciana (Luh)', papel: 'Arte educadora e criadora da NeuroArte', cor: 'pink' },
    { nome: 'Maria Eduarda', papel: 'Filha da Luciana e integrante da equipe NeuroArte', cor: 'blue' },
    { nome: 'Vívian Tavares', papel: 'Nora da Luciana e estudante de Pedagogia', cor: 'purple' },
  ],

  // Feedbacks das famílias (tirados do destaque "Feedbacks" do Instagram).
  // Para adicionar: { texto: '...', autor: 'Mãe do Pedro, 6 anos' },
  feedbacks: [
    { texto: 'A melhor, sem sombra de dúvidas! Obrigada pela atenção com minha pequena. Amei!', autor: 'Mãe de participante' },
    { texto: 'Dia de oficina e pintura! Obrigada pelo carinho com minha princesa!', autor: 'Mãe de participante' },
    { texto: 'Cheguei em casa e ameeei o porta-joia. Fofíssimo!', autor: 'Família de participante' },
    { texto: 'Ela só sabe falar da estrela dela!', autor: 'Mãe de participante' },
  ],
};
