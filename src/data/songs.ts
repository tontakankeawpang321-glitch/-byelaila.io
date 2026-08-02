import { Song } from '../types';

export const SONG_DATABASE: Song[] = [
  {
    id: 'mary',
    title: '1. หนูมาลี (Mary Had a Little Lamb)',
    category: 'เด็ก',
    difficulty: 'ง่าย',
    description: 'เพลงง่ายเหมาะสำหรับการเริ่มต้นฝึกเคาะเบลไลลา',
    notes: [
      { n: "E5", d: 400 }, { n: "D5", d: 400 }, { n: "C5", d: 400 }, { n: "D5", d: 400 },
      { n: "E5", d: 400 }, { n: "E5", d: 400 }, { n: "E5", d: 800 },
      { n: "D5", d: 400 }, { n: "D5", d: 400 }, { n: "D5", d: 800 },
      { n: "E5", d: 400 }, { n: "G5", d: 400 }, { n: "G5", d: 800 },
      { n: "E5", d: 400 }, { n: "D5", d: 400 }, { n: "C5", d: 400 }, { n: "D5", d: 400 },
      { n: "E5", d: 400 }, { n: "E5", d: 400 }, { n: "E5", d: 400 }, { n: "E5", d: 400 },
      { n: "D5", d: 400 }, { n: "D5", d: 400 }, { n: "E5", d: 400 }, { n: "D5", d: 400 },
      { n: "C5", d: 1000 }
    ]
  },
  {
    id: 'twinkle',
    title: '2. ดาวดวงน้อย (Twinkle Twinkle Little Star)',
    category: 'เด็ก',
    difficulty: 'ง่าย',
    description: 'เพลงคลาสสิกสากลทำนองสดใส ฟังสบาย',
    notes: [
      { n: "C5", d: 450 }, { n: "C5", d: 450 }, { n: "G5", d: 450 }, { n: "G5", d: 450 },
      { n: "A5", d: 450 }, { n: "A5", d: 450 }, { n: "G5", d: 900 },
      { n: "F5", d: 450 }, { n: "F5", d: 450 }, { n: "E5", d: 450 }, { n: "E5", d: 450 },
      { n: "D5", d: 450 }, { n: "D5", d: 450 }, { n: "C5", d: 900 },
      { n: "G5", d: 450 }, { n: "G5", d: 450 }, { n: "F5", d: 450 }, { n: "F5", d: 450 },
      { n: "E5", d: 450 }, { n: "E5", d: 450 }, { n: "D5", d: 900 },
      { n: "G5", d: 450 }, { n: "G5", d: 450 }, { n: "F5", d: 450 }, { n: "F5", d: 450 },
      { n: "E5", d: 450 }, { n: "E5", d: 450 }, { n: "D5", d: 900 },
      { n: "C5", d: 450 }, { n: "C5", d: 450 }, { n: "G5", d: 450 }, { n: "G5", d: 450 },
      { n: "A5", d: 450 }, { n: "A5", d: 450 }, { n: "G5", d: 900 }
    ]
  },
  {
    id: 'loykrathong',
    title: '3. ลอยกระทง (Loy Krathong Theme)',
    category: 'ไทย',
    difficulty: 'ปานกลาง',
    description: 'บทเพลงประเพณีไทยยอดฮิต ท่วงทำนองสนุกสนาน',
    notes: [
      { n: "A5", d: 350 }, { n: "C6", d: 350 }, { n: "D6", d: 350 }, { n: "D6", d: 550 },
      { n: "D6", d: 350 }, { n: "C6", d: 350 }, { n: "D6", d: 350 }, { n: "C6", d: 350 }, { n: "A5", d: 550 },
      { n: "A5", d: 350 }, { n: "C6", d: 350 }, { n: "D6", d: 350 }, { n: "D6", d: 550 },
      { n: "F6", d: 350 }, { n: "E6", d: 350 }, { n: "D6", d: 350 }, { n: "C6", d: 350 }, { n: "D6", d: 650 },
      { n: "F6", d: 450 }, { n: "F6", d: 450 }, { n: "F6", d: 450 }, { n: "E6", d: 350 }, { n: "D6", d: 350 }, { n: "C6", d: 450 },
      { n: "D6", d: 350 }, { n: "C6", d: 350 }, { n: "A5", d: 650 },
      { n: "G5", d: 350 }, { n: "A5", d: 350 }, { n: "C6", d: 650 },
      { n: "A5", d: 350 }, { n: "G5", d: 350 }, { n: "F5", d: 650 }
    ]
  },
  {
    id: 'jingle',
    title: '4. จิงเกิลเบลส์ (Jingle Bells)',
    category: 'สากล',
    difficulty: 'ปานกลาง',
    description: 'เพลงเทศกาลคริสต์มาสสุดครื้นเครง',
    notes: [
      { n: "E5", d: 300 }, { n: "E5", d: 300 }, { n: "E5", d: 600 },
      { n: "E5", d: 300 }, { n: "E5", d: 300 }, { n: "E5", d: 600 },
      { n: "E5", d: 300 }, { n: "G5", d: 300 }, { n: "C5", d: 450 }, { n: "D5", d: 150 }, { n: "E5", d: 900 },
      { n: "F5", d: 300 }, { n: "F5", d: 300 }, { n: "F5", d: 450 }, { n: "F5", d: 150 },
      { n: "F5", d: 300 }, { n: "E5", d: 300 }, { n: "E5", d: 300 }, { n: "E5", d: 150 }, { n: "E5", d: 150 },
      { n: "E5", d: 300 }, { n: "D5", d: 300 }, { n: "D5", d: 300 }, { n: "E5", d: 300 }, { n: "D5", d: 600 }, { n: "G5", d: 600 }
    ]
  },
  {
    id: 'kamman',
    title: '5. ค้างคาวกินกล้วย (Thai Classical)',
    category: 'ไทย',
    difficulty: 'ท้าทาย',
    description: 'เพลงไทยเดิมจังหวะเร็ว สนุกสนาน ท้าทายฝีมือ',
    notes: [
      { n: "G5", d: 300 }, { n: "A5", d: 300 }, { n: "C6", d: 300 }, { n: "D6", d: 300 },
      { n: "E6", d: 300 }, { n: "D6", d: 300 }, { n: "E6", d: 300 }, { n: "C6", d: 600 },
      { n: "E6", d: 300 }, { n: "D6", d: 300 }, { n: "C6", d: 300 }, { n: "A5", d: 300 },
      { n: "C6", d: 300 }, { n: "A5", d: 300 }, { n: "G5", d: 300 }, { n: "F5", d: 600 }
    ]
  },
  {
    id: 'laoduangdeuan',
    title: '6. ลาวดวงเดือน (Lao Duang Deuan)',
    category: 'ไทย',
    difficulty: 'ปานกลาง',
    description: 'เพลงไทยเดิมอมตะ อ่อนหวาน อ่อนโยนกังวาน',
    notes: [
      { n: "E5", d: 400 }, { n: "G5", d: 400 }, { n: "A5", d: 400 }, { n: "C6", d: 800 },
      { n: "D6", d: 400 }, { n: "C6", d: 400 }, { n: "A5", d: 400 }, { n: "G5", d: 800 },
      { n: "E5", d: 400 }, { n: "G5", d: 400 }, { n: "A5", d: 400 }, { n: "G5", d: 400 },
      { n: "E5", d: 400 }, { n: "D5", d: 400 }, { n: "C5", d: 1000 }
    ]
  },
  {
    id: 'hbd',
    title: '7. แฮปปี้เบิร์ธเดย์ (Happy Birthday)',
    category: 'สากล',
    difficulty: 'ง่าย',
    description: 'เพลงอวยพรวันเกิด ยอดนิยมทั่วโลก',
    notes: [
      { n: "C5", d: 300 }, { n: "C5", d: 150 }, { n: "D5", d: 450 }, { n: "C5", d: 450 },
      { n: "F5", d: 450 }, { n: "E5", d: 900 },
      { n: "C5", d: 300 }, { n: "C5", d: 150 }, { n: "D5", d: 450 }, { n: "C5", d: 450 },
      { n: "G5", d: 450 }, { n: "F5", d: 900 },
      { n: "C5", d: 300 }, { n: "C5", d: 150 }, { n: "C6", d: 450 }, { n: "A5", d: 450 },
      { n: "F5", d: 450 }, { n: "E5", d: 450 }, { n: "D5", d: 900 }
    ]
  }
];

