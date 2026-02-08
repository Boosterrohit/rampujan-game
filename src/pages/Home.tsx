"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Gift,
  TrendingUp,
  ShipWheel,
  Trophy,
  Star,
  Crown,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import LoginRequiredDialog from "@/components/LoginRequiredDialog";
import panda from "../asset/panda.jpg";
import fire from "../asset/firekirin.jpg";
import gameroom from "../asset/gameroom.jpg";
import vblink from "../asset/vblink.jpg";
import yolo from "../asset/yolo.jpg";
import valut from "../asset/vault.jpg";
import juwa from "../asset/juwa.jpg";
import a777 from "../asset/777.jpg";
import vegas from "../asset/vegas.jpg";
import milky from "../asset/milkyway.jpg";
import orion from "../asset/orion.jpg";
import juwa2 from "../asset/juwa2.jpg";
import MegaWinners from "@/components/MegaWinner";
export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [dialogFeatureName, setDialogFeatureName] = useState("this feature");

  const handleFreeSpin = () => {
    if (!isLoggedIn) {
      setDialogFeatureName("free spin");
      setShowLoginDialog(true);
    } else {
      navigate("/free-spin");
    }
  };

  const handlePlayGame = () => {
    if (!isLoggedIn) {
      setDialogFeatureName("playing games");
      setShowLoginDialog(true);
    } else {
      // Game will be opened in new tab via onClick
    }
  };

  const handleMilestone = () => {
    if (!isLoggedIn) {
      setDialogFeatureName("milestone");
      setShowLoginDialog(true);
    } else {
      navigate("/milestone");
    }
  };

  const handlePrizeChat = () => {
    if (!isLoggedIn) {
      setDialogFeatureName("prize chat");
      setShowLoginDialog(true);
    } else {
      navigate("/prize-chat");
    }
  };

  const features = [
  {
    icon: Zap,
    title: "Free Spin Every 24 Hours",
    description: "Spin the wheel once every 24 hours and win exciting prizes",
    path: "/free-spin",
  },
  {
    icon: Gift,
    title: "Chat with Agent",
    description: "Connect with our support agents anytime for assistance",
    path: "/prize-chat",
  },
  {
    icon: TrendingUp,
    title: "Win Real Money",
    description: "Play games and win real cash prizes instantly",
    path: "/games",
  },
]

  const availableGames = [
    {
      id: 1,
      name: "Ultra Panda",
      category: "Slots",
      icon: panda,
      players: "1.2K",
      prize: "$10K",
      color: "from-red-500 to-pink-500",
      bgImage: panda,
      slug: "https://www.ultrapanda.mobi/",
    },
    {
      id: 2,
      name: "Fire Kirin",
      category: "Wheel",
      icon: fire,
      players: "856",
      prize: "$5K",
      color: "from-blue-500 to-cyan-500",
      bgImage: fire,
      slug: "https://www.firekirin.mobi/",
    },
    {
      id: 3,
      name: "Game Room Online",
      category: "Adventure",
      icon: gameroom,
      players: "2.1K",
      prize: "$15K",
      color: "from-yellow-500 to-orange-500",
      bgImage: gameroom,
      slug: "https://www.gameroom777.com/",
    },
    {
      id: 4,
      name: "Vblink",
      category: "Cards",
      icon: vblink,
      players: "743",
      prize: "$3K",
      color: "from-purple-500 to-indigo-500",
      bgImage: vblink,
      slug: "https://www.vblink777.club/",
    },
    {
      id: 5,
      name: "YOLO 777",
      category: "Dice",
      icon: yolo,
      players: "1.8K",
      prize: "$8K",
      color: "from-green-500 to-teal-500",
      bgImage: yolo,
      slug: "https://h5.yolo777.top/YOLO/",
    },
    {
      id: 6,
      name: "Game Vault",
      category: "Casino",
      icon: valut,
      players: "956",
      prize: "$12K",
      color: "from-red-600 to-red-800",
      bgImage: valut,
      slug: "https://gamevault.download/",
    },
    {
      id: 7,
      name: "Juwa",
      category: "Cards",
      icon: juwa,
      players: "1.3K",
      prize: "$6K",
      color: "from-gray-700 to-gray-900",
      bgImage: juwa,
      slug: "https://dl.juwa777.com/?fbclid=IwY2xjawFtFvZleHRuA2FlbQIxMAABHWaygnEZ03842WW0UPnpbLBvrrDeM0VGWCXmkQMvpm6jioyCs1jJB70ZqA_aem_2jIRv6mHNu0HMx5wefr0Kw",
    },
    {
      id: 8,
      name: "Juwa - 2.0",
      category: "Bingo",
      icon: juwa2,
      players: "2.5K",
      prize: "$4K",
      color: "from-pink-500 to-rose-500",
      bgImage: juwa2,
      slug: "https://m.juwa2.com/",
    },
    {
      id: 9,
      name: "777 River Sweeps",
      category: "Slots",
      icon: a777,
      players: "3.1K",
      prize: "$25K",
      color: "from-yellow-400 to-orange-500",
      bgImage: a777,
      slug: "https://river777.net/",
    },
    {
      id: 10,
      name: "Vegas X",
      category: "Casino",
      icon: vegas,
      players: "1.9K",
      prize: "$18K",
      color: "from-purple-600 to-pink-600",
      bgImage: vegas,
      slug: "https://www.vegas-x.org/",
    },
    {
      id: 11,
      name: "Milky Way",
      category: "Slots",
      icon: milky,
      players: "2.2K",
      prize: "$14K",
      color: "from-blue-600 to-indigo-600",
      hot: true,
      bgImage: milky,
      slug: "https://milkywayapp.xyz/",
    },
    {
      id: 12,
      name: "Orion Stars",
      category: "Adventure",
      icon: orion,
      players: "1.7K",
      prize: "$9K",
      color: "from-cyan-500 to-blue-500",
      bgImage: orion,
      slug: "https://start.orionstars.vip:8888/index.html",
    },
   
  ];

  return (
    <main className="min-h-screen bg-background">
 {/* MEGA WINNERS */}
      <section className="px-4 py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">🏆 MEGA WINNERS</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto hidden md:block">
              Celebrating our biggest winners - Could you be next?
            </p>
          </div>

          {/* Mobile: 2 column grid, Desktop: 3 column grid */}
         <div>
          <MegaWinners/>
         </div>

          {/* Call to Action */}
          <div className="text-center mt-8 md:mt-10">
            <p className="text-muted-foreground mb-2 md:mb-6 text-sm md:text-lg">
              Join thousands of winners and start your journey to victory!
            </p>
            <Button
              size="lg"
              onClick={handleFreeSpin}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12"
            >
              <ShipWheel className="w-5 h-5 mr-2" />
              Start Playing Now
            </Button>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="px-4 py-14 my-5 border-t border-border border-b bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Game Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover all the exciting features we offer to enhance your gaming
              experience
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleFreeSpin}
              className="flex justify-center items-center h-10"
            >
              <ShipWheel className="w-5 h-5 mr-2" />
              Spin Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/about-us")}
              className="flex justify-center items-center h-10"
            >
              <Users className="w-5 h-5 mr-2" />
              About Us
            </Button>
          </div>
        </div>
      </section>

     

      {/* Games Available Section */}
      <section className="px-4 pb-20 pt-12 bg-gradient-to-br from-card/30 via-background to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-5xl font-bold">
              🎮 Games Available
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our collection of exciting games. Each game offers unique
              challenges and amazing rewards!
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {availableGames.slice(0, 14).map((game) => (
              <Card key={game.id} className="group border-2 overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col">
                {/* Image / cover */}
                <div className="relative w-full h-36 md:h-48">
                  <img src={game.bgImage} alt={game.name} className="w-full h-full object-cover block" />
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                  {game.hot && (
                    <div className="absolute top-3 right-3 bg-green-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      ⚡ HOT
                    </div>
                  )}
                </div>

                {/* Info bar */}
                <div className="bg-black px-4 md:px-6 py-2 flex flex-col items-center gap-3">
                  <h3 className="text-white text-center text-xs md:text-xl font-bold w-full">
                    {game.name}
                  </h3>

                  <div className="w-full md:w-3/4">
                    <div className="p-[2px] rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500">
                      <button
                        onClick={() => {
                          // if (isLoggedIn) {
                          //   window.open(game.slug, "_blank");
                          // } else {
                          //   setDialogFeatureName(`play ${game.name}`);
                          //   setShowLoginDialog(true);
                          // }
                          window.open(game.slug, "_blank");
                        }}
                        className="w-full rounded-lg py-2 text-xs md:text-sm bg-[#0b0b0b] text-white font-semibold flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        PLAY NOW
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More / View All */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              And many more games waiting for you!
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={handleFreeSpin}
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Playing Now
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 md:py-32 bg-card/50 border-t border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "1K+", label: "Active Players" },
              { number: "$2M+", label: "Prizes Awarded" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold gradient-text">
                  {stat.number}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 md:pt-16 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Sections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore everything RowGaming has to offer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.path}
                  className="group cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Login Required Dialog */}
      <LoginRequiredDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        featureName={dialogFeatureName}
      />
    </main>
  );
}
