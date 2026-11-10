// Textos da interface. Para um novo idioma, copie um bloco e traduza.
window.DiaryI18n = {
  pt: {
    langName: 'Português', tagline: 'Diário de introdução alimentar',
    tabToday: 'Hoje', tabFoods: 'Alimentos', tabProgress: 'Progresso', tabSettings: 'Definições',
    today: 'Hoje', prevDay: 'Dia anterior', nextDay: 'Dia seguinte',
    addFood: '+ Registar alimento', emptyDay: 'Ainda sem registos neste dia.',
    ageMonths: n => n === 1 ? '1 mês' : `${n} meses`, ageLine: (name, age) => `${name} · ${age}`,
    setupHint: 'Indica o nome e a data de nascimento nas Definições para ver a idade aqui.',
    search: 'Procurar alimento…', all: 'Todos', noResults: 'Nenhum alimento encontrado.',
    cat: { veg: 'Legumes', fruit: 'Fruta', grain: 'Cereais', protein: 'Proteínas', dairy: 'Laticínios', herb: 'Ervas e especiarias', other: 'Outros' },
    allergenName: { egg: 'Ovo', milk: 'Leite', peanut: 'Amendoim', nuts: 'Frutos secos', gluten: 'Glúten', fish: 'Peixe', shellfish: 'Marisco', soy: 'Soja', sesame: 'Sésamo' },
    allergenBadge: 'Alergénio', triedTimes: n => n === 1 ? 'Provou 1 vez' : `Provou ${n} vezes`, notTried: 'Ainda não provou',
    infoAllergen: a => `Alergénio comum (${a}). Oferece em pequena quantidade, um alergénio novo de cada vez, e observa nas horas seguintes.`,
    infoMin12: 'Não oferecer antes dos 12 meses.',
    infoChoke: 'Risco de engasgamento: oferece esmagado, moído ou cortado em pedaços pequenos, nunca inteiro.',
    history: 'Histórico', logThis: 'Registar este alimento',
    howWasIt: 'Como correu?', liked: 'Gostou', neutral: 'Assim-assim', disliked: 'Não gostou',
    suspectReaction: 'Suspeita de reação (pele, vómitos, outro)', note: 'Nota (opcional)',
    save: 'Guardar', cancel: 'Cancelar', remove: 'Apagar', close: 'Fechar', reactionFlag: 'Suspeita de reação',
    foodsTried: 'alimentos provados', byCategory: 'Por categoria', allergensTitle: 'Alergénios introduzidos',
    introduced: 'Introduzido', pending: 'Por introduzir', reactionsTitle: 'Suspeitas de reação', noReactions: 'Nenhuma suspeita registada.',
    reactionAdvice: 'Fala com o pediatra antes de voltares a oferecer estes alimentos.',
    language: 'Idioma', babyName: 'Nome do bebé', birthDate: 'Data de nascimento',
    data: 'Os teus dados', dataNote: 'Tudo fica guardado apenas neste dispositivo. Faz uma cópia para não perderes os registos.',
    exportData: 'Exportar cópia', importData: 'Importar cópia', clearData: 'Apagar tudo',
    confirmClear: 'Apagar todos os registos? Não é possível desfazer.', importOk: 'Cópia importada.', importFail: 'Ficheiro inválido.',
    disclaimer: 'Esta app é um diário e não substitui o aconselhamento médico. As recomendações variam de país para país: segue as indicações do pediatra do teu bebé. Em caso de dificuldade em respirar ou inchaço da cara, liga para o número de emergência.',
    tips: ['Um alimento novo de cada vez ajuda a perceber o que o bebé gosta e tolera.', 'Recusar à primeira é normal. Volta a oferecer noutro dia, sem insistir.', 'Sem sal e sem açúcar adicionados nas primeiras refeições.', 'O bebé deve comer sentado e sempre acompanhado por um adulto.', 'Oferece alergénios novos de manhã, para poderes observar durante o dia.']
  },
  en: {
    langName: 'English', tagline: 'Starting solids diary',
    tabToday: 'Today', tabFoods: 'Foods', tabProgress: 'Progress', tabSettings: 'Settings',
    today: 'Today', prevDay: 'Previous day', nextDay: 'Next day',
    addFood: '+ Log a food', emptyDay: 'Nothing logged for this day yet.',
    ageMonths: n => n === 1 ? '1 month' : `${n} months`, ageLine: (name, age) => `${name} · ${age}`,
    setupHint: "Add your baby's name and date of birth in Settings to see their age here.",
    search: 'Search foods…', all: 'All', noResults: 'No foods found.',
    cat: { veg: 'Vegetables', fruit: 'Fruit', grain: 'Grains', protein: 'Proteins', dairy: 'Dairy', herb: 'Herbs & spices', other: 'Other' },
    allergenName: { egg: 'Egg', milk: 'Milk', peanut: 'Peanut', nuts: 'Tree nuts', gluten: 'Gluten', fish: 'Fish', shellfish: 'Shellfish', soy: 'Soy', sesame: 'Sesame' },
    allergenBadge: 'Allergen', triedTimes: n => n === 1 ? 'Tried once' : `Tried ${n} times`, notTried: 'Not tried yet',
    infoAllergen: a => `Common allergen (${a}). Offer a small amount, one new allergen at a time, and watch over the following hours.`,
    infoMin12: 'Do not offer before 12 months.',
    infoChoke: 'Choking risk: offer mashed, ground or cut into small pieces, never whole.',
    history: 'History', logThis: 'Log this food',
    howWasIt: 'How did it go?', liked: 'Liked it', neutral: 'So-so', disliked: 'Disliked it',
    suspectReaction: 'Suspected reaction (skin, vomiting, other)', note: 'Note (optional)',
    save: 'Save', cancel: 'Cancel', remove: 'Delete', close: 'Close', reactionFlag: 'Suspected reaction',
    foodsTried: 'foods tried', byCategory: 'By category', allergensTitle: 'Allergens introduced',
    introduced: 'Introduced', pending: 'Not yet', reactionsTitle: 'Suspected reactions', noReactions: 'No suspected reactions logged.',
    reactionAdvice: 'Talk to your paediatrician before offering these foods again.',
    language: 'Language', babyName: "Baby's name", birthDate: 'Date of birth',
    data: 'Your data', dataNote: 'Everything is stored only on this device. Export a backup so you do not lose your records.',
    exportData: 'Export backup', importData: 'Import backup', clearData: 'Delete everything',
    confirmClear: 'Delete all records? This cannot be undone.', importOk: 'Backup imported.', importFail: 'Invalid file.',
    disclaimer: "This app is a diary and does not replace medical advice. Guidance varies between countries: follow your baby's paediatrician. If your baby has trouble breathing or facial swelling, call your emergency number.",
    tips: ['One new food at a time helps you see what your baby likes and tolerates.', 'Refusing at first is normal. Offer it again another day, without pressure.', 'No added salt or sugar in first foods.', 'Your baby should eat sitting up, always with an adult present.', 'Offer new allergens in the morning so you can watch during the day.']
  },
  es: {
    langName: 'Español', tagline: 'Diario de alimentación complementaria',
    tabToday: 'Hoy', tabFoods: 'Alimentos', tabProgress: 'Progreso', tabSettings: 'Ajustes',
    today: 'Hoy', prevDay: 'Día anterior', nextDay: 'Día siguiente',
    addFood: '+ Registrar alimento', emptyDay: 'Aún no hay registros este día.',
    ageMonths: n => n === 1 ? '1 mes' : `${n} meses`, ageLine: (name, age) => `${name} · ${age}`,
    setupHint: 'Indica el nombre y la fecha de nacimiento en Ajustes para ver aquí la edad.',
    search: 'Buscar alimento…', all: 'Todos', noResults: 'No se encontró ningún alimento.',
    cat: { veg: 'Verduras', fruit: 'Fruta', grain: 'Cereales', protein: 'Proteínas', dairy: 'Lácteos', herb: 'Hierbas y especias', other: 'Otros' },
    allergenName: { egg: 'Huevo', milk: 'Leche', peanut: 'Cacahuete', nuts: 'Frutos secos', gluten: 'Gluten', fish: 'Pescado', shellfish: 'Marisco', soy: 'Soja', sesame: 'Sésamo' },
    allergenBadge: 'Alérgeno', triedTimes: n => n === 1 ? 'Lo probó 1 vez' : `Lo probó ${n} veces`, notTried: 'Aún no lo ha probado',
    infoAllergen: a => `Alérgeno frecuente (${a}). Ofrece una cantidad pequeña, un alérgeno nuevo cada vez, y observa en las horas siguientes.`,
    infoMin12: 'No ofrecer antes de los 12 meses.',
    infoChoke: 'Riesgo de atragantamiento: ofrécelo aplastado, molido o en trozos pequeños, nunca entero.',
    history: 'Historial', logThis: 'Registrar este alimento',
    howWasIt: '¿Cómo fue?', liked: 'Le gustó', neutral: 'Regular', disliked: 'No le gustó',
    suspectReaction: 'Sospecha de reacción (piel, vómitos, otro)', note: 'Nota (opcional)',
    save: 'Guardar', cancel: 'Cancelar', remove: 'Borrar', close: 'Cerrar', reactionFlag: 'Sospecha de reacción',
    foodsTried: 'alimentos probados', byCategory: 'Por categoría', allergensTitle: 'Alérgenos introducidos',
    introduced: 'Introducido', pending: 'Pendiente', reactionsTitle: 'Sospechas de reacción', noReactions: 'Ninguna sospecha registrada.',
    reactionAdvice: 'Habla con el pediatra antes de volver a ofrecer estos alimentos.',
    language: 'Idioma', babyName: 'Nombre del bebé', birthDate: 'Fecha de nacimiento',
    data: 'Tus datos', dataNote: 'Todo se guarda solo en este dispositivo. Exporta una copia para no perder los registros.',
    exportData: 'Exportar copia', importData: 'Importar copia', clearData: 'Borrar todo',
    confirmClear: '¿Borrar todos los registros? No se puede deshacer.', importOk: 'Copia importada.', importFail: 'Archivo no válido.',
    disclaimer: 'Esta app es un diario y no sustituye el consejo médico. Las recomendaciones varían según el país: sigue las indicaciones del pediatra de tu bebé. Si tiene dificultad para respirar o hinchazón en la cara, llama al número de emergencias.',
    tips: ['Un alimento nuevo cada vez ayuda a ver qué le gusta y qué tolera.', 'Rechazarlo al principio es normal. Vuelve a ofrecerlo otro día, sin insistir.', 'Sin sal ni azúcar añadidos en las primeras comidas.', 'El bebé debe comer sentado y siempre acompañado por un adulto.', 'Ofrece los alérgenos nuevos por la mañana para poder observar durante el día.']
  },
  fr: {
    langName: 'Français', tagline: 'Journal de diversification alimentaire',
    tabToday: "Aujourd'hui", tabFoods: 'Aliments', tabProgress: 'Progrès', tabSettings: 'Réglages',
    today: "Aujourd'hui", prevDay: 'Jour précédent', nextDay: 'Jour suivant',
    addFood: '+ Noter un aliment', emptyDay: 'Rien de noté pour ce jour.',
    ageMonths: n => `${n} mois`, ageLine: (name, age) => `${name} · ${age}`,
    setupHint: "Indiquez le prénom et la date de naissance dans Réglages pour voir l'âge ici.",
    search: 'Chercher un aliment…', all: 'Tous', noResults: 'Aucun aliment trouvé.',
    cat: { veg: 'Légumes', fruit: 'Fruits', grain: 'Céréales', protein: 'Protéines', dairy: 'Laitages', herb: 'Herbes et épices', other: 'Autres' },
    allergenName: { egg: 'Œuf', milk: 'Lait', peanut: 'Arachide', nuts: 'Fruits à coque', gluten: 'Gluten', fish: 'Poisson', shellfish: 'Crustacés', soy: 'Soja', sesame: 'Sésame' },
    allergenBadge: 'Allergène', triedTimes: n => n === 1 ? 'Goûté 1 fois' : `Goûté ${n} fois`, notTried: 'Pas encore goûté',
    infoAllergen: a => `Allergène courant (${a}). Proposez une petite quantité, un seul nouvel allergène à la fois, et observez dans les heures qui suivent.`,
    infoMin12: 'Ne pas proposer avant 12 mois.',
    infoChoke: "Risque d'étouffement : proposez écrasé, moulu ou coupé en petits morceaux, jamais entier.",
    history: 'Historique', logThis: 'Noter cet aliment',
    howWasIt: "Comment ça s'est passé ?", liked: 'A aimé', neutral: 'Bof', disliked: "N'a pas aimé",
    suspectReaction: 'Réaction suspectée (peau, vomissements, autre)', note: 'Note (facultatif)',
    save: 'Enregistrer', cancel: 'Annuler', remove: 'Supprimer', close: 'Fermer', reactionFlag: 'Réaction suspectée',
    foodsTried: 'aliments goûtés', byCategory: 'Par catégorie', allergensTitle: 'Allergènes introduits',
    introduced: 'Introduit', pending: 'À introduire', reactionsTitle: 'Réactions suspectées', noReactions: 'Aucune réaction suspectée notée.',
    reactionAdvice: 'Parlez-en au pédiatre avant de proposer à nouveau ces aliments.',
    language: 'Langue', babyName: 'Prénom du bébé', birthDate: 'Date de naissance',
    data: 'Vos données', dataNote: 'Tout est enregistré uniquement sur cet appareil. Exportez une copie pour ne rien perdre.',
    exportData: 'Exporter une copie', importData: 'Importer une copie', clearData: 'Tout supprimer',
    confirmClear: 'Supprimer toutes les notes ? Cette action est définitive.', importOk: 'Copie importée.', importFail: 'Fichier invalide.',
    disclaimer: "Cette app est un journal et ne remplace pas un avis médical. Les recommandations varient selon les pays : suivez les conseils du pédiatre de votre bébé. En cas de difficulté à respirer ou de gonflement du visage, appelez les urgences.",
    tips: ["Un seul nouvel aliment à la fois aide à voir ce que bébé aime et tolère.", "Refuser au début est normal. Proposez à nouveau un autre jour, sans insister.", 'Ni sel ni sucre ajoutés dans les premiers repas.', "Bébé doit manger assis, toujours en présence d'un adulte.", 'Proposez les nouveaux allergènes le matin pour pouvoir observer dans la journée.']
  }
};

