import { ReactNode } from 'react';

export interface DeliveryRoute {
  type: 'eco' | 'fast' | 'cheap';
  icon: ReactNode;
  title: string;
  time: string;
  distance: number;
  cost: number;
  co2: number;
  description: string;
} 