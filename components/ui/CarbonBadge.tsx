"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, AlertTriangle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CarbonBadgeProps {
  score: 'low' | 'medium' | 'high';
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showValue?: boolean;
}

const CarbonBadge: React.FC<CarbonBadgeProps> = ({ 
  score, 
  value, 
  size = 'md',
  showIcon = true,
  showValue = true 
}) => {
  const getConfig = () => {
    switch (score) {
      case 'low':
        return {
          icon: Leaf,
          color: 'bg-eco-100 text-eco-800 border-eco-200',
          label: 'Low Carbon',
          gradient: 'from-eco-400 to-eco-600'
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          color: 'bg-carbon-100 text-carbon-800 border-carbon-200',
          label: 'Medium Carbon',
          gradient: 'from-carbon-400 to-carbon-600'
        };
      case 'high':
        return {
          icon: Zap,
          color: 'bg-danger-100 text-danger-800 border-danger-200',
          label: 'High Carbon',
          gradient: 'from-danger-400 to-danger-600'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-xs px-2.5 py-1.5',
    lg: 'text-sm px-3 py-2'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <Badge 
        className={`
          ${config.color} 
          ${sizeClasses[size]} 
          font-medium border 
          backdrop-blur-sm 
          shadow-sm
          flex items-center gap-1
        `}
      >
        {showIcon && <Icon className={iconSizes[size]} />}
        {showValue && (
          <span>
            {value.toFixed(1)}kg CO₂
          </span>
        )}
      </Badge>
      
      {/* Subtle glow effect for high carbon items */}
      {score === 'high' && (
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-20 blur-sm rounded-full -z-10`} />
      )}
    </motion.div>
  );
};

export default CarbonBadge;