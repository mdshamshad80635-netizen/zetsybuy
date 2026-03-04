"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// â”€â”€â”€ TYPES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  emoji: string;
  rating: number;
  badge: string | null;
  features: string[];
  affiliateLink: string;
}

interface AmazonProduct {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: string;
  rating: number;
  reviews: number;
  affiliateLink: string;
  badge: string;
}

interface Category {
  name: string;
  icon: string;
  count: string;
}

// â”€â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PRODUCTS: Product[] = [
  { id: 1, title: "Eternal Rose Bouquet Box", description: "12 preserved roses in a luxury velvet box with LED lights. Lasts forever, just like your love.", price: "â‚¹1,899", category: "Romantic Gifts", emoji: "ðŸŒ¹", rating: 4.9, badge: "HOT", affiliateLink: "https://www.amazon.in/s?k=preserved+rose+bouquet+box+gift&tag=zetsy-21", features: ["12 Preserved Roses", "LED Strip Lighting", "Personalized Message Card", "Premium Velvet Box"] },
  { id: 2, title: "Birthday Surprise Hamper", description: "A delightful hamper with chocolates, scented candle, journal, and handwritten note.", price: "â‚¹1,299", category: "Birthday Gifts", emoji: "ðŸŽ‚", rating: 4.8, badge: "NEW", affiliateLink: "https://www.amazon.in/s?k=birthday+surprise+hamper+gift&tag=zetsy-21", features: ["Artisan Chocolates", "Soy Wax Candle", "Gratitude Journal", "Silk Ribbon Wrap"] },
  { id: 3, title: "Couple Memory Jar", description: "A beautiful glass jar filled with 52 handwritten love notes and surprise date ideas.", price: "â‚¹799", category: "Couple Gifts", emoji: "ðŸ’•", rating: 4.7, badge: null, affiliateLink: "https://www.amazon.in/s?k=couple+memory+jar+love+notes&tag=zetsy-21", features: ["52 Love Notes", "Printed Date Ideas", "Decorated Mason Jar", "Custom Name Labels"] },
  { id: 4, title: "Anniversary Starmap Print", description: "Custom star map showing the exact night sky from your special date. Framed and ready.", price: "â‚¹2,199", category: "Anniversary Gifts", emoji: "â­", rating: 4.9, badge: "POPULAR", affiliateLink: "https://www.amazon.in/s?k=custom+star+map+anniversary+gift+framed&tag=zetsy-21", features: ["Custom Date & Location", "A3 Framed Print", "High-quality Paper", "Free Message Engraving"] },
  { id: 5, title: "Luxury Spa Gift Set", description: "Pamper her with rose bath salts, aromatherapy oils, and silk face mask. Pure bliss.", price: "â‚¹1,499", category: "Romantic Gifts", emoji: "ðŸŒ¸", rating: 4.8, badge: null, affiliateLink: "https://www.amazon.in/s?k=luxury+spa+gift+set+women&tag=zetsy-21", features: ["Rose Bath Salts", "3 Essential Oils", "Silk Eye Mask", "Exfoliating Mitt"] },
  { id: 6, title: "Personalised Photo Locket", description: "A sterling silver locket with space for two photos. Engraved with your message.", price: "â‚¹1,799", category: "Customized Gifts", emoji: "ðŸ“¿", rating: 4.9, badge: "TRENDING", affiliateLink: "https://www.amazon.in/s?k=personalised+photo+locket+silver&tag=zetsy-21", features: ["925 Sterling Silver", "2 Photo Slots", "Custom Engraving", "Gift Pouch Included"] },
  { id: 7, title: "Diwali Luxury Gift Hamper", desc
