import React from 'react';
import { Song } from '../types';
import { Award, Trophy, Star, RotateCcw, ArrowRight } from 'lucide-react';

interface AwardModalProps {
  song: Song;
  errorsCount: number;
  onClose: () => void;
  onRestart: () => void;
}

export const AwardModal: React.FC<AwardModalProps> = ({
  song,
  errorsCount,
  onClose,
  onRestart,
}) => {
  const totalNotes = song.notes.length;
  const accuracy = Math.max(0, Math.round(((totalNotes - errorsCount) / totalNotes) * 100));

  let stars = 3;
  if (errorsCount > 4) stars = 1;
  else if (errorsCount > 1) stars = 2;

  let message = "เคาะได้สมบูรณ์แบบไร้ที่ติ! ยอดเยี่ยมที่สุดครับ 🌟";
  if (errorsCount > 0 && errorsCount <= 3) {
    message = `เคาะผิดพลาดเพียงแค่ ${errorsCount} ครั้ง ฝีมือดีเยี่ยมมาก!`;
  } else if (errorsCount > 3) {
    message = `จบเพลงสำเร็จ! มีข้อผิดพลาด ${errorsCount} ครั้ง ลองฝึกฝนอีกครั้งเพื่อคว้า 3 ดาวเต็มนะครับ`;
  }

  return (
    <div className="fixed inset-0 bg-[#070709]/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-[#070709] border border-[#ff4e00]/40 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center flex flex-col items-center gap-4 shadow-2xl relative overflow-hidden">
        
        {/* Glowing Background Ring */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#ff4e00]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-[#ff4e00] flex items-center justify-center text-white shadow-xl shadow-[#ff4e00]/30 border border-white/20">
          <Trophy className="w-9 h-9" />
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff4e00] font-mono">
            ยินดีด้วย! คุณจบเพลงสำเร็จแล้ว
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5 tracking-wide">{song.title}</h2>
        </div>

        {/* Stars */}
        <div className="flex gap-2 text-3xl my-1">
          {[1, 2, 3].map((starIndex) => (
            <Star
              key={starIndex}
              className={`w-8 h-8 transition-transform duration-300 ${
                starIndex <= stars
                  ? 'text-[#ff4e00] fill-[#ff4e00] scale-110 drop-shadow-[0_0_10px_rgba(255,78,0,0.6)]'
                  : 'text-white/20'
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 w-full bg-white/[0.03] p-3 rounded-2xl border border-white/5 text-xs">
          <div>
            <div className="text-white/40 font-mono">ACCURACY</div>
            <div className="text-base font-black text-emerald-400 font-mono">{accuracy}%</div>
          </div>
          <div>
            <div className="text-white/40 font-mono font-medium">ERRORS</div>
            <div className="text-base font-black text-[#ff4e00] font-mono">{errorsCount}</div>
          </div>
        </div>

        <p className="text-xs text-white/70 leading-relaxed">{message}</p>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full mt-2">
          <button
            onClick={onRestart}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ลองอีกครั้ง</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-[#ff4e00] hover:bg-[#ff4e00]/90 text-white font-extrabold uppercase text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg shadow-[#ff4e00]/30 border border-white/20"
          >
            <span>กลับหน้าหลัก</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
