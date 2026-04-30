import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, visible, onClose }: ToastProps) {
  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          className="absolute -bottom-20 left-0 right-0 z-[50] flex items-center gap-3 rounded-2xl py-3.5 px-5"
          style={{
            background: isSuccess
              ? 'rgba(240, 250, 240, 0.92)'
              : 'rgba(255, 245, 240, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: isSuccess
              ? '1px solid rgba(76, 175, 80, 0.2)'
              : '1px solid rgba(212, 99, 75, 0.2)',
            boxShadow: isSuccess
              ? '0 8px 32px -8px rgba(76, 175, 80, 0.15)'
              : '0 8px 32px -8px rgba(212, 99, 75, 0.15)',
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: isSuccess
                ? 'rgba(76, 175, 80, 0.12)'
                : 'rgba(212, 99, 75, 0.12)',
            }}
          >
            {isSuccess ? (
              <Check className="w-3.5 h-3.5 text-[#4CAF50]" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-[#D4634B]" />
            )}
          </div>
          <span
            className="text-[13px] font-medium leading-snug"
            style={{
              color: isSuccess ? '#2E7D32' : '#C0392B',
            }}
          >
            {message}
          </span>
          <button
            onClick={onClose}
            className="ml-auto shrink-0 opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <X
              className="w-3.5 h-3.5"
              style={{ color: isSuccess ? '#2E7D32' : '#C0392B' }}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
