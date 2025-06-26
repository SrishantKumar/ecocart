"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Leaf, User, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEcoContext } from '@/contexts/EcoContext';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { state } = useEcoContext();
  
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCarbonFootprint = state.cart.reduce((sum, item) => sum + (item.carbonValue * item.quantity), 0);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full glass-card border-b"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-eco-gradient rounded-lg"
            >
              <Leaf className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-primary">EcoMart</h1>
              
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Shop
            </Link>
            <Link 
              href="/cart" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Cart
            </Link>
            <Link 
              href="/persona" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              My Impact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Carbon:</span>
              <Badge variant={totalCarbonFootprint > 20 ? "destructive" : totalCarbonFootprint > 10 ? "secondary" : "default"}>
                {totalCarbonFootprint.toFixed(1)}kg CO₂
              </Badge>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/persona">
                <User className="h-4 w-4" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {cartItemsCount}
                  </motion.div>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;