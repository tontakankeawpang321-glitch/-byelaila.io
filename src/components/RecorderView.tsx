import React, { useState, useEffect } from 'react';
import { Recording } from '../types';
import { startRecording, stopRecording } from '../utils/audioEngine';
import { Mic, Square, Download, Trash2, Play, Volume2, Radio } from 'lucide-react';

export const RecorderView: React.FC = () => {
  const [isRecordingState, setIsRecordingState] = useState<boolean>(false);
  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const [recordings, setRecordings] = useState<Recording[]>([]);

  // Timer interval for live recording
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecordingState) {
      interval = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecordingState]);

  const handleToggleRecord = async () => {
    if (isRecordingState) {
      // Stop Recording
      const blob = await stopRecording();
      setIsRecordingState(false);

      if (blob && blob.size > 0) {
        const url = URL.createObjectURL(blob);
        const newRec: Recording = {
          id: Date.now().toString(),
          name: `บันทึกเสียงเบลไลลา #${recordings.length + 1}`,
          url,
          blob,
          duration: recordSeconds,
          createdAt: new Date(),
        };
        setRecordings((prev) => [newRec, ...prev]);
      }
    } else {
      // Start Recording
      const success = startRecording();
      if (success) {
        setIsRecordingState(true);
      } else {
        alert("กรุณาเปิดการใช้งานเสียงก่อนกดเริ่มบันทึกครับ");
      }
    }
  };

  const deleteRecording = (id: string) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-5 text-white animate-fade-in">
      
      {/* View Header */}
      <div className="border-b border-white/10 pb-3">
        <h2 className="text-xl font-extrabold text-[#ff4e00] flex items-center gap-2 tracking-wider uppercase">
          <Mic className="w-5 h-5" />
          <span>หน้าบันทึกเสียงการแสดง (RECORDING STUDIO)</span>
        </h2>
        <p className="text-xs text-white/40 mt-0.5">
          อัดเสียงการเคาะเพลงสดของคุณ และส่งออกเป็นไฟล์เสียงคุณภาพสูงได้ทันที
        </p>
      </div>

      {/* Main Studio Control Deck */}
      <div className="bg-[#070709]/80 border border-white/10 backdrop-blur rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-center shadow-2xl">
        
        {/* Animated Recording Pulser */}
        <div className="relative">
          {isRecordingState && (
            <div className="absolute -inset-4 bg-[#ff4e00]/30 rounded-full animate-ping pointer-events-none"></div>
          )}
          <button
            onClick={handleToggleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl transition-all duration-300 shadow-2xl active:scale-95 border border-white/20 ${
              isRecordingState
                ? 'bg-rose-600 hover:bg-rose-500 text-white ring-8 ring-rose-500/30 shadow-rose-600/40'
                : 'bg-[#ff4e00] hover:bg-[#ff4e00]/90 text-white ring-8 ring-white/5 shadow-lg shadow-[#ff4e00]/30'
            }`}
          >
            {isRecordingState ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
          </button>
        </div>

        {/* Live Status & Timer */}
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-white/40 flex items-center justify-center gap-2">
            {isRecordingState ? (
              <span className="text-[#ff4e00] flex items-center gap-1.5 animate-pulse">
                <Radio className="w-4 h-4" /> กำลังบันทึกเสียงสด...
              </span>
            ) : (
              <span>พร้อมบันทึกเสียง</span>
            )}
          </div>
          <div className="text-4xl font-mono font-extrabold text-white mt-1 tracking-widest">
            {formatTime(recordSeconds)}
          </div>
        </div>

        <p className="text-xs text-white/40 max-w-sm">
          {isRecordingState
            ? 'สลับไปหน้า "เครื่องเล่น" เพื่อเคาะโน้ตดนตรี จากนั้นกดปุ่มหยุดเพื่อเซฟเพลง'
            : 'กดปุ่มไมโครโฟนสีแดงด้านบนเพื่อเริ่มการอัดเสียง'}
        </p>
      </div>

      {/* Recorded Tracks List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-[#ff4e00] uppercase tracking-wider flex items-center gap-1.5">
          <Volume2 className="w-4 h-4" /> รายการไฟล์ที่บันทึกไว้ ({recordings.length})
        </h3>

        {recordings.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 text-center text-white/30 text-xs font-mono">
            ยังไม่มีรายการบันทึกเสียงในขณะนี้
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {recordings.map((rec) => (
              <div
                key={rec.id}
                className="bg-[#070709]/80 border border-white/10 rounded-2xl p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xl"
              >
                <div>
                  <div className="font-extrabold text-sm text-white tracking-wide">{rec.name}</div>
                  <div className="text-[11px] font-mono text-white/40 flex items-center gap-2 mt-0.5">
                    <span>LENGTH: {formatTime(rec.duration)}</span>
                    <span>•</span>
                    <span>{rec.createdAt.toLocaleTimeString('th-TH')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <audio controls src={rec.url} className="h-8 max-w-[200px]" />

                  <a
                    href={rec.url}
                    download={`${rec.name}.webm`}
                    className="bg-[#ff4e00] hover:bg-[#ff4e00]/90 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition shadow-lg shadow-[#ff4e00]/30 border border-white/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">โหลด</span>
                  </a>

                  <button
                    onClick={() => deleteRecording(rec.id)}
                    className="bg-white/5 hover:bg-rose-950 hover:text-rose-400 text-white/40 p-2 rounded-xl border border-white/10 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
