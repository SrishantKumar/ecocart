"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { useEcoContext } from '@/contexts/EcoContext';
import { Badge } from '@/components/ui/badge';
import { Leaf, TrendingUp, Award, Flame, ArrowLeftRight } from 'lucide-react';

export default function Home() {
  const { state } = useEcoContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-500/10 via-primary/5 to-blue-500/10" />
        <div className="relative container mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 bg-eco-50 border-eco-200 text-eco-800">
              <Leaf className="h-3 w-3 mr-1" />
              Sustainable Shopping Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-eco-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Shop Sustainably with EcoMart
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover eco-friendly products, track your carbon footprint, and make environmentally conscious choices with smart product swapping and green delivery routes.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="glass-card p-6 rounded-xl text-center min-w-40">
              <div className="w-12 h-12 bg-eco-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-eco-600">{state.ecoStats.totalCarbonSaved.toFixed(1)}kg</div>
              <div className="text-sm text-muted-foreground">CO₂ Saved</div>
            </div>

            <div className="glass-card p-6 rounded-xl text-center min-w-40">
              <div className="w-12 h-12 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{state.ecoStats.streakDays}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>

            <div className="glass-card p-6 rounded-xl text-center min-w-40">
              <div className="w-12 h-12 bg-purple-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowLeftRight className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{state.ecoStats.ecoSwaps}</div>
              <div className="text-sm text-muted-foreground">Eco Swaps</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-eco-600 bg-clip-text text-transparent">
              Sustainable Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of eco-friendly products. Products with high carbon footprints show greener alternatives automatically.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr"
          >
            {state.products.map((product) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                className="flex w-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}