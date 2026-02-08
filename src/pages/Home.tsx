"use client";

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
export default function Home() {
  const navigate = useNavigate();

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

  const megaWinners = [
    {
      id: 1,
      name: "Rampujan Bhadwa",
      prize: "Jackpot Winner",
      amount: "$50,000",
      game: "Mega Spin",
      avatar: "RB", // Using the panda image path
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
      prize: "Milestone Master",
      amount: "$15,000",
      game: "Progress Quest",
      avatar: "RS",
      badge: Star,
      gradient: "from-blue-400 to-cyan-500",
      rarity: "rare",
    },
  ];

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
      name: "777 River Sweeps Online Casino",
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
    // {
    //   id: 13,
    //   name: "Juwa Paradise",
    //   category: "Slots",
    //   icon: juwa2,
    //   players: "2.8K",
    //   prize: "$22K",
    //   color: "from-emerald-500 to-teal-500",
    //   bgImage: juwa2,
    //   slug: ""
    // },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Features Section */}
      <section className="px-4 py-16 md:py-14">
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
              onClick={() => navigate("/free-spin")}
              className="flex justify-center items-center h-10"
            >
              <ShipWheel className="w-5 h-5 mr-2" />
              Spin Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/milestone")}
              className="flex justify-center items-center h-10"
            >
              <Users className="w-5 h-5 mr-2" />
              About Us
            </Button>
          </div>
        </div>
      </section>

      {/* MEGA WINNERS */}
      <section className="px-4 py-5 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">🏆 MEGA WINNERS</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto hidden md:block">
              Celebrating our biggest winners - Could you be next?
            </p>
          </div>

          {/* Mobile: 2 column grid, Desktop: 3 column grid */}
          <div className="flex flex-wrap justify-center md:grid md:grid-cols-3 gap-4 md:gap-8 pb-4 md:pb-8 md:justify-center md:items-center">
            {megaWinners.map((winner) => {
              const BadgeIcon = winner.badge;
              return (
                <Card
                  key={winner.id}
                  className={`relative overflow-hidden border-2 bg-gradient-to-br ${winner.gradient}/10 hover:shadow-2xl transition-all duration-500 group cursor-pointer`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 hidden md:block">
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

                    {/* Prize Title - Desktop Only */}
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
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-4 md:mt-6">
            <p className="text-muted-foreground mb-2 md:mb-6 text-sm md:text-lg">
              Join thousands of winners and start your journey to victory!
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/free-spin")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12"
            >
              <ShipWheel className="w-5 h-5 mr-2" />
              Start Playing Now
            </Button>
          </div>
        </div>
      </section>

      {/* Games Available Section */}
      <section className="px-4 pb-20 pt-12 bg-gradient-to-br from-card/30 via-background to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
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
              <Card
                key={game.id}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br dark:from-black/20 dark:to-gray-900/20 from-white/30 to-gray-100/30 border-2 hover:border-${game.color.split("-")[1]}/50 backdrop-blur-sm`}
                // onClick={() => navigate({ pathname: game.slug }, { target: "_blank" })}
                // onClick={() => navigate(`/game/${game.slug}`)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <div
                    className="w-full h-full bg-cover bg-center dark:opacity-20 dark:group-hover:opacity-30 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url('${game.bgImage}')`,
                    }}
                  ></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br dark:from-black/30 dark:to-gray-900/30 from-white/40 to-gray-200/40`}
                  ></div>
                </div>

                <CardContent className="relative p-3 md:p-6 text-center space-y-2 md:space-y-4">
                  {/* Game Icon */}
                  <div
                    className={`w-12 h-12 md:w-20 md:h-20 overflow-hidden mx-auto rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 ring-2 md:ring-4 dark:ring-white/20 ring-black/20`}
                  >
                    {/* {game.icon} */}
                    <img src={game.icon} alt="games" />
                  </div>

                  {/* Game Name */}
                  <div className="space-y-1 md:space-y-2">
                    <h3 className="font-bold text-sm md:text-lg text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                      {game.name}
                    </h3>
                    {/* <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                      {game.category}
                    </p> */}
                  </div>

                  {/* Play Button */}
                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white font-semibold py-2 md:py-3 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group-hover:scale-105 text-xs md:text-sm`}
                    onClick={() => window.open(game.slug, "_blank")}
                  >
                    <Zap className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Play Now
                  </Button>
                </CardContent>

                {/* Decorative Corner */}
                <div
                  className={`absolute top-0 right-0 w-0 h-0 border-l-[15px] md:border-l-[20px] border-l-transparent border-t-[15px] md:border-t-[20px] border-t-${game.color.split("-")[1]}/30`}
                ></div>
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
              onClick={() => navigate("/free-spin")}
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
              Explore everything GamePro has to offer
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
    </main>
  );
}
