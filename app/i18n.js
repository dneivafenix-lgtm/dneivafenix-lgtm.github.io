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
  bookTitle: 'More recipes in the book “The First Spoon”', bookText: 'A digital book with recipes from 6 to 12 months, organised by stage.', bookCta: 'See the book'
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

// Calorias das receitas.
Object.assign(window.DiaryI18n.pt, {
  kcal: { portion: n => `≈ ${n} kcal por porção`, unit: n => `≈ ${n} kcal por unidade`, family: n => `≈ ${n} kcal por porção de adulto` },
  kcalNote: 'Calorias estimadas a partir dos ingredientes. Servem de referência, não de meta: o apetite do bebé varia de dia para dia.'
});
Object.assign(window.DiaryI18n.en, {
  kcal: { portion: n => `≈ ${n} kcal per serving`, unit: n => `≈ ${n} kcal each`, family: n => `≈ ${n} kcal per adult serving` },
  kcalNote: "Calories are estimated from the ingredients. They are a reference, not a target: a baby's appetite varies from day to day."
});
Object.assign(window.DiaryI18n.es, {
  kcal: { portion: n => `≈ ${n} kcal por ración`, unit: n => `≈ ${n} kcal por unidad`, family: n => `≈ ${n} kcal por ración de adulto` },
  kcalNote: 'Calorías estimadas a partir de los ingredientes. Sirven de referencia, no de objetivo: el apetito del bebé varía de un día a otro.'
});
Object.assign(window.DiaryI18n.fr, {
  kcal: { portion: n => `≈ ${n} kcal par portion`, unit: n => `≈ ${n} kcal pièce`, family: n => `≈ ${n} kcal par portion adulte` },
  kcalNote: "Calories estimées à partir des ingrédients. Elles servent de repère, pas d'objectif : l'appétit de bébé varie d'un jour à l'autre."
});

// Vários bebés, plano da semana e lista de compras.
Object.assign(window.DiaryI18n.pt, {
  babies: 'Bebés', babyDefault: 'Bebé', addBaby: '+ Adicionar bebé', removeBaby: 'Remover este bebé',
  confirmRemoveBaby: n => `Remover ${n} e todos os seus registos? Não é possível desfazer.`,
  segPlan: 'Plano da semana', segShop: 'Lista de compras', planAdd: '+ Adicionar receita', planSuggest: 'Sugerir a semana', planClear: 'Limpar a semana',
  planEmpty: 'Sem receitas neste dia.', planDay: 'Plano do dia', addToPlan: 'Adicionar ao plano', chooseDay: 'Escolhe o dia', removeFromPlan: 'Remover do plano',
  planAdded: 'Adicionada ao plano.', shopEmpty: 'Adiciona receitas ao plano desta semana para veres aqui a lista de compras.',
  shopNote: 'Ingredientes das receitas do plano desta semana. Marca o que já tens.'
});
Object.assign(window.DiaryI18n.en, {
  babies: 'Babies', babyDefault: 'Baby', addBaby: '+ Add a baby', removeBaby: 'Remove this baby',
  confirmRemoveBaby: n => `Remove ${n} and all their records? This cannot be undone.`,
  segPlan: 'Weekly plan', segShop: 'Shopping list', planAdd: '+ Add a recipe', planSuggest: 'Suggest a week', planClear: 'Clear the week',
  planEmpty: 'No recipes for this day.', planDay: 'Plan for the day', addToPlan: 'Add to plan', chooseDay: 'Choose the day', removeFromPlan: 'Remove from plan',
  planAdded: 'Added to the plan.', shopEmpty: "Add recipes to this week's plan to see the shopping list here.",
  shopNote: "Ingredients for the recipes in this week's plan. Tick what you already have."
});
Object.assign(window.DiaryI18n.es, {
  babies: 'Bebés', babyDefault: 'Bebé', addBaby: '+ Añadir bebé', removeBaby: 'Quitar este bebé',
  confirmRemoveBaby: n => `¿Quitar a ${n} y todos sus registros? No se puede deshacer.`,
  segPlan: 'Plan semanal', segShop: 'Lista de la compra', planAdd: '+ Añadir receta', planSuggest: 'Sugerir la semana', planClear: 'Vaciar la semana',
  planEmpty: 'Sin recetas este día.', planDay: 'Plan del día', addToPlan: 'Añadir al plan', chooseDay: 'Elige el día', removeFromPlan: 'Quitar del plan',
  planAdded: 'Añadida al plan.', shopEmpty: 'Añade recetas al plan de esta semana para ver aquí la lista de la compra.',
  shopNote: 'Ingredientes de las recetas del plan de esta semana. Marca lo que ya tienes.'
});
Object.assign(window.DiaryI18n.fr, {
  babies: 'Bébés', babyDefault: 'Bébé', addBaby: '+ Ajouter un bébé', removeBaby: 'Retirer ce bébé',
  confirmRemoveBaby: n => `Retirer ${n} et toutes ses notes ? Cette action est définitive.`,
  segPlan: 'Menu de la semaine', segShop: 'Liste de courses', planAdd: '+ Ajouter une recette', planSuggest: 'Proposer une semaine', planClear: 'Vider la semaine',
  planEmpty: 'Aucune recette ce jour-là.', planDay: 'Menu du jour', addToPlan: 'Ajouter au menu', chooseDay: 'Choisissez le jour', removeFromPlan: 'Retirer du menu',
  planAdded: 'Ajoutée au menu.', shopEmpty: 'Ajoutez des recettes au menu de cette semaine pour voir ici la liste de courses.',
  shopNote: 'Ingrédients des recettes du menu de cette semaine. Cochez ce que vous avez déjà.'
});

