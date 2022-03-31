import { AiOutlineArrowUp as ArrowUp } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

import "./styles.css";

interface BackToTopProps {
  isInvisible: boolean;
}

function BackToTop({ isInvisible }: BackToTopProps) {
  return (
    <AnimatePresence>
      {isInvisible && (
        <motion.button
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 35, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="backToTop primaryButton"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          Back to top
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
