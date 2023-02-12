import { motion } from 'framer-motion';

const Backdrop = ({ children, onClick, bgColor = '', blur = 4 }: {children?: any, onClick?: any, bgColor: string, blur: string | number}) => {
  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.2,
        delayChildren: 0.4
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.2,
      }
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className = {`fixed flex top-0 left-0 right-0 bottom-0 items-center justify-center z-10 backdrop-blur-[${blur}px] ${bgColor}`}
      initial = "hidden"
      animate = "visible"
      exit = "hidden"
      variants = {overlayVariants}
    >
      {children}
    </motion.div>
  )
};

export default Backdrop