// Subscrição.
Object.assign(window.DiaryI18n.pt, {
  premium: 'Premium', subTitle: 'Petit Nuvem Premium', subLead: 'Tudo o que precisas para acompanhar a alimentação do teu bebé.',
  subPoints: ['Todas as receitas, dos 6 aos 12+ meses', 'Plano da semana com lista de compras', 'Vários bebés', 'Relatório para o pediatra', 'Cópia de segurança e partilha entre cuidadores (em breve)'],
  planYearly: 'Anual', planMonthly: 'Mensal', perYear: p => `${p} por ano`, perMonth: p => `${p} por mês`, subSave: n => `Poupa ${n}%`,
  trialNote: n => `Começa com ${n} dias grátis. Cancela quando quiseres.`, subStart: 'Começar o teste grátis',
  subSoon: 'Os pagamentos ainda não estão ativos.', subTest: 'Modo de teste: está tudo desbloqueado.', subActive: 'Subscrição ativa.', subFree: 'Estás no plano gratuito.',
  subSee: 'Ver planos', subscription: 'Subscrição'
});
Object.assign(window.DiaryI18n.en, {
  premium: 'Premium', subTitle: 'Petit Nuvem Premium', subLead: "Everything you need to follow your baby's first foods.",
  subPoints: ['Every recipe, from 6 to 12+ months', 'Weekly plan with shopping list', 'Several babies', 'Report for the paediatrician', 'Backup and sharing between caregivers (coming soon)'],
  planYearly: 'Yearly', planMonthly: 'Monthly', perYear: p => `${p} per year`, perMonth: p => `${p} per month`, subSave: n => `Save ${n}%`,
  trialNote: n => `Start with ${n} days free. Cancel any time.`, subStart: 'Start the free trial',
  subSoon: 'Payments are not active yet.', subTest: 'Test mode: everything is unlocked.', subActive: 'Subscription active.', subFree: 'You are on the free plan.',
  subSee: 'See plans', subscription: 'Subscription'
});
Object.assign(window.DiaryI18n.es, {
  premium: 'Premium', subTitle: 'Petit Nuvem Premium', subLead: 'Todo lo que necesitas para seguir la alimentación de tu bebé.',
  subPoints: ['Todas las recetas, de los 6 a los 12+ meses', 'Plan semanal con lista de la compra', 'Varios bebés', 'Informe para el pediatra', 'Copia de seguridad y uso compartido entre cuidadores (próximamente)'],
  planYearly: 'Anual', planMonthly: 'Mensual', perYear: p => `${p} al año`, perMonth: p => `${p} al mes`, subSave: n => `Ahorra un ${n} %`,
  trialNote: n => `Empieza con ${n} días gratis. Cancela cuando quieras.`, subStart: 'Empezar la prueba gratis',
  subSoon: 'Los pagos aún no están activos.', subTest: 'Modo de prueba: todo está desbloqueado.', subActive: 'Suscripción activa.', subFree: 'Estás en el plan gratuito.',
  subSee: 'Ver planes', subscription: 'Suscripción'
});
Object.assign(window.DiaryI18n.fr, {
  premium: 'Premium', subTitle: 'Petit Nuvem Premium', subLead: "Tout ce qu'il faut pour suivre l'alimentation de votre bébé.",
  subPoints: ['Toutes les recettes, de 6 à 12+ mois', 'Menu de la semaine avec liste de courses', 'Plusieurs bébés', 'Compte rendu pour le pédiatre', 'Sauvegarde et partage entre proches (bientôt)'],
  planYearly: 'Annuel', planMonthly: 'Mensuel', perYear: p => `${p} par an`, perMonth: p => `${p} par mois`, subSave: n => `Économisez ${n} %`,
  trialNote: n => `Commencez par ${n} jours gratuits. Résiliez quand vous voulez.`, subStart: "Commencer l'essai gratuit",
  subSoon: 'Les paiements ne sont pas encore actifs.', subTest: 'Mode test : tout est débloqué.', subActive: 'Abonnement actif.', subFree: 'Vous utilisez la formule gratuite.',
  subSee: 'Voir les formules', subscription: 'Abonnement'
});

