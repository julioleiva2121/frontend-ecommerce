export interface Category {
  id_key: number;
  name: string;
}

export interface Product {
  id_key: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
  category: Category;
  order_details: any[];
}

export interface Order {
  id_key: number;
  date: string;
  total: number;
  delivery_method: number;
  status: number;
  client_id: number;
  bill_id: number;
}

export interface OrderDetail {
  id_key: number;
  quantity: number;
  price: number;
  order_id: number;
  product_id: number;
  order: Order;
  product: Product;
}