// Boas-vindas, marcos e relatório.
Object.assign(window.DiaryI18n.pt, {
  obTitle: 'Os primeiros alimentos do teu bebé, bem registados.',
  obLead: 'Um diário simples para a introdução alimentar, dos primeiros purés aos 100 alimentos.',
  obPoints: ['Regista o que o bebé provou, se gostou e como reagiu.', 'Acompanha os alergénios já introduzidos.', 'Leva um relatório claro à consulta do pediatra.'],
  obAccept: 'Compreendo que esta app é um diário e não substitui o aconselhamento do pediatra.',
  obPrivacy: 'Sem conta e sem publicidade. Os dados ficam apenas neste dispositivo.',
  obStart: 'Começar',
  nextMilestone: n => `Próximo marco: ${n} alimentos`, allDone: 'Completaste os 100 alimentos.',
  reportOpen: 'Relatório para o pediatra', reportTitle: 'Relatório de introdução alimentar', reportBack: 'Voltar ao progresso', reportPrint: 'Imprimir ou guardar em PDF',
  reportDate: d => `Emitido a ${d}`, reportAge: a => `Idade: ${a}`,
  reportFood: 'Alimento', reportFirst: 'Primeira vez', reportTimes: 'Vezes', reportDateCol: 'Data', reportNoteCol: 'Nota', reportAllergen: 'Alergénio',
  reportFoods: 'Alimentos provados', reportNone: 'Ainda sem registos.'
});
Object.assign(window.DiaryI18n.en, {
  obTitle: "Your baby's first foods, properly recorded.",
  obLead: 'A simple diary for starting solids, from the first purées to 100 foods.',
  obPoints: ['Log what your baby tried, whether they liked it and how they reacted.', 'Keep track of the allergens already introduced.', "Bring a clear report to your paediatrician's appointment."],
  obAccept: "I understand this app is a diary and does not replace my paediatrician's advice.",
  obPrivacy: 'No account and no ads. Your data stays on this device only.',
  obStart: 'Get started',
  nextMilestone: n => `Next milestone: ${n} foods`, allDone: 'All 100 foods completed.',
  reportOpen: 'Report for the paediatrician', reportTitle: 'Starting solids report', reportBack: 'Back to progress', reportPrint: 'Print or save as PDF',
  reportDate: d => `Issued on ${d}`, reportAge: a => `Age: ${a}`,
  reportFood: 'Food', reportFirst: 'First time', reportTimes: 'Times', reportDateCol: 'Date', reportNoteCol: 'Note', reportAllergen: 'Allergen',
  reportFoods: 'Foods tried', reportNone: 'Nothing logged yet.'
});
Object.assign(window.DiaryI18n.es, {
  obTitle: 'Los primeros alimentos de tu bebé, bien registrados.',
  obLead: 'Un diario sencillo para la alimentación complementaria, de los primeros purés a los 100 alimentos.',
  obPoints: ['Registra lo que probó tu bebé, si le gustó y cómo reaccionó.', 'Lleva el control de los alérgenos ya introducidos.', 'Lleva un informe claro a la consulta del pediatra.'],
  obAccept: 'Entiendo que esta app es un diario y no sustituye el consejo del pediatra.',
  obPrivacy: 'Sin cuenta y sin publicidad. Los datos se quedan solo en este dispositivo.',
  obStart: 'Empezar',
  nextMilestone: n => `Próximo hito: ${n} alimentos`, allDone: 'Has completado los 100 alimentos.',
  reportOpen: 'Informe para el pediatra', reportTitle: 'Informe de alimentación complementaria', reportBack: 'Volver al progreso', reportPrint: 'Imprimir o guardar en PDF',
  reportDate: d => `Emitido el ${d}`, reportAge: a => `Edad: ${a}`,
  reportFood: 'Alimento', reportFirst: 'Primera vez', reportTimes: 'Veces', reportDateCol: 'Fecha', reportNoteCol: 'Nota', reportAllergen: 'Alérgeno',
  reportFoods: 'Alimentos probados', reportNone: 'Aún no hay registros.'
});
Object.assign(window.DiaryI18n.fr, {
  obTitle: 'Les premiers aliments de votre bébé, bien notés.',
  obLead: 'Un journal simple pour la diversification alimentaire, des premières purées aux 100 aliments.',
  obPoints: ["Notez ce que bébé a goûté, s'il a aimé et comment il a réagi.", 'Suivez les allergènes déjà introduits.', 'Apportez un compte rendu clair chez le pédiatre.'],
  obAccept: "Je comprends que cette app est un journal et ne remplace pas l'avis du pédiatre.",
  obPrivacy: 'Sans compte et sans publicité. Vos données restent uniquement sur cet appareil.',
  obStart: 'Commencer',
  nextMilestone: n => `Prochaine étape : ${n} aliments`, allDone: 'Les 100 aliments sont complétés.',
  reportOpen: 'Compte rendu pour le pédiatre', reportTitle: 'Compte rendu de diversification', reportBack: 'Retour aux progrès', reportPrint: 'Imprimer ou enregistrer en PDF',
  reportDate: d => `Établi le ${d}`, reportAge: a => `Âge : ${a}`,
  reportFood: 'Aliment', reportFirst: 'Première fois', reportTimes: 'Fois', reportDateCol: 'Date', reportNoteCol: 'Note', reportAllergen: 'Allergène',
  reportFoods: 'Aliments goûtés', reportNone: 'Rien de noté pour le moment.'
});