// Ficha do alimento: como servir por idade.
Object.assign(window.DiaryI18n.pt, {
  serveTitle: 'Como servir', serveNow: 'Agora', badgeAllergen: a => `Alergénio: ${a}`, badgeChoke: 'Risco de engasgamento', badgeMin12: 'Só depois dos 12 meses',
  serveNote: 'Orientações gerais. Cada bebé tem o seu ritmo: adapta e confirma com o pediatra. O bebé come sempre sentado e vigiado.'
});
Object.assign(window.DiaryI18n.en, {
  serveTitle: 'How to serve', serveNow: 'Now', badgeAllergen: a => `Allergen: ${a}`, badgeChoke: 'Choking risk', badgeMin12: 'Only after 12 months',
  serveNote: 'General guidance. Every baby is different: adapt it and check with your paediatrician. Your baby should always eat sitting up and supervised.'
});
Object.assign(window.DiaryI18n.es, {
  serveTitle: 'Cómo servir', serveNow: 'Ahora', badgeAllergen: a => `Alérgeno: ${a}`, badgeChoke: 'Riesgo de atragantamiento', badgeMin12: 'Solo después de los 12 meses',
  serveNote: 'Orientaciones generales. Cada bebé tiene su ritmo: adáptalas y confírmalas con el pediatra. El bebé come siempre sentado y vigilado.'
});
Object.assign(window.DiaryI18n.fr, {
  serveTitle: 'Comment servir', serveNow: 'Maintenant', badgeAllergen: a => `Allergène : ${a}`, badgeChoke: "Risque d'étouffement", badgeMin12: 'Seulement après 12 mois',
  serveNote: 'Repères généraux. Chaque bébé avance à son rythme : adaptez et vérifiez avec le pédiatre. Bébé mange toujours assis et sous surveillance.'
});

