"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Leaf, Target, Calendar, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useEcoContext } from '@/contexts/EcoContext';

export default function PersonaPage() {
  const { state } = useEcoContext();

  const personaData = {
    'Getting Started': {
      icon: '🌱',
      description: 'Just beginning your eco-journey',
      nextLevel: 'The Minimalist',
      requiredSwaps: 5,
      requiredSavings: 25,
    },
    'The Minimalist': {
      icon: '✨',
      description: 'Conscious about reducing consumption',
      nextLevel: 'The Localist',
      requiredSwaps: 15,
      requiredSavings: 75,
    },
    'The Localist': {
      icon: '🏡',
      description: 'Prefers local and sustainable products',
      nextLevel: 'The Green Pioneer',
      requiredSwaps: 30,
      requiredSavings: 150,
    },
    'The Green Pioneer': {
      icon: '🌍',
      description: 'Leading the way in sustainable living',
      nextLevel: null,
      requiredSwaps: 0,
      requiredSavings: 0,
    },
  };

  const currentPersona = personaData[state.ecoStats.persona];
  const swapProgress = currentPersona.nextLevel ? 
    Math.min((state.ecoStats.ecoSwaps / currentPersona.requiredSwaps) * 100, 100) : 100;
  const savingsProgress = currentPersona.nextLevel ? 
    Math.min((state.ecoStats.totalCarbonSaved / currentPersona.requiredSavings) * 100, 100) : 100;

  const achievements = [
    {
      id: 'first-swap',
      name: 'First Eco Swap',
      description: 'Made your first product swap',
      icon: '🔄',
      unlocked: state.ecoStats.ecoSwaps >= 1,
    },
    {
      id: 'week-streak',
      name: 'Week Warrior',
      description: '7 days of sustainable choices',
      icon: '📅',
      unlocked: state.ecoStats.streakDays >= 7,
    },
    {
      id: 'carbon-saver',
      name: 'Carbon Saver',
      description: 'Saved 10kg of CO₂',
      icon: '🌿',
      unlocked: state.ecoStats.totalCarbonSaved >= 10,
    },
    {
      id: 'eco-champion',
      name: 'Eco Champion',
      description: 'Made 10 eco swaps',
      icon: '🏆',
      unlocked: state.ecoStats.ecoSwaps >= 10,
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">{currentPersona.icon}</div>
          <h1 className="text-4xl font-bold mb-2">{state.ecoStats.persona}</h1>
          <p className="text-lg text-muted-foreground">{currentPersona.description}</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-eco-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-eco-600 mb-1">
                  {state.ecoStats.totalCarbonSaved.toFixed(1)}kg
                </div>
                <div className="text-sm text-muted-foreground">CO₂ Saved</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {state.ecoStats.streakDays}
                </div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {state.ecoStats.ecoSwaps}
                </div>
                <div className="text-sm text-muted-foreground">Eco Swaps</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Next Level Progress */}
        {currentPersona.nextLevel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Progress to {currentPersona.nextLevel}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Eco Swaps</span>
                    <span>{state.ecoStats.ecoSwaps}/{currentPersona.requiredSwaps}</span>
                  </div>
                  <Progress value={swapProgress} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Carbon Saved</span>
                    <span>{state.ecoStats.totalCarbonSaved.toFixed(1)}/{currentPersona.requiredSavings}kg</span>
                  </div>
                  <Progress value={savingsProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.unlocked
                        ? 'bg-eco-50 border-eco-200 dark:bg-eco-950/20 dark:border-eco-800'
                        : 'bg-muted/50 border-muted opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {achievement.unlocked ? achievement.icon : '🔒'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{achievement.name}</h3>
                          {achievement.unlocked && (
                            <Badge variant="default" className="text-xs">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}