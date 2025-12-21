import foto from '../assets/images/foto.jpg';
import foto2 from '../assets/images/foto2.jpg';
import foto3 from '../assets/images/foto3.jpg';
import foto4 from '../assets/images/foto4.jpg';

// Base images for placeholders
const camisetaHombreImg = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?fit=crop&w=600&h=800';
const jeansMujerImg = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?fit=crop&w=600&h=800';
const chaquetaUrbanaImg = 'https://images.unsplash.com/photo-1591047139829-d919b5ca23d3?fit=crop&w=600&h=800';
const zapatosDeportivosImg = 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?fit=crop&w=600&h=800';

export const mockProducts = [
  // --- HOMBRE ---
  {
    id: 1,
    name: 'Camiseta Gráfica "Urban Explorer"',
    price: 29.99,
    image: camisetaHombreImg,
    category: 'hombre',
    description: 'Camiseta de algodón suave con un diseño gráfico inspirado en la ciudad.',
    createdAt: new Date('2025-11-20T10:00:00Z'),
  },
  {
    id: 2,
    name: 'Jeans Slim Fit "Midnight"',
    price: 79.99,
    salePrice: 59.99,
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?fit=crop&w=600&h=800',
    category: 'hombre',
    description: 'Jeans de corte slim fit en un tono oscuro, versátiles y modernos.',
    createdAt: new Date('2025-10-15T10:00:00Z'),
  },
  {
    id: 3,
    name: 'Sudadera con Capucha "Essential"',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?fit=crop&w=600&h=800',
    category: 'hombre',
    description: 'Una sudadera cómoda y esencial para cualquier armario.',
    createdAt: new Date('2025-11-25T10:00:00Z'),
  },
  {
    id: 4,
    name: 'Chaqueta Bomber "Aviator"',
    price: 129.99,
    image: foto4, // NOTE: Placeholder - image provided is not a bomber jacket.
    category: 'hombre',
    description: 'Chaqueta de estilo bomber clásica, resistente al agua.',
    createdAt: new Date('2025-09-01T10:00:00Z'),
  },
  {
    id: 5,
    name: 'Zapatillas "City Runner"',
    price: 99.99,
    salePrice: 79.99,
    image: zapatosDeportivosImg,
    category: 'hombre',
    description: 'Zapatillas urbanas diseñadas para la máxima comodidad y estilo.',
    createdAt: new Date('2025-11-18T10:00:00Z'),
  },

  // --- MUJER ---
  {
    id: 9,
    name: 'Vestido Midi Floral "Rosé"',
    price: 89.99,
    image: foto,
    category: 'mujer',
    description: 'Vestido midi con estampado floral, perfecto para cualquier ocasión.',
    createdAt: new Date('2025-11-22T10:00:00Z'),
  },
  {
    id: 10,
    name: 'Blusa de Seda "Elegance"',
    price: 59.99,
    image: foto2,
    category: 'mujer',
    description: 'Blusa de seda suave con un corte elegante y minimalista.',
    createdAt: new Date('2025-10-05T10:00:00Z'),
  },
  {
    id: 13,
    name: 'Jeans Anchos "Retro"',
    price: 84.99,
    salePrice: 64.99,
    image: foto3,
    category: 'mujer',
    description: 'Jeans de pierna ancha y tiro alto, inspirados en la moda retro.',
    createdAt: new Date('2025-11-10T10:00:00Z'),
  },
  {
    id: 14,
    name: 'Blazer "Metropolitan"',
    price: 139.99,
    image: foto4,
    category: 'mujer',
    description: 'Blazer de corte estructurado, perfecto para la oficina.',
    createdAt: new Date('2025-08-20T10:00:00Z'),
  },
  {
    id: 15,
    name: 'Sandalias de Tiras "Sunset"',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?fit=crop&w=600&h=800',
    category: 'mujer',
    description: 'Sandalias de tiras de cuero, cómodas y elegantes.',
    createdAt: new Date('2025-11-01T10:00:00Z'),
  },

  // --- ACCESORIOS ---
  {
    id: 17,
    name: 'Gafas de Sol "Wayfarer"',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?fit=crop&w=600&h=800',
    category: 'accesorios',
    description: 'Gafas de sol de estilo Wayfarer, un clásico que nunca pasa de moda.',
    createdAt: new Date('2025-07-15T10:00:00Z'),
  },
  {
    id: 18,
    name: 'Bolso Tote de Cuero "City"',
    price: 149.99,
    salePrice: 119.99,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?fit=crop&w=600&h=800',
    category: 'accesorios',
    description: 'Bolso tote de cuero genuino, espacioso y elegante.',
    createdAt: new Date('2025-11-28T10:00:00Z'),
  },
  {
    id: 19,
    name: 'Reloj Minimalista "Chrono"',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?fit=crop&w=600&h=800',
    category: 'accesorios',
    description: 'Reloj con diseño minimalista, correa de cuero y esfera limpia.',
    createdAt: new Date('2025-10-10T10:00:00Z'),
  },
  {
    id: 20,
    name: 'Gorro Beanie "Fisherman"',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?fit=crop&w=600&h=800',
    category: 'accesorios',
    description: 'Gorro de punto de estilo pescador, perfecto para los días fríos.',
    createdAt: new Date('2025-11-05T10:00:00Z'),
  },
  {
    id: 21,
    name: 'Camisa Oxford "Preppy"',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?fit=crop&w=600&h=800',
    category: 'hombre',
    description: 'Camisa Oxford de corte clásico, ideal para un look preppy.',
    createdAt: new Date('2025-09-10T10:00:00Z'),
  },
  {
    id: 23,
    name: 'Bufanda de Lana "Scarf"',
    price: 34.99,
    salePrice: 24.99,
    image: foto,
    category: 'accesorios',
    description: 'Bufanda de lana suave y cálida, el accesorio perfecto para el invierno.',
    createdAt: new Date('2025-11-29T10:00:00Z'),
  },
  {
    id: 24,
    name: 'Botines de Cuero "Chelsea"',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?fit=crop&w=600&h=800',
    category: 'mujer',
    description: 'Botines de cuero de estilo Chelsea, un clásico atemporal.',
    createdAt: new Date('2025-10-20T10:00:00Z'),
  },
  {
    id: 25,
    name: 'Cinturón de Cuero "Classic"',
    price: 39.99,
    image: foto2,
    category: 'accesorios',
    description: 'Cinturón de cuero genuino con hebilla metálica.',
    createdAt: new Date('2025-08-01T10:00:00Z'),
  },
];