// Calendário do mês e resumo do dia.
Object.assign(window.DiaryI18n.pt, {
  prevMonth: 'Mês anterior', nextMonth: 'Mês seguinte', daySummary: 'Resumo do dia', calDay: (d, n) => n ? `${d}, ${n} registos` : d,
  sumFoods: n => n === 1 ? '1 alimento' : `${n} alimentos`, sumNew: n => n === 1 ? '1 novo' : `${n} novos`,
  sumReactions: n => n === 1 ? '1 suspeita de reação' : `${n} suspeitas de reação`, sumPlanned: n => n === 1 ? '1 receita no plano' : `${n} receitas no plano`
});
Object.assign(window.DiaryI18n.en, {
  prevMonth: 'Previous month', nextMonth: 'Next month', daySummary: 'Day summary', calDay: (d, n) => n ? `${d}, ${n} entries` : d,
  sumFoods: n => n === 1 ? '1 food' : `${n} foods`, sumNew: n => `${n} new`,
  sumReactions: n => n === 1 ? '1 suspected reaction' : `${n} suspected reactions`, sumPlanned: n => n === 1 ? '1 planned recipe' : `${n} planned recipes`
});
Object.assign(window.DiaryI18n.es, {
  prevMonth: 'Mes anterior', nextMonth: 'Mes siguiente', daySummary: 'Resumen del día', calDay: (d, n) => n ? `${d}, ${n} registros` : d,
  sumFoods: n => n === 1 ? '1 alimento' : `${n} alimentos`, sumNew: n => n === 1 ? '1 nuevo' : `${n} nuevos`,
  sumReactions: n => n === 1 ? '1 sospecha de reacción' : `${n} sospechas de reacción`, sumPlanned: n => n === 1 ? '1 receta en el plan' : `${n} recetas en el plan`
});
Object.assign(window.DiaryI18n.fr, {
  prevMonth: 'Mois précédent', nextMonth: 'Mois suivant', daySummary: 'Résumé du jour', calDay: (d, n) => n ? `${d}, ${n} notes` : d,
  sumFoods: n => n === 1 ? '1 aliment' : `${n} aliments`, sumNew: n => n === 1 ? '1 nouveau' : `${n} nouveaux`,
  sumReactions: n => n === 1 ? '1 réaction suspectée' : `${n} réactions suspectées`, sumPlanned: n => n === 1 ? '1 recette au menu' : `${n} recettes au menu`
});

// Calendário com pontos por tipo, filtros, botão de adicionar e notas do dia.
Object.assign(window.DiaryI18n.pt, {
  legendFoods: 'Alimentos', legendPlan: 'Receitas', legendNotes: 'Notas', legendReactions: 'Reações', filterNew: 'Novos',
  add: 'Adicionar', addWhat: 'O que queres registar?', optFood: 'Alimento', optFoodHint: 'O que o bebé provou',
  optRecipe: 'Receita', optRecipeHint: 'Juntar ao plano deste dia', optNote: 'Nota', optNoteHint: 'Sono, apetite, humor, o que quiseres lembrar',
  noteTitle: 'Nota do dia', notePlaceholder: 'Escreve aqui…', editNote: 'Editar nota'
});
Object.assign(window.DiaryI18n.en, {
  legendFoods: 'Foods', legendPlan: 'Recipes', legendNotes: 'Notes', legendReactions: 'Reactions', filterNew: 'New',
  add: 'Add', addWhat: 'What would you like to log?', optFood: 'Food', optFoodHint: 'Something your baby tried',
  optRecipe: 'Recipe', optRecipeHint: "Add to this day's plan", optNote: 'Note', optNoteHint: 'Sleep, appetite, mood, anything worth remembering',
  noteTitle: 'Note for the day', notePlaceholder: 'Write here…', editNote: 'Edit note'
});
Object.assign(window.DiaryI18n.es, {
  legendFoods: 'Alimentos', legendPlan: 'Recetas', legendNotes: 'Notas', legendReactions: 'Reacciones', filterNew: 'Nuevos',
  add: 'Añadir', addWhat: '¿Qué quieres registrar?', optFood: 'Alimento', optFoodHint: 'Lo que probó el bebé',
  optRecipe: 'Receta', optRecipeHint: 'Añadir al plan de este día', optNote: 'Nota', optNoteHint: 'Sueño, apetito, humor, lo que quieras recordar',
  noteTitle: 'Nota del día', notePlaceholder: 'Escribe aquí…', editNote: 'Editar nota'
});
Object.assign(window.DiaryI18n.fr, {
  legendFoods: 'Aliments', legendPlan: 'Recettes', legendNotes: 'Notes', legendReactions: 'Réactions', filterNew: 'Nouveaux',
  add: 'Ajouter', addWhat: 'Que voulez-vous noter ?', optFood: 'Aliment', optFoodHint: 'Ce que bébé a goûté',
  optRecipe: 'Recette', optRecipeHint: 'Ajouter au menu de ce jour', optNote: 'Note', optNoteHint: "Sommeil, appétit, humeur, ce que vous voulez retenir",
  noteTitle: 'Note du jour', notePlaceholder: 'Écrivez ici…', editNote: 'Modifier la note'
});

