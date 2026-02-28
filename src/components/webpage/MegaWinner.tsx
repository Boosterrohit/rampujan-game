import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Zap, ShipWheel, Trophy, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { winnersService } from "@/services/winnersService";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MegaWinners() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // state to hold winners coming from backend
  const [megaWinners, setMegaWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // helper gradients and badge list to give some variety
  const gradients = [
    "from-yellow-400 to-orange-500",
    "from-purple-400 to-pink-500",
    "from-blue-400 to-cyan-500",
    "from-green-400 to-emerald-500",
    "from-red-400 to-rose-500",
    "from-indigo-400 to-purple-500",
  ];
  const badges = [Crown, Trophy, Star, ShipWheel];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await winnersService.fetchWinners();
        // convert api winners to the shape that the card expects
        const converted = data.map((w, index) => {
          const initials = w.playerName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
          return {
            id: index,
            name: w.playerName,
            prize: `${w.gameName} Winner`,
            amount: `$${w.prizeAmount}`,
            game: w.gameName,
            avatar: initials,
            badge: badges[index % badges.length],
            gradient: gradients[index % gradients.length],
            rarity: "common",
          };
        });
        setMegaWinners(converted);
      } catch (err) {
        console.error("failed to load mega winners", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  // Render function for slider items
  const renderSliderItems = () => {
    return megaWinners.map((winner) => {
      const BadgeIcon = winner.badge;
      return (
        <div key={winner.id} className="px-2 w-full h-full">
          <Card
            className={`relative overflow-hidden border-2 bg-gradient-to-br ${winner.gradient}/10 hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full min-h-[90px] md:min-h-[300px]`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 hidden md:block h-full">
              <div className="absolute top-4 right-4">
                <BadgeIcon className="w-16 h-16 text-current" />
              </div>
            </div>

            {/* Winner Badge */}
            <div className="absolute top-4 right-4 z-10 hidden md:block">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${winner.gradient} flex items-center justify-center shadow-lg`}
              >
                <BadgeIcon className="w-6 h-6 text-white" />
              </div>
            </div>

            <CardHeader className="text-center pb-2 p-3 md:p-4 md:pb-4">
              {/* Avatar */}
              <div
                className={`w-7 h-7 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${winner.gradient} mx-auto mb-2 md:mb-4 flex items-center justify-center shadow-lg ring-4 ring-white/20 overflow-hidden`}
              >
                {winner.avatar.includes(".jpg") ||
                winner.avatar.includes(".png") ||
                winner.avatar.includes(".jpeg") ? (
                  <img
                    src={winner.avatar}
                    alt={`${winner.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs md:text-2xl font-bold text-white">
                    {winner.avatar}
                  </span>
                )}
              </div>

              {/* Winner Name */}
              <CardTitle className="text-xs md:text-xl font-bold text-center line-clamp-2">
                {winner.name}
              </CardTitle>

              {/* Prize Title */}
              <p
                className={`text-xs md:text-sm md:font-semibold bg-gradient-to-r ${winner.gradient} bg-clip-text text-transparent uppercase tracking-wider`}
              >
                {winner.prize}
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-1 md:space-y-4 p-3 md:p-4 pt-0">
              {/* Prize Amount */}
              <p className="text-sm md:text-4xl font-black gradient-text -mt-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
                {winner.amount}
              </p>

              {/* Extra content - Desktop only */}
              <div className="hidden md:block space-y-4">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  Won in {winner.game}
                </p>

                {/* Game Badge */}
                <div className="flex justify-center">
                  <div className="px-4 pb-2 bg-card/80 rounded-full border border-border/50">
                    <span className="text-xs font-medium text-muted-foreground">
                      🎮 {winner.game}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                {/* <Button
                  className={`w-full bg-gradient-to-r ${winner.gradient} hover:opacity-90 text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  onClick={() => navigate("/free-spin")}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Try Your Luck
                </Button> */}
              </div>
            </CardContent>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </Card>
        </div>
      );
    });
  };

  if (loading) {
    // simple loading placeholder
    return (
      <section className="px-4 text-center py-8">
        <p className="text-lg font-medium">Loading winners...</p>
      </section>
    );
  }

  if (!loading && megaWinners.length === 0) {
    return (
      <section className="px-4 text-center py-8">
        <p className="text-lg font-medium">No winners found.</p>
      </section>
    );
  }

  return (
    <section className="px-4">
      {/* Desktop Slider - Shows 3 slides */}
      {!isMobile && (
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
        >
          {renderSliderItems()}
        </Slider>
      )}

      {/* Mobile Slider - Shows 2 slides */}
      {isMobile && (
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={2}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
        >
          {renderSliderItems()}
        </Slider>
      )}
    </section>
  );
}
