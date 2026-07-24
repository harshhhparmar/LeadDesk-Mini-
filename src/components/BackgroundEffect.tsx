import { motion } from 'motion/react';

export function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-gray-50 dark:bg-[#000212]">
      <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05]"></div>
      
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-500/20 dark:bg-purple-500/10 blur-[120px]"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