// Ficha completa, programa de alergénios, próximos alimentos, guias, páginas legais e sobre o conteúdo.
// A REVER POR PROFISSIONAL DE SAÚDE: os textos de alergénios (alg*) abaixo.
Object.assign(window.DiaryI18n.pt, {
  fromAge: n => `A partir dos ${n} meses`, chokeLevel: { low: 'Engasgamento: risco baixo', medium: 'Engasgamento: risco médio', high: 'Engasgamento: risco alto' },
  nutriTitle: 'Destaques nutricionais', tipTitle: 'Dica',
  nextFoods: 'Próximos alimentos a provar', nextFoodsHint: 'Ainda não provados e adequados à idade.',
  algTitle: 'Programa de alergénios', algOpen: 'Abrir o programa de alergénios',
  algIntro: 'Os nove alergénios mais comuns, um de cada vez. Regista cada vez que os ofereces e a app mostra em que ponto estás.',
  algBefore: 'Antes de começares, fala com o pediatra se o bebé tem eczema grave, uma alergia alimentar já conhecida ou se já houve alguma suspeita de reação.',
  algState: { todo: 'Por introduzir', doing: 'Em curso', done: 'Introduzido', reaction: 'Suspeita de reação' },
  algCount: (n, m) => `${n} de ${m} vezes sem reação`, algNext: 'Próximo passo',
  algStep: { todo: 'Primeira vez: oferece uma pequena quantidade, de manhã, num dia em que o bebé esteja bem. Não introduzas outro alergénio novo no mesmo dia e observa nas horas seguintes.',
    doing: 'Repete nos próximos dias e vai aumentando a quantidade aos poucos, se não houver reação.',
    done: 'Mantém este alergénio na alimentação habitual do bebé.',
    reaction: 'Não voltes a oferecer antes de falares com o pediatra.' },
  algDue: n => `Não é oferecido há ${n} dias. Volta a oferecer para o manter na rotina.`, algDueCard: n => n === 1 ? '1 alergénio para voltar a oferecer' : `${n} alergénios para voltar a oferecer`,
  algFoods: 'Alimentos com este alergénio', algEmergency: 'Em caso de dificuldade em respirar ou inchaço da cara, liga para o número de emergência.',
  guidesTitle: 'Guias', guidesHint: 'O essencial para começar com segurança.', guideSources: s => `Base: orientações gerais de ${s}.`, firstAidLink: 'Formação em primeiros socorros pediátricos',
  aboutTitle: 'Sobre o conteúdo', aboutText: 'Os textos desta app são informação geral sobre introdução alimentar.',
  aboutReviewed: (who, when) => `Revisto por ${who}${when ? ' em ' + when : ''}.`, aboutNotReviewed: 'Ainda não foi revisto por um profissional de saúde.',
  aboutSources: s => `Fontes de referência: ${s}.`,
  legalTitle: 'Informação legal', legalPrivacy: 'Política de privacidade', legalTerms: 'Termos de utilização', legalMedical: 'Aviso médico',
  legalDraft: 'Rascunho, ainda sem revisão jurídica.', legalNoContact: '(contacto a indicar)'
});
Object.assign(window.DiaryI18n.en, {
  fromAge: n => `From ${n} months`, chokeLevel: { low: 'Choking: low risk', medium: 'Choking: medium risk', high: 'Choking: high risk' },
  nutriTitle: 'Nutrition highlights', tipTitle: 'Tip',
  nextFoods: 'Next foods to try', nextFoodsHint: "Not tried yet and right for your baby's age.",
  algTitle: 'Allergen programme', algOpen: 'Open the allergen programme',
  algIntro: 'The nine most common allergens, one at a time. Log each time you offer them and the app shows where you are.',
  algBefore: 'Before you start, talk to your paediatrician if your baby has severe eczema, a known food allergy, or has already had a suspected reaction.',
  algState: { todo: 'Not introduced', doing: 'In progress', done: 'Introduced', reaction: 'Suspected reaction' },
  algCount: (n, m) => `${n} of ${m} times without a reaction`, algNext: 'Next step',
  algStep: { todo: 'First time: offer a small amount, in the morning, on a day your baby is well. Do not introduce another new allergen on the same day, and watch over the following hours.',
    doing: 'Repeat over the next few days and increase the amount little by little, if there is no reaction.',
    done: "Keep this allergen in your baby's regular diet.",
    reaction: 'Do not offer it again before talking to your paediatrician.' },
  algDue: n => `Not offered for ${n} days. Offer it again to keep it in the routine.`, algDueCard: n => n === 1 ? '1 allergen to offer again' : `${n} allergens to offer again`,
  algFoods: 'Foods with this allergen', algEmergency: 'If your baby has trouble breathing or facial swelling, call your emergency number.',
  guidesTitle: 'Guides', guidesHint: 'The essentials for a safe start.', guideSources: s => `Based on general guidance from ${s}.`, firstAidLink: 'Paediatric first-aid training',
  aboutTitle: 'About the content', aboutText: 'The texts in this app are general information about starting solids.',
  aboutReviewed: (who, when) => `Reviewed by ${who}${when ? ' on ' + when : ''}.`, aboutNotReviewed: 'Not yet reviewed by a health professional.',
  aboutSources: s => `Reference sources: ${s}.`,
  legalTitle: 'Legal information', legalPrivacy: 'Privacy policy', legalTerms: 'Terms of use', legalMedical: 'Medical notice',
  legalDraft: 'Draft, not yet reviewed by a lawyer.', legalNoContact: '(contact to be added)'
});
Object.assign(window.DiaryI18n.es, {
  fromAge: n => `A partir de los ${n} meses`, chokeLevel: { low: 'Atragantamiento: riesgo bajo', medium: 'Atragantamiento: riesgo medio', high: 'Atragantamiento: riesgo alto' },
  nutriTitle: 'Aspectos nutricionales', tipTitle: 'Consejo',
  nextFoods: 'Próximos alimentos para probar', nextFoodsHint: 'Aún sin probar y adecuados a su edad.',
  algTitle: 'Programa de alérgenos', algOpen: 'Abrir el programa de alérgenos',
  algIntro: 'Los nueve alérgenos más comunes, de uno en uno. Registra cada vez que los ofreces y la app te muestra en qué punto estás.',
  algBefore: 'Antes de empezar, habla con el pediatra si el bebé tiene eccema grave, una alergia alimentaria ya conocida o si ya hubo alguna sospecha de reacción.',
  algState: { todo: 'Por introducir', doing: 'En curso', done: 'Introducido', reaction: 'Sospecha de reacción' },
  algCount: (n, m) => `${n} de ${m} veces sin reacción`, algNext: 'Siguiente paso',
  algStep: { todo: 'Primera vez: ofrece una cantidad pequeña, por la mañana, un día en que el bebé esté bien. No introduzcas otro alérgeno nuevo el mismo día y observa en las horas siguientes.',
    doing: 'Repite en los próximos días y aumenta la cantidad poco a poco, si no hay reacción.',
    done: 'Mantén este alérgeno en la alimentación habitual del bebé.',
    reaction: 'No vuelvas a ofrecerlo antes de hablar con el pediatra.' },
  algDue: n => `No se ofrece desde hace ${n} días. Vuelve a ofrecerlo para mantenerlo en la rutina.`, algDueCard: n => n === 1 ? '1 alérgeno para volver a ofrecer' : `${n} alérgenos para volver a ofrecer`,
  algFoods: 'Alimentos con este alérgeno', algEmergency: 'Si tiene dificultad para respirar o hinchazón en la cara, llama al número de emergencias.',
  guidesTitle: 'Guías', guidesHint: 'Lo esencial para empezar con seguridad.', guideSources: s => `Base: orientaciones generales de ${s}.`, firstAidLink: 'Formación en primeros auxilios pediátricos',
  aboutTitle: 'Sobre el contenido', aboutText: 'Los textos de esta app son información general sobre alimentación complementaria.',
  aboutReviewed: (who, when) => `Revisado por ${who}${when ? ' el ' + when : ''}.`, aboutNotReviewed: 'Aún no ha sido revisado por un profesional sanitario.',
  aboutSources: s => `Fuentes de referencia: ${s}.`,
  legalTitle: 'Información legal', legalPrivacy: 'Política de privacidad', legalTerms: 'Términos de uso', legalMedical: 'Aviso médico',
  legalDraft: 'Borrador, aún sin revisión jurídica.', legalNoContact: '(contacto por indicar)'
});
Object.assign(window.DiaryI18n.fr, {
  fromAge: n => `À partir de ${n} mois`, chokeLevel: { low: "Étouffement : risque faible", medium: "Étouffement : risque moyen", high: "Étouffement : risque élevé" },
  nutriTitle: 'Atouts nutritionnels', tipTitle: 'Astuce',
  nextFoods: 'Prochains aliments à goûter', nextFoodsHint: "Pas encore goûtés et adaptés à l'âge de bébé.",
  algTitle: 'Programme allergènes', algOpen: 'Ouvrir le programme allergènes',
  algIntro: "Les neuf allergènes les plus courants, un à la fois. Notez chaque fois que vous les proposez et l'app montre où vous en êtes.",
  algBefore: "Avant de commencer, parlez au pédiatre si bébé a un eczéma sévère, une allergie alimentaire déjà connue ou s'il y a déjà eu une réaction suspectée.",
  algState: { todo: 'À introduire', doing: 'En cours', done: 'Introduit', reaction: 'Réaction suspectée' },
  algCount: (n, m) => `${n} fois sur ${m} sans réaction`, algNext: 'Prochaine étape',
  algStep: { todo: "Première fois : proposez une petite quantité, le matin, un jour où bébé va bien. N'introduisez pas d'autre nouvel allergène le même jour et observez dans les heures qui suivent.",
    doing: "Recommencez dans les jours suivants et augmentez la quantité petit à petit, s'il n'y a pas de réaction.",
    done: "Gardez cet allergène dans l'alimentation habituelle de bébé.",
    reaction: "Ne le proposez plus avant d'en avoir parlé au pédiatre." },
  algDue: n => `Pas proposé depuis ${n} jours. Proposez-le à nouveau pour le garder dans la routine.`, algDueCard: n => n === 1 ? '1 allergène à proposer de nouveau' : `${n} allergènes à proposer de nouveau`,
  algFoods: 'Aliments contenant cet allergène', algEmergency: 'En cas de difficulté à respirer ou de gonflement du visage, appelez les urgences.',
  guidesTitle: 'Guides', guidesHint: "L'essentiel pour commencer en sécurité.", guideSources: s => `Base : repères généraux de ${s}.`, firstAidLink: 'Formation aux premiers secours pédiatriques',
  aboutTitle: 'À propos du contenu', aboutText: "Les textes de cette app sont des informations générales sur la diversification alimentaire.",
  aboutReviewed: (who, when) => `Relu par ${who}${when ? ' le ' + when : ''}.`, aboutNotReviewed: "Pas encore relu par un professionnel de santé.",
  aboutSources: s => `Sources de référence : ${s}.`,
  legalTitle: 'Informations légales', legalPrivacy: 'Politique de confidentialité', legalTerms: "Conditions d'utilisation", legalMedical: 'Avertissement médical',
  legalDraft: 'Brouillon, pas encore relu par un juriste.', legalNoContact: '(contact à préciser)'
});