export const BELL_LYRA_NOTES = [
  { note: "C5", freq: 523.25, type: "natural" as const, shortcut: "A" },
  { note: "C#5", freq: 554.37, type: "accidental" as const, shortcut: "W" },
  { note: "D5", freq: 587.33, type: "natural" as const, shortcut: "S" },
  { note: "D#5", freq: 622.25, type: "accidental" as const, shortcut: "E" },
  { note: "E5", freq: 659.25, type: "natural" as const, shortcut: "D" },
  { note: "F5", freq: 698.46, type: "natural" as const, shortcut: "F" },
  { note: "F#5", freq: 739.99, type: "accidental" as const, shortcut: "T" },
  { note: "G5", freq: 783.99, type: "natural" as const, shortcut: "G" },
  { note: "G#5", freq: 830.61, type: "accidental" as const, shortcut: "Y" },
  { note: "A5", freq: 880.00, type: "natural" as const, shortcut: "H" },
  { note: "A#5", freq: 932.33, type: "accidental" as const, shortcut: "U" },
  { note: "B5", freq: 987.77, type: "natural" as const, shortcut: "J" },
  { note: "C6", freq: 1046.50, type: "natural" as const, shortcut: "K" },
  { note: "C#6", freq: 1108.73, type: "accidental" as const, shortcut: "O" },
  { note: "D6", freq: 1174.66, type: "natural" as const, shortcut: "L" },
  { note: "D#6", freq: 1244.51, type: "accidental" as const, shortcut: "P" },
  { note: "E6", freq: 1318.51, type: "natural" as const, shortcut: ";" },
  { note: "F6", freq: 1396.91, type: "natural" as const, shortcut: "'" },
  { note: "F#6", freq: 1479.98, type: "accidental" as const, shortcut: "[" },
  { note: "G6", freq: 1567.98, type: "natural" as const, shortcut: "Z" },
  { note: "G#6", freq: 1661.22, type: "accidental" as const, shortcut: "]" },
  { note: "A6", freq: 1760.00, type: "natural" as const, shortcut: "X" },
  { note: "A#6", freq: 1864.66, type: "accidental" as const, shortcut: "\\" },
  { note: "B6", freq: 1975.53, type: "natural" as const, shortcut: "C" },
  { note: "C7", freq: 2093.00, type: "natural" as const, shortcut: "V" }
];

