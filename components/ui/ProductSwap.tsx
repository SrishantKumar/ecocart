"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Leaf, TrendingDown, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CarbonBadge from '@/components/ui/CarbonBadge';
import { useEcoContext } from '@/contexts/EcoContext';
import { Product } from '@/contexts/EcoContext';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProductSwapProps {
  originalProduct: Product;
  alternatives: Product[];
  onClose: () => void;
  onSwap: () => void;
}

const ProductSwap: React.FC<ProductSwapProps> = ({
  originalProduct,
  alternatives,
  onClose,
  onSwap,
}) => {
  const { dispatch } = useEcoContext();

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toLocaleString()}`;
  };

  const calculateSavings = (alternative: Product) => {
    const carbonSaved = originalProduct.carbonValue - alternative.carbonValue;
    const percentSaved = (carbonSaved / originalProduct.carbonValue) * 100;
    const priceDiff = alternative.price - originalProduct.price;

    return {
      carbonSaved,
      percentSaved,
      priceDiff,
    };
  };

  const handleSwap = (alternative: Product) => {
    dispatch({ 
      type: 'SWAP_PRODUCT', 
      payload: { 
        originalId: originalProduct.id, 
        newProduct: alternative 
      } 
    });
    toast.success('Product swapped successfully!', {
      description: `You saved ${(originalProduct.carbonValue - alternative.carbonValue).toFixed(1)}kg CO₂`,
    });
    onSwap();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative bg-background rounded-xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-hidden"
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 hover:bg-background/10"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-primary/10 to-eco-600/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-eco-600 bg-clip-text text-transparent">
            Eco-Friendly Alternatives
          </h2>
          <p className="text-muted-foreground mt-1">
            Swap to reduce your carbon footprint
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 max-h-[calc(90vh-180px)]">
          <div className="space-y-6">
            {/* Current Product */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>Current Selection</span>
                <Badge variant="destructive" className="text-xs">High Carbon</Badge>
              </h3>
              <Card className="border-2 border-orange-200 bg-orange-50/50 dark:border-orange-800/50 dark:bg-orange-950/20">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={originalProduct.image}
                        alt={originalProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{originalProduct.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {originalProduct.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-xl text-primary">
                          {formatPrice(originalProduct.price)}
                        </span>
                        <CarbonBadge
                          score={originalProduct.carbonScore}
                          value={originalProduct.carbonValue}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alternatives */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-eco-600" />
                Eco-Friendly Alternatives
              </h3>
              <div className="space-y-4">
                {alternatives.map((alternative, index) => {
                  const savings = calculateSavings(alternative);
                  
                  return (
                    <motion.div
                      key={alternative.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-2 border-eco-200 bg-eco-50/50 dark:border-eco-800/50 dark:bg-eco-950/20 hover:border-eco-400 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={alternative.image}
                                alt={alternative.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1">{alternative.name}</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                {alternative.description}
                              </p>
                              <div className="flex items-center gap-4 mb-3">
                                <span className="font-bold text-xl text-primary">
                                  {formatPrice(alternative.price)}
                                </span>
                                <CarbonBadge
                                  score={alternative.carbonScore}
                                  value={alternative.carbonValue}
                                  size="sm"
                                />
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5 text-eco-600">
                                  <TrendingDown className="h-4 w-4" />
                                  <span className="font-medium">
                                    {savings.carbonSaved.toFixed(1)}kg CO₂ saved
                                  </span>
                                  <span className="text-muted-foreground">
                                    ({savings.percentSaved.toFixed(0)}% less)
                                  </span>
                                </div>
                                {savings.priceDiff !== 0 && (
                                  <div className={`flex items-center gap-1.5 ${
                                    savings.priceDiff > 0 ? 'text-orange-600' : 'text-eco-600'
                                  }`}>
                                    <DollarSign className="h-4 w-4" />
                                    <span className="font-medium">
                                      {savings.priceDiff > 0 ? '+' : ''}
                                      {formatPrice(Math.abs(savings.priceDiff))}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button
                                onClick={() => handleSwap(alternative)}
                                className="bg-eco-gradient hover:shadow-lg transition-all duration-300"
                              >
                                Swap Now
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductSwap;