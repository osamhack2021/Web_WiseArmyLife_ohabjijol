import React, {Component} from "react";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "./A.png" },
  { url: "./B.png" },
  { url: "./C.png" },
 ];

export default function Slider ()  {
    return(
      <>
    <div>
      <SimpleImageSlider
        width={1280}
        height={700}
        images={images}
      />
    </div>
    </>
  );
  }



