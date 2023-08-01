import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export const PageAnimation: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <motion.article
      role='main'
      className='prose'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.article>
  )
}
