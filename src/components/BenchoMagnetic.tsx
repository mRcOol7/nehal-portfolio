"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BenchoMagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance pull multiplier (default: 0.35)
  className?: string;
  active?: boolean;
}

/**
 * BenchoMagnetic
 * Inspired by Bencho (bencho.dev) interactive gesture blocks.
 * Features:
 * - Fluid cursor magnetic attraction based on cursor vector delta
 * - Tactile spring physics (stiffness: 220, damping: 18, mass: 0.1)
 * - Safe touch-device disablement (no drift on mobile/tablet)
 * - Zero audio / sound effects
 */
export default function BenchoMagnetic({
  children,
  strength = 0.32,
  className = "",
  active = true,
}: BenchoMagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || isTouch || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
