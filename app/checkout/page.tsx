"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package2, Leaf, Zap, DollarSign, Timer, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useEcoContext } from '@/contexts/EcoContext';
import { CitySelect } from '@/components/ui/CitySelect';
import { City } from '@/lib/cities';
import { calculateDistance } from '@/lib/utils';
import RouteMap from '@/components/map/RouteMap';
import type { DeliveryRoute } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { state, dispatch } = useEcoContext();
  const [deliveryCity, setDeliveryCity] = useState<City>();
  const [selectedRoute, setSelectedRoute] = useState<'eco' | 'fast' | 'cheap'>();
  const [routes, setRoutes] = useState<DeliveryRoute[]>([]);
  const [streetAddress, setStreetAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get the seller location from the first item in cart
  const sellerLocation = state.cart[0]?.sellerLocation;
  const pickupCity: City | undefined = sellerLocation ? {
    name: sellerLocation.city,
    state: sellerLocation.state,
    coordinates: sellerLocation.coordinates
  } : undefined;

  const subtotal = state.cart.reduce((total, item) => total + (item.price * (item.quantity ?? 1)), 0);
  const shipping = selectedRoute ? routes.find(r => r.type === selectedRoute)?.cost || 0 : 0;
  const greenDiscount = selectedRoute === 'eco' ? 50 : 0;
  const total = subtotal + shipping - greenDiscount;

  useEffect(() => {
    if (pickupCity && deliveryCity) {
      const distance = calculateDistance(pickupCity.coordinates, deliveryCity.coordinates);
      
      // Base calculations
      const baseTime = distance / 50; // Average speed 50km/h
      const baseCost = Math.round(distance * 0.1); // ₹0.1 per km (base delivery cost)
      const baseCO2 = distance * 0.12; // 0.12kg CO2 per km
      
      const newRoutes: DeliveryRoute[] = [
        {
          type: 'eco',
          icon: <Leaf className="h-5 w-5 text-green-500" />,
          title: 'Green Route',
          time: `${Math.round(baseTime * 1.2 * 10) / 10}h`,
          distance: Math.round(distance * 1.1),
          cost: Math.round(baseCost * 1.1), // 10% more than base cost
          co2: Math.round(baseCO2 * 0.6 * 10) / 10,
          description: 'Eco-friendly route with electric vehicles'
        },
        {
          type: 'fast',
          icon: <Zap className="h-5 w-5 text-blue-500" />,
          title: 'Fastest Route',
          time: `${Math.round(baseTime * 0.8 * 10) / 10}h`,
          distance: Math.round(distance),
          cost: Math.round(baseCost * 1.3), // 30% more than base cost
          co2: Math.round(baseCO2 * 1.5 * 10) / 10,
          description: 'Quickest delivery with priority handling'
        },
        {
          type: 'cheap',
          icon: <DollarSign className="h-5 w-5 text-orange-500" />,
          title: 'Budget Route',
          time: `${Math.round(baseTime * 1.4 * 10) / 10}h`,
          distance: Math.round(distance * 1.2),
          cost: Math.round(baseCost * 0.9), // 10% less than base cost
          co2: Math.round(baseCO2 * 1.2 * 10) / 10,
          description: 'Most economical shipping option'
        }
      ];

      setRoutes(newRoutes);
    }
  }, [pickupCity, deliveryCity]);

  const handleRouteSelect = (type: 'eco' | 'fast' | 'cheap') => {
    setSelectedRoute(type);
    dispatch({ type: 'SET_ROUTE', payload: type });
  };

  const handleCompleteOrder = async () => {
    if (!deliveryCity || !streetAddress || !selectedRoute) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to complete your order.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Show loading toast
      toast({
        title: "Processing Order",
        description: "Please wait while we confirm your order...",
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save order details if needed
      const orderDetails = {
        items: state.cart,
        deliveryAddress: {
          street: streetAddress,
          city: deliveryCity.name,
          state: deliveryCity.state
        },
        route: selectedRoute,
        total: total,
        carbonFootprint: routes.find(r => r.type === selectedRoute)?.co2 || 0
      };

      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirect to thank you page
      router.push('/thank-you');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Delivery Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Checkout</h1>
            
            {/* Delivery Address Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label>Street Address</Label>
                    <Input
                      placeholder="Enter your street address"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Pickup Location</Label>
                      <div className="mt-1 p-3 bg-muted rounded-lg">
                        {pickupCity ? (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{pickupCity.name}, {pickupCity.state}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No items in cart</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Delivery City</Label>
                      <CitySelect
                        selectedCity={deliveryCity}
                        onSelect={setDeliveryCity}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route Selection */}
            {pickupCity && deliveryCity && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Package2 className="h-5 w-5" />
                    Choose Delivery Route
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {routes.map((route) => (
                      <motion.div
                        key={route.type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedRoute === route.type
                              ? 'border-primary shadow-lg'
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => handleRouteSelect(route.type)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="p-2 rounded-lg bg-background">
                                {route.icon}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold">{route.title}</h3>
                                  <span className="font-bold">₹{route.cost}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {route.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Timer className="h-4 w-4" />
                                    {route.time}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {route.distance}km
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Leaf className="h-4 w-4" />
                                    {route.co2}kg CO₂
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Route Map */}
            {pickupCity && deliveryCity && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <RouteMap
                    pickupCoordinates={pickupCity.coordinates}
                    deliveryCoordinates={deliveryCity.coordinates}
                    selectedRoute={selectedRoute}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity || 1}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Costs Breakdown */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping ? `₹${shipping}` : '--'}</span>
                </div>
                {selectedRoute === 'eco' && (
                  <div className="flex justify-between text-green-600">
                    <span>Green Discount</span>
                    <span>-₹{greenDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Environmental Impact */}
              {selectedRoute && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Leaf className="h-5 w-5" />
                    <span className="font-medium">Environmental Impact</span>
                  </div>
                  <p className="text-sm text-green-600">
                    CO₂ Emissions: {routes.find(r => r.type === selectedRoute)?.co2}kg
                  </p>
                </div>
              )}

              {/* Complete Order Button */}
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handleCompleteOrder}
                disabled={!deliveryCity || !streetAddress || !selectedRoute || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Order'}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By completing this order, you agree to our terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}