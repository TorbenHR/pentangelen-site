import { Ghost, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Card from "./App.jsx";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full px-6 py-10">
        <Card className="p-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="mb-6"
          >
            <Ghost size={64} className="text-fuchsia-500 drop-shadow-lg" />
          </motion.div>
          <h1 className="text-3xl font-serif font-bold text-fuchsia-300 mb-4">404 – De hemmelige skriftene finnes ikke</h1>
          <p className="text-zinc-300 mb-6">
            De hemmelige skriftene du lette etter finnes ikke.<br />
            Men jeg kan lede deg hjem.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-zinc-800 text-fuchsia-300 hover:bg-fuchsia-900/40 border border-zinc-700 text-lg font-semibold transition shadow"
          >
            Gå til forsiden <ChevronRight size={20} />
          </a>
        </Card>
      </div>
    </div>
  );
}
