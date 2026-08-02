import React from 'react';
import { SoundSettings, LabelMode, MalletType } from '../types';
import { playNote } from '../utils/audioEngine';
import { Volume2, Sliders, Sparkles, Keyboard, Music2, CheckCircle2 } from 'lucide-react';

interface SoundSettingsViewProps {
  settings: SoundSettings;
  setSettings: React.Dispatch<React.SetStateAction<SoundSettings>>;
  labelMode: LabelMode;
  setLabelMode: (mode: LabelMode) => void;
}

export const SoundSettingsView: React.FC<SoundSettingsViewProps> = ({
  settings,
  setSettings,
  labelMode,
  setLabelMode,
}) => {
  // Preset Audio Configurations
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'marching':
        setSettings((s) => ({
          ...s,
          volume: 0.85,
          decay: 2.5,
          brightness: 0.6,
          reverbWet: 0.25,
          malletType: 'hard',
        }));
        break;
      case 'crystal':
        setSettings((s) => ({
          ...s,
          volume: 0.8,
          decay: 3.5,
          brightness: 0.8,
          reverbWet: 0.45,
          malletType: 'brass',
        }));
        break;
      case 'soft':
        setSettings((s) => ({
          ...s,
          volume: 0.75,
          decay: 3.0,
          brightness: 0.25,
          reverbWet: 0.5,
          malletType: 'soft',
        }));
        break;
      case 'wood':
        setSettings((s) => ({
          ...s,
          volume: 0.8,
          decay: 2.0,
          brightness: 0.4,
          reverbWet: 0.2,
          malletType: 'wood',
        }));
        break;
    }
    // Test pitch
    playNote(1046.50, settings); // C6
  };

  const mallets: { type: MalletType; label: string; desc: string; icon: string }[] = [
    { type: 'hard', label: 'ยางแข็ง (Hard Rubber)', desc: 'เสียงคมชัดมาตรฐาน วงดุริยางค์', icon: '🔴' },
    { type: 'brass', label: 'หัวทองเหลือง (Brass Screw)', desc: 'เสียงใสกังวาน ประกายแหลมชัด', icon: '🟡' },
    { type: 'soft', label: 'หัวสักหลาดนุ่ม (Soft Felt)', desc: 'เสียงนุ่มนวล กลมกล่อม อ่อนหวาน', icon: '🟢' },
    { type: 'wood', label: 'ไม้เนื้อแข็ง (Hard Wood)', desc: 'เสียงกระชับ อบอุ่น สไตล์คลาสสิก', icon: '🟤' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-5 text-white animate-fade-in">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3">
        <div>
          <h2 className="text-xl font-extrabold text-[#ff4e00] flex items-center gap-2 tracking-wider uppercase">
            <Sliders className="w-5 h-5" />
            <span>หน้าปรับแต่งเสียงสังเคราะห์ (SOUND ENGINE)</span>
          </h2>
          <p className="text-xs text-white/40 mt-0.5">
            ปรับแต่งพารามิเตอร์คลื่นเสียง คุณสมบัติไม้เคาะ และอะคูสติกฮอลล์ตามจินตนาการ
          </p>
        </div>

        <button
          onClick={() => playNote(1046.50, settings)}
          className="bg-[#ff4e00] hover:bg-[#ff4e00]/90 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg shadow-[#ff4e00]/30 border border-white/20 flex items-center gap-1.5 transition active:scale-95"
        >
          <Volume2 className="w-4 h-4" />
          <span>ลองฟังเสียงทดสอบ (Test Note)</span>
        </button>
      </div>

      {/* Preset Cards Grid */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-[#ff4e00] uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> ชุดเสียงสำเร็จรูป (PRESET PROFILES)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => applyPreset('marching')}
            className="bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 p-3 rounded-2xl text-left transition hover:border-[#ff4e00]/50 flex flex-col justify-between group shadow-lg"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">🎺</div>
            <div>
              <div className="font-bold text-xs text-white">ผืนโลหะวงดุริยางค์</div>
              <div className="text-[10px] text-white/40 mt-0.5 font-mono">Marching Band</div>
            </div>
          </button>

          <button
            onClick={() => applyPreset('crystal')}
            className="bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 p-3 rounded-2xl text-left transition hover:border-[#ff4e00]/50 flex flex-col justify-between group shadow-lg"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">💎</div>
            <div>
              <div className="font-bold text-xs text-white">คริสตัลกังวานใส</div>
              <div className="text-[10px] text-white/40 mt-0.5 font-mono">Crystal Chime</div>
            </div>
          </button>

          <button
            onClick={() => applyPreset('soft')}
            className="bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 p-3 rounded-2xl text-left transition hover:border-[#ff4e00]/50 flex flex-col justify-between group shadow-lg"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">🎻</div>
            <div>
              <div className="font-bold text-xs text-white">เสียงนุ่มนวลคอนเสิร์ต</div>
              <div className="text-[10px] text-white/40 mt-0.5 font-mono">Soft Orchestral</div>
            </div>
          </button>

          <button
            onClick={() => applyPreset('wood')}
            className="bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 p-3 rounded-2xl text-left transition hover:border-[#ff4e00]/50 flex flex-col justify-between group shadow-lg"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">🪵</div>
            <div>
              <div className="font-bold text-xs text-white">ไม้และโลหะผสม</div>
              <div className="text-[10px] text-white/40 mt-0.5 font-mono">Wooden Mallet</div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Acoustic Controls Panel */}
        <div className="bg-[#070709]/80 border border-white/10 backdrop-blur rounded-2xl p-4 flex flex-col gap-4 shadow-xl">
          <h3 className="text-xs font-bold text-[#ff4e00] uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2">
            <Music2 className="w-4 h-4" /> พารามิเตอร์คลื่นเสียง & อะคูสติก
          </h3>

          {/* Volume Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 font-medium">ระดับความดังเสียง (Master Volume):</span>
              <span className="font-black font-mono text-[#ff4e00]">{Math.round(settings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={settings.volume}
              onChange={(e) => setSettings((s) => ({ ...s, volume: parseFloat(e.target.value) }))}
              className="accent-[#ff4e00] bg-white/10 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Reverb Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 font-medium">ความกังวานมิติห้อง (Hall Reverb Mix):</span>
              <span className="font-black font-mono text-[#ff4e00]">{Math.round(settings.reverbWet * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={settings.reverbWet}
              onChange={(e) => setSettings((s) => ({ ...s, reverbWet: parseFloat(e.target.value) }))}
              className="accent-[#ff4e00] bg-white/10 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Decay Time Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 font-medium">ความยาวหางเสียง (Decay Time):</span>
              <span className="font-black font-mono text-[#ff4e00]">{settings.decay}s</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={settings.decay}
              onChange={(e) => setSettings((s) => ({ ...s, decay: parseFloat(e.target.value) }))}
              className="accent-[#ff4e00] bg-white/10 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Brightness Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 font-medium">ความใสกังวานแหลม (Overtone Brightness):</span>
              <span className="font-black font-mono text-[#ff4e00]">{Math.round(settings.brightness * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={settings.brightness}
              onChange={(e) => setSettings((s) => ({ ...s, brightness: parseFloat(e.target.value) }))}
              className="accent-[#ff4e00] bg-white/10 rounded-lg cursor-pointer h-2"
            />
          </div>
        </div>

        {/* Mallet Material Selection */}
        <div className="bg-[#070709]/80 border border-white/10 backdrop-blur rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
          <h3 className="text-xs font-bold text-[#ff4e00] uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2">
            <span>🔨</span> หัวไม้เคาะเบลไลลา (MALLET MATERIAL)
          </h3>

          <div className="grid grid-cols-1 gap-2">
            {mallets.map((m) => {
              const isSelected = settings.malletType === m.type;
              return (
                <button
                  key={m.type}
                  onClick={() => {
                    setSettings((s) => ({ ...s, malletType: m.type }));
                    playNote(1046.50, { ...settings, malletType: m.type });
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                    isSelected
                      ? 'bg-[#ff4e00]/15 border-[#ff4e00] text-white shadow-lg'
                      : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{m.icon}</span>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        {m.label}
                      </div>
                      <div className="text-[10px] text-white/40">{m.desc}</div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#ff4e00]" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Interface Preferences */}
      <div className="bg-[#070709]/80 border border-white/10 backdrop-blur rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
        <h3 className="text-xs font-bold text-[#ff4e00] uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2">
          <Keyboard className="w-4 h-4" /> การแสดงผลและแป้นคีย์บอร์ด
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Label Mode Switcher */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-white/70">รูปแบบป้ายชื่อตัวโน้ตบนแผ่นโลหะ:</span>
            <div className="grid grid-cols-2 gap-1.5 bg-white/[0.03] p-1.5 rounded-xl border border-white/5">
              <button
                onClick={() => setLabelMode('eng')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold font-mono transition ${
                  labelMode === 'eng' ? 'bg-[#ff4e00] text-white shadow' : 'text-white/40 hover:bg-white/5'
                }`}
              >
                C D E (สากล)
              </button>
              <button
                onClick={() => setLabelMode('thai_full')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition ${
                  labelMode === 'thai_full' ? 'bg-[#ff4e00] text-white shadow' : 'text-white/40 hover:bg-white/5'
                }`}
              >
                โด เร มี (ไทยเต็ม)
              </button>
              <button
                onClick={() => setLabelMode('thai_short')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition ${
                  labelMode === 'thai_short' ? 'bg-[#ff4e00] text-white shadow' : 'text-white/40 hover:bg-white/5'
                }`}
              >
                ด ร ม (ไทยย่อ)
              </button>
              <button
                onClick={() => setLabelMode('solfege')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition ${
                  labelMode === 'solfege' ? 'bg-[#ff4e00] text-white shadow' : 'text-white/40 hover:bg-white/5'
                }`}
              >
                Do Re Mi (Solfege)
              </button>
            </div>
          </div>

          {/* Show Keyboard Shortcuts Checkbox & Mono Output Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label className="flex items-center gap-2.5 bg-white/[0.03] p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/5 transition">
              <input
                type="checkbox"
                checked={settings.showShortcuts}
                onChange={(e) => setSettings((s) => ({ ...s, showShortcuts: e.target.checked }))}
                className="w-4 h-4 accent-[#ff4e00] rounded cursor-pointer"
              />
              <div className="text-xs">
                <div className="font-bold text-white">แสดงปุ่มลัดคีย์บอร์ด (Keyboard Shortcuts)</div>
                <div className="text-[10px] text-white/40">สำหรับกดเคาะบนคอมพิวเตอร์ (A, S, D, F...)</div>
              </div>
            </label>

            <label className="flex items-center gap-2.5 bg-white/[0.03] p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/5 transition">
              <input
                type="checkbox"
                checked={settings.isMono}
                onChange={(e) => setSettings((s) => ({ ...s, isMono: e.target.checked }))}
                className="w-4 h-4 accent-[#ff4e00] rounded cursor-pointer"
              />
              <div className="text-xs">
                <div className="font-bold text-white">โหมดเสียงโมโน (Mono Audio Output)</div>
                <div className="text-[10px] text-white/40">รองรับลำโพงมือถือ เสียงดังฟังชัดกังวาน ไม่เฟสหาย</div>
              </div>
            </label>
          </div>

        </div>
      </div>

    </div>
  );
};
