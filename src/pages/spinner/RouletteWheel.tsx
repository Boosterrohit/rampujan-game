import React from "react";
import { Wheel } from "react-custom-roulette";

interface WheelData {
  option: string;
}

interface RouletteWheelProps {
  data: WheelData[];
  mustSpin: boolean;
  prizeNumber: number;
  onStopSpinning: () => void;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ data, mustSpin, prizeNumber, onStopSpinning }) => {
  return (
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={data}
      outerBorderColor="#f2f2f2"
      outerBorderWidth={10}
      innerBorderColor="#f2f2f2"
      radiusLineColor="#dedede"
      radiusLineWidth={1}
      fontSize={15}
      textColors={["#ffffff"]}
      backgroundColors={[
        "#F22B35",
        "#F99533",
        "#24CA69",
        "#514E50",
        "#46AEFF",
        "#9145B7"
      ]}
      spinDuration={2} // Smooth spin duration in seconds
      onStopSpinning={onStopSpinning}
    />
  );
};

export default RouletteWheel;