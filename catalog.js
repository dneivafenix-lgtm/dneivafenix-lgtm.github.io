window.PetitCatalog = (() => {
  const products = [
    {id:1,name:'Caixinhas para sopa',category:'meal',price:12.90,desc:'Recipientes com tampa.',tag:'Primeiras colheradas'},
    {id:2,name:'Os primeiros talheres',category:'meal',price:8.90,desc:'Colher e garfo pequenos.'},
    {id:3,name:'Tigela com ventosa',category:'meal',price:11.90,desc:'Tigela com base de ventosa.'},
    {id:4,name:'Copinho de aprendizagem',category:'meal',price:9.90,desc:'Copo com duas pegas.'},
    {id:5,name:'Babete com bolsinho',category:'meal',price:8.50,desc:'Babete com bolso frontal.'},
    {id:6,name:'Potinho para snacks',category:'meal',price:9.50,desc:'Recipiente para lanches.'},
    {id:7,name:'Argolas de empilhar',category:'play',price:14.90,desc:'Argolas para explorar.',tag:'Pequenas descobertas'},
    {id:8,name:'Mordedor argolinha',category:'play',price:7.90,desc:'Mordedor em argola.'},
    {id:9,name:'Cubinho de descobertas',category:'play',price:12.50,desc:'Cubo de tecido.'}
  ];
  const starterKitItems = [{id:5,quantity:1,label:'Babete com bolsinho'},{id:2,quantity:1,label:'Conjunto de colheres'},{id:4,quantity:2,label:'Copinho de aprendizagem'},{id:1,quantity:1,label:'Conjunto de caixinhas para sopa'}];
  const starterKit = {id:10,photoId:1,name:'Kit primeiras refeições',category:'kit',price:starterKitItems.reduce((t,i)=>t+products.find(p=>p.id===i.id).price*i.quantity,0),desc:'1 babete · colheres · 2 copos · caixinhas'};
  const CART_KEY='petit-nuvem-cart', ORDERS_KEY='petit-nuvem-orders';
  const findProduct=id=>id===10?starterKit:products.find(p=>p.id===id);
  const money=v=>new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(v);
  const pos=p=>`${(((p.photoId||p.id)-1)%3)*50}% ${Math.floor(((p.photoId||p.id)-1)/3)*50}%`;
  const photo=(p,cls='')=>`<div class="product-photo ${cls}" style="background-position:${pos(p)}"></div>`;
  const loadCart=()=>{try{return new Map(JSON.parse(localStorage.getItem(CART_KEY)||'[]'));}catch{return new Map();}};
  const saveCart=c=>localStorage.setItem(CART_KEY,JSON.stringify([...c]));
  const cartLines=c=>[...c].map(([id,quantity])=>({id,quantity,product:findProduct(id),lineTotal:findProduct(id).price*quantity}));
  const subtotal=c=>cartLines(c).reduce((s,l)=>s+l.lineTotal,0);
  const shippingPrice=(id,sub)=>{const m=window.PetitConfig.shipping[id];if(!m)return 0;if(id==='continente'&&sub>=window.PetitConfig.freeShippingFrom)return 0;return m.price;};
  const vatFromGross=g=>g-g/(1+window.PetitConfig.ivaRate);
  const loadOrders=()=>{try{return JSON.parse(localStorage.getItem(ORDERS_KEY)||'[]');}catch{return [];}};
  const saveOrder=o=>{const x=loadOrders();x.unshift(o);localStorage.setItem(ORDERS_KEY,JSON.stringify(x.slice(0,50)));return o;};
  const newOrderId=()=>'PN-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000);
  return {products,starterKitItems,starterKit,findProduct,money,photo,loadCart,saveCart,cartLines,subtotal,shippingPrice,vatFromGross,loadOrders,saveOrder,newOrderId,CART_KEY,ORDERS_KEY};
})();