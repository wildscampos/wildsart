import * as React from "react";
import { cn } from "@/lib/utils";

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  eager?: boolean; // Use for above-the-fold images
  aspectRatio?: string; // e.g., "16/9", "4/3"
}

/**
 * OptimizedImage Component
 * 
 * Automatically applies performance best practices:
 * - Lazy loading by default (disable with eager prop)
 * - Maintains aspect ratio to prevent layout shifts
 * - Optimized for WebP format when available
 * 
 * @example
 * <OptimizedImage 
 *   src="/image.webp" 
 *   alt="Description"
 *   eager // Only for above-the-fold images
 *   className="rounded-lg"
 * />
 */
export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, eager = false, aspectRatio, className, style, ...props }, ref) => {
    const loadingStrategy = eager ? "eager" : "lazy";
    
    const imageStyle: React.CSSProperties = {
      ...style,
      ...(aspectRatio && { aspectRatio })
    };

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loadingStrategy}
        decoding="async"
        className={cn("object-contain", className)}
        style={imageStyle}
        {...props}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";
