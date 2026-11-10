// Lista de alimentos. names: [pt, en, es, fr] (mesma ordem de LANG_INDEX).
// allergen: grupo de alergénio; min12: só depois dos 12 meses; choke: risco de engasgamento.
window.DiaryFoods = (() => {
  const LANG_INDEX = { pt: 0, en: 1, es: 2, fr: 3 };
  const f = (id, emoji, cat, names, extra) => Object.assign({ id, emoji, cat, names }, extra || {});
  const foods = [
    f('carrot', '🥕', 'veg', ['Cenoura', 'Carrot', 'Zanahoria', 'Carotte']),
    f('pumpkin', '🎃', 'veg', ['Abóbora', 'Pumpkin', 'Calabaza', 'Potiron']),
    f('sweetpotato', '🍠', 'veg', ['Batata-doce', 'Sweet potato', 'Boniato', 'Patate douce']),
    f('potato', '🥔', 'veg', ['Batata', 'Potato', 'Patata', 'Pomme de terre']),
    f('courgette', '🥒', 'veg', ['Curgete', 'Courgette', 'Calabacín', 'Courgette']),
    f('broccoli', '🥦', 'veg', ['Brócolos', 'Broccoli', 'Brócoli', 'Brocoli']),
    f('cauliflower', '🥬', 'veg', ['Couve-flor', 'Cauliflower', 'Coliflor', 'Chou-fleur']),
    f('spinach', '🍃', 'veg', ['Espinafres', 'Spinach', 'Espinacas', 'Épinards']),
    f('peas', '🫛', 'veg', ['Ervilhas', 'Peas', 'Guisantes', 'Petits pois']),
    f('greenbeans', '🌱', 'veg', ['Feijão-verde', 'Green beans', 'Judías verdes', 'Haricots verts']),
    f('leek', '🧅', 'veg', ['Alho-francês', 'Leek', 'Puerro', 'Poireau']),
    f('onion', '🧅', 'veg', ['Cebola', 'Onion', 'Cebolla', 'Oignon']),
    f('tomato', '🍅', 'veg', ['Tomate', 'Tomato', 'Tomate', 'Tomate']),
    f('cucumber', '🥒', 'veg', ['Pepino', 'Cucumber', 'Pepino', 'Concombre']),
    f('pepper', '🫑', 'veg', ['Pimento', 'Bell pepper', 'Pimiento', 'Poivron']),
    f('beetroot', '🟣', 'veg', ['Beterraba', 'Beetroot', 'Remolacha', 'Betterave']),
    f('aubergine', '🍆', 'veg', ['Beringela', 'Aubergine', 'Berenjena', 'Aubergine']),
    f('cabbage', '🥬', 'veg', ['Couve', 'Cabbage', 'Col', 'Chou']),
    f('turnip', '⚪', 'veg', ['Nabo', 'Turnip', 'Nabo', 'Navet']),
    f('corn', '🌽', 'veg', ['Milho', 'Sweetcorn', 'Maíz', 'Maïs']),

    f('banana', '🍌', 'fruit', ['Banana', 'Banana', 'Plátano', 'Banane']),
    f('apple', '🍎', 'fruit', ['Maçã', 'Apple', 'Manzana', 'Pomme']),
    f('pear', '🍐', 'fruit', ['Pera', 'Pear', 'Pera', 'Poire']),
    f('avocado', '🥑', 'fruit', ['Abacate', 'Avocado', 'Aguacate', 'Avocat']),
    f('mango', '🥭', 'fruit', ['Manga', 'Mango', 'Mango', 'Mangue']),
    f('peach', '🍑', 'fruit', ['Pêssego', 'Peach', 'Melocotón', 'Pêche']),
    f('melon', '🍈', 'fruit', ['Melão', 'Melon', 'Melón', 'Melon']),
    f('watermelon', '🍉', 'fruit', ['Melancia', 'Watermelon', 'Sandía', 'Pastèque']),
    f('strawberry', '🍓', 'fruit', ['Morango', 'Strawberry', 'Fresa', 'Fraise']),
    f('blueberry', '🫐', 'fruit', ['Mirtilos', 'Blueberries', 'Arándanos', 'Myrtilles'], { choke: true }),
    f('raspberry', '🍇', 'fruit', ['Framboesas', 'Raspberries', 'Frambuesas', 'Framboises']),
    f('orange', '🍊', 'fruit', ['Laranja', 'Orange', 'Naranja', 'Orange']),
    f('kiwi', '🥝', 'fruit', ['Kiwi', 'Kiwi', 'Kiwi', 'Kiwi']),
    f('papaya', '🧡', 'fruit', ['Papaia', 'Papaya', 'Papaya', 'Papaye']),
    f('plum', '🟣', 'fruit', ['Ameixa', 'Plum', 'Ciruela', 'Prune']),
    f('grapes', '🍇', 'fruit', ['Uvas', 'Grapes', 'Uvas', 'Raisins'], { choke: true }),
    f('pineapple', '🍍', 'fruit', ['Ananás', 'Pineapple', 'Piña', 'Ananas']),

    f('rice', '🍚', 'grain', ['Arroz', 'Rice', 'Arroz', 'Riz']),
    f('oats', '🥣', 'grain', ['Aveia', 'Oats', 'Avena', 'Avoine'], { allergen: 'gluten' }),
    f('bread', '🍞', 'grain', ['Pão', 'Bread', 'Pan', 'Pain'], { allergen: 'gluten' }),
    f('pasta', '🍝', 'grain', ['Massa', 'Pasta', 'Pasta', 'Pâtes'], { allergen: 'gluten' }),
    f('couscous', '🥘', 'grain', ['Cuscuz', 'Couscous', 'Cuscús', 'Semoule'], { allergen: 'gluten' }),
    f('polenta', '🌽', 'grain', ['Farinha de milho', 'Polenta', 'Polenta', 'Polenta']),
    f('quinoa', '🌾', 'grain', ['Quinoa', 'Quinoa', 'Quinoa', 'Quinoa']),

    f('chicken', '🍗', 'protein', ['Frango', 'Chicken', 'Pollo', 'Poulet']),
    f('turkey', '🦃', 'protein', ['Peru', 'Turkey', 'Pavo', 'Dinde']),
    f('beef', '🥩', 'protein', ['Vaca', 'Beef', 'Ternera', 'Bœuf']),
    f('pork', '🐖', 'protein', ['Porco', 'Pork', 'Cerdo', 'Porc']),
    f('lamb', '🐑', 'protein', ['Borrego', 'Lamb', 'Cordero', 'Agneau']),
    f('whitefish', '🐟', 'protein', ['Peixe branco', 'White fish', 'Pescado blanco', 'Poisson blanc'], { allergen: 'fish' }),
    f('salmon', '🍣', 'protein', ['Salmão', 'Salmon', 'Salmón', 'Saumon'], { allergen: 'fish' }),
    f('shrimp', '🦐', 'protein', ['Camarão', 'Prawns', 'Gambas', 'Crevettes'], { allergen: 'shellfish' }),
    f('egg', '🥚', 'protein', ['Ovo', 'Egg', 'Huevo', 'Œuf'], { allergen: 'egg' }),
    f('lentils', '🟤', 'protein', ['Lentilhas', 'Lentils', 'Lentejas', 'Lentilles']),
    f('chickpeas', '🧆', 'protein', ['Grão-de-bico', 'Chickpeas', 'Garbanzos', 'Pois chiches']),
    f('beans', '🫘', 'protein', ['Feijão', 'Beans', 'Alubias', 'Haricots']),
    f('tofu', '⬜', 'protein', ['Tofu', 'Tofu', 'Tofu', 'Tofu'], { allergen: 'soy' }),

    f('yogurt', '🥛', 'dairy', ['Iogurte natural', 'Plain yogurt', 'Yogur natural', 'Yaourt nature'], { allergen: 'milk' }),
    f('cheese', '🧀', 'dairy', ['Queijo', 'Cheese', 'Queso', 'Fromage'], { allergen: 'milk' }),
    f('butter', '🧈', 'dairy', ['Manteiga', 'Butter', 'Mantequilla', 'Beurre'], { allergen: 'milk' }),

    f('peanut', '🥜', 'other', ['Manteiga de amendoim', 'Peanut butter', 'Crema de cacahuete', 'Beurre de cacahuète'], { allergen: 'peanut', choke: true }),
    f('almond', '🌰', 'other', ['Amêndoa moída', 'Ground almonds', 'Almendra molida', 'Amande en poudre'], { allergen: 'nuts', choke: true }),
    f('walnut', '🌰', 'other', ['Noz moída', 'Ground walnuts', 'Nuez molida', 'Noix en poudre'], { allergen: 'nuts', choke: true }),
    f('sesame', '🫓', 'other', ['Sésamo (tahini)', 'Sesame (tahini)', 'Sésamo (tahini)', 'Sésame (tahin)'], { allergen: 'sesame' }),
    f('oliveoil', '🫒', 'other', ['Azeite', 'Olive oil', 'Aceite de oliva', "Huile d'olive"]),
    f('honey', '🍯', 'other', ['Mel', 'Honey', 'Miel', 'Miel'], { min12: true })
  ];
  const categories = ['veg', 'fruit', 'grain', 'protein', 'dairy', 'other'];
  const allergens = ['egg', 'milk', 'peanut', 'nuts', 'gluten', 'fish', 'shellfish', 'soy', 'sesame'];
  const byId = new Map(foods.map(x => [x.id, x]));
  const name = (food, lang) => food.names[LANG_INDEX[lang] ?? 1] || food.names[1];
  return { foods, categories, allergens, byId, name };
})();
