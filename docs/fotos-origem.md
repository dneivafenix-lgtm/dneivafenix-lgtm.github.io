# Origem e licença das imagens

Atualizado a 12 de novembro de 2026. Este registo junta o que se sabe sobre cada imagem usada na app. Onde falta informação, está escrito «por confirmar»: convém fechar esses pontos antes de vender a app.

## Resumo

| Conjunto | Ficheiros | Origem | Licença | Estado |
|---|---|---|---|---|
| Fotos dos alimentos | `img/alimentos/` (99) | Banco de imagens Pexels, descarregadas pelo Diogo e cortadas em quadrado (640 × 640 px) | Licença Pexels: uso comercial permitido, sem obrigação de atribuição | Autor e endereço de cada foto por registar |
| Fotos das receitas | `img/receitas/` (39) | Geradas por inteligência artificial pelo Diogo, com os pedidos de `docs/fotos-receitas.md` | Termos da ferramenta usada | Ferramenta usada e respetivos termos por confirmar |
| Ilustrações da nuvem | `img/diario.jpg`, `img/diario-fundo.jpg` | Entregues pelo Diogo a 11/11/2026 | Por confirmar | Origem (autor ou ferramenta) por confirmar |
| Ilustrações dos guias | desenhadas no código (`app.js`, `GUIDE_ART`) | Feitas para a app | Próprias | Completo |
| Ícones e imagem de partilha | `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `og.jpg` | `icon.svg` feito para a app; os restantes entraram na auditoria de 12/11 (pedido n.º 34) | Próprias | Origem do `og.jpg` por confirmar |
| Logótipo | carregado de `cdn.shopify.com` (ver `config.js > brand.logo`) | Marca Petit Nuvem | Própria | Falta guardar o ficheiro dentro da app |
| Tipos de letra | `fonts/` | DM Sans, Manrope e Caveat | SIL Open Font License (ficheiros de licença em `fonts/`) | Completo |

## O que falta fechar

1. **Fotos Pexels**: guardar, para cada foto de `img/alimentos/`, o endereço da página no Pexels e o nome do autor. A licença Pexels não obriga a atribuição, mas este registo é a prova de origem se alguém a pedir. A licença não cobre marcas nem pessoas identificáveis: nenhuma das fotos deve mostrar logótipos ou caras.
2. **Fotos das receitas**: escrever aqui o nome da ferramenta de IA usada e confirmar nos termos dela que o uso comercial é permitido.
3. **Ilustrações da nuvem**: indicar quem as fez ou com que ferramenta, e confirmar o direito de uso comercial.
4. **Imagem de partilha (`og.jpg`)**: confirmar como foi feita.

## Imagens em falta

### Receitas sem foto (17)

| N.º | Fase | Receita |
|---|---|---|
| 39 | 9+ meses | Floretes de brócolos com queijo fresco |
| 40 | 9+ meses | Bolinhos de pescada no forno |
| 41 | 9+ meses | Papas de aveia com iogurte e mirtilos |
| 42 | 12+ meses | Arroz de frango com legumes |
| 43 | 12+ meses | Caril suave de grão com arroz |
| 44 | 12+ meses | Massa com salmão e ervilhas |
| 45 | 12+ meses | Empadão de lentilhas e batata-doce |
| 46 | 12+ meses | Peixe no forno com batatinhas |
| 47 | 12+ meses | Almôndegas com esparguete |
| 48 | 12+ meses | Frittata de legumes no forno |
| 49 | 12+ meses | Panquecas de iogurte e maçã |
| 50 | 12+ meses | Wraps de frango e abacate |
| 51 | 12+ meses | Sopa de feijão com couve |
| 52 | 12+ meses | Pizza de tortilha com legumes |
| 53 | 12+ meses | Queques de banana sem açúcar |
| 54 | 12+ meses | Risotto de cogumelos e ervilhas |
| 55 | 12+ meses | Peixinhos da horta no forno |

### Alimentos sem foto (1)

- Coelho

## Fotos dos alimentos, ficheiro a ficheiro

Origem: Pexels. Licença: Licença Pexels. As colunas «Autor» e «Endereço no Pexels» estão por preencher.

| Ficheiro | Alimento | Autor | Endereço no Pexels |
|---|---|---|---|
| `001-carrot.jpg` | Cenoura | | |
| `002-pumpkin.jpg` | Abóbora | | |
| `003-sweetpotato.jpg` | Batata-doce | | |
| `004-potato.jpg` | Batata | | |
| `005-courgette.jpg` | Curgete | | |
| `006-broccoli.jpg` | Brócolos | | |
| `007-cauliflower.jpg` | Couve-flor | | |
| `008-spinach.jpg` | Espinafres | | |
| `009-peas.jpg` | Ervilhas | | |
| `010-greenbeans.jpg` | Feijão-verde | | |
| `011-leek.jpg` | Alho-francês | | |
| `012-onion.jpg` | Cebola | | |
| `013-tomato.jpg` | Tomate | | |
| `014-cucumber.jpg` | Pepino | | |
| `015-pepper.jpg` | Pimento | | |
| `016-beetroot.jpg` | Beterraba | | |
| `017-aubergine.jpg` | Beringela | | |
| `018-cabbage.jpg` | Couve | | |
| `019-turnip.jpg` | Nabo | | |
| `020-corn.jpg` | Milho | | |
| `021-asparagus.jpg` | Espargos | | |
| `022-mushroom.jpg` | Cogumelos | | |
| `023-fennel.jpg` | Funcho | | |
| `024-garlic.jpg` | Alho | | |
| `025-banana.jpg` | Banana | | |
| `026-apple.jpg` | Maçã | | |
| `027-pear.jpg` | Pera | | |
| `028-avocado.jpg` | Abacate | | |
| `029-mango.jpg` | Manga | | |
| `030-peach.jpg` | Pêssego | | |
| `031-melon.jpg` | Melão | | |
| `032-watermelon.jpg` | Melancia | | |
| `033-strawberry.jpg` | Morango | | |
| `034-blueberry.jpg` | Mirtilos | | |
| `035-raspberry.jpg` | Framboesas | | |
| `036-orange.jpg` | Laranja | | |
| `037-kiwi.jpg` | Kiwi | | |
| `038-papaya.jpg` | Papaia | | |
| `039-plum.jpg` | Ameixa | | |
| `040-grapes.jpg` | Uvas | | |
| `041-pineapple.jpg` | Ananás | | |
| `042-apricot.jpg` | Alperce | | |
| `043-cherry.jpg` | Cerejas | | |
| `044-fig.jpg` | Figo | | |
| `045-tangerine.jpg` | Tangerina | | |
| `046-persimmon.jpg` | Dióspiro | | |
| `047-blackberry.jpg` | Amoras | | |
| `048-coconut.jpg` | Coco | | |
| `049-rice.jpg` | Arroz | | |
| `050-oats.jpg` | Aveia | | |
| `051-bread.jpg` | Pão | | |
| `052-pasta.jpg` | Massa | | |
| `053-couscous.jpg` | Cuscuz | | |
| `054-polenta.jpg` | Farinha de milho | | |
| `055-quinoa.jpg` | Quinoa | | |
| `056-barley.jpg` | Cevada | | |
| `057-buckwheat.jpg` | Trigo-sarraceno | | |
| `058-millet.jpg` | Milho-painço | | |
| `059-bulgur.jpg` | Bulgur | | |
| `060-ryebread.jpg` | Pão de centeio | | |
| `061-chicken.jpg` | Frango | | |
| `062-turkey.jpg` | Peru | | |
| `063-beef.jpg` | Vaca | | |
| `064-pork.jpg` | Porco | | |
| `065-lamb.jpg` | Borrego | | |
| `066-whitefish.jpg` | Peixe branco | | |
| `067-salmon.jpg` | Salmão | | |
| `068-shrimp.jpg` | Camarão | | |
| `069-egg.jpg` | Ovo | | |
| `070-lentils.jpg` | Lentilhas | | |
| `071-chickpeas.jpg` | Grão-de-bico | | |
| `072-beans.jpg` | Feijão | | |
| `073-tofu.jpg` | Tofu | | |
| `074-sardine.jpg` | Sardinha | | |
| `075-cod.jpg` | Bacalhau fresco | | |
| `076-tuna.jpg` | Atum | | |
| `078-blackbeans.jpg` | Feijão-preto | | |
| `079-yogurt.jpg` | Iogurte natural | | |
| `080-cheese.jpg` | Queijo | | |
| `081-butter.jpg` | Manteiga | | |
| `082-freshcheese.jpg` | Queijo fresco | | |
| `083-ricotta.jpg` | Requeijão | | |
| `084-kefir.jpg` | Kefir natural | | |
| `085-peanut.jpg` | Manteiga de amendoim | | |
| `086-almond.jpg` | Amêndoa moída | | |
| `087-walnut.jpg` | Noz moída | | |
| `088-sesame.jpg` | Sésamo (tahini) | | |
| `089-oliveoil.jpg` | Azeite | | |
| `090-honey.jpg` | Mel | | |
| `091-parsley.jpg` | Salsa | | |
| `092-coriander.jpg` | Coentros | | |
| `093-mint.jpg` | Hortelã | | |
| `094-basil.jpg` | Manjericão | | |
| `095-oregano.jpg` | Orégãos | | |
| `096-thyme.jpg` | Tomilho | | |
| `097-rosemary.jpg` | Alecrim | | |
| `098-cinnamon.jpg` | Canela | | |
| `099-cumin.jpg` | Cominhos | | |
| `100-ginger.jpg` | Gengibre | | |

## Fotos das receitas, ficheiro a ficheiro

Origem: geradas por IA pelo Diogo. O pedido usado para cada uma está em `docs/fotos-receitas.md`.

- `00-papas-de-aveia-com-maca.jpg`
- `01-pure-de-abobora-e-pera.jpg`
- `02-creme-de-courgette-e-batata-doce.jpg`
- `03-banana-e-abacate-esmagados.jpg`
- `04-pure-de-cenoura-e-lentilhas.jpg`
- `05-frango-com-arroz-e-cenoura.jpg`
- `06-bolachinhas-de-aveia-e-banana.jpg`
- `07-pure-de-cenoura.jpg`
- `08-sopa-de-abobora-cenoura-e-alho-frances.jpg`
- `09-pure-de-brocolos-e-batata.jpg`
- `10-papa-de-arroz-com-pera.jpg`
- `11-maca-e-pera-cozidas.jpg`
- `12-pure-de-ervilhas-com-hortela.jpg`
- `13-creme-de-couve-flor-e-batata-doce.jpg`
- `14-papas-de-aveia-com-banana.jpg`
- `15-pure-de-manga.jpg`
- `16-sopa-de-legumes-da-avo.jpg`
- `17-sopa-de-legumes-com-peru.jpg`
- `18-pescada-com-batata-e-brocolos.jpg`
- `19-lentilhas-com-abobora-e-arroz.jpg`
- `20-pure-de-grao-e-cenoura.jpg`
- `21-papas-de-aveia-com-pera-e-canela.jpg`
- `22-salmao-com-batata-doce.jpg`
- `23-vaca-estufada-com-legumes.jpg`
- `24-sopa-de-ervilhas-com-frango.jpg`
- `25-pure-de-beterraba-e-maca.jpg`
- `26-massinhas-com-courgette-e-peru.jpg`
- `27-ameixa-e-pera-cozidas.jpg`
- `28-arroz-de-abobora-com-frango-desfiado.jpg`
- `29-tirinhas-de-omelete-de-espinafres.jpg`
- `30-panquecas-de-banana-e-aveia.jpg`
- `31-palitos-de-batata-doce-no-forno.jpg`
- `32-bolinhas-de-grao-e-cenoura.jpg`
- `33-massa-com-bolonhesa-de-lentilhas.jpg`
- `34-pescada-desfiada-com-arroz-de-cenoura.jpg`
- `35-iogurte-natural-com-fruta-esmagada.jpg`
- `36-hamburgueres-de-frango-e-courgette.jpg`
- `37-arroz-de-tomate-com-peru.jpg`
- `38-queques-de-maca-e-cenoura.jpg`
