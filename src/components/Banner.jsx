import { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    
    image: "/src/assets/banners1.jpg",
  },
  {
    id: 2,
 
    image: "/src/assets/banner2.jpg",
  },
  {
    id: 3,
   
    image: "/src/assets/banners3.jpg",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { title, subtitle, image } = banners[currentIndex];

  return (
    <div
      className="relative h-[70vh] bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
      }}
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">
          {title}
        </h1>
        <p className="text-lg md:text-2xl animate-fade-in-up">{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
