// Configuração da app. Altere aqui sem mexer no resto do código.
window.DiaryConfig = {
  // Nome da marca (provisório: confirmar registo de marca e domínio antes de lançar).
  brand: { name: 'Bocado' },
  // Idiomas disponíveis (a ordem define o menu). Para adicionar um país,
  // acrescente o idioma em i18n.js e os nomes dos alimentos em foods.js.
  languages: ['pt', 'en', 'es', 'fr'],
  fallbackLanguage: 'en',
  // Marcos do desafio (número de alimentos provados).
  milestones: [10, 25, 50, 75, 100],
  // Cartão opcional de um parceiro (por exemplo uma loja), desligado por omissão.
  // text: uma frase por idioma; só aparece nos idiomas que tiverem frase.
  partner: { enabled: false, name: '', url: '', text: {} }
};
