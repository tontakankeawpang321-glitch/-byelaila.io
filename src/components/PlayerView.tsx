import React, { useState, useEffect, useRef } from 'react';
import { BELL_LYRA_NOTES, NOTE_LABELS } from '../data/songs';
import { LabelMode, SoundSettings, Song } from '../types';
import { playNote } from '../utils/audioEngine';
import { ZoomIn, ZoomOut, GraduationCap, Square, RotateCcw } from 'lucide-react';

interface PlayerViewProps {
  labelMode: LabelMode;
  setLabelMode: (mode: LabelMode) => void;
  settings: SoundSettings;
  setSettings: React.Dispatch<React.SetStateAction<SoundSettings>>;
  activeSong: Song | null;
  isLearnMode: boolean;
  learnIndex: number;
  onUserKeyPress: (noteName: string) => void;
  stopLearnMode: () => void;
  isPlayingDemo: boolean;
  stopDemo: () => void;
  highlightedNote: string | null;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  symbol: string;
  size: number;
}

export const PlayerView: React.FC<PlayerViewProps> = ({
  labelMode,
  setLabelMode,
  settings,
  setSettings,
  activeSong,
  isLearnMode,
  learnIndex,
  onUserKeyPress,
  stopLearnMode,
  isPlayingDemo,
  stopDemo,
  highlightedNote,
}) => {
  const [lastPlayedNote, setLastPlayedNote] = useState<string | null>(null);
  const [activeKeyName, setActiveKeyName] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const keyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const naturalNotes = BELL_LYRA_NOTES.filter((n) => n.type === 'natural');
  const accidentalNotes = BELL_LYRA_NOTES.filter((n) => n.type === 'accidental');

  // Trigger sound & visual effect for a note
  const triggerKey = (noteName: string, freq: number) => {
    playNote(freq, settings);
    setLastPlayedNote(noteName);
    setActiveKeyName(noteName);

    // Call practice mode handler if active
    if (isLearnMode) {
      onUserKeyPress(noteName);
    }

    // Spawn visual particles
    const keyEl = keyRefs.current[noteName];
    if (keyEl) {
      const rect = keyEl.getBoundingClientRect();
      const isAccidental = noteName.includes('#');
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: rect.left + rect.width / 2 + (Math.random() * 20 - 10),
        y: rect.top + Math.random() * 10,
        color: isAccidental ? '#facc15' : '#e2e8f0',
        symbol: ['✦', '🎵', '✨', '🎶'][Math.floor(Math.random() * 4)],
        size: Math.floor(Math.random() * 10 + 14),
      };
      setParticles((prev) => [...prev.slice(-12), newParticle]);
    }

    setTimeout(() => {
      setActiveKeyName(null);
    }, 150);
  };

  // Clean old particles
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(1));
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  // Target note in learn mode
  const currentTargetNote = isLearnMode && activeSong ? activeSong.notes[learnIndex]?.n : null;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-between gap-2 max-w-5xl mx-auto px-2 py-1 select-none overflow-hidden">
      
      {/* Floating Particles Canvas Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute font-bold animate-particle-up"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              color: p.color,
              fontSize: `${p.size}px`,
            }}
          >
            {p.symbol}
          </div>
        ))}
      </div>

      {/* Top Mobile Control Bar */}
      <div className="w-full bg-[#070709]/80 border border-white/10 backdrop-blur rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-xl">
        
        {/* Label Mode Switcher */}
        <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/5">
          <span className="text-[10px] text-white/40 font-mono font-semibold px-1">NOTE:</span>
          <button
            onClick={() => setLabelMode('eng')}
            className={`px-2 py-1 text-[11px] font-mono font-bold rounded-lg transition ${
              labelMode === 'eng' ? 'bg-[#ff4e00] text-white shadow' : 'text-white/40 hover:text-white'
            }`}
          >
            C D E
          </button>
          <button
            onClick={() => setLabelMode('thai_full')}
            className={`px-2 py-1 text-[11px] font-mono font-bold rounded-lg transition ${
              labelMode === 'thai_full' ? 'bg-[#ff4e00] text-white shadow' : 'text-white/40 hover:text-white'
            }`}
          >
            โด เร มี
          </button>
          <button
            onClick={() => setLabelMode('thai_short')}
            className={`px-2 py-1 text-[11px] font-mono font-bold rounded-lg transition ${
              labelMode === 'thai_short' ? 'bg-[#ff4e00] text-white shadow' : 'text-white/40 hover:text-white'
            }`}
          >
            ด ร ม
          </button>
          <button
            onClick={() => setLabelMode('solfege')}
            className={`px-2 py-1 text-[11px] font-mono font-bold rounded-lg transition ${
              labelMode === 'solfege' ? 'bg-[#ff4e00] text-white shadow' : 'text-white/40 hover:text-white'
            }`}
          >
            Do Re
          </button>
        </div>

        {/* Note Display / Status Badge */}
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-xl min-w-[130px] justify-center">
          <span className="text-[10px] text-white/40 font-mono">PITCH:</span>
          {lastPlayedNote ? (
            <span className="text-sm font-black text-[#ff4e00] flex items-center gap-1 animate-pulse tracking-wide">
              {NOTE_LABELS[labelMode][lastPlayedNote] || lastPlayedNote}
              <span className="text-[10px] text-white/40 font-mono font-normal">({lastPlayedNote})</span>
            </span>
          ) : (
            <span className="text-xs text-white/30 font-mono">READY</span>
          )}
        </div>

        {/* Zoom / Fit Toggle & Quick Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSettings((s) => ({ ...s, zoomKeys: !s.zoomKeys }))}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-xl border transition ${
              settings.zoomKeys
                ? 'bg-[#ff4e00] text-white border-white/20 shadow-lg shadow-[#ff4e00]/30'
                : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
            }`}
            title="ขยายแป้นพิมพ์สำหรับมือถือ"
          >
            {settings.zoomKeys ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{settings.zoomKeys ? 'ขนาดปกติ' : 'ขยายแป้น'}</span>
          </button>

          {(isLearnMode || isPlayingDemo) && (
            <button
              onClick={() => {
                if (isLearnMode) stopLearnMode();
                if (isPlayingDemo) stopDemo();
              }}
              className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-lg transition"
            >
              <Square className="w-3.5 h-3.5" />
              <span>หยุดเล่น</span>
            </button>
          )}
        </div>
      </div>

      {/* Practice / Learn Active Banner */}
      {isLearnMode && activeSong && (
        <div className="w-full bg-gradient-to-r from-[#ff4e00]/20 via-[#ff4e00]/10 to-[#ff4e00]/20 border border-[#ff4e00]/40 rounded-2xl p-2.5 flex items-center justify-between text-xs animate-fade-in shadow-xl">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#ff4e00] text-white flex items-center justify-center font-bold shadow-lg shadow-[#ff4e00]/30">
              <GraduationCap className="w-4 h-4" />
            </span>
            <div>
              <div className="font-extrabold text-white tracking-wide">
                ฝึกเล่นเพลง: {activeSong.title}
              </div>
              <div className="text-[11px] text-white/70">
                เคาะโน้ตถัดไป:{' '}
                <span className="font-black text-[#ff4e00] bg-white/10 px-2 py-0.5 rounded border border-[#ff4e00]/40">
                  "{currentTargetNote ? NOTE_LABELS[labelMode][currentTargetNote] || currentTargetNote : ''}"
                </span>{' '}
                ({learnIndex + 1}/{activeSong.notes.length})
              </div>
            </div>
          </div>

          <div className="w-24 bg-white/10 rounded-full h-2 border border-white/10 overflow-hidden">
            <div
              className="bg-[#ff4e00] h-full transition-all duration-300"
              style={{ width: `${(learnIndex / activeSong.notes.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Bell Lyra Instrument Container */}
      <div className="relative w-full flex-1 flex items-center justify-center my-auto py-1">
        
        {/* Traditional Scroll Frame Ornaments (Visual Identity) */}
        <div className="absolute inset-y-0 w-full max-w-[820px] flex justify-between pointer-events-none opacity-20 px-1">
          <div className="w-10 sm:w-16 h-full border-l-8 border-t-8 border-b-8 border-slate-400 rounded-l-full shadow-2xl"></div>
          <div className="w-10 sm:w-16 h-full border-r-8 border-t-8 border-b-8 border-slate-400 rounded-r-full shadow-2xl"></div>
        </div>

        {/* Lyra Frame Box */}
        <div
          className={`relative w-full max-w-[840px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 rounded-2xl sm:rounded-3xl p-2 sm:p-4 border-2 sm:border-4 border-slate-700 shadow-2xl flex flex-col justify-between overflow-x-auto transition-all duration-300 ${
            settings.zoomKeys ? 'overflow-x-auto' : ''
          }`}
        >
          {/* Felt Dampening Strips Underneath Keys */}
          <div className="absolute left-3 right-3 h-2 sm:h-3 bg-rose-800/90 rounded opacity-80 pointer-events-none shadow-md" style={{ top: '22%', zIndex: 5 }}></div>
          <div className="absolute left-3 right-3 h-2 sm:h-3 bg-rose-800/90 rounded opacity-80 pointer-events-none shadow-md" style={{ bottom: '22%', zIndex: 5 }}></div>

          {/* Upper Row (Accidentals / Golden Brass Bars) */}
          <div
            className={`flex justify-center w-full relative mb-1 sm:mb-2 z-10 ${
              settings.zoomKeys ? 'w-max min-w-full justify-start px-4 gap-1 sm:gap-1.5' : 'gap-[2px] sm:gap-1'
            }`}
          >
            {/* Upper row layout with exact alignment spacing */}
            <div className={`flex justify-center w-full ${settings.zoomKeys ? 'w-max min-w-full' : ''}`}>
              <div className="spacer flex-1 min-w-[12px] max-w-[28px]" />
              {naturalNotes.map((nat, i) => {
                const nextNat = naturalNotes[i + 1];
                const accidental = accidentalNotes.find(
                  (a) => a.freq > nat.freq && (nextNat ? a.freq < nextNat.freq : true)
                );

                if (accidental) {
                  const isTarget = currentTargetNote === accidental.note || highlightedNote === accidental.note;
                  const isActive = activeKeyName === accidental.note;

                  return (
                    <div
                      key={accidental.note}
                      ref={(el) => { keyRefs.current[accidental.note] = el; }}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        triggerKey(accidental.note, accidental.freq);
                      }}
                      className={`key metal-key accidental flex-1 select-none relative flex flex-col justify-end items-center pb-2 rounded-lg cursor-pointer transition-transform duration-75 shadow-lg border-t border-amber-200/40 ${
                        settings.zoomKeys ? 'min-w-[48px] max-w-[62px]' : 'min-w-[18px]'
                      } ${
                        isActive
                          ? 'translate-y-1 scale-95 bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 shadow-amber-500/50'
                          : isTarget
                          ? 'animate-pulse ring-4 ring-amber-400 bg-gradient-to-b from-yellow-200 via-amber-300 to-amber-500 shadow-lg shadow-amber-500/50'
                          : 'bg-gradient-to-b from-amber-200 via-yellow-400 to-yellow-600 hover:brightness-110'
                      }`}
                      style={{ height: '18vh', maxHeight: '140px', minHeight: '90px' }}
                    >
                      {/* Metal Screw Nodes */}
                      <div className="absolute top-2 w-1.5 h-1.5 rounded-full bg-slate-700/80 shadow-inner"></div>
                      <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-slate-700/80 shadow-inner"></div>

                      {/* Note Label */}
                      <span className="text-[10px] sm:text-xs font-black text-slate-900 pointer-events-none mb-2 drop-shadow-sm">
                        {NOTE_LABELS[labelMode][accidental.note] || accidental.note}
                      </span>

                      {/* Keyboard Shortcut Hint */}
                      {settings.showShortcuts && accidental.shortcut && (
                        <span className="text-[8px] absolute top-1 font-mono text-slate-800 opacity-60">
                          {accidental.shortcut}
                        </span>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`spacer-${i}`}
                      className={`spacer flex-1 ${settings.zoomKeys ? 'min-w-[48px] max-w-[62px]' : 'min-w-[18px]'}`}
                    />
                  );
                }
              })}
            </div>
          </div>

          {/* Lower Row (Naturals / Silver Aluminum Bars) */}
          <div
            className={`flex justify-center w-full relative z-10 ${
              settings.zoomKeys ? 'w-max min-w-full justify-start px-4 gap-1 sm:gap-1.5' : 'gap-[2px] sm:gap-1'
            }`}
          >
            {naturalNotes.map((nat) => {
              const isTarget = currentTargetNote === nat.note || highlightedNote === nat.note;
              const isActive = activeKeyName === nat.note;

              return (
                <div
                  key={nat.note}
                  ref={(el) => { keyRefs.current[nat.note] = el; }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    triggerKey(nat.note, nat.freq);
                  }}
                  className={`key metal-key natural flex-1 select-none relative flex flex-col justify-end items-center pb-3 rounded-lg cursor-pointer transition-transform duration-75 shadow-md border-t border-white/60 ${
                    settings.zoomKeys ? 'min-w-[48px] max-w-[62px]' : 'min-w-[20px]'
                  } ${
                    isActive
                      ? 'translate-y-1 scale-95 bg-gradient-to-b from-blue-100 via-slate-200 to-slate-400 shadow-blue-400/50'
                      : isTarget
                      ? 'animate-pulse ring-4 ring-amber-400 bg-gradient-to-b from-amber-100 via-yellow-100 to-amber-200 shadow-lg shadow-amber-500/50'
                      : 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-300 hover:brightness-105'
                  }`}
                  style={{ height: '24vh', maxHeight: '180px', minHeight: '110px' }}
                >
                  {/* Metal Screw Nodes */}
                  <div className="absolute top-2 w-1.5 h-1.5 rounded-full bg-slate-500 shadow-inner"></div>
                  <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-slate-500 shadow-inner"></div>

                  {/* Note Label */}
                  <span className="text-xs sm:text-sm font-black text-slate-800 pointer-events-none mb-2 drop-shadow-sm">
                    {NOTE_LABELS[labelMode][nat.note] || nat.note}
                  </span>

                  {/* Keyboard Shortcut Hint */}
                  {settings.showShortcuts && nat.shortcut && (
                    <span className="text-[9px] absolute top-1 font-mono text-slate-500 opacity-60">
                      {nat.shortcut}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
};
