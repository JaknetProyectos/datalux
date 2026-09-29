export interface Product {
  // campos obligatorios en el cart
  id: string;
  name: string;
  price: number;
  image: string;
  
  // Opcionales variantes por sitio
  currency: string;
  features: string[];
  highlighted?: boolean;
}