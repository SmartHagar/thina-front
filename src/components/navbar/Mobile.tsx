/** @format */

import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";
type Props = {
  open: boolean;
};

const Mobile: FC<Props> = ({ open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
        >
          Hallo
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Mobile;
