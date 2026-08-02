import React from 'react';
import { Volume2 } from 'lucide-react';

interface AudioUnlockOverlayProps {
  onUnlock: () => void;
}

export const AudioUnlockOverlay: React.FC<AudioUnlockOverlayProps> = ({ onUnlock }) => {
  return (
    <div className="fixed inset-0 bg-[#070709]/95 backdrop-blur-md flex flex-col items-center justify-center z-50 text-center p-4 animate-fade-in">
      <div className="max-w-md bg-[#070709] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-4 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#ff4e00]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-[#ff4e00] flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-[#ff4e00]/30 border border-white/20 animate-bounce">
          🔔
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-widest uppercase">
            BELL LYRA <span className="text-[#ff4e00]">MASTER</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-2 leading-relaxed">
            สัมผัสเครื่องดนตรีจำลองเบลไลลาแสนหวาน ด้วยระบบคลื่นเสียงความหน่วงต่ำพิเศษ
            แตะเปิดใช้งานเสียงด้านล่างนี้เพื่อเริ่มต้นดนตรี
          </p>
        </div>

        <button
          onClick={onUnlock}
          className="w-full bg-[#ff4e00] hover:bg-[#ff4e00]/90 text-white text-sm sm:text-base font-extrabold uppercase py-3.5 px-8 rounded-2xl shadow-xl shadow-[#ff4e00]/30 border border-white/20 active:scale-95 transition flex items-center justify-center gap-2 tracking-wider"
        >
          <Volume2 className="w-5 h-5" />
          <span>เริ่มเล่นเบลไลลา (START PLAYING)</span>
        </button>
      </div>
    </div>
  );
};
