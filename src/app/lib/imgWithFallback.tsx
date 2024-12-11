import { useState } from 'react';
import Image from 'next/image';

export const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  ...rest
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  [key: string]: string | number | boolean;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  if (src === '') {
    return;
  } else {
    return (
      <Image
        {...rest}
        alt={alt}
        src={imgSrc}
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
      />
    );
  }
};
