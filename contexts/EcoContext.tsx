"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  carbonScore: 'low' | 'medium' | 'high';
  carbonValue: number; // kg CO2
  category: string;
  description: string;
  alternatives?: Product[];
  quantity?: number;
  sellerLocation: {
    city: string;
    state: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface EcoStats {
  totalCarbonSaved: number;
  streakDays: number;
  ecoSwaps: number;
  persona: 'The Minimalist' | 'The Localist' | 'The Green Pioneer' | 'Getting Started';
}

interface EcoState {
  cart: CartItem[];
  products: Product[];
  ecoStats: EcoStats;
  deliveryAddress: string;
  selectedRoute: 'eco' | 'fast' | 'cheap' | null;
}

type EcoAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SWAP_PRODUCT'; payload: { originalId: string; newProduct: Product } }
  | { type: 'SET_DELIVERY_ADDRESS'; payload: string }
  | { type: 'SET_ROUTE'; payload: 'eco' | 'fast' | 'cheap' }
  | { type: 'UPDATE_ECO_STATS'; payload: Partial<EcoStats> }
  | { type: 'CLEAR_CART' };

const initialState: EcoState = {
  cart: [],
  products: [
    {
      id: '1',
      name: 'Organic Cotton T-Shirt',
      price: 2499,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      carbonScore: 'low',
      carbonValue: 2.1,
      category: 'Fashion',
      description: 'Soft organic cotton t-shirt made from sustainable materials',
      alternatives: [],
      sellerLocation: {
        city: "Ahmedabad",
        state: "Gujarat",
        coordinates: [72.5714, 23.0225]
      }
    },
    {
      id: '2',
      name: 'Fast Fashion Polyester Shirt',
      price: 999,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      carbonScore: 'high',
      carbonValue: 8.5,
      category: 'Fashion',
      description: 'Trendy polyester shirt with synthetic materials',
      sellerLocation: {
        city: "Surat",
        state: "Gujarat",
        coordinates: [72.8311, 21.1702]
      }
    },
    {
      id: '3',
      name: 'Bamboo Fiber Shirt',
      price: 1899,
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      carbonScore: 'low',
      carbonValue: 1.8,
      category: 'Fashion',
      description: 'Eco-friendly bamboo fiber shirt, naturally antibacterial',
      sellerLocation: {
        city: "Pune",
        state: "Maharashtra",
        coordinates: [73.8567, 18.5204]
      }
    },
    {
      id: '4',
      name: 'Hemp Blend T-Shirt',
      price: 2199,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      carbonScore: 'low',
      carbonValue: 1.9,
      category: 'Fashion',
      description: 'Durable hemp blend with minimal environmental impact',
      sellerLocation: {
        city: "Mumbai",
        state: "Maharashtra",
        coordinates: [72.8777, 19.0760]
      }
    },
    {
      id: '5',
      name: 'Conventional Leather Boots',
      price: 8999,
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      carbonScore: 'high',
      carbonValue: 22.3,
      category: 'Footwear',
      description: 'Traditional leather boots with conventional tanning',
      sellerLocation: {
        city: "Kanpur",
        state: "Uttar Pradesh",
        coordinates: [80.3319, 26.4499]
      }
    },
    {
      id: '6',
      name: 'Vegan Leather Alternative',
      price: 6999,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      carbonScore: 'medium',
      carbonValue: 12.1,
      category: 'Footwear',
      description: 'Stylish vegan leather boots made from apple waste',
      sellerLocation: {
        city: "Bangalore",
        state: "Karnataka",
        coordinates: [77.5946, 12.9716]
      }
    },
    {
      id: '7',
      name: 'Recycled Sneakers',
      price: 4999,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      carbonScore: 'low',
      carbonValue: 4.2,
      category: 'Footwear',
      description: 'Made from 100% recycled ocean plastic',
      sellerLocation: {
        city: "Chennai",
        state: "Tamil Nadu",
        coordinates: [80.2707, 13.0827]
      }
    },
    {
      id: '8',
      name: 'Plastic Water Bottle Pack',
      price: 399,
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
      carbonScore: 'high',
      carbonValue: 15.2,
      category: 'Beverages',
      description: 'Pack of 24 single-use plastic water bottles',
      sellerLocation: {
        city: "Delhi",
        state: "Delhi",
        coordinates: [77.2090, 28.6139]
      }
    },
  ],
  ecoStats: {
    totalCarbonSaved: 12.4,
    streakDays: 7,
    ecoSwaps: 3,
    persona: 'Getting Started'
  },
  deliveryAddress: '',
  selectedRoute: null,
};

// Add alternatives to high-carbon products
initialState.products = initialState.products.map(product => {
  if (product.carbonScore === 'high') {
    const alternatives = initialState.products.filter(p => 
      p.category === product.category && 
      p.carbonScore === 'low' && 
      p.id !== product.id
    ).slice(0, 3);
    return { ...product, alternatives };
  }
  return product;
});

const ecoReducer = (state: EcoState, action: EcoAction): EcoState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };

    case 'SWAP_PRODUCT':
      const originalProduct = state.cart.find(item => item.id === action.payload.originalId);
      
      // If the original product isn't in the cart, add it first
      if (!originalProduct) {
        const productToAdd = state.products.find(p => p.id === action.payload.originalId);
        if (!productToAdd) return state;
        
        return {
          ...state,
          cart: [...state.cart, { ...action.payload.newProduct, quantity: 1 }],
          ecoStats: {
            ...state.ecoStats,
            totalCarbonSaved: state.ecoStats.totalCarbonSaved + Math.max(0, productToAdd.carbonValue - action.payload.newProduct.carbonValue),
            ecoSwaps: state.ecoStats.ecoSwaps + 1,
          }
        };
      }

      const carbonSaved = originalProduct.carbonValue;
      const newCarbonValue = action.payload.newProduct.carbonValue;
      const savings = Math.max(0, carbonSaved - newCarbonValue);
      
      // Update both cart and products
      const updatedProducts = state.products.map(product => {
        if (product.id === action.payload.originalId) {
          // Update the original product's alternatives
          return {
            ...action.payload.newProduct,
            alternatives: product.alternatives
          };
        }
        return product;
      });

      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.originalId
            ? { ...action.payload.newProduct, quantity: item.quantity }
            : item
        ),
        products: updatedProducts,
        ecoStats: {
          ...state.ecoStats,
          totalCarbonSaved: state.ecoStats.totalCarbonSaved + savings,
          ecoSwaps: state.ecoStats.ecoSwaps + 1,
        }
      };

    case 'SET_DELIVERY_ADDRESS':
      return {
        ...state,
        deliveryAddress: action.payload,
      };

    case 'SET_ROUTE':
      return {
        ...state,
        selectedRoute: action.payload,
      };

    case 'UPDATE_ECO_STATS':
      return {
        ...state,
        ecoStats: { ...state.ecoStats, ...action.payload },
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
};

const EcoContext = createContext<{
  state: EcoState;
  dispatch: React.Dispatch<EcoAction>;
} | null>(null);

export const EcoContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ecoReducer, initialState);

  return (
    <EcoContext.Provider value={{ state, dispatch }}>
      {children}
    </EcoContext.Provider>
  );
};

export const useEcoContext = () => {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error('useEcoContext must be used within an EcoContextProvider');
  }
  return context;
};