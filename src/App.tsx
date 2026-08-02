import React, { useState, useEffect, useRef } from 'react';
import { TabType, LabelMode, SoundSettings, Song } from './types';
import { SONG_DATABASE, BELL_LYRA_NOTES } from './data/songs';
import { initAudioEngine, playNote, updateEngineSettings } from './utils/audioEngine';
import { Navbar } from './components/Navbar';
import { PlayerView } from './components/PlayerView';
import { SoundSettingsView } from './components/SoundSettingsView';
import { SongsView } from './components/SongsView';
import { RecorderView } from './components/RecorderView';
import { AwardModal } from './components/AwardModal';
import { AudioUnlockOverlay } from './components/AudioUnlockOverlay';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('player');
  const [labelMode, setLabelMode] = useState<LabelMode>('eng');
  const [audioReady, setAudioReady] = useState<boolean>(false);

  // Sound Engine Settings
  const [settings, setSettings] = useState<SoundSettings>({
    volume: 0.8,
    decay: 2.8,
    brightness: 0.4,
    reverbWet: 0.35,
    malletType: 'hard',
    showShortcuts: true,
    zoomKeys: false,
    isMono: true,
  });

  // Auto Play Demo State
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);
  const [currentDemoSong, setCurrentDemoSong] = useState<Song | null>(null);
  const [currentDemoIndex, setCurrentDemoIndex] = useState<number>(0);
  const [highlightedNote, setHighlightedNote] = useState<string | null>(null);
  const demoTimerIdsRef = useRef<NodeJS.Timeout[]>([]);

  // Practice / Learn Mode State
  const [isLearnMode, setIsLearnMode] = useState<boolean>(false);
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [learnIndex, setLearnIndex] = useState<number>(0);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [showAwardModal, setShowAwardModal] = useState<boolean>(false);

  // Sync sound settings with audio engine
  useEffect(() => {
    updateEngineSettings(settings);
  }, [settings]);

  // Unlock AudioContext on user action
  const unlockAudio = () => {
    initAudioEngine(settings);
    setAudioReady(true);
    // Play subtle welcome arpeggio
    playNote(523.25, settings);
    setTimeout(() => playNote(659.25, settings), 120);
    setTimeout(() => playNote(783.99, settings), 240);
  };

  // Demo Auto-Play Engine
  const stopDemo = () => {
    demoTimerIdsRef.current.forEach((id) => clearTimeout(id));
    demoTimerIdsRef.current = [];
    setIsPlayingDemo(false);
    setCurrentDemoSong(null);
    setCurrentDemoIndex(0);
    setHighlightedNote(null);
  };

  const startDemo = (song: Song, tempoMultiplier: number = 1.0) => {
    stopDemo();
    stopLearnMode();

    if (!audioReady) unlockAudio();

    setIsPlayingDemo(true);
    setCurrentDemoSong(song);
    setCurrentDemoIndex(0);

    let accumulatedMs = 0;

    song.notes.forEach((step, idx) => {
      const adjustedDuration = Math.max(100, step.d / tempoMultiplier);

      const timerId = setTimeout(() => {
        setCurrentDemoIndex(idx);
        setHighlightedNote(step.n);

        // Find freq
        const noteData = BELL_LYRA_NOTES.find((b) => b.note === step.n);
        if (noteData) {
          playNote(noteData.freq, settings);
        }

        if (idx === song.notes.length - 1) {
          setTimeout(() => {
            stopDemo();
          }, adjustedDuration + 300);
        }
      }, accumulatedMs);

      demoTimerIdsRef.current.push(timerId);
      accumulatedMs += adjustedDuration;
    });
  };

  // Learn Mode Handler
  const startLearn = (song: Song) => {
    stopDemo();

    if (!audioReady) unlockAudio();

    setIsLearnMode(true);
    setActiveSong(song);
    setLearnIndex(0);
    setErrorsCount(0);
    setShowAwardModal(false);

    // Automatically switch to Player view so user can tap the keys
    setActiveTab('player');
  };

  const stopLearnMode = () => {
    setIsLearnMode(false);
    setActiveSong(null);
    setLearnIndex(0);
    setErrorsCount(0);
    setShowAwardModal(false);
  };

  const handleUserKeyPressInLearnMode = (noteName: string) => {
    if (!isLearnMode || !activeSong) return;

    const currentTarget = activeSong.notes[learnIndex];
    if (!currentTarget) return;

    if (noteName === currentTarget.n) {
      // Correct note
      const nextIdx = learnIndex + 1;
      if (nextIdx >= activeSong.notes.length) {
        // Song Completed!
        setShowAwardModal(true);
        setIsLearnMode(false);
      } else {
        setLearnIndex(nextIdx);
      }
    } else {
      // Mistake
      setErrorsCount((prev) => prev + 1);
    }
  };

  // Computer Physical Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      // Don't capture when typing in inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      const pressedKey = e.key.toUpperCase();
      const matchedNote = BELL_LYRA_NOTES.find((n) => n.shortcut === pressedKey);

      if (matchedNote) {
        if (!audioReady) unlockAudio();

        playNote(matchedNote.freq, settings);

        if (isLearnMode) {
          handleUserKeyPressInLearnMode(matchedNote.note);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [audioReady, isLearnMode, learnIndex, activeSong, settings]);

  return (
    <div className="min-h-screen text-white flex flex-col font-sans select-none overflow-x-hidden relative">
      
      {/* First-time Audio Unlock Overlay */}
      {!audioReady && <AudioUnlockOverlay onUnlock={unlockAudio} />}

      {/* Main Top Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        labelMode={labelMode}
        setLabelMode={setLabelMode}
        audioReady={audioReady}
        unlockAudio={unlockAudio}
      />

      {/* Main Screen Content View */}
      <main className="flex-1 flex flex-col justify-start w-full relative z-10 pb-6">
        {activeTab === 'player' && (
          <PlayerView
            labelMode={labelMode}
            setLabelMode={setLabelMode}
            settings={settings}
            setSettings={setSettings}
            activeSong={activeSong}
            isLearnMode={isLearnMode}
            learnIndex={learnIndex}
            onUserKeyPress={handleUserKeyPressInLearnMode}
            stopLearnMode={stopLearnMode}
            isPlayingDemo={isPlayingDemo}
            stopDemo={stopDemo}
            highlightedNote={highlightedNote}
          />
        )}

        {activeTab === 'songs' && (
          <SongsView
            labelMode={labelMode}
            onStartDemo={startDemo}
            onStartLearn={startLearn}
            isPlayingDemo={isPlayingDemo}
            currentDemoSong={currentDemoSong}
            currentDemoIndex={currentDemoIndex}
            stopDemo={stopDemo}
            isLearnMode={isLearnMode}
            activeSong={activeSong}
          />
        )}

        {activeTab === 'settings' && (
          <SoundSettingsView
            settings={settings}
            setSettings={setSettings}
            labelMode={labelMode}
            setLabelMode={setLabelMode}
          />
        )}

        {activeTab === 'recorder' && <RecorderView />}
      </main>

      {/* Award Modal for Practice Completion */}
      {showAwardModal && activeSong && (
        <AwardModal
          song={activeSong}
          errorsCount={errorsCount}
          onClose={stopLearnMode}
          onRestart={() => startLearn(activeSong)}
        />
      )}

      {/* Subtle Footer */}
      <footer className="w-full border-t border-white/5 py-2.5 text-center text-[11px] text-white/30 z-10 font-mono tracking-wider">
        BELL LYRA MASTER • HIGH FIDELITY SIMULATOR
      </footer>

    </div>
  );
}
