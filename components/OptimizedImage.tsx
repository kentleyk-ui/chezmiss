"use client";

import Image from "next/image";
import React from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "scale-down";
  lazy?: boolean;
}

/**
 * Optimized image wrapper using Next.js Image component
 * Automatically handles:
 * - Format conversion (WebP, AVIF)
 * - Responsive sizing
 * - Lazy loading by default
 * - Priority loading for above-the-fold
 */
export function OptimizedImage({
  src,
  alt,
  width = 1200,
  height = 600,
  priority = false,
  className = "",
  objectFit = "cover",
  lazy = true,
}: OptimizedImageProps) {
  // Skip optimization for non-http URLs or invalid URLs
  if (!src || (!src.startsWith("http") && !src.startsWith("/"))) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={lazy ? "lazy" : "eager"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      style={{ objectFit }}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      onError={(e) => {
        console.warn(`Failed to load image: ${src}`);
        // Fallback to placeholder
        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23333' width='100' height='100'/%3E%3C/svg%3E";
      }}
    />
  );
}

// For hero images
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      width={1920}
      height={1080}
      priority={true}
      objectFit="cover"
    />
  );
}

// For product images
export function ProductImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      width={400}
      height={400}
      objectFit="contain"
    />
  );
}

// For gallery thumbnails
export function GalleryImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      width={300}
      height={300}
      objectFit="cover"
    />
  );
}
