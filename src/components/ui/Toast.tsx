import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, visible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9998] flex items-center gap-3 bg-[var(--color-ink)] text-[var(--color-bg)] rounded-xl py-4 px-6 shadow-[var(--shadow-soft)] max-w-[90vw]"
          style={{ borderLeft: type === 'success' ? '3px solid var(--color-gold)' : '3px solid #ef4444' }}
        >
          {type === 'success' ? (
            <Check className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{message}</span>
          <button onClick={onClose} className="ml-2 shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