export const NOTE_LABELS = {
  eng: {
    "C5": "C", "C#5": "C#", "D5": "D", "D#5": "D#", "E5": "E", "F5": "F", "F#5": "F#", "G5": "G", "G#5": "G#", "A5": "A", "A#5": "A#", "B5": "B",
    "C6": "C", "C#6": "C#", "D6": "D", "D#6": "D#", "E6": "E", "F6": "F", "F#6": "F#", "G6": "G", "G#6": "G#", "A6": "A", "A#6": "A#", "B6": "B", "C7": "C"
  },
  thai_full: {
    "C5": "โด", "C#5": "โด#", "D5": "เร", "D#5": "เร#", "E5": "มี", "F5": "ฟา", "F#5": "ฟา#", "G5": "ซอล", "G#5": "ซอล#", "A5": "ลา", "A#5": "ลา#", "B5": "ที",
    "C6": "โด", "C#6": "โด#", "D6": "เร", "D#6": "เร#", "E6": "มี", "F6": "ฟา", "F#6": "ฟา#", "G6": "ซอล", "G#6": "ซอล#", "A6": "ลา", "A#6": "ลา#", "B6": "ที", "C7": "โด"
  },
  thai_short: {
    "C5": "ด", "C#5": "ด#", "D5": "ร", "D#5": "ร#", "E5": "ม", "F5": "ฟ", "F#5": "ฟ#", "G5": "ซ", "G#5": "ซ#", "A5": "ล", "A#5": "ล#", "B5": "ท",
    "C6": "ด", "C#6": "ด#", "D6": "ร", "D#6": "ร#", "E6": "ม", "F6": "ฟ", "F#6": "ฟ#", "G6": "ซ", "G#6": "ซ#", "A6": "ล", "A#6": "ล#", "B6": "ท", "C7": "ด"
  },
  solfege: {
    "C5": "Do", "C#5": "Do#", "D5": "Re", "D#5": "Re#", "E5": "Mi", "F5": "Fa", "F#5": "Fa#", "G5": "Sol", "G#5": "Sol#", "A5": "La", "A#5": "La#", "B5": "Si",
    "C6": "Do", "C#6": "Do#", "D6": "Re", "D#6": "Re#", "E6": "Mi", "F6": "Fa", "F#6": "Fa#", "G6": "Sol", "G#6": "Sol#", "A6": "La", "A#6": "La#", "B6": "Si", "C7": "Do"
  },
  none: {
    "C5": "", "C#5": "", "D5": "", "D#5": "", "E5": "", "F5": "", "F#5": "", "G5": "", "G#5": "", "A5": "", "A#5": "", "B5": "",
    "C6": "", "C#6": "", "D6": "", "D#6": "", "E6": "", "F6": "", "F#6": "", "G6": "", "G#6": "", "A6": "", "A#6": "", "B6": "", "C7": ""
  }
};
