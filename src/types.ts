export type LabelMode = 'eng' | 'thai_full' | 'thai_short' | 'solfege' | 'none';

export type TabType = 'player' | 'songs' | 'settings' | 'recorder';

export type MalletType = 'hard' | 'soft' | 'brass' | 'wood';

export interface NoteData {
  note: string;
  freq: number;
  type: 'natural' | 'accidental';
  shortcut?: string;
}

export interface SongStep {
  n: string; // note name e.g. "C5"
  d: number; // duration in ms
}

export interface Song {
  id: string;
  title: string;
  category: 'ไทย' | 'สากล' | 'เด็ก';
  difficulty: 'ง่าย' | 'ปานกลาง' | 'ท้าทาย';
  notes: SongStep[];
  description?: string;
}

export interface SoundSettings {
  volume: number;
  decay: number;
  brightness: number;
  reverbWet: number;
  malletType: MalletType;
  showShortcuts: boolean;
  zoomKeys: boolean;
  isMono: boolean;
}

export interface Recording {
  id: string;
  name: string;
  url: string;
  blob: Blob;
  duration: number;
  createdAt: Date;
}
