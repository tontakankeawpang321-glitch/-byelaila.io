import React, { useState } from 'react';
import { SONG_DATABASE, NOTE_LABELS } from '../data/songs';
import { Song, LabelMode } from '../types';
import { Play, GraduationCap, Square, FastForward, Music, Sparkles } from 'lucide-react';

interface SongsViewProps {
  labelMode: LabelMode;
  onStartDemo: (song: Song, tempoMultiplier: number) => void;
  onStartLearn: (song: Song) => void;
  isPlayingDemo: boolean;
  currentDemoSong: Song | null;
  currentDemoIndex: number;
  stopDemo: () => void;
  isLearnMode: boolean;
  activeSong: Song | null;
}

export const SongsView: React.FC<SongsViewProps> = ({
  labelMode,
  onStartDemo,
  onStartLearn,
  isPlayingDemo,
  currentDemoSong,
  currentDemoIndex,
  stopDemo,
  isLearnMode,
  activeSong,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [tempo, setTempo] = useState<number>(1.0);

  const categories = ['ทั้งหมด', 'ไทย', 'สากล', 'เด็ก'];

  const filteredSongs = SONG_DATABASE.filter((s) => {
    if (selectedCategory === 'ทั้งหมด') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-5 text-white animate-fade-in">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3">
        <div>
          <h2 className="text-xl font-extrabold text-[#ff4e00] flex items-center gap-2 tracking-wider uppercase">
            <Music className="w-5 h-5" />
            <span>คลังบทเพลงสาธิต & โหมดฝึกเล่น (SONGS & LEARN)</span>
          </h2>
          <p className="text-xs text-white/40 mt-0.5">
            ฟังตัวอย่างบทเพลงสาธิต หรือฝึกเคาะตามคำแนะนำทีละตัวโน้ตอย่างง่ายดาย
          </p>
        </div>

        {/* Speed / Tempo Selector */}
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 p-1.5 rounded-xl text-xs">
          <FastForward className="w-3.5 h-3.5 text-[#ff4e00] ml-1" />
          <span className="text-white/40 font-mono text-[11px]">TEMPO:</span>
          {[0.5, 0.8, 1.0, 1.25].map((s) => (
            <button
              key={s}
              onClick={() => setTempo(s)}
              className={`px-2 py-0.5 rounded-lg font-mono font-bold text-[11px] transition ${
                tempo === s ? 'bg-[#ff4e00] text-white shadow-lg shadow-[#ff4e00]/30' : 'text-white/40 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Active Demo Playing Banner */}
      {isPlayingDemo && currentDemoSong && (
        <div className="bg-gradient-to-r from-[#ff4e00]/20 via-[#070709] to-[#ff4e00]/20 border border-[#ff4e00]/40 rounded-2xl p-3.5 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-xl animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff4e00] text-white flex items-center justify-center font-black text-lg shadow-lg shadow-[#ff4e00]/30 border border-white/20">
              ▶️
            </div>
            <div>
              <div className="text-xs text-[#ff4e00] font-mono font-bold uppercase tracking-wider">PLAYING DEMO...</div>
              <div className="text-sm font-extrabold text-white">{currentDemoSong.title}</div>
              <div className="text-[11px] text-white/70 mt-0.5">
                ตัวโน้ตที่เคาะขณะนี้:{' '}
                <span className="font-black text-[#ff4e00] bg-white/10 px-2 py-0.5 rounded border border-[#ff4e00]/40">
                  {currentDemoSong.notes[currentDemoIndex]?.n
                    ? NOTE_LABELS[labelMode][currentDemoSong.notes[currentDemoIndex].n] || currentDemoSong.notes[currentDemoIndex].n
                    : '-'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={stopDemo}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transition"
          >
            <Square className="w-4 h-4" />
            <span>หยุดเล่น</span>
          </button>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#ff4e00] text-white shadow-lg shadow-[#ff4e00]/30 border border-white/20'
                : 'bg-white/[0.03] border border-white/10 text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredSongs.map((song) => {
          const isThisDemo = isPlayingDemo && currentDemoSong?.id === song.id;
          const isThisLearn = isLearnMode && activeSong?.id === song.id;

          return (
            <div
              key={song.id}
              className={`bg-[#070709]/80 border backdrop-blur rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all duration-200 hover:border-[#ff4e00]/50 shadow-xl ${
                isThisDemo || isThisLearn ? 'border-[#ff4e00] ring-2 ring-[#ff4e00]/30' : 'border-white/10'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="text-sm font-extrabold text-white leading-snug tracking-wide">{song.title}</h3>
                  <span
                    className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border ${
                      song.difficulty === 'ง่าย'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : song.difficulty === 'ปานกลาง'
                        ? 'bg-[#ff4e00]/20 text-[#ff4e00] border-[#ff4e00]/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {song.difficulty}
                  </span>
                </div>

                <p className="text-xs text-white/50 leading-relaxed mb-2">{song.description}</p>

                {/* Note breakdown preview line */}
                <div className="flex flex-wrap gap-1 bg-white/[0.03] p-2 rounded-xl border border-white/5 text-[10px] font-mono text-white/70">
                  <span className="text-[#ff4e00] font-bold mr-1">NOTES:</span>
                  {song.notes.slice(0, 8).map((step, idx) => (
                    <span key={idx} className="bg-white/10 px-1.5 py-0.5 rounded text-white">
                      {NOTE_LABELS[labelMode][step.n] || step.n}
                    </span>
                  ))}
                  {song.notes.length > 8 && (
                    <span className="text-white/30 self-center">+{song.notes.length - 8}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                <button
                  onClick={() => onStartDemo(song, tempo)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow ${
                    isThisDemo
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {isThisDemo ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isThisDemo ? 'หยุดออโต้' : 'เล่นสาธิต'}</span>
                </button>

                <button
                  onClick={() => onStartLearn(song)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-lg ${
                    isThisLearn
                      ? 'bg-[#ff4e00] text-white border border-white/20'
                      : 'bg-[#ff4e00] hover:bg-[#ff4e00]/90 text-white border border-white/20 shadow-[#ff4e00]/30'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{isThisLearn ? 'กำลังฝึกเล่น' : 'ฝึกเล่นด้วยตนเอง'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
