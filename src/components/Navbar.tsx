import React from 'react';
import { TabType, LabelMode } from '../types';
import { Music, Settings, Mic, PlayCircle, Volume2, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  labelMode: LabelMode;
  setLabelMode: (mode: LabelMode) => void;
  audioReady: boolean;
  unlockAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  labelMode,
  setLabelMode,
  audioReady,
  unlockAudio,
}) => {
  return (
    <header className="w-full bg-[#070709]/90 border-b border-white/5 backdrop-blur-md sticky top-0 z-30 px-3 py-2.5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ff4e00] flex items-center justify-center text-white font-black shadow-lg shadow-[#ff4e00]/30 border border-white/20">
              🔔
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-widest text-white flex items-center gap-1.5 uppercase">
                BELL LYRA <span className="text-[#ff4e00]">MASTER</span>
                <span className="text-[10px] bg-[#ff4e00]/15 text-[#ff4e00] border border-[#ff4e00]/30 px-1.5 py-0.5 rounded-full font-bold tracking-wider">
                  PRO
                </span>
              </h1>
              <p className="text-[10px] text-white/40 hidden sm:block font-mono tracking-wider">
                24-BIT / HIGH FIDELITY SIMULATOR
              </p>
            </div>
          </div>

          {/* Mobile Audio Status / Unlock button */}
          {!audioReady && (
            <button
              onClick={unlockAudio}
              className="sm:hidden text-xs bg-[#ff4e00] text-white font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse shadow-lg shadow-[#ff4e00]/30"
            >
              <Volume2 className="w-3.5 h-3.5" />
              เปิดเสียง
            </button>
          )}
        </div>

        {/* Dedicated Navigation Tabs */}
        <div className="flex items-center justify-center bg-white/[0.03] p-1 rounded-2xl border border-white/5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('player')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'player'
                ? 'bg-[#ff4e00] text-white shadow-lg shadow-[#ff4e00]/30 border border-white/20'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>เครื่องเล่น</span>
          </button>

          <button
            onClick={() => setActiveTab('songs')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'songs'
                ? 'bg-[#ff4e00] text-white shadow-lg shadow-[#ff4e00]/30 border border-white/20'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>เพลง & ฝึกเล่น</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#ff4e00] text-white shadow-lg shadow-[#ff4e00]/30 border border-white/20'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>ปรับแต่งเสียง</span>
          </button>

          <button
            onClick={() => setActiveTab('recorder')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'recorder'
                ? 'bg-[#ff4e00] text-white shadow-lg shadow-[#ff4e00]/30 border border-white/20'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>บันทึกเสียง</span>
          </button>
        </div>

        {/* Note Label Quick Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/5 text-xs">
          <span className="text-[10px] text-white/40 font-mono px-1.5">NOTE:</span>
          {(['eng', 'thai_full', 'thai_short', 'solfege'] as LabelMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setLabelMode(mode)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold transition ${
                labelMode === mode
                  ? 'bg-white/10 text-[#ff4e00] border border-[#ff4e00]/40 shadow'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {mode === 'eng' && 'C D E'}
              {mode === 'thai_full' && 'โด เร มี'}
              {mode === 'thai_short' && 'ด ร ม'}
              {mode === 'solfege' && 'Do Re'}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
