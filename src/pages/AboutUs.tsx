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
    { number: "1K+", label: "Active Players" },
    { number: "$2M+", label: "Prizes Awarded" },
    { number: "15+", label: "Games Available" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-[72vh] overflow-hidden">
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

       {/* Values Section */}
      <section className="px-4 py-16 relative overflow-hidden z-0">
<img src={image1} alt="RowGaming Team" className="mx-auto absolute -right-10 top-5 mb-12 rounded-lg md:w-80 w-48 transform scale-x-[-1] animate-float [animation-delay:2s]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Core Values
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These principles guide everything we do
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 z-20">
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
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-card/50 relative overflow-hidden border-t border-b border-border">
        {/* Diagonal Lines Decoration */}
          <div className=" h-0.5 bg-muted transform -rotate-45 absolute top-0 -left-[600px] w-full"></div>
        <div className=" h-0.5 bg-muted transform -rotate-45 absolute top-0 -left-[585px] w-full"></div>
<div className=" h-0.5 bg-muted transform -rotate-45 absolute top-0 -left-[569px] w-full"></div>
<div className=" h-0.5 bg-muted transform -rotate-45 absolute top-0 -left-[554px] w-full"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-border"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
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

     

      {/* Why Choose Us Section */}
      <section className="px-4 py-16 md:py-24 bg-card/50 border-t border-b border-border bgimage">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Why Choose RowGaming?
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

      {/* Contact Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">
            Have questions? Our customer support team is here to help 24/7
          </p>
          <div className="bg-card border-2 border-border rounded-lg p-8 backimg">
            <p className="text-muted-foreground mb-4 text-white font-semibold">
              Email: rowgaming6969@gmail.com
            </p>
            <p className="text-muted-foreground text-white font-semibold">
              Live Chat available on our platform during gaming hours
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
