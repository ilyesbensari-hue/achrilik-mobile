// User types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: 'BUYER' | 'SELLER' | 'ADMIN';
    createdAt: string;
}

// Product types
export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    images: string; // Comma-separated URLs
    categoryId: string;
    storeId: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    promotion?: string | null;
    createdAt: string;
    updatedAt: string;

    // Relations
    Category?: Category;
    Store?: Store;
    Variant?: ProductVariant[];
    Review?: Review[];
}

export interface ProductVariant {
    id: string;
    productId: string;
    size: string | null;
    color: string | null;
    stock: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
    parentId?: string | null;
    children?: Category[];
}

export interface Store {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    banner?: string;
    wilaya?: string;
    city?: string;
    address?: string;
    phone?: string;
    email?: string;
    offersFreeDelivery?: boolean;
    freeDeliveryThreshold?: number | null;
    clickCollect?: boolean;
    isVerified?: boolean;
    averageRating?: number;
    reviewCount?: number;
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment?: string;
    createdAt: string;
}

// Cart types
export interface CartItem {
    id: string;
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    size?: string | null;
    color?: string | null;
    storeId: string;
    storeName: string;
}

// Order types
export interface Order {
    id: string;
    userId: string;
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    total: number;
    deliveryFee: number;
    deliveryMethod: 'DELIVERY' | 'CLICK_COLLECT';
    paymentMethod: 'COD' | 'CCP' | 'BARIDIMOB' | 'CHARGILY';

    // Contact info
    firstName: string;
    lastName: string;
    phone: string;
    email: string;

    // Delivery info
    wilaya?: string;
    commune?: string;
    address?: string;
    latitude?: number;
    longitude?: number;

    // Items
    items: OrderItem[];

    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    productTitle: string;
    productImage: string;
    price: number;
    quantity: number;
    size?: string | null;
    color?: string | null;
}

// Filter types
export interface ProductFilters {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
    colors?: string[];
    wilayas?: string[];
    freeDelivery?: boolean;
    clickCollect?: boolean;
    minRating?: number;
}

// Navigation types
export type RootStackParamList = {
    '(tabs)': undefined;
    'auth/login': undefined;
    'auth/register': undefined;
    'product/[id]': { id: string };
    'category/[id]': { id: string; name: string };
    'store/[id]': { id: string };
    'checkout/index': undefined;
    'orders/[id]': { id: string };
};

export type TabsParamList = {
    index: undefined;
    search: undefined;
    cart: undefined;
    profile: undefined;
};
