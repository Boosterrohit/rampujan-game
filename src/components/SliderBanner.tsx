import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Zap, ShipWheel, Trophy, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "@/asset/banner1.png";
import banner2 from "@/asset/banner2.png";
import banner3 from "@/asset/banner3.png";
import banner4 from "@/asset/sss.png";

export default function SliderBanner() {
  // Array of all banners
  const banners = [
    { id: 1, src: banner1, alt: "Banner 1" },
    { id: 2, src: banner2, alt: "Banner 2" },
    { id: 3, src: banner3, alt: "Banner 3" },
    { id: 4, src: banner4, alt: "Banner 4" },
  ];

  // Render function for slider items
  const renderSliderItems = () => {
    return banners.map((banner) => (
      <div key={banner.id}>
        <div className="relative w-full md:h-[550px] rounded-lg overflow-hidden">
          <img
            src={banner.src}
            alt={banner.alt}
            className="w-full h-60 md:h-full object-cover rounded-lg"
          />
        </div>
      </div>
    ));
  };

  return (
    <section className="px-4">
      {/* Desktop Slider - Shows 3 slides */}
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={3000}
      >
        {renderSliderItems()}
      </Slider>
    </section>
  );
}