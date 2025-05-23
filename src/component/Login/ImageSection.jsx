import React from 'react';
import { motion } from 'framer-motion';
import loginVideo from '../../assets/login.mp4'; // make sure your video is in this path

const ImageSection = () => {
  return (
    <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden bg-black">
      {/* Video Background */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 mt-16 object-cover"
      >
        <source src={loginVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Bottom-left Overlay content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-40 left-10 text-white text-start px-4"
      >
        <h2 className="text-3xl font-medium tracking-wide">
          COMPLETE CONTROL OVER WORKFLOW
        </h2>
        <p className="text-lg max-w-xl mt-2 leading-relaxed">
          "Together, We Work Towards Completing Every Project With Precision And Professionalism"
        </p>
      </motion.div>
    </div>
  );
};

export default ImageSection;
