// --- 1. TU CATÁLOGO PERSONALIZADO (Aquí pegas tus fotos) ---
// Formato: 'Nombre Exacto del Producto': 'Link de la foto',

const CATALOGO_DE_FOTOS = {
  // --- REMERAS ---
  'Remera Básica Blanca Algodón': 'https://distribuidorasivet.com.ar/wp-content/uploads/2024/05/6035.png',
  'Remera Oversize Negra':        'https://acdn-us.mitiendanube.com/stores/339/112/products/tmp_b64_24d61402-c024-4146-94f1-7eb312b50a62_339112_344101-cd87b112a643e5912817586310325040-1024-1024.webp',
  'Remera Estampada Urbana':      'https://http2.mlstatic.com/D_NQ_NP_909814-MLA91994490302_092025-O.webp',

  // --- PANTALONES ---
  'Jean Azul Clásico Recto':       'https://acdn-us.mitiendanube.com/stores/003/854/110/products/44-ee68e7ba5627284cd517562996814908-1024-1024.webp',
  'Pantalón Jogger Deportivo Negro': 'https://con-actitud.com.ar/wp-content/uploads/2021/09/Panta-blanco.jpg',
  'Pantalón Cargo Beige Gabardina': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ljGwSEAj5RIJCPjEAZrBPpsvYUv5Q--e-Q&s',

  // --- ZAPATILLAS ---
  'Zapatillas Running Performance': 'https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw1caaeac2/products/TSU15722322172D84B54/TSU15722322172D84B54-6.JPG',
  'Zapatillas Urbanas Lona Negras': 'https://images.fravega.com/f1000/82eecdc1facc03ccc11657e645f1afb2.jpg',
  'Zapatillas High-Top Street':     'https://www.indy.com.ar/cdn/shop/files/DSC06071-Photoroomcopia-Photoroom.jpg?v=1739813032',
};


// ---------------------------------------------------------
// --- DE AQUÍ PARA ABAJO ES CÓDIGO AUTOMÁTICO (NO TOCAR) ---
// (Esto sirve de respaldo por si creas un producto nuevo y olvidas ponerle foto arriba)
// ---------------------------------------------------------

export const clothingCategories = [
  { type: 'pants', keyword: 'pants' },
  { type: 't-shirt', keyword: 't-shirt' },
  { type: 'shoes', keyword: 'shoes' },
];

const FOTOS_REMERAS_BACKUP = [
  'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
];

const FOTOS_PANTALONES_BACKUP = [
  'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
];

const FOTOS_ZAPATILLAS_BACKUP = [
  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
];

const imagesByCategory = {
  // REMERAS
  '2': FOTOS_REMERAS_BACKUP,
  remeras: FOTOS_REMERAS_BACKUP,
  Remeras: FOTOS_REMERAS_BACKUP,
  
  // PANTALONES
  '1': FOTOS_PANTALONES_BACKUP,
  pantalones: FOTOS_PANTALONES_BACKUP,
  Pantalones: FOTOS_PANTALONES_BACKUP,

  // ZAPATILLAS
  '3': FOTOS_ZAPATILLAS_BACKUP,
  zapatillas: FOTOS_ZAPATILLAS_BACKUP,
  Zapatillas: FOTOS_ZAPATILLAS_BACKUP,
  shoes: FOTOS_ZAPATILLAS_BACKUP,

  // DEFAULT
  default: [
     'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  ]
};

export const getClothingImage = (categoryInput = 'default') => {
  
  // 1. PRIMERO BUSCAMOS EN TU CATÁLOGO PERSONALIZADO
  if (typeof categoryInput === 'object' && categoryInput !== null && categoryInput.name) {
      // Si el nombre del producto está en tu lista de arriba, usa esa foto.
      if (CATALOGO_DE_FOTOS[categoryInput.name]) {
          return CATALOGO_DE_FOTOS[categoryInput.name];
      }
  }

  // 2. SI NO ESTÁ EN TU LISTA, USAMOS LA LÓGICA AUTOMÁTICA
  let searchKey = categoryInput;
  if (typeof categoryInput === 'object' && categoryInput !== null) {
      if (categoryInput.name) searchKey = categoryInput.name; 
      else if (categoryInput.id_key) searchKey = categoryInput.id_key;
  }

  const categoryString = String(searchKey);
  const selectedList = imagesByCategory[categoryString] || imagesByCategory['default'];
  const randomIndex = Math.floor(Math.random() * selectedList.length);
  return selectedList[randomIndex];
};

export const getRandomClothingImage = () => {
  const allImages = Object.values(imagesByCategory).flat();
  const randomIndex = Math.floor(Math.random() * allImages.length);
  return allImages[randomIndex];
};

export const getImageByCategory = (category) => {
  return getClothingImage(category);
};

export const getMultipleClothingImages = (category, count = 5) => {
  const images = [];
  for (let i = 0; i < count; i++) {
    images.push(getClothingImage(category));
  }
  return images;
};