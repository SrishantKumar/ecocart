import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Animation */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
        </div>

        {/* Thank You Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Thank You for Your Order!</h1>
          <p className="text-muted-foreground">
            Your eco-friendly purchase is confirmed and will be delivered soon.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Leaf className="h-5 w-5" />
                <span className="font-medium">Environmental Impact</span>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-4xl font-bold text-green-600">2.5 kg</p>
                <p className="text-sm text-muted-foreground">CO₂ saved with your eco-friendly choices</p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Order #ECO-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated Delivery: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button asChild variant="outline">
            <Link href="/my-impact">
              View My Impact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <p className="text-sm text-muted-foreground pt-8">
          Need help? <Link href="/support" className="text-primary hover:underline">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
} 