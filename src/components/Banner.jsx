import { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    title: "Welcome to Event Explorer",
    subtitle: "Discover local events near you",
    image: "/src/assets/banners1.jpg",
  },
  {
    id: 2,
    title: "Join Amazing Workshops",
    subtitle: "Learn and grow with experts",
    image: "/src/assets/banner2.jpg",
  },
  {
    id: 3,
    title: "Explore Fun Activities",
    subtitle: "Find events that match your interest",
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
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image})`,
      }}
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center items-start md:items-start px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 animate-fade-in-down">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl lg:text-3xl animate-fade-in-up">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Banner;
