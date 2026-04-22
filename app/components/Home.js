"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/wallpapers")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {images.map((img, index) => (
        <div key={img.fileId} className="rounded-lg overflow-hidden shadow-md">
          <Image
            src={img.url}
            alt={img.name}
            width={400}
            height={250}
            className="object-cover w-full h-full"
            loading={index === 0 ? "eager" : "lazy"}   // First image loads eagerly, rest stay lazy
            priority={index === 0} 
          />
        </div>
      ))}
    </div>
  );
}
