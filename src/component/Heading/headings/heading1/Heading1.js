import React, { Suspense, useEffect, useRef, useState } from "react";
import "./heading1.css";
import { useLoader, useFrame, Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

const GltfModel = ({ modelPath, scale = 8.5, position = [0, 0, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.01;
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={scale}
      position={position}
    ></primitive>
  );
};

const Heading1 = () => {

    const heading1ref = useRef();

      // variants
  //----------
  const heading1 = {
    show: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1,
      },
    },
    exit:{
        transition: {
          delayChildren: 0.1,
        },
      }
  };


    // components animation
    const scaleDownAnimation = {
        hidden: {
          opacity: 0,
          scale:4,
          y: 0,
        },
        show: {
          opacity: 1,
          scale:1,
          y: 0,
          transition: {
            ease: "easeInOut",
            duration: 0.7,
          },
        },
        exit: {
          opacity: 0,
          scale:0,
          y: -200,
          transition: {
            ease: "easeInOut",
            duration: 0.8,
          },
        },
      };



      const [dimension, setDimension] = useState({width:0, height:0});
      const { height } = dimension;

      console.log(height);

      useEffect(()=>{

        const resized = () => {
            setDimension({width: window.innerWidth, height: window.innerHeight})
          }
      
          window.addEventListener("resize", resized)
          resized();
      
          return () => {
            window.removeEventListener("resize", resized);
          }
      },[])




  return (
    <motion.div ref={heading1ref} className="Heading1-component" variants={heading1} whileInView="show" exit="exit">
      <motion.div className="inside-heading1-component" variants={scaleDownAnimation}>
        <div className="heading1-part1-container">LET'S BREAK THE MON</div>
        <Canvas style={{width:"110px", height:"170px"}}>
          <OrbitControls />
          <ambientLight intensity={7.5} />
          <spotLight position={[5, 5, 5]} intensity={140} angle={0.15} />
          <pointLight position={[-5, -5, -5]} />
          <Suspense fallback={null}>
            <GltfModel modelPath="bomb.glb" scale={8.5}/>
            <OrbitControls />
          </Suspense>
        </Canvas>
        <div className="heading1-part2-container">TONY</div>
      </motion.div>
    </motion.div>
  );
};

export default Heading1;
