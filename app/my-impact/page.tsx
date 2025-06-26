'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, TreeDeciduous, Cloud, Droplets } from 'lucide-react';

export default function MyImpactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Your Environmental Impact</h1>
          <p className="text-muted-foreground">
            Track your contribution to a sustainable future through your eco-friendly choices
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">Carbon Savings</h2>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-green-600">2.5 kg CO₂</p>
                <p className="text-sm text-muted-foreground">
                  Saved by choosing eco-friendly delivery options
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TreeDeciduous className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Tree Equivalent</h2>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-blue-600">0.5 Trees</p>
                <p className="text-sm text-muted-foreground">
                  Monthly carbon absorption equivalent
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Impact */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Green Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Cloud className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Reduced Emissions</h3>
                    <p className="text-sm text-muted-foreground">
                      Equivalent to taking a car off the road for 1 day
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Droplets className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Water Saved</h3>
                    <p className="text-sm text-muted-foreground">
                      100L saved through eco-friendly product choices
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Impact Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Eco-friendly Deliveries</span>
                    <span className="text-green-600">1.2 kg CO₂ saved</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sustainable Products</span>
                    <span className="text-green-600">0.8 kg CO₂ saved</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Packaging Reduction</span>
                    <span className="text-green-600">0.5 kg CO₂ saved</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="bg-green-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Tips to Increase Your Impact</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              Choose eco-friendly delivery options when available
            </li>
            <li className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              Opt for products with sustainable packaging
            </li>
            <li className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              Bundle your orders to reduce delivery trips
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 