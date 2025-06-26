"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Leaf, AlertTriangle, ArrowRight, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CarbonBadge from '@/components/ui/CarbonBadge';
import ProductSwap from '@/components/ui/ProductSwap';
import { useEcoContext } from '@/contexts/EcoContext';
import { Product } from '@/contexts/EcoContext';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch, state } = useEcoContext();
  const [showSwap, setShowSwap] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get the most up-to-date version of the product from state
  const currentProduct = state.products.find(p => p.id === product.id) || product;
  // Check if this product is in cart and get its details
  const cartItem = state.cart.find(item => item.id === currentProduct.id);
  const displayProduct = cartItem || currentProduct;

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: displayProduct });
    toast.success(`${displayProduct.name} added to cart!`, {
      description: `Carbon footprint: ${displayProduct.carbonValue}kg CO₂`,
    });
  };

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toLocaleString()}`;
  };

  const hasAlternatives = displayProduct.alternatives && displayProduct.alternatives.length > 0;
  const isHighCarbon = displayProduct.carbonScore === 'high';

  const handleSwapComplete = () => {
    setShowSwap(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group w-full"
      >
        <Card className="h-full overflow-hidden border-2 transition-all duration-300 hover:border-primary/50">
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="aspect-square relative">
              <Image
                src={displayProduct.image}
                alt={displayProduct.name}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />

              {/* Carbon Badge */}
              <div className="absolute top-3 right-3 transition-transform duration-300 group-hover:scale-110">
                <CarbonBadge score={displayProduct.carbonScore} value={displayProduct.carbonValue} />
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="text-xs bg-white/90 backdrop-blur-sm text-gray-800 transition-transform duration-300 group-hover:scale-110">
                  {displayProduct.category}
                </Badge>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {displayProduct.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {displayProduct.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Ships from {displayProduct.sellerLocation.city}, {displayProduct.sellerLocation.state}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(displayProduct.price)}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Leaf className="h-3.5 w-3.5" />
                    {displayProduct.carbonValue}kg CO₂
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-5 pt-0">
            {/* High Carbon Warning & Actions */}
            <div className="w-full space-y-3">
              {isHighCarbon && hasAlternatives && (
                <div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-orange-800 dark:text-orange-200 flex-1">
                    This product has a high carbon footprint. Want to swap with a greener alternative?
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 w-full">
                {isHighCarbon && hasAlternatives && (
                  <Button
                    onClick={() => setShowSwap(true)}
                    variant="outline"
                    className="w-full border-orange-200 bg-white dark:bg-orange-950/40 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/60 transition-all duration-300"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    View Eco Alternatives
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}

                <Button
                  onClick={addToCart}
                  className="w-full transition-all duration-300 hover:shadow-lg"
                  variant={isHighCarbon ? "outline" : "default"}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Product Swap Dialog */}
      {showSwap && hasAlternatives && (
        <ProductSwap
          originalProduct={displayProduct}
          alternatives={displayProduct.alternatives!}
          onClose={() => setShowSwap(false)}
          onSwap={handleSwapComplete}
        />
      )}
    </>
  );
};

export default ProductCard;