// Semana, observação de alergénios, sugestão do dia e estatísticas.
Object.assign(window.DiaryI18n.pt, {
  prevWeek: 'Semana anterior', nextWeek: 'Semana seguinte',
  checkEyebrow: 'Alergénio em observação', checkTitle: f => `${f}: houve alguma reação?`, checkNone: 'Sem reação', checkYes: 'Houve reação',
  suggestTitle: 'Sugestão de hoje', logShort: 'Registar',
  statLogs: n => n === 1 ? 'registo' : 'registos', statStreak: n => n === 1 ? 'dia seguido' : 'dias seguidos', statDays: n => n === 1 ? 'dia com registo' : 'dias com registo',
  lastOffered: d => `Última vez: ${d}`,
  allergenKeep: 'Depois de introduzido sem reação, é habitual manter o alergénio na alimentação regular. Confirma a frequência com o pediatra.',
  retryTitle: 'Para voltar a oferecer', retryNote: 'Recusar à primeira é normal: muitos bebés precisam de provar várias vezes.'
});
Object.assign(window.DiaryI18n.en, {
  prevWeek: 'Previous week', nextWeek: 'Next week',
  checkEyebrow: 'Allergen under watch', checkTitle: f => `${f}: any reaction?`, checkNone: 'No reaction', checkYes: 'There was a reaction',
  suggestTitle: "Today's suggestion", logShort: 'Log',
  statLogs: n => n === 1 ? 'entry' : 'entries', statStreak: n => 'day streak', statDays: n => n === 1 ? 'day logged' : 'days logged',
  lastOffered: d => `Last time: ${d}`,
  allergenKeep: 'Once introduced without a reaction, allergens are usually kept in the regular diet. Check how often with your paediatrician.',
  retryTitle: 'Worth offering again', retryNote: 'Refusing at first is normal: many babies need several tries.'
});
Object.assign(window.DiaryI18n.es, {
  prevWeek: 'Semana anterior', nextWeek: 'Semana siguiente',
  checkEyebrow: 'Alérgeno en observación', checkTitle: f => `${f}: ¿hubo alguna reacción?`, checkNone: 'Sin reacción', checkYes: 'Hubo reacción',
  suggestTitle: 'Sugerencia de hoy', logShort: 'Registrar',
  statLogs: n => n === 1 ? 'registro' : 'registros', statStreak: n => n === 1 ? 'día seguido' : 'días seguidos', statDays: n => n === 1 ? 'día con registro' : 'días con registro',
  lastOffered: d => `Última vez: ${d}`,
  allergenKeep: 'Una vez introducido sin reacción, lo habitual es mantener el alérgeno en la alimentación. Consulta la frecuencia con el pediatra.',
  retryTitle: 'Para volver a ofrecer', retryNote: 'Rechazarlo al principio es normal: muchos bebés necesitan probarlo varias veces.'
});
Object.assign(window.DiaryI18n.fr, {
  prevWeek: 'Semaine précédente', nextWeek: 'Semaine suivante',
  checkEyebrow: 'Allergène à surveiller', checkTitle: f => `${f} : une réaction ?`, checkNone: 'Aucune réaction', checkYes: 'Il y a eu une réaction',
  suggestTitle: 'Suggestion du jour', logShort: 'Noter',
  statLogs: n => n === 1 ? 'note' : 'notes', statStreak: n => n === 1 ? 'jour de suite' : 'jours de suite', statDays: n => n === 1 ? 'jour noté' : 'jours notés',
  lastOffered: d => `Dernière fois : ${d}`,
  allergenKeep: "Une fois introduit sans réaction, l'allergène est généralement maintenu dans l'alimentation. Vérifiez la fréquence avec le pédiatre.",
  retryTitle: 'À proposer de nouveau', retryNote: "Refuser au début est normal : beaucoup de bébés ont besoin de plusieurs essais."
});

