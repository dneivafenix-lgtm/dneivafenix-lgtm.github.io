// Configuração da app. Altere aqui sem mexer no resto do código.
window.DiaryConfig = {
  // Idiomas disponíveis (a ordem define o menu). Para adicionar um país,
  // acrescente o idioma em i18n.js e os nomes dos alimentos em foods.js.
  languages: ['pt', 'en', 'es', 'fr'],
  fallbackLanguage: 'en',
  // Cartão da loja: só aparece nos idiomas indicados (onde a loja entrega).
  shop: { enabled: true, url: 'https://petitnuvem.com/', languages: ['pt'] }
};
