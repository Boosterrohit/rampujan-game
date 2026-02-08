import { useNavigate } from "react-router-dom";
import { Zap, ShipWheel, Trophy, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MegaWinners() {
  const navigate = useNavigate();

  const megaWinners = [
    {
      id: 1,
      name: "Rampujan Bhadwa",
      prize: "Jackpot Winner",
      amount: "$50,000",
      game: "Mega Spin",
      avatar: "RB",
      badge: Crown,
      gradient: "from-yellow-400 to-orange-500",
      rarity: "legendary",
    },
    {
      id: 2,
      name: "Dipak Bdshk",
      prize: "Daily Champion",
      amount: "$25,000",
      game: "Free Spins",
      avatar: "DB",
      badge: Trophy,
      gradient: "from-purple-400 to-pink-500",
      rarity: "epic",
    },
    {
      id: 3,
      name: "Rohit Sir",
      prize: "Spin Master",
      amount: "$15,000",
      game: "Progress Quest",
      avatar: "RS",
      badge: Star,
      gradient: "from-blue-400 to-cyan-500",
      rarity: "rare",
    },
    {
      id: 4,
      name: "Sarah Chen",
      prize: "Lucky Seven",
      amount: "$35,000",
      game: "Lucky Slots",
      avatar: "SC",
      badge: Crown,
      gradient: "from-green-400 to-emerald-500",
      rarity: "legendary",
    },
    {
      id: 5,
      name: "Mike Johnson",
      prize: "Bonus Beast",
      amount: "$18,000",
      game: "Wheel of Fortune",
      avatar: "MJ",
      badge: Trophy,
      gradient: "from-red-400 to-rose-500",
      rarity: "epic",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      prize: "Spin Master",
      amount: "$22,000",
      game: "Ultra Panda",
      avatar: "LA",
      badge: Star,
      gradient: "from-indigo-400 to-purple-500",
      rarity: "rare",
    },
  ];

  return (
    <section className="px-4">
    
        {/* Slider */}
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          responsive={[
            {
              breakpoint: 1024, // Desktop/Tablet
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768, // Tablet/Mobile
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {megaWinners.map((winner) => {
            const BadgeIcon = winner.badge;
            return (
              <div key={winner.id} className="px-2">
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
                    <p className="text-sm md:text-4xl font-black gradient-text -mt-3">
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
                      <Button
                        className={`w-full bg-gradient-to-r ${winner.gradient} hover:opacity-90 text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        onClick={() => navigate("/free-spin")}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Try Your Luck
                      </Button>
                    </div>
                  </CardContent>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Card>
              </div>
            );
          })}
        </Slider>
    </section>
  );
}
