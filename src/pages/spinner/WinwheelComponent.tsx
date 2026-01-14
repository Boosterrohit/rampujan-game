import React, { useEffect } from "react";

interface SegmentConfig {
  fillStyle: string;
  text: string;
}

interface AnimationConfig {
  type: string;
  duration: number;
  spins: number;
}

interface WinwheelConfig {
  canvasId: string;
  numSegments: number;
  outerRadius: number;
  segments: SegmentConfig[];
  animation: AnimationConfig;
}

interface WinwheelSegment {
  text: string;
}

// Declare Winwheel as a global type
declare class Winwheel {
  constructor(config: WinwheelConfig);
  startAnimation(): void;
}

const WinwheelComponent: React.FC = () => {
  useEffect(() => {
    const theWheel = new Winwheel({
      canvasId: "canva",
      numSegments: 4,
      outerRadius: 170,
      segments: [
        { fillStyle: "#eae56f", text: "Prize One" },
        { fillStyle: "#89f26e", text: "Prize Two" },
        { fillStyle: "#7de6ef", text: "Prize Three" },
        { fillStyle: "#e7706f", text: "Prize Four" }
      ],
      animation: {
        type: "spinToStop",
        duration: 5,
        spins: 8
      }
    });

    console.log(theWheel);
  }, []);

  const alertPrize = (indicatedSegment: WinwheelSegment): void => {
    alert("You have won " + indicatedSegment.text);
  };

  const handleSpin = (): void => {
    // You would call theWheel.startAnimation() here
    // Note: You'll need to store theWheel in state or ref to access it
    console.log("Spin button clicked");
  };

  return (
    <div>
      <canvas id="canva" width={880} height={500}></canvas>
      <button onClick={handleSpin}>Spin the Wheel</button>
    </div>
  );
};

export default WinwheelComponent;