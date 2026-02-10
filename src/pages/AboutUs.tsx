"use client";

import { Users, Target, Award, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import video1 from "@/asset/aboutus.mp4";
import image1 from "@/asset/rr.png";
import image2 from "@/asset/ttt.png";

export default function AboutUs() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide a safe, fun, and rewarding gaming experience to players worldwide",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest standards in game quality and customer service",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Building a vibrant community where players can connect and celebrate together",
    },
    {
      icon: Users,
      title: "Trust",
      description:
        "Transparent operations with fair gameplay and secure transactions",
    },
  ];

  const stats = [
    { number: "1K+", label: "Active Players", borderColor: "border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]", },
    { number: "$2M+", label: "Prizes Awarded", borderColor: "border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.5)]", },
    { number: "15+", label: "Games Available", borderColor: "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]", },
    { number: "24/7", label: "Customer Support", borderColor: "border-blue-400 shadow-[0_0_15px_rgba(52,152,219,0.5)]", },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative w-full h-96 md:h-[72vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/api/placeholder/1200/400"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 video-overlay flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4 max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight video-text-shadow">
              About RowGaming
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold opacity-95 video-text-shadow">
               Welcome to RowGaming, where entertainment meets opportunity. We're
            dedicated to providing the best gaming experience with fair play,
            exciting rewards, and a supportive community.
            </p>
          </div>
        </div>
      </div>

        {/* Stats Section */}
      <section className="px-4 py-16 bg-card/50 relative overflow-hidden border-t border-b border-border">
        {/* Diagonal Lines Decoration */}
          <div className=" h-0.5 bg-muted transform -rotate-45 absolute top-0 -left-[600px] w-full"></div>
        <div className=" h-0.5 bg-muted transform -rotate-45 absolute top-0 -left-[585px] w-full"></div>
<div className=" h-0.5 bg-muted transform -rotate-45 absolute top-0 -left-[569px] w-full"></div>
<div className=" h-0.5 bg-muted transform -rotate-45 absolute top-0 -left-[554px] w-full"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center flex justify-center gap-2 mb-12">
            <span
                className="
    text-[#583888]
  drop-shadow-[0_0_3px_#9c78e0]  
drop-shadow-[0_0_4px_#b593ff] 
"
              >
                🔢
              </span>
               <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500
  "
              >
                By the Numbers
              </span>
<span
                className="
    text-[#583888]
  drop-shadow-[0_0_3px_#9c78e0]  
drop-shadow-[0_0_4px_#b593ff] 
"
              >
                🔢
              </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border ${stat.borderColor}`}
              >
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500 mb-2">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
 <section className="px-4 py-16 md:py-24 bg-card/50 border-t border-b border-border bgimage">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
            Why Choose RowGaming?
            </span>
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Safe & Secure</h3>
                <p className="text-muted-foreground text-white ">
                  State-of-the-art encryption and security measures protect your
                  personal and financial information
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Fair Play Guaranteed</h3>
                <p className="text-muted-foreground text-white ">
                  All games are regularly audited and certified to ensure fairness
                  and randomness
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Exciting Rewards</h3>
                <p className="text-muted-foreground text-white ">
                  Win real money, free spins, and exclusive bonuses every day
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">24/7 Support</h3>
                <p className="text-muted-foreground text-white">
                  Our dedicated support team is always available to help you with
                  any questions or concerns
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Multiple Games</h3>
                <p className="text-muted-foreground text-white ">
                  Choose from 15+ exciting games with unique themes and gameplay
                  mechanics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* Values Section */}
      <section className="px-4 py-16 relative overflow-hidden z-0">
{/* <img src={image1} alt="RowGaming Team" className="mx-auto absolute -right-10 top-5 mb-12 rounded-lg md:w-80 w-48 transform scale-x-[-1] animate-float [animation-delay:2s]" /> */}
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
            Our Core Values
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These principles guide everything we do
          </p>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 z-20">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 z-20">
  {values.map((value, index) => {
    const Icon = value.icon;
    
    // Define color scheme for each card
    const colorSchemes = [
      {
        bg: "bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-900/40",
        border: "border-orange-500/30 hover:border-orange-500/60",
        iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
        iconShadow: "shadow-orange-500/50",
        glow: "from-orange-500/10"
      },
      {
        bg: "bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-900/40",
        border: "border-purple-500/30 hover:border-purple-500/60",
        iconBg: "bg-gradient-to-br from-pink-400 to-purple-500",
        iconShadow: "shadow-purple-500/50",
        glow: "from-purple-500/10"
      },
      {
        bg: "bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-900/40",
        border: "border-cyan-500/30 hover:border-cyan-500/60",
        iconBg: "bg-gradient-to-br from-cyan-400 to-blue-500",
        iconShadow: "shadow-cyan-500/50",
        glow: "from-cyan-500/10"
      },
      {
        bg: "bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-purple-900/40",
        border: "border-green-500/30 hover:border-green-500/60",
        iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
        iconShadow: "shadow-green-500/50",
        glow: "from-green-500/10"
      }
    ];
    
    const scheme = colorSchemes[index];
    
    return (
      <div 
        key={index} 
        className={`relative group cursor-pointer rounded-2xl overflow-hidden ${scheme.bg} backdrop-blur-sm border ${scheme.border} transition-all duration-300 p-6`}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${scheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl ${scheme.iconBg} flex items-center justify-center mb-4 shadow-lg ${scheme.iconShadow}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-3">
          {value.title.toUpperCase()}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm">
          {value.description}
        </p>
      </div>
    );
  })}
</div>
        </div>
      </section>

    

     

      {/* Why Choose Us Section */}
     

      {/* Contact Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold"><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">Get In Touch </span></h2>
          <p className="text-lg text-muted-foreground">
            Have questions? Our customer support team is here to help 24/7
          </p>
          <div className="bg-card border-2 border-border rounded-lg p-8 backimg">
            <p className="text-muted-foreground mb-4 text-white font-semibold">
              Email: rowgaming6969@gmail.com
            </p>
            <p className="text-muted-foreground text-white font-semibold">
              Our customer support team is here to help 24/7
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
