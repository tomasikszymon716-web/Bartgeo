import { useScroll, useTransform, type MotionValue } from 'framer-motion';

export function useScrollProgress(): {
  scrollYProgress: MotionValue<number>;
  scrollY: MotionValue<number>;
  width: MotionValue<string>;
} {
  const { scrollYProgress, scrollY } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return { scrollYProgress, scrollY, width };
}
