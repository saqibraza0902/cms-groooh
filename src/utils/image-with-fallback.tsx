/* eslint-disable @next/next/no-img-element */
import { cn } from "@/utils/styles";
import * as React from "react";
export interface ImageWithFallbackProps {
  className?: string;
  src?: string;
  fallbackSrc?: string;
  alt: string;
}

function ImageWithFallback({
  className,
  src,
  fallbackSrc = "https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/logos%2Fprofile-alt.png?alt=media&token=6bc149ee-b3a8-4d9f-80b2-07a6f78fc785",
  alt,
  ...rest
}: React.HTMLAttributes<HTMLImageElement> & ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = React.useState(src || fallbackSrc);
  const onError = ({ currentTarget }: React.SyntheticEvent) => {
    (currentTarget as HTMLImageElement).onerror = null;
    setCurrentSrc(fallbackSrc);
  };
  React.useEffect(() => {
    if (src) {
      setCurrentSrc(src);
    }
  }, [src]);
  return (
    <img
      className={cn(`object-cover ${className}`)}
      src={currentSrc}
      onError={onError}
      alt={alt}
      {...rest}
    />
  );
}

export default ImageWithFallback;
