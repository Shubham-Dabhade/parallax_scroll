import React, { useState } from 'react';
import "./heading.css";
import Heading1 from './headings/heading1/Heading1';
import Heading2 from './headings/heading2/Heading2';
import { motion } from "framer-motion";
import useMousePosition from './utils/useMousePosition';

const Heading = () => {

    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const size = isHovered ? 400 : 40;


  return (
    <main className="heading-main">
    <motion.div 
      className="mask"
      animate={{
        WebkitMaskPosition: `${x - (size/2)}px ${y - (size/2)}px`,
        WebkitMaskSize: `${size}px`,
      }}
      transition={{ type: "tween", ease: "backOut", duration:0.5}}
    >
        <div className='mask-heading' onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
          UNBORING &nbsp;B2B
        </div>
    </motion.div>

    <div className="heading-body">
      <div className="heading-heading">
        TWENTYTWOAM
      </div>
      <div className="heading-description">
        Consultancy and Design Solutions for B2B Brands
      </div>
    </div>

  </main>
  )
}

export default Heading;