// Receitas.
Object.assign(window.DiaryI18n.pt, {
  tabRecipes: 'Receitas', recipeOfDay: 'Receita do dia', recipesAll: 'Todas', stage: n => `${n}+ meses`, searchRecipes: 'Procurar receita…',
  ingredients: 'Ingredientes', howTo: 'Como fazer', recipeFoods: 'Alimentos desta receita', recipeFoodsHint: 'Toca num alimento para o registares no dia de hoje.',
  recipesWith: 'Receitas com este alimento', recipesEmpty: 'Nenhuma receita encontrada.',
  recipeNote: 'Adapta a textura à fase do bebé e segue as orientações do pediatra sobre a introdução de novos alimentos.',
  bookTitle: 'Mais receitas no livro «A Primeira Colher»', bookText: 'Livro digital com receitas dos 6 aos 12 meses, organizadas por fase.', bookCta: 'Ver o livro'
});
Object.assign(window.DiaryI18n.en, {
  tabRecipes: 'Recipes', recipeOfDay: 'Recipe of the day', recipesAll: 'All', stage: n => `${n}+ months`, searchRecipes: 'Search recipes…',
  ingredients: 'Ingredients', howTo: 'Method', recipeFoods: 'Foods in this recipe', recipeFoodsHint: 'Tap a food to log it for today.',
  recipesWith: 'Recipes with this food', recipesEmpty: 'No recipes found.',
  recipeNote: "Adapt the texture to your baby's stage and follow your paediatrician's guidance on new foods.",
  bookTitle: 'More recipes in the book', bookText: 'A digital book with recipes from 6 to 12 months, organised by stage.', bookCta: 'See the book'
});
Object.assign(window.DiaryI18n.es, {
  tabRecipes: 'Recetas', recipeOfDay: 'Receta del día', recipesAll: 'Todas', stage: n => `${n}+ meses`, searchRecipes: 'Buscar receta…',
  ingredients: 'Ingredientes', howTo: 'Preparación', recipeFoods: 'Alimentos de esta receta', recipeFoodsHint: 'Toca un alimento para registrarlo hoy.',
  recipesWith: 'Recetas con este alimento', recipesEmpty: 'No se encontró ninguna receta.',
  recipeNote: 'Adapta la textura a la etapa del bebé y sigue las indicaciones del pediatra sobre los alimentos nuevos.',
  bookTitle: 'Más recetas en el libro', bookText: 'Libro digital con recetas de los 6 a los 12 meses, organizadas por etapa.', bookCta: 'Ver el libro'
});
Object.assign(window.DiaryI18n.fr, {
  tabRecipes: 'Recettes', recipeOfDay: 'Recette du jour', recipesAll: 'Toutes', stage: n => `${n}+ mois`, searchRecipes: 'Chercher une recette…',
  ingredients: 'Ingrédients', howTo: 'Préparation', recipeFoods: 'Aliments de cette recette', recipeFoodsHint: "Touchez un aliment pour le noter aujourd'hui.",
  recipesWith: 'Recettes avec cet aliment', recipesEmpty: 'Aucune recette trouvée.',
  recipeNote: "Adaptez la texture à l'étape de bébé et suivez les conseils du pédiatre sur les nouveaux aliments.",
  bookTitle: 'Plus de recettes dans le livre', bookText: 'Livre numérique avec des recettes de 6 à 12 mois, classées par étape.', bookCta: 'Voir le livre'
});
