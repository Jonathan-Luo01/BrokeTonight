import { motion } from 'framer-motion';
import { Clock, DollarSign, MapPin, Sparkles } from 'lucide-react';

export function LoadingScout() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-6">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-16 h-16 rounded-full border-3 border-neutral-200 border-t-neutral-900" />
        <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-neutral-900" />
      </motion.div>

      <div className="text-center space-y-1.5">
        <motion.p
          className="text-base font-bold text-neutral-900"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Asking Gemini & Parallel Search MCP to scout tonight's spots…
        </motion.p>
        <p className="text-xs text-neutral-500">
          Retrieving real-time venue pricing, opening hours, and routes
        </p>
      </div>

      <div className="flex gap-5 text-neutral-400">
        {[
          { icon: MapPin, id: 'pin' },
          { icon: DollarSign, id: 'dollar' },
          { icon: Clock, id: 'clock' },
        ].map(({ icon: Icon, id }, i) => (
          <motion.div
            key={id}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
