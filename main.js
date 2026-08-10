/* ============================================================
   NΞXXØ PLAY — main.js
   Complete music streaming engine (no backend required)
   Owner: NEXXO TECH  •  WhatsApp: +234 905 190 6943
   ============================================================ */
'use strict';

/* ============================================================
   1. API CONFIG — future music API support
   ------------------------------------------------------------
   To connect a real music API later:
     1. Set enabled: true
     2. Set endpoint to your API base URL
     3. The API must return JSON in this shape:
        { songs: [{id,title,artist,album,genre,year,cover,audio,duration}],
          artists: [{id,name,image}],
          albums:  [{id,title,artist,year,cover,songIds}] }
   If the API fails or is disabled, the local library is used.
   NEVER hardcode secret API keys in frontend code.
   ============================================================ */
const API_CONFIG = {
  enabled: false,
  endpoint: "" // e.g. "https://api.yourmusicprovider.com/v1"
};

/* ============================================================
   2. STORAGE KEYS
   ============================================================ */
const K = {
  favs: 'nx_favorites',
  playlists: 'nx_user_playlists',
  recent: 'nx_recent',
  settings: 'nx_settings'
};

/* ============================================================
   3. MUSIC LIBRARY
   ------------------------------------------------------------
   >>> ADD MORE SONGS HERE <<<
   Copy any song object below, change the fields, and the app
   picks it up automatically (home, search, genres, filters).
   All audio URLs are royalty-free demo tracks (SoundHelix).
   Swap them for your own licensed files at any time.
   ============================================================ */
let songs = [
  { id: 's1',  title: 'Neon Dreams',      artist: 'NEXXO Beats',      album: 'Midnight Gold',      genre: 'Afrobeat',  year: 2025, duration: 218, downloadable: true, cover: 'https://picsum.photos/seed/neon-dreams/400/400',   audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's2',  title: 'Golden Hour',      artist: 'Adaeze',           album: 'Lagos Nights',       genre: 'Afropop',   year: 2024, duration: 194, downloadable: true, cover: 'https://picsum.photos/seed/golden-hour/400/400',   audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 's3',  title: 'City Lights',      artist: 'Big Tone',         album: 'City Lights',        genre: 'Hip-Hop',   year: 2023, duration: 176, downloadable: true, cover: 'https://picsum.photos/seed/city-lights/400/400',   audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 's4',  title: 'Ocean Eyes',       artist: 'Amara Sky',        album: 'Chill Waves',        genre: 'Pop',       year: 2025, duration: 205, downloadable: true, cover: 'https://picsum.photos/seed/ocean-eyes/400/400',    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 's5',  title: 'Pump It Up',       artist: 'DJ Kleva',         album: 'Summer Heat',        genre: 'Party',     year: 2024, duration: 187, downloadable: true, cover: 'https://picsum.photos/seed/pump-it-up/400/400',     audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 's6',  title: 'Lagos Anthem',     artist: 'Oga Sound',        album: 'Party Never Ends',   genre: 'Afropop',   year: 2025, duration: 201, downloadable: true, cover: 'https://picsum.photos/seed/lagos-anthem/400/400',    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: 's7',  title: 'Midnight Drive',   artist: 'NEXXO Beats',      album: 'Midnight Gold',      genre: 'Chill',     year: 2025, duration: 232, downloadable: true, cover: 'https://picsum.photos/seed/midnight-drive/400/400',  audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 's8',  title: 'Fire Flame',       artist: 'Kofi Banton',      album: 'Afro Fusion',        genre: 'Afrobeat',  year: 2025, duration: 196, downloadable: true, cover: 'https://picsum.photos/seed/fire-flame/400/400',      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 's9',  title: 'Smooth Operator',  artist: 'Sienna Rose',      album: 'Soul Sessions',      genre: 'R&B',       year: 2024, duration: 224, downloadable: true, cover: 'https://picsum.photos/seed/smooth-operator/400/400', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { id: 's10', title: 'Grace Overflow',   artist: 'Grace Collective', album: 'Grace Overflow',     genre: 'Gospel',    year: 2023, duration: 258, downloadable: true, cover: 'https://picsum.photos/seed/grace-overflow/400/400',  audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
  { id: 's11', title: 'Amapiano Groove',  artist: 'Naledi Waves',     album: 'Amapiano Sunrise',   genre: 'Amapiano',  year: 2025, duration: 213, downloadable: true, cover: 'https://picsum.photos/seed/amapiano-groove/400/400', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
  { id: 's12', title: 'Street Poetry',    artist: 'Zane Luka',        album: 'Street Poetry',      genre: 'Hip-Hop',   year: 2024, duration: 189, downloadable: true, cover: 'https://picsum.photos/seed/street-poetry/400/400',   audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
  { id: 's13', title: 'Love Letter',      artist: 'Adaeze',           album: 'Lagos Nights',       genre: 'R&B',       year: 2024, duration: 217, downloadable: true, cover: 'https://picsum.photos/seed/love-letter/400/400',     audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
  { id: 's14', title: 'Workout Anthem',   artist: 'DJ Kleva',         album: 'Summer Heat',        genre: 'Workout',   year: 2024, duration: 178, downloadable: true, cover: 'https://picsum.photos/seed/workout-anthem/400/400',  audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' },
  { id: 's15', title: 'Vibe Theory',      artist: 'Mr. Vibe',         album: 'Vibe Theory',        genre: 'Afropop',   year: 2024, duration: 204, downloadable: true, cover: 'https://picsum.photos/seed/vibe-theory/400/400',     audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' },
  { id: 's16', title: 'Blue Skies',       artist: 'Amara Sky',        album: 'Chill Waves',        genre: 'Pop',       year: 2025, duration: 198, downloadable: true, cover: 'https://picsum.photos/seed/blue-skies/400/400',      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' },
  { id: 's17', title: 'Bass Drop',        artist: 'Oga Sound',        album: 'Party Never Ends',   genre: 'Party',     year: 2025, duration: 191, downloadable: true, cover: 'https://picsum.photos/seed/bass-drop/400/400',       audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's18', title: 'Grateful Heart',   artist: 'Grace Collective', album: 'Grace Overflow',     genre: 'Gospel',    year: 2023, duration: 246, downloadable: true, cover: 'https://picsum.photos/seed/grateful-heart/400/400',  audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 's19', title: 'Midnight Gold',    artist: 'NEXXO Beats',      album: 'Midnight Gold',      genre: 'Afrobeat',  year: 2025, duration: 227, downloadable: true, cover: 'https://picsum.photos/seed/midnight-gold/400/400',   audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 's20', title: 'Roll With Me',     artist: 'Big Tone',         album: 'City Lights',        genre: 'Hip-Hop',   year: 2023, duration: 183, downloadable: true, cover: 'https://picsum.photos/seed/roll-with-me/400/400',    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 's21', title: 'Sunrise Dance',    artist: 'Naledi Waves',     album: 'Amapiano Sunrise',   genre: 'Amapiano',  year: 2025, duration: 209, downloadable: true, cover: 'https://picsum.photos/seed/sunrise-dance/400/400',   audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 's22', title: 'Whisper',          artist: 'Sienna Rose',      album: 'Soul Sessions',      genre: 'R&B',       year: 2024, duration: 236, downloadable: true, cover: 'https://picsum.photos/seed/whisper/400/400',         audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: 's23', title: 'King of the Block',artist: 'Zane Luka',        album: 'Street Poetry',      genre: 'Hip-Hop',   year: 2024, duration: 195, downloadable: true, cover: 'https://picsum.photos/seed/king-of-the-block/400/400',audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 's24', title: 'Sweet Melody',     artist: 'Kofi Banton',      album: 'Afro Fusion',        genre: 'Afrobeat',  year: 2025, duration: 212, downloadable: true, cover: 'https://picsum.photos/seed/sweet-melody/400/400',    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 's25', title: 'High Energy',      artist: 'Mr. Vibe',         album: 'Vibe Theory',        genre: 'Workout',   year: 2024, duration: 174, downloadable: true, cover: 'https://picsum.photos/seed/high-energy/400/400',     audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { id: 's26', title: 'Evening Breeze',   artist: 'Amara Sky',        album: 'Chill Waves',        genre: 'Chill',     year: 2025, duration: 240, downloadable: true, cover: 'https://picsum.photos/seed/evening-breeze/400/400',  audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
  { id: 's27', title: 'Dance All Night',  artist: 'DJ Kleva',         album: 'Summer Heat',        genre: 'Party',     year: 2024, duration: 199, downloadable: true, cover: 'https://picsum.photos/seed/dance-all-night/400/400', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
  { id: 's28', title: 'Heaven Sent',      artist: 'Grace Collective', album: 'Grace Overflow',     genre: 'Gospel',    year: 2023, duration: 251, downloadable: true, cover: 'https://picsum.photos/seed/heaven-sent/400/400',    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
  { id: 's29', title: 'Sisi',             artist: 'Adaeze',           album: 'Lagos Nights',       genre: 'Afropop',   year: 2024, duration: 207, downloadable: true, cover: 'https://picsum.photos/seed/sisi/400/400',            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
  { id: 's30', title: 'Echoes',           artist: 'NEXXO Beats',      album: 'Midnight Gold',      genre: 'Chill',     year: 2025, duration: 229, downloadable: true, cover: 'https://picsum.photos/seed/echoes/400/400',          audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' }
];

/* >>> ADD MORE ARTISTS HERE <<< (song counts are calculated automatically) */
let artists = [
  { id: 'a1',  name: 'NEXXO Beats',      image: 'https://picsum.photos/seed/artist-nexxo/400/400' },
  { id: 'a2',  name: 'Adaeze',           image: 'https://picsum.photos/seed/artist-adaeze/400/400' },
  { id: 'a3',  name: 'Big Tone',         image: 'https://picsum.photos/seed/artist-bigtone/400/400' },
  { id: 'a4',  name: 'Amara Sky',        image: 'https://picsum.photos/seed/artist-amara/400/400' },
  { id: 'a5',  name: 'DJ Kleva',         image: 'https://picsum.photos/seed/artist-kleva/400/400' },
  { id: 'a6',  name: 'Oga Sound',        image: 'https://picsum.photos/seed/artist-oga/400/400' },
  { id: 'a7',  name: 'Kofi Banton',      image: 'https://picsum.photos/seed/artist-kofi/400/400' },
  { id: 'a8',  name: 'Sienna Rose',      image: 'https://picsum.photos/seed/artist-sienna/400/400' },
  { id: 'a9',  name: 'Grace Collective', image: 'https://picsum.photos/seed/artist-grace/400/400' },
  { id: 'a10', name: 'Naledi Waves',     image: 'https://picsum.photos/seed/artist-naledi/400/400' },
  { id: 'a11', name: 'Zane Luka',        image: 'https://picsum.photos/seed/artist-zane/400/400' },
  { id: 'a12', name: 'Mr. Vibe',         image: 'https://picsum.photos/seed/artist-vibe/400/400' }
];

/* >>> ADD MORE ALBUMS HERE <<< (track counts are calculated automatically) */
let albums = [
  { id: 'al1',  title: 'Midnight Gold',      artist: 'NEXXO Beats',      year: 2025, cover: 'https://picsum.photos/seed/alb-midnight/400/400',    songIds: ['s1','s7','s19','s30'] },
  { id: 'al2',  title: 'Lagos Nights',       artist: 'Adaeze',           year: 2024, cover: 'https://picsum.photos/seed/alb-lagos/400/400',       songIds: ['s2','s13','s29'] },
  { id: 'al3',  title: 'City Lights',        artist: 'Big Tone',         year: 2023, cover: 'https://picsum.photos/seed/alb-city/400/400',        songIds: ['s3','s20'] },
  { id: 'al4',  title: 'Chill Waves',        artist: 'Amara Sky',        year: 2025, cover: 'https://picsum.photos/seed/alb-chill/400/400',       songIds: ['s4','s16','s26'] },
  { id: 'al5',  title: 'Summer Heat',        artist: 'DJ Kleva',         year: 2024, cover: 'https://picsum.photos/seed/alb-summer/400/400',      songIds: ['s5','s14','s27'] },
  { id: 'al6',  title: 'Party Never Ends',   artist: 'Oga Sound',        year: 2025, cover: 'https://picsum.photos/seed/alb-party/400/400',       songIds: ['s6','s17'] },
  { id: 'al7',  title: 'Afro Fusion',        artist: 'Kofi Banton',      year: 2025, cover: 'https://picsum.photos/seed/alb-afro/400/400',        songIds: ['s8','s24'] },
  { id: 'al8',  title: 'Soul Sessions',      artist: 'Sienna Rose',      year: 2024, cover: 'https://picsum.photos/seed/alb-soul/400/400',        songIds: ['s9','s22'] },
  { id: 'al9',  title: 'Grace Overflow',     artist: 'Grace Collective', year: 2023, cover: 'https://picsum.photos/seed/alb-grace/400/400',       songIds: ['s10','s18','s28'] },
  { id: 'al10', title: 'Amapiano Sunrise',   artist: 'Naledi Waves',     year: 2025, cover: 'https://picsum.photos/seed/alb-amapiano/400/400',   songIds: ['s11','s21'] },
  { id: 'al11', title: 'Street Poetry',      artist: 'Zane Luka',        year: 2024, cover: 'https://picsum.photos/seed/alb-street/400/400',      songIds: ['s12','s23'] },
  { id: 'al12', title: 'Vibe Theory',        artist: 'Mr. Vibe',         year: 2024, cover: 'https://picsum.photos/seed/alb-vibe/400/400',        songIds: ['s15','s25'] }
];

/* Built-in sample playlists (read-only). >>> ADD MORE HERE <<< */
const playlists = [
  { id: 'pl-afrobeat',  name: 'Afrobeat Vibes', builtin: true, songIds: ['s1','s8','s19','s24','s15','s2','s29'] },
  { id: 'pl-nigerian',  name: 'Nigerian Hits',  builtin: true, songIds: ['s2','s6','s29','s13','s15','s24','s19'] },
  { id: 'pl-chill',     name: 'Chill Mode',     builtin: true, songIds: ['s4','s7','s16','s26','s30','s22'] },
  { id: 'pl-workout',   name: 'Workout',        builtin: true, songIds: ['s14','s5','s25','s27','s17','s3'] },
  { id: 'pl-latenight', name: 'Late Night',     builtin: true, songIds: ['s9','s22','s13','s26','s30','s7','s19'] },
  { id: 'pl-trending',  name: 'Trending Now',   builtin: true, songIds: ['s1','s6','s11','s19','s24','s21','s15','s27'] }
];

/* Discover categories (genre chips) */
const DISCOVER_CATEGORIES = ['Trending', 'New Releases', 'Afrobeat', 'Afropop', 'Hip-Hop', 'R&B', 'Gospel', 'Amapiano', 'Pop', 'Chill', 'Workout', 'Party'];

/* ============================================================
   4. FALLBACK COVER (stylish placeholder when images fail)
   ============================================================ */
const FALLBACK_COVER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#141a30"/><stop offset="1" stop-color="#05060a"/>' +
  '</linearGradient></defs>' +
  '<rect width="400" height="400" fill="url(#g)"/>' +
  '<circle cx="200" cy="185" r="58" fill="none" stroke="#f5c542" stroke-width="7"/>' +
  '<path d="M242 162v92c0 26-20 38-40 30" fill="none" stroke="#f5c542" stroke-width="7" stroke-linecap="round"/>' +
  '<path d="M242 162l58-16v78" fill="none" stroke="#4f8cff" stroke-width="7" stroke-linecap="round"/>' +
  '<text x="200" y="330" fill="#9aa3b2" font-family="sans-serif" font-size="22" text-anchor="middle" font-weight="bold">NΞXXØ PLAY</text>' +
  '</svg>'
);
window.FALLBACK_COVER = FALLBACK_COVER; // usable inside inline onerror handlers

/* ============================================================
   5. APP STATE
   ============================================================ */
const state = {
  currentSongId: null,
  queue: [],          // array of song ids
  queueIndex: 0,
  baseQueue: [],      // original order (restored when shuffle is off)
  shuffle: false,
  repeat: 'off',      // 'off' | 'all' | 'one'
  pickedPlId: null,   // selected playlist in "add to playlist" modal
  pickSet: new Set(), // temp selection when adding songs to a playlist
  discoverCat: 'Trending'
};

const audio = new Audio();
audio.preload = 'metadata';

/* ============================================================
   6. UTILITIES
   ============================================================ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const uid = () => 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
const isMobile = () => window.matchMedia('(max-width: 1100px)').matches;
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function fmtTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

const getSong = (id) => songs.find(s => s.id === id);
const getArtist = (name) => artists.find(a => a.name === name);
const getAlbumById = (id) => albums.find(a => a.id === id);
const songsByArtist = (name) => songs.filter(s => s.artist === name);
const songsByAlbum = (albumTitle) => songs.filter(s => s.album === albumTitle);
const allPlaylists = () => [...userPlaylists, ...playlists];
const getPlaylist = (id) => allPlaylists().find(p => p.id === id);
const playlistCover = (pl) => (getSong(pl.songIds[0]) || {}).cover || FALLBACK_COVER;

/* Icons */
const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>';
const svgHeart = () => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
const svgMore = () => '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>';
const svgDownload = () => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
const svgQueue = () => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>';
const svgCheck = () => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
const svgClose = () => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

/* ============================================================
   7. TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = 'info', iconSvg) {
  const toasts = $('#toasts');
  const el = document.createElement('div');
  el.className = 'toast' + (type === 'success' ? ' success' : type === 'error' ? ' error' : '');
  el.innerHTML = '<span class="t-icon">' + (iconSvg || svgCheck()) + '</span><span>' + esc(message) + '</span>';
  toasts.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 400);
  }, 2800);
}

/* ============================================================
   8. MODAL SYSTEM
   ============================================================ */
function openModal(title, bodyHtml) {
  const overlay = $('#modalOverlay');
  const box = $('#modalBox');
  box.innerHTML =
    '<div class="queue-head" style="margin-bottom:14px">' +
    '<h2>' + esc(title) + '</h2>' +
    '<button class="icon-btn" data-action="close-modal" aria-label="Close dialog">' + svgClose() + '</button>' +
    '</div>' + bodyHtml;
  overlay.style.display = 'flex';
  const firstFocus = box.querySelector('input, button:not([data-action="close-modal"])');
  if (firstFocus) setTimeout(() => firstFocus.focus(), 60);
}

function closeModal() {
  $('#modalOverlay').style.display = 'none';
  state.pickedPlId = null;
  state.pickSet.clear();
}

/* Confirmation dialog */
function confirmAction(title, message, confirmLabel, onConfirm) {
  openModal(title,
    '<p class="modal-sub">' + esc(message) + '</p>' +
    '<div class="modal-actions">' +
    '<button class="btn btn-ghost" data-action="close-modal">Cancel</button>' +
    '<button class="btn btn-danger" id="confirmBtn">' + esc(confirmLabel) + '</button>' +
    '</div>');
  const btn = $('#confirmBtn');
  btn.addEventListener('click', () => {
    closeModal();
    onConfirm();
  }, { once: true });
}

/* ============================================================
   9. LOCAL STORAGE (safe wrappers)
   ============================================================ */
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (e) { /* storage full/blocked — keep app working in memory */ }
}

/* ---------- Favorites ---------- */
let favIds = loadJSON(K.favs, []);
const isFav = (id) => favIds.includes(id);
function saveFavs() { saveJSON(K.favs, favIds); }

function toggleFav(id) {
  const song = getSong(id);
  if (!song) return;
  const on = !isFav(id);
  favIds = on ? [...favIds, id] : favIds.filter(f => f !== id);
  saveFavs();
  syncHearts();
  if ($('#section-favorites').classList.contains('active')) renderFavorites();
  showToast(on ? 'Added to Favorites' : 'Removed from Favorites', on ? 'success' : 'info', svgHeart());
}

/* ---------- Recently played ---------- */
let recentIds = loadJSON(K.recent, []);
function saveRecent() { saveJSON(K.recent, recentIds); }
function addRecent(id) {
  recentIds = [id, ...recentIds.filter(r => r !== id)].slice(0, 20);
  saveRecent();
  if ($('#section-recent').classList.contains('active')) renderRecent();
}

/* ---------- User playlists ---------- */
let userPlaylists = loadJSON(K.playlists, []); // [{id,name,songIds,createdAt}]
function saveUserPlaylists() { saveJSON(K.playlists, userPlaylists); }

/* ---------- Settings ---------- */
const defaultSettings = { theme: 'dark', autoplay: true, volume: 80, reduceMotion: false };
let settings = { ...defaultSettings, ...loadJSON(K.settings, {}) };
function saveSettings() { saveJSON(K.settings, settings); }

/* ============================================================
   10. AUDIO ENGINE
   ============================================================ */
function loadAndPlay(index) {
  if (!state.queue.length) return;
  index = clamp(index, 0, state.queue.length - 1);
  state.queueIndex = index;
  const song = getSong(state.queue[index]);
  if (!song) { nextTrack(true); return; }

  state.currentSongId = song.id;
  audio.src = song.audio;
  audio.volume = clamp(settings.volume / 100, 0, 1);
  audio.play().catch(handlePlayError);
  addRecent(song.id);
  updatePlayerUI();
  renderQueue();
  syncPlayingUI();
  document.title = song.title + ' • ' + song.artist + ' — NΞXXØ PLAY';
  showToast('Now Playing: ' + song.title, 'info');
}

function playSong(id, sourceList) {
  const song = getSong(id);
  if (!song) return;
  if (sourceList && sourceList.length) {
    const start = sourceList.indexOf(id);
    if (start > -1) {
      const ordered = [...sourceList.slice(start), ...sourceList.slice(0, start)];
      state.baseQueue = ordered.slice();
      state.queue = ordered.slice();
    } else {
      state.baseQueue = [id];
      state.queue = [id];
    }
  } else {
    state.baseQueue = [id];
    state.queue = [id];
  }
  if (state.shuffle && state.queue.length > 1) shuffleTail();
  loadAndPlay(0);
}

function shuffleTail() {
  const head = state.queue.slice(0, state.queueIndex + 1);
  let tail = state.queue.slice(state.queueIndex + 1);
  for (let i = tail.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [tail[i], tail[j]] = [tail[j], tail[i]];
  }
  state.queue = [...head, ...tail];
}

function toggleShuffle() {
  state.shuffle = !state.shuffle;
  if (state.shuffle && state.queue.length > 1) {
    shuffleTail();
    renderQueue();
  } else if (!state.shuffle && state.baseQueue.length && state.currentSongId) {
    const idx = state.baseQueue.indexOf(state.currentSongId);
    state.queue = state.baseQueue.slice();
    state.queueIndex = idx > -1 ? idx : 0;
    renderQueue();
  }
  $('#btnShuffle').classList.toggle('active', state.shuffle);
  $('#fsShuffle').classList.toggle('active', state.shuffle);
  showToast(state.shuffle ? 'Shuffle On' : 'Shuffle Off');
}

function cycleRepeat() {
  const modes = ['off', 'all', 'one'];
  state.repeat = modes[(modes.indexOf(state.repeat) + 1) % modes.length];
  const labels = { off: 'Repeat Off', all: 'Repeat All', one: 'Repeat One' };
  $('#btnRepeat').classList.toggle('active', state.repeat !== 'off');
  $('#fsRepeat').classList.toggle('active', state.repeat !== 'off');
  $('#btnRepeat').setAttribute('aria-label', labels[state.repeat]);
  $('#fsRepeat').setAttribute('aria-label', labels[state.repeat]);
  showToast(labels[state.repeat]);
}

function nextTrack(auto) {
  if (!state.queue.length) return;
  if (state.repeat === 'one') { audio.currentTime = 0; audio.play().catch(handlePlayError); return; }
  if (state.shuffle && state.queue.length > 1) {
    let i;
    do { i = randInt(0, state.queue.length - 1); } while (i === state.queueIndex);
    loadAndPlay(i);
    return;
  }
  let i = state.queueIndex + 1;
  if (i >= state.queue.length) {
    if (state.repeat === 'all') i = 0;
    else { audio.pause(); audio.currentTime = 0; syncPlayIcons(false); return; }
  }
  loadAndPlay(i);
}

function prevTrack() {
  if (!state.queue.length) return;
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  let i = state.queueIndex - 1;
  if (i < 0) i = state.queue.length - 1;
  loadAndPlay(i);
}

function togglePlay() {
  if (!state.currentSongId) { showToast('Select a song to play', 'info'); return; }
  if (audio.paused) audio.play().catch(handlePlayError);
  else audio.pause();
}

function handlePlayError() {
  showToast('Unable to play this track', 'error');
  syncPlayIcons(false);
}

audio.addEventListener('play', () => syncPlayIcons(true));
audio.addEventListener('pause', () => syncPlayIcons(false));
audio.addEventListener('ended', () => {
  if (state.repeat === 'one') { audio.currentTime = 0; audio.play().catch(handlePlayError); return; }
  if (settings.autoplay) nextTrack(true);
  else { syncPlayIcons(false); }
});
audio.addEventListener('error', () => {
  showToast('Unable to play this track', 'error');
  if (settings.autoplay) nextTrack(true);
});
audio.addEventListener('loadedmetadata', () => {
  if (isFinite(audio.duration) && audio.duration > 0) {
    $('#progTotal').textContent = fmtTime(audio.duration);
    $('#fsTotal').textContent = fmtTime(audio.duration);
  }
});
audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
  const dur = isFinite(audio.duration) && audio.duration > 0 ? audio.duration : (getSong(state.currentSongId) || {}).duration || 0;
  const cur = audio.currentTime || 0;
  const pct = dur ? (cur / dur) * 100 : 0;
  const pctStr = pct.toFixed(2) + '%';

  const bar = $('#progBar');
  bar.value = pct;
  bar.style.setProperty('--p', pctStr);
  $('#progCurrent').textContent = fmtTime(cur);
  if (dur) $('#progTotal').textContent = fmtTime(dur);

  const fs = $('#fsProg');
  fs.value = pct;
  fs.style.setProperty('--p', pctStr);
  $('#fsCur').textContent = fmtTime(cur);
  if (dur) $('#fsTotal').textContent = fmtTime(dur);

  $('#miniProgFill').style.width = pctStr;
}

function seekTo(value) {
  const dur = isFinite(audio.duration) && audio.duration > 0 ? audio.duration : (getSong(state.currentSongId) || {}).duration || 0;
  if (dur) audio.currentTime = (value / 100) * dur;
}

function syncPlayIcons(playing) {
  $('#btnPlay').innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
  $('#btnPlay').setAttribute('aria-label', playing ? 'Pause' : 'Play');
  $('#fsPlay').innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
  $('#miniPlay').innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
  const cover = $('#fsCover');
  cover.classList.toggle('rotating', playing);
}

/* Volume + mute */
function setVolume(v) {
  v = clamp(v, 0, 100);
  audio.volume = v / 100;
  $('#volSlider').value = v;
  $('#volSlider').style.setProperty('--p', v + '%');
  settings.volume = v;
  saveSettings();
  $('#settingsVolume').value = v;
  updateVolIcon();
}
function updateVolIcon() {
  const muted = audio.muted || audio.volume === 0;
  $('#volBtn').classList.toggle('active', muted);
  $('#volBtn').innerHTML = muted
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
}

/* ============================================================
   11. PLAYER UI (bar, mini, fullscreen, queue)
   ============================================================ */
function updatePlayerUI() {
  const song = getSong(state.currentSongId);
  const has = !!song;

  if (has) {
    $('#playerCover').src = song.cover;
    $('#playerTitle').textContent = song.title;
    $('#playerArtist').textContent = song.artist;

    $('#miniCover').src = song.cover;
    $('#miniTitle').textContent = song.title;
    $('#miniArtist').textContent = song.artist;

    $('#fsCover').src = song.cover;
    $('#fsBg').src = song.cover;
    $('#fsTitle').textContent = song.title;
    $('#fsArtist').textContent = song.artist;

    $('#progTotal').textContent = fmtTime(song.duration);
    $('#fsTotal').textContent = fmtTime(song.duration);
  }

  syncPlayerVisibility();
  syncHearts();
  updateProgress();
}

function syncPlayerVisibility() {
  const has = !!state.currentSongId;
  const mobile = isMobile();
  const bar = $('#playerBar');
  const mini = $('#miniPlayer');
  if (has && !mobile) { bar.style.display = 'grid'; } else { bar.style.display = 'none'; }
  if (has && mobile) { mini.style.display = 'flex'; } else { mini.style.display = 'none'; }
}

function syncHearts() {
  $$('.heart-btn').forEach(btn => {
    const id = btn.dataset.id;
    btn.classList.toggle('liked', !!id && isFav(id));
    btn.setAttribute('aria-label', isFav(id) ? 'Remove from favorites' : 'Add to favorites');
  });
}

function syncPlayingUI() {
  $$('.track-row.playing').forEach(el => el.classList.remove('playing'));
  $$('.mc-play.playing').forEach(el => el.classList.remove('playing'));
  if (state.currentSongId) {
    $$('.track-row[data-id="' + state.currentSongId + '"]').forEach(el => el.classList.add('playing'));
    $$('.mc-play[data-id="' + state.currentSongId + '"]').forEach(el => el.classList.add('playing'));
  }
}

/* ---------- Fullscreen player ---------- */
function openFullscreen() {
  if (!state.currentSongId) { showToast('Select a song to play', 'info'); return; }
  $('#fsPlayer').hidden = false;
}
function closeFullscreen() { $('#fsPlayer').hidden = true; }

/* ---------- Queue ---------- */
function openQueue() {
  renderQueue();
  $('#queuePanel').classList.add('open');
  $('#panelBackdrop').hidden = false;
}
function closeQueue() {
  $('#queuePanel').classList.remove('open');
  $('#panelBackdrop').hidden = true;
}

function addToQueue(id) {
  const song = getSong(id);
  if (!song) return;
  if (!state.queue.length) { playSong(id); showToast('Song added to Queue', 'success'); return; }
  state.queue.push(id);
  if (!state.shuffle && state.baseQueue.length && !state.baseQueue.includes(id)) state.baseQueue.push(id);
  renderQueue();
  showToast('Song added to Queue', 'success');
}

function removeFromQueue(index) {
  if (index === state.queueIndex) return; // keep now-playing
  state.queue.splice(index, 1);
  if (index < state.queueIndex) state.queueIndex--;
  renderQueue();
}

function clearQueue() {
  if (state.queue.length > 1) {
    state.queue = state.queue.slice(0, state.queueIndex + 1);
    state.baseQueue = state.queue.slice();
    renderQueue();
    showToast('Queue cleared', 'info');
  }
}

function renderQueue() {
  const now = $('#queueNow');
  const list = $('#queueList');
  const song = getSong(state.queue[state.queueIndex]);

  now.innerHTML = song
    ? queueItem(song, state.queueIndex, true)
    : '<div class="empty-state" style="padding:26px 12px"><span class="es-title">Queue is empty</span><span class="es-text">Pick a song to start.</span></div>';

  const upNext = state.queue.slice(state.queueIndex + 1);
  list.innerHTML = upNext.length
    ? upNext.map((id, i) => queueItem(getSong(id), state.queueIndex + 1 + i)).join('')
    : '<div class="empty-state" style="padding:26px 12px"><span class="es-title">Nothing up next</span><span class="es-text">Add songs to your queue.</span></div>';
}

function queueItem(song, index, isNow) {
  if (!song) return '';
  return (
    '<div class="queue-item' + (isNow ? ' now-playing' : '') + '" data-action="play-queue" data-index="' + index + '" role="button" tabindex="0" aria-label="Play ' + esc(song.title) + '">' +
    '<img loading="lazy" src="' + song.cover + '" alt="Cover of ' + esc(song.title) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<span class="q-info"><span class="q-title">' + esc(song.title) + '</span><span class="q-sub">' + esc(song.artist) + '</span></span>' +
    '<span class="tr-time">' + fmtTime(song.duration) + '</span>' +
    (!isNow
      ? '<button class="icon-btn" data-action="queue-remove" data-index="' + index + '" aria-label="Remove from queue">' + svgClose() + '</button>'
      : '') +
    '</div>'
  );
}

/* ============================================================
   12. CARD / ROW BUILDERS
   ============================================================ */
function songCard(song) {
  return (
    '<article class="music-card" data-action="play" data-id="' + song.id + '" role="button" tabindex="0" aria-label="Play ' + esc(song.title) + '">' +
    '<div class="mc-cover">' +
    '<img loading="lazy" src="' + song.cover + '" alt="Cover for ' + esc(song.title) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<button class="mc-overlay" data-action="play" data-id="' + song.id + '" aria-label="Play ' + esc(song.title) + '">' +
    '<span class="mc-play" data-id="' + song.id + '">' + ICON_PLAY + '</span>' +
    '</button></div>' +
    '<div class="mc-info"><span class="mc-title">' + esc(song.title) + '</span><span class="mc-sub">' + esc(song.artist) + ' • ' + esc(song.album) + '</span></div>' +
    '<div class="mc-meta"><small>' + esc(song.genre) + ' • ' + fmtTime(song.duration) + '</small>' +
    '<div class="card-actions">' +
    '<button class="icon-btn heart-btn" data-action="fav" data-id="' + song.id + '" aria-label="Add to favorites">' + svgHeart() + '</button>' +
    '<button class="icon-btn" data-action="more" data-id="' + song.id + '" aria-label="More options for ' + esc(song.title) + '">' + svgMore() + '</button>' +
    '</div></div></article>'
  );
}

function artistCard(artist) {
  const count = songsByArtist(artist.name).length;
  return (
    '<article class="music-card artist" data-action="open-artist" data-id="' + artist.id + '" role="button" tabindex="0" aria-label="Open artist ' + esc(artist.name) + '">' +
    '<div class="mc-cover">' +
    '<img loading="lazy" src="' + artist.image + '" alt="Photo of ' + esc(artist.name) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<button class="mc-overlay" data-action="open-artist" data-id="' + artist.id + '" aria-label="Open artist ' + esc(artist.name) + '">' +
    '<span class="mc-play">' + ICON_PLAY + '</span></button></div>' +
    '<div class="mc-info"><span class="mc-title">' + esc(artist.name) + '</span>' +
    '<span class="mc-sub">' + count + ' ' + (count === 1 ? 'song' : 'songs') + '</span></div></article>'
  );
}

function albumCard(album) {
  const tracks = songsByAlbum(album.title).length;
  return (
    '<article class="music-card" data-action="open-album" data-id="' + album.id + '" role="button" tabindex="0" aria-label="Open album ' + esc(album.title) + '">' +
    '<div class="mc-cover">' +
    '<img loading="lazy" src="' + album.cover + '" alt="Cover of ' + esc(album.title) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<button class="mc-overlay" data-action="open-album" data-id="' + album.id + '" aria-label="Open album ' + esc(album.title) + '">' +
    '<span class="mc-play">' + ICON_PLAY + '</span></button></div>' +
    '<div class="mc-info"><span class="mc-title">' + esc(album.title) + '</span>' +
    '<span class="mc-sub">' + esc(album.artist) + ' • ' + album.year + '</span></div>' +
    '<div class="mc-meta"><small>' + tracks + ' ' + (tracks === 1 ? 'track' : 'tracks') + '</small></div></article>'
  );
}

function playlistCard(pl) {
  const cover = playlistCover(pl);
  const count = pl.songIds.length;
  return (
    '<article class="music-card playlist" data-action="open-playlist" data-id="' + pl.id + '" role="button" tabindex="0" aria-label="Open playlist ' + esc(pl.name) + '">' +
    '<div class="mc-cover">' +
    '<img loading="lazy" src="' + cover + '" alt="Cover of playlist ' + esc(pl.name) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<button class="mc-overlay" data-action="open-playlist" data-id="' + pl.id + '" aria-label="Open playlist ' + esc(pl.name) + '">' +
    '<span class="mc-play">' + ICON_PLAY + '</span></button></div>' +
    '<div class="mc-info"><span class="mc-title">' + esc(pl.name) + '</span>' +
    '<span class="mc-sub">' + (pl.builtin ? 'NΞXXØ PLAY • ' : 'My Playlist • ') + count + ' ' + (count === 1 ? 'song' : 'songs') + '</span></div></article>'
  );
}

/* ---------- Track row (song list view) ---------- */
function trackRow(song) {
  return (
    '<div class="track-row" data-action="play" data-id="' + song.id + '" role="button" tabindex="0" aria-label="Play ' + esc(song.title) + '">' +
    '<div class="tr-cover">' +
    '<img loading="lazy" src="' + song.cover + '" alt="Cover of ' + esc(song.title) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<span class="tr-play">' + ICON_PLAY + '</span></div>' +
    '<div class="tr-main">' +
    '<span class="tr-title"><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>' + esc(song.title) + '</span>' +
    '<span class="tr-artist">' + esc(song.artist) + '</span></div>' +
    '<span class="tr-meta">' + esc(song.album) + '</span>' +
    '<span class="tr-time">' + fmtTime(song.duration) + '</span>' +
    '<div class="tr-actions">' +
    '<button class="icon-btn heart-btn" data-action="fav" data-id="' + song.id + '" aria-label="Add to favorites">' + svgHeart() + '</button>' +
    '<button class="icon-btn" data-action="more" data-id="' + song.id + '" aria-label="More options for ' + esc(song.title) + '">' + svgMore() + '</button>' +
    '</div></div>'
  );
}

/* ---------- Empty states ---------- */
function emptyState(title, text, actionHtml) {
  return (
    '<div class="empty-state">' +
    '<span class="es-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span>' +
    '<span class="es-title">' + esc(title) + '</span>' +
    '<span class="es-text">' + esc(text) + '</span>' +
    (actionHtml || '') + '</div>'
  );
}

/* ============================================================
   13. SECTION RENDERS
   ============================================================ */
function renderGenreFilter() {
  const sel = $('#genreFilter');
  const genres = [...new Set(songs.map(s => s.genre))].sort();
  sel.innerHTML = '<option value="all">All Genres</option>' +
    genres.map(g => '<option value="' + esc(g) + '">' + esc(g) + '</option>').join('');
}

function renderHome() {
  const trending = [...songs].sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.year - a.year).slice(0, 10);
  const fresh = [...songs].sort((a, b) => b.year - a.year).slice(0, 10);
  const topArtists = [...artists]
    .map(a => ({ a, n: songsByArtist(a.name).length }))
    .sort((x, y) => y.n - x.n)
    .slice(0, 8)
    .map(o => o.a);

  $('#homeTrending').innerHTML = trending.map(songCard).join('') || emptyState('No songs yet', 'Add songs to the library to see them here.');
  $('#homeNewReleases').innerHTML = fresh.map(songCard).join('') || emptyState('No songs yet', 'Add songs to the library to see them here.');
  $('#homeArtists').innerHTML = topArtists.map(artistCard).join('');
  $('#homePlaylists').innerHTML = allPlaylists().slice(0, 6).map(playlistCard).join('') ||
    emptyState('No playlists yet', 'Create your first playlist to get started.');
}

function renderDiscover() {
  const chips = $('#discoverChips');
  chips.innerHTML = DISCOVER_CATEGORIES.map(c =>
    '<button class="chip' + (c === state.discoverCat ? ' active' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>'
  ).join('');
  const grid = $('#discoverGrid');

  if (state.discoverCat === 'Trending') {
    const list = [...songs].sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.year - a.year).slice(0, 12);
    grid.innerHTML = list.map(songCard).join('');
    return;
  }
  if (state.discoverCat === 'New Releases') {
    const list = [...songs].sort((a, b) => b.year - a.year).slice(0, 12);
    grid.innerHTML = list.map(songCard).join('');
    return;
  }
  const list = songs.filter(s => s.genre === state.discoverCat);
  grid.innerHTML = list.length
    ? list.map(songCard).join('')
    : emptyState('Nothing here yet', 'Songs in the "' + state.discoverCat + '" category will appear here.');
}

function renderSongs() {
  const genre = $('#genreFilter').value;
  const sort = $('#sortSongs').value;
  let list = songs.slice();
  if (genre !== 'all') list = list.filter(s => s.genre === genre);
  if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'year') list.sort((a, b) => b.year - a.year);
  else if (sort === 'duration') list.sort((a, b) => a.duration - b.duration);
  $('#songsGrid').innerHTML = list.length
    ? list.map(songCard).join('')
    : emptyState('No music found', 'Try a different genre or add more songs to the library.');
}

function renderArtists() {
  $('#artistsGrid').innerHTML = artists.map(artistCard).join('') ||
    emptyState('No artists yet', 'Artists will appear here once added.');
}

function renderAlbums() {
  $('#albumsGrid').innerHTML = albums.map(albumCard).join('') ||
    emptyState('No albums yet', 'Albums will appear here once added.');
}

function renderPlaylists() {
  const grid = $('#playlistsGrid');
  const list = allPlaylists();
  grid.innerHTML = list.length
    ? list.map(playlistCard).join('')
    : emptyState('No playlists yet', 'Create your first playlist to get started.',
        '<button class="btn btn-gold btn-sm es-action" data-action="create-playlist">+ Create Playlist</button>');
}

function renderFavorites() {
  const list = favIds.map(getSong).filter(Boolean);
  $('#favoritesGrid').innerHTML = list.length
    ? list.map(songCard).join('')
    : emptyState('No favorites yet', 'Tap the heart on a song to save it here.');
}

function renderRecent() {
  const list = recentIds.map(getSong).filter(Boolean);
  $('#recentGrid').innerHTML = list.length
    ? list.map(songCard).join('')
    : emptyState('Nothing played yet', 'Songs you play will show up here.');
}

function renderDownloads() {
  const list = songs.filter(s => s.downloadable);
  $('#downloadsGrid').innerHTML = list.length
    ? list.map(songCard).join('')
    : emptyState('No downloads available', 'Downloadable tracks will appear here.');
}

/* ---------- Detail views: artist / album / playlist ---------- */
function renderArtistSongs(artistName) {
  const artist = getArtist(artistName);
  const list = songsByArtist(artistName);
  const html =
    '<div class="page-head">' +
    '<button class="btn btn-ghost btn-sm" data-action="back">← Back to Artists</button>' +
    '<div style="display:flex;align-items:center;gap:18px;margin-top:18px">' +
    '<img src="' + (artist ? artist.image : FALLBACK_COVER) + '" alt="' + esc(artistName) + '" style="width:92px;height:92px;border-radius:50%;object-fit:cover;box-shadow:var(--shadow-gold)" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<div><h1 style="margin:0">' + esc(artistName) + '</h1>' +
    '<p style="margin-top:4px">' + list.length + ' ' + (list.length === 1 ? 'song' : 'songs') + '</p>' +
    '<button class="btn btn-gold btn-sm" style="margin-top:10px" data-action="play-all" data-id="' + esc(list[0] && list[0].id) + '">▶ Play All</button></div>' +
    '</div></div>' +
    '<div class="track-list">' + list.map(trackRow).join('') + '</div>';
  $('#main').insertAdjacentHTML('afterbegin', '<section id="detail-view" class="page-section active" aria-label="' + esc(artistName) + '">' + html + '</section>');
  switchSection('detail-view');
  syncPlayingUI();
}

function renderAlbumSongs(album) {
  const list = album.songIds.map(getSong).filter(Boolean);
  const html =
    '<div class="page-head">' +
    '<button class="btn btn-ghost btn-sm" data-action="back">← Back to Albums</button>' +
    '<div style="display:flex;align-items:center;gap:18px;margin-top:18px">' +
    '<img src="' + album.cover + '" alt="Cover of ' + esc(album.title) + '" style="width:110px;height:110px;border-radius:16px;object-fit:cover;box-shadow:var(--shadow-gold)" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<div><h1 style="margin:0">' + esc(album.title) + '</h1>' +
    '<p style="margin-top:4px">' + esc(album.artist) + ' • ' + album.year + ' • ' + list.length + ' tracks</p>' +
    '<button class="btn btn-gold btn-sm" style="margin-top:10px" data-action="play-all" data-id="' + esc(list[0] && list[0].id) + '">▶ Play All</button></div>' +
    '</div></div>' +
    '<div class="track-list">' + list.map(trackRow).join('') + '</div>';
  $('#main').insertAdjacentHTML('afterbegin', '<section id="detail-view" class="page-section active" aria-label="' + esc(album.title) + '">' + html + '</section>');
  switchSection('detail-view');
  syncPlayingUI();
}

function renderPlaylistSongs(pl) {
  const list = pl.songIds.map(getSong).filter(Boolean);
  const html =
    '<div class="page-head">' +
    '<button class="btn btn-ghost btn-sm" data-action="back">← Back to Playlists</button>' +
    '<div style="display:flex;align-items:center;gap:18px;margin-top:18px">' +
    '<img src="' + playlistCover(pl) + '" alt="Cover of ' + esc(pl.name) + '" style="width:110px;height:110px;border-radius:16px;object-fit:cover;box-shadow:var(--shadow-gold)" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<div><h1 style="margin:0">' + esc(pl.name) + '</h1>' +
    '<p style="margin-top:4px">' + (pl.builtin ? 'NΞXXØ PLAY playlist' : 'Your playlist') + ' • ' + list.length + ' ' + (list.length === 1 ? 'song' : 'songs') + '</p>' +
    '<div style="display:flex;gap:10px;margin-top:10px">' +
    '<button class="btn btn-gold btn-sm" data-action="play-all" data-id="' + esc(list[0] && list[0].id) + '">▶ Play All</button>' +
    (pl.builtin ? '' : '<button class="btn btn-ghost btn-sm" data-action="delete-playlist" data-id="' + pl.id + '">Delete</button>') +
    '</div></div></div></div>' +
    '<div class="track-list">' + list.map(trackRow).join('') + '</div>';
  $('#main').insertAdjacentHTML('afterbegin', '<section id="detail-view" class="page-section active" aria-label="' + esc(pl.name) + '">' + html + '</section>');
  switchSection('detail-view');
  syncPlayingUI();
}

function closeDetailView() {
  const el = $('#detail-view');
  if (el) el.remove();
}
/* ============================================================
   14. SEARCH SYSTEM
   ============================================================ */
const TITLES = {
  home: 'NΞXXØ PLAY — Your music. Your mood. Your world.',
  discover: 'Discover — NΞXXØ PLAY',
  songs: 'Songs — NΞXXØ PLAY',
  artists: 'Artists — NΞXXØ PLAY',
  albums: 'Albums — NΞXXØ PLAY',
  playlists: 'Playlists — NΞXXØ PLAY',
  favorites: 'Favorites — NΞXXØ PLAY',
  recent: 'Recently Played — NΞXXØ PLAY',
  downloads: 'Downloads — NΞXXØ PLAY',
  settings: 'Settings — NΞXXØ PLAY',
  about: 'NEXXO TECH — Owner of NΞXXØ PLAY'
};

function groupHead(label) {
  return '<div class="sr-head">' + label + '</div>';
}

function srSong(song) {
  return (
    '<button class="sr-item" data-action="play" data-id="' + song.id + '" aria-label="Play ' + esc(song.title) + '">' +
    '<img loading="lazy" src="' + song.cover + '" alt="" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<span class="sr-info"><span class="sr-title">' + esc(song.title) + '</span>' +
    '<span class="sr-sub">' + esc(song.artist) + ' • ' + esc(song.album) + '</span></span>' +
    '<span class="sr-tag">Song</span></button>'
  );
}

function srArtist(artist) {
  return (
    '<button class="sr-item" data-action="open-artist" data-id="' + artist.id + '" aria-label="Open artist ' + esc(artist.name) + '">' +
    '<img loading="lazy" src="' + artist.image + '" alt="" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<span class="sr-info"><span class="sr-title">' + esc(artist.name) + '</span>' +
    '<span class="sr-sub">' + songsByArtist(artist.name).length + ' songs</span></span>' +
    '<span class="sr-tag">Artist</span></button>'
  );
}

function srAlbum(album) {
  return (
    '<button class="sr-item" data-action="open-album" data-id="' + album.id + '" aria-label="Open album ' + esc(album.title) + '">' +
    '<img loading="lazy" src="' + album.cover + '" alt="" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<span class="sr-info"><span class="sr-title">' + esc(album.title) + '</span>' +
    '<span class="sr-sub">' + esc(album.artist) + ' • ' + album.year + '</span></span>' +
    '<span class="sr-tag">Album</span></button>'
  );
}

function srPlaylist(pl) {
  return (
    '<button class="sr-item" data-action="open-playlist" data-id="' + pl.id + '" aria-label="Open playlist ' + esc(pl.name) + '">' +
    '<img loading="lazy" src="' + playlistCover(pl) + '" alt="" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<span class="sr-info"><span class="sr-title">' + esc(pl.name) + '</span>' +
    '<span class="sr-sub">' + pl.songIds.length + ' songs</span></span>' +
    '<span class="sr-tag">Playlist</span></button>'
  );
}

function suggestionChips(q) {
  const genres = [...new Set(songs.map(s => s.genre))].filter(g => g.toLowerCase().includes(q));
  const names = artists.map(a => a.name).filter(n => n.toLowerCase().includes(q));
  const chips = [...genres, ...names].slice(0, 6);
  if (!chips.length) return '';
  return '<div class="chips" style="padding:4px 8px 10px">' +
    chips.map(c => '<button class="chip" data-suggest="' + esc(c) + '">' + esc(c) + '</button>').join('') +
    '</div>';
}

function performSearch(q) {
  q = (q || '').trim().toLowerCase();
  const panel = $('#searchResults');
  if (!q) { panel.hidden = true; $('#clearSearchBtn').hidden = true; return; }
  $('#clearSearchBtn').hidden = false;

  const songHits = songs.filter(s =>
    [s.title, s.artist, s.album, s.genre].some(f => f.toLowerCase().includes(q)));
  const artistHits = artists.filter(a => a.name.toLowerCase().includes(q));
  const albumHits = albums.filter(a =>
    a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q));
  const plHits = allPlaylists().filter(p => p.name.toLowerCase().includes(q));
  const total = songHits.length + artistHits.length + albumHits.length + plHits.length;

  let html = '';
  if (!total) {
    html =
      '<div class="empty-state" style="padding:30px 14px">' +
      '<span class="es-icon" style="width:56px;height:56px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>' +
      '<span class="es-title">No music found</span>' +
      '<span class="es-text">We couldn\'t find anything for “' + esc(q) + '”. Try a song, artist, album or genre.</span></div>';
    const sugg = suggestionChips(q);
    if (sugg) html += groupHead('Suggestions') + sugg;
  } else {
    if (songHits.length) html += groupHead('Songs') + songHits.slice(0, 5).map(srSong).join('');
    if (artistHits.length) html += groupHead('Artists') + artistHits.slice(0, 3).map(srArtist).join('');
    if (albumHits.length) html += groupHead('Albums') + albumHits.slice(0, 3).map(srAlbum).join('');
    if (plHits.length) html += groupHead('Playlists') + plHits.slice(0, 3).map(srPlaylist).join('');
  }
  panel.innerHTML = html;
  panel.hidden = false;
}

function hideSearchResults() { $('#searchResults').hidden = true; }

/* ============================================================
   15. DETAIL VIEWS — FINAL VERSIONS
   ------------------------------------------------------------
   NOTE: These override the earlier definitions in this script
   (JavaScript keeps the last function definition). They add
   data-return, "Add Songs" and per-track remove for playlists.
   ============================================================ */
function switchSection(name) {
  $$('.page-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === (name === 'detail-view' ? 'detail-view' : 'section-' + name));
  });
  $$('[data-nav]').forEach(b => b.classList.remove('active'));
}

function trackRowPlaylist(song, plId) {
  return (
    '<div class="track-row" data-action="play" data-id="' + song.id + '" role="button" tabindex="0" aria-label="Play ' + esc(song.title) + '">' +
    '<div class="tr-cover">' +
    '<img loading="lazy" src="' + song.cover + '" alt="Cover of ' + esc(song.title) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<span class="tr-play">' + ICON_PLAY + '</span></div>' +
    '<div class="tr-main">' +
    '<span class="tr-title"><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>' + esc(song.title) + '</span>' +
    '<span class="tr-artist">' + esc(song.artist) + '</span></div>' +
    '<span class="tr-meta">' + esc(song.album) + '</span>' +
    '<span class="tr-time">' + fmtTime(song.duration) + '</span>' +
    '<div class="tr-actions">' +
    '<button class="icon-btn heart-btn" data-action="fav" data-id="' + song.id + '" aria-label="Add to favorites">' + svgHeart() + '</button>' +
    '<button class="icon-btn" data-action="remove-from-playlist" data-pl="' + plId + '" data-id="' + song.id + '" aria-label="Remove from playlist">' + svgClose() + '</button>' +
    '</div></div>'
  );
}

function renderArtistSongs(artistName) {
  const artist = getArtist(artistName);
  const list = songsByArtist(artistName);
  closeDetailView();
  const html =
    '<div class="page-head">' +
    '<button class="btn btn-ghost btn-sm" data-action="back">← Back to Artists</button>' +
    '<div style="display:flex;align-items:center;gap:18px;margin-top:18px;flex-wrap:wrap">' +
    '<img src="' + (artist ? artist.image : FALLBACK_COVER) + '" alt="' + esc(artistName) + '" style="width:92px;height:92px;border-radius:50%;object-fit:cover;box-shadow:var(--shadow-gold)" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<div><h1 style="margin:0">' + esc(artistName) + '</h1>' +
    '<p style="margin-top:4px">' + list.length + ' ' + (list.length === 1 ? 'song' : 'songs') + '</p>' +
    '<button class="btn btn-gold btn-sm" style="margin-top:10px" data-action="play-all" data-id="' + esc(list[0] && list[0].id) + '">▶ Play All</button>' +
    '</div></div></div>' +
    '<div class="track-list">' + (list.length ? list.map(trackRow).join('') : emptyState('No songs yet', 'This artist has no songs yet.')) + '</div>';
  $('#main').insertAdjacentHTML('afterbegin', '<section id="detail-view" class="page-section active" data-return="artists" aria-label="' + esc(artistName) + '">' + html + '</section>');
  switchSection('detail-view');
  syncPlayingUI();
}

function renderAlbumSongs(album) {
  const list = album.songIds.map(getSong).filter(Boolean);
  closeDetailView();
  const html =
    '<div class="page-head">' +
    '<button class="btn btn-ghost btn-sm" data-action="back">← Back to Albums</button>' +
    '<div style="display:flex;align-items:center;gap:18px;margin-top:18px;flex-wrap:wrap">' +
    '<img src="' + album.cover + '" alt="Cover of ' + esc(album.title) + '" style="width:110px;height:110px;border-radius:16px;object-fit:cover;box-shadow:var(--shadow-gold)" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<div><h1 style="margin:0">' + esc(album.title) + '</h1>' +
    '<p style="margin-top:4px">' + esc(album.artist) + ' • ' + album.year + ' • ' + list.length + ' ' + (list.length === 1 ? 'track' : 'tracks') + '</p>' +
    '<button class="btn btn-gold btn-sm" style="margin-top:10px" data-action="play-all" data-id="' + esc(list[0] && list[0].id) + '">▶ Play All</button>' +
    '</div></div></div>' +
    '<div class="track-list">' + (list.length ? list.map(trackRow).join('') : emptyState('No tracks', 'This album has no tracks yet.')) + '</div>';
  $('#main').insertAdjacentHTML('afterbegin', '<section id="detail-view" class="page-section active" data-return="albums" aria-label="' + esc(album.title) + '">' + html + '</section>');
  switchSection('detail-view');
  syncPlayingUI();
}

function renderPlaylistSongs(pl) {
  const list = pl.songIds.map(getSong).filter(Boolean);
  closeDetailView();
  const html =
    '<div class="page-head">' +
    '<button class="btn btn-ghost btn-sm" data-action="back">← Back to Playlists</button>' +
    '<div style="display:flex;align-items:center;gap:18px;margin-top:18px;flex-wrap:wrap">' +
    '<img src="' + playlistCover(pl) + '" alt="Cover of ' + esc(pl.name) + '" style="width:110px;height:110px;border-radius:16px;object-fit:cover;box-shadow:var(--shadow-gold)" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<div><h1 style="margin:0">' + esc(pl.name) + '</h1>' +
    '<p style="margin-top:4px">' + (pl.builtin ? 'NΞXXØ PLAY playlist' : 'Your playlist') + ' • ' + list.length + ' ' + (list.length === 1 ? 'song' : 'songs') + '</p>' +
    '<div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">' +
    '<button class="btn btn-gold btn-sm" data-action="play-all" data-id="' + esc(list[0] && list[0].id) + '">▶ Play All</button>' +
    (pl.builtin ? '' :
      '<button class="btn btn-ghost btn-sm" data-action="add-songs" data-id="' + pl.id + '">+ Add Songs</button>' +
      '<button class="btn btn-ghost btn-sm" data-action="delete-playlist" data-id="' + pl.id + '">Delete</button>') +
    '</div></div></div></div>' +
    '<div class="track-list">' + (list.length ? list.map(s => trackRowPlaylist(s, pl.id)).join('') : emptyState('This playlist is empty', 'Use “Add Songs” to fill it up.')) + '</div>';
  $('#main').insertAdjacentHTML('afterbegin', '<section id="detail-view" class="page-section active" data-return="playlists" aria-label="' + esc(pl.name) + '">' + html + '</section>');
  switchSection('detail-view');
  syncPlayingUI();
}

function closeDetailView() {
  const el = $('#detail-view');
  if (el) el.remove();
}

/* ============================================================
   16. NAVIGATION
   ============================================================ */
function navigateTo(name) {
  closeDetailView();
  closeDropdown();
  closeQueue();
  closeFullscreen();
  hideSearchResults();

  $$('.page-section').forEach(sec => sec.classList.toggle('active', sec.id === 'section-' + name));
  $$('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === name));

  $('#sidebar').classList.remove('open');
  $('#sidebarBackdrop').hidden = true;

  const renders = {
    home: renderHome,
    discover: renderDiscover,
    songs: renderSongs,
    artists: renderArtists,
    albums: renderAlbums,
    playlists: renderPlaylists,
    favorites: renderFavorites,
    recent: renderRecent,
    downloads: renderDownloads
  };
  if (renders[name]) renders[name]();

  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.title = TITLES[name] || 'NΞXXØ PLAY';
  syncHearts();
  syncPlayingUI();
}

/* ============================================================
   17. DROPDOWN (… more button)
   ============================================================ */
const menuItem = (action, id, icon, label) =>
  '<button class="menu-item" data-menu="' + action + '" data-id="' + id + '">' + icon + label + '</button>';

function openDropdown(anchor, songId) {
  closeDropdown();
  const song = getSong(songId);
  if (!song) return;
  const d = document.createElement('div');
  d.className = 'dropdown';
  d.id = 'dropdown';
  d.setAttribute('role', 'menu');
  d.innerHTML =
    '<div class="menu-title">' + esc(song.title) + '</div>' +
    menuItem('play', songId, ICON_PLAY, 'Play Now') +
    menuItem('queue', songId, svgQueue(), 'Add to Queue') +
    menuItem('playlist', songId, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>', 'Add to Playlist') +
    menuItem('fav', songId, svgHeart(), isFav(songId) ? 'Remove from Favorites' : 'Add to Favorites') +
    (song.downloadable
      ? menuItem('download', songId, svgDownload(), 'Download')
      : '<button class="menu-item" disabled style="opacity:.45;cursor:not-allowed" title="Streaming-only track">' + svgDownload() + 'Download unavailable for this track</button>') +
    '<button class="menu-item danger" data-menu="close">' + svgClose() + 'Close</button>';
  document.body.appendChild(d);

  const r = anchor.getBoundingClientRect();
  const dw = d.offsetWidth;
  const dh = d.offsetHeight;
  let x = r.left + r.width / 2 - dw / 2;
  let y = r.bottom + 8;
  if (x < 8) x = 8;
  if (x + dw > window.innerWidth - 8) x = window.innerWidth - dw - 8;
  if (y + dh > window.innerHeight - 8) y = Math.max(8, r.top - dh - 8);
  d.style.left = x + 'px';
  d.style.top = y + 'px';
}

function closeDropdown() {
  const d = $('#dropdown');
  if (d) d.remove();
}

function handleMenu(menu, id) {
  switch (menu) {
    case 'play': playSong(id, collectContextIds($('#dropdown')) || null); break;
    case 'queue': addToQueue(id); break;
    case 'playlist': openAddToPlaylistModal(id); break;
    case 'fav': toggleFav(id); break;
    case 'download': downloadSong(id); break;
    case 'close': break;
  }
}

/* ============================================================
   18. DOWNLOAD (only for downloadable sources)
   ============================================================ */
async function downloadSong(id) {
  const song = getSong(id);
  if (!song) return;
  if (!song.downloadable) {
    showToast('Download unavailable for this track', 'error');
    return;
  }
  showToast('Preparing download…', 'info');
  try {
    const res = await fetch(song.audio);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (song.title + ' - ' + song.artist).replace(/[\\/:*?"<>|]/g, '') + '.mp3';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    showToast('Download started: ' + song.title, 'success');
  } catch (e) {
    showToast('Download unavailable for this track', 'error');
  }
}

/* ============================================================
   19. PLAYLIST MODALS
   ============================================================ */
function modalPickRow(song) {
  return (
    '<button class="modal-pick" data-action="toggle-pick" data-id="' + song.id + '" role="checkbox" aria-checked="false">' +
    '<img loading="lazy" src="' + song.cover + '" alt="Cover of ' + esc(song.title) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
    '<span class="mp-info"><span class="mp-title">' + esc(song.title) + '</span>' +
    '<span class="mp-sub">' + esc(song.artist) + ' • ' + esc(song.album) + '</span></span>' +
    '<span class="mp-check">' + svgCheck() + '</span></button>'
  );
}

function openCreatePlaylistModal() {
  state.pickSet.clear();
  openModal('Create Playlist',
    '<p class="modal-sub">Name your playlist — you can add songs now or later.</p>' +
    '<div class="modal-field"><label for="plName">Playlist name</label>' +
    '<input type="text" id="plName" placeholder="e.g. My Summer Mix" maxlength="40"></div>' +
    '<div class="modal-pick-list">' + songs.map(modalPickRow).join('') + '</div>' +
    '<div class="modal-actions">' +
    '<button class="btn btn-ghost" data-action="close-modal">Cancel</button>' +
    '<button class="btn btn-gold" data-action="confirm-create-playlist">Create Playlist</button>' +
    '</div>');
}

function openSongPicker(plId) {
  state.pickSet.clear();
  state.pickedPlId = plId;
  const pl = getPlaylist(plId);
  openModal('Add Songs to ' + (pl ? pl.name : 'Playlist'),
    '<p class="modal-sub">Select songs to add, then confirm.</p>' +
    '<div class="modal-pick-list">' + songs.map(modalPickRow).join('') + '</div>' +
    '<div class="modal-actions">' +
    '<button class="btn btn-ghost" data-action="close-modal">Cancel</button>' +
    '<button class="btn btn-gold" data-action="confirm-add-songs">Add Selected</button>' +
    '</div>');
}

function openAddToPlaylistModal(songId) {
  const song = getSong(songId);
  const pls = allPlaylists();
  const rows = pls.length
    ? pls.map(pl =>
      '<button class="modal-pick" data-action="add-to-playlist" data-pl="' + songId + '" data-id="' + pl.id + '">' +
      '<img loading="lazy" src="' + playlistCover(pl) + '" alt="Cover of ' + esc(pl.name) + '" onerror="this.onerror=null;this.src=window.FALLBACK_COVER">' +
      '<span class="mp-info"><span class="mp-title">' + esc(pl.name) + '</span>' +
      '<span class="mp-sub">' + pl.songIds.length + ' songs</span></span>' +
      '<span class="mp-check">' + svgCheck() + '</span></button>'
    ).join('')
    : '<p class="modal-sub">No playlists yet — create one first.</p>';
  openModal('Add to Playlist',
    '<p class="modal-sub">Pick a playlist for “' + esc(song ? song.title : '') + '”.</p>' +
    '<div class="modal-pick-list">' + rows + '</div>' +
    (pls.length ? '' : '<button class="btn btn-gold" data-action="create-playlist">+ Create Playlist</button>'));
}

function togglePick(id) {
  const row = $('#modalBox .modal-pick[data-id="' + id + '"]');
  if (!row) return;
  const on = state.pickSet.has(id);
  if (on) state.pickSet.delete(id); else state.pickSet.add(id);
  row.classList.toggle('picked', !on);
  row.setAttribute('aria-checked', String(!on));
}

function confirmCreatePlaylist() {
  const name = ($('#plName') ? $('#plName').value : '').trim();
  if (!name) { showToast('Please enter a playlist name', 'error'); return; }
  const newPl = { id: uid(), name: name, songIds: [...state.pickSet], createdAt: Date.now() };
  userPlaylists.push(newPl);
  saveUserPlaylists();
  closeModal();
  renderPlaylists();
  showToast('Playlist Created', 'success');
}

function confirmAddSongs() {
  const pl = getPlaylist(state.pickedPlId);
  if (pl && !pl.builtin) {
    state.pickSet.forEach(id => { if (!pl.songIds.includes(id)) pl.songIds.push(id); });
    saveUserPlaylists();
    showToast('Added to Playlist', 'success');
  }
  closeModal();
  closeDetailView();
  if (pl && !pl.builtin) renderPlaylistSongs(pl);
  renderPlaylists();
}

function addSongToPlaylist(songId, plId) {
  const pl = getPlaylist(plId);
  if (!pl || pl.builtin) return;
  if (pl.songIds.includes(songId)) { showToast('Already in playlist', 'info'); closeModal(); return; }
  pl.songIds.push(songId);
  saveUserPlaylists();
  closeModal();
  renderPlaylists();
  showToast('Added to Playlist', 'success');
  const det = $('#detail-view');
  if (det && det.dataset.return === 'playlists') { closeDetailView(); renderPlaylistSongs(getPlaylist(plId)); }
}

function removeSongFromPlaylist(plId, songId) {
  const pl = userPlaylists.find(p => p.id === plId);
  if (!pl) return;
  pl.songIds = pl.songIds.filter(id => id !== songId);
  saveUserPlaylists();
  showToast('Removed from playlist', 'info');
  closeDetailView();
  renderPlaylistSongs(pl);
}

function deletePlaylist(id) {
  const pl = userPlaylists.find(p => p.id === id);
  if (!pl) return;
  confirmAction('Delete Playlist', 'Delete "' + pl.name + '"? This cannot be undone.', 'Delete', () => {
    userPlaylists = userPlaylists.filter(p => p.id !== id);
    saveUserPlaylists();
    renderPlaylists();
    closeDetailView();
    navigateTo('playlists');
    showToast('Playlist deleted', 'info');
  });
}

/* ============================================================
   20. SETTINGS
   ============================================================ */
function setSwitch(btn, on) { if (btn) btn.setAttribute('aria-checked', String(on)); }

function applyTheme() { document.documentElement.dataset.theme = settings.theme; }
function applyMotion() { document.body.classList.toggle('no-anim', settings.reduceMotion); }

function applySettings() {
  applyTheme();
  applyMotion();
  $('#themeSelect').value = settings.theme;
  setSwitch($('#autoplayToggle'), settings.autoplay);
  setSwitch($('#motionToggle'), settings.reduceMotion);
  setVolume(settings.volume);
}

function renderAll() {
  renderGenreFilter();
  renderHome();
  renderDiscover();
  renderSongs();
  renderArtists();
  renderAlbums();
  renderPlaylists();
  renderFavorites();
  renderRecent();
  renderDownloads();
  syncHearts();
  updatePlayerUI();
  updateProgress();
  updateVolIcon();
}

/* ============================================================
   21. API LOADER (with automatic local fallback)
   ============================================================ */
async function loadMusicData() {
  if (!API_CONFIG.enabled || !API_CONFIG.endpoint) return;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(API_CONFIG.endpoint, { signal: ctrl.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (Array.isArray(data.songs) && data.songs.length) {
      songs = data.songs;
      if (Array.isArray(data.artists) && data.artists.length) artists = data.artists;
      if (Array.isArray(data.albums) && data.albums.length) albums = data.albums;
      showToast('Connected to music API', 'success');
    } else {
      throw new Error('Empty library from API');
    }
  } catch (e) {
    showToast('Music API unavailable — using local library', 'info');
  } finally {
    clearTimeout(timer);
  }
}

/* ============================================================
   22. GLOBAL EVENT DELEGATION & HELPERS
   ============================================================ */
function collectContextIds(el) {
  const scope = el.closest('.cards-grid, .cards-row, .track-list, .search-results');
  if (!scope) return null;
  const ids = [...new Set($$('[data-action="play"][data-id]', scope).map(n => n.dataset.id))];
  return ids.length ? ids : null;
}

function handleAction(actionEl, e) {
  const a = actionEl.dataset.action;
  const id = actionEl.dataset.id;
  switch (a) {
    case 'play': {
      if (id) playSong(id, collectContextIds(actionEl));
      break;
    }
    case 'fav': toggleFav(id); break;
    case 'more': openDropdown(actionEl, id); break;
    case 'open-artist': {
      const art = artists.find(x => x.id === id);
      if (art) renderArtistSongs(art.name);
      hideSearchResults();
      break;
    }
    case 'open-album': {
      const al = getAlbumById(id);
      if (al) renderAlbumSongs(al);
      hideSearchResults();
      break;
    }
    case 'open-playlist': {
      const pl = getPlaylist(id);
      if (pl) renderPlaylistSongs(pl);
      hideSearchResults();
      break;
    }
    case 'play-all': {
      if (id) {
        const ids = $$('#detail-view [data-action="play"][data-id]').map(n => n.dataset.id);
        playSong(id, ids.length ? ids : null);
      }
      break;
    }
    case 'back': {
      const det = $('#detail-view');
      const ret = det ? det.dataset.return : null;
      closeDetailView();
      navigateTo(ret || 'songs');
      break;
    }
    case 'delete-playlist': deletePlaylist(id); break;
    case 'add-songs': openSongPicker(id); break;
    case 'remove-from-playlist': removeSongFromPlaylist(actionEl.dataset.pl, id); break;
    case 'play-queue': loadAndPlay(parseInt(actionEl.dataset.index, 10)); break;
    case 'queue-remove': removeFromQueue(parseInt(actionEl.dataset.index, 10)); break;
    case 'create-playlist': openCreatePlaylistModal(); break;
    case 'add-to-playlist': addSongToPlaylist(actionEl.dataset.pl, id); break;
    case 'toggle-pick': togglePick(id); break;
    case 'confirm-create-playlist': confirmCreatePlaylist(); break;
    case 'confirm-add-songs': confirmAddSongs(); break;
    case 'download': downloadSong(id); break;
    case 'close-modal': closeModal(); break;
    case 'close-queue': closeQueue(); break;
  }
}

function globalClickHandler(e) {
  // Dropdown menu
  const dd = e.target.closest('.dropdown');
  if (dd) {
    const mi = e.target.closest('[data-menu]');
    if (mi) handleMenu(mi.dataset.menu, mi.dataset.id);
    return;
  }
  // Search suggestion chip
  const sug = e.target.closest('[data-suggest]');
  if (sug) {
    $('#searchInput').value = sug.dataset.suggest;
    performSearch(sug.dataset.suggest);
    $('#searchInput').focus();
    return;
  }
  // Discover category chip
  const cat = e.target.closest('.chip[data-cat]');
  if (cat) {
    state.discoverCat = cat.dataset.cat;
    renderDiscover();
    return;
  }
  // Navigation
  const nav = e.target.closest('[data-nav]');
  if (nav) { navigateTo(nav.dataset.nav); return; }
  // Data actions
  const act = e.target.closest('[data-action]');
  if (act) {
    handleAction(act, e);
    if (act.dataset.action !== 'more') closeDropdown();
    return;
  }
  // Outside clicks
  closeDropdown();
  if (!e.target.closest('.search-wrap')) hideSearchResults();
}

function imgErrorHandler(e) {
  const t = e.target;
  if (t && t.tagName === 'IMG' && !t.dataset.fb) {
    t.dataset.fb = '1';
    t.src = FALLBACK_COVER;
  }
}

function keyHandler(e) {
  if (e.key === 'Escape') {
    closeDropdown();
    hideSearchResults();
    closeQueue();
    closeModal();
    closeFullscreen();
    return;
  }
  const t = e.target;
  const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
  if (e.code === 'Space' && !typing) {
    const modal = $('#modalOverlay');
    if (modal.style.display !== 'flex') { e.preventDefault(); togglePlay(); }
  }
}

/* ============================================================
   23. EVENT REGISTRATION
   ============================================================ */
function registerEvents() {
  /* ---------- Search ---------- */
  $('#searchInput').addEventListener('input', debounce(() => performSearch($('#searchInput').value), 180));
  $('#searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = $('#searchResults [data-action="play"]');
      if (first) playSong(first.dataset.id, collectContextIds(first));
    }
  });
  $('#clearSearchBtn').addEventListener('click', () => {
    $('#searchInput').value = '';
    hideSearchResults();
    $('#clearSearchBtn').hidden = true;
    $('#searchInput').focus();
  });

  /* ---------- Desktop player bar ---------- */
  $('#btnPlay').addEventListener('click', togglePlay);
  $('#btnNext').addEventListener('click', () => nextTrack(false));
  $('#btnPrev').addEventListener('click', prevTrack);
  $('#btnShuffle').addEventListener('click', toggleShuffle);
  $('#btnRepeat').addEventListener('click', cycleRepeat);
  $('#btnLike').addEventListener('click', () => { if (state.currentSongId) toggleFav(state.currentSongId); });
  $('#btnQueue').addEventListener('click', openQueue);
  $('#progBar').addEventListener('input', (e) => seekTo(parseFloat(e.target.value)));
  $('#volSlider').addEventListener('input', (e) => setVolume(parseFloat(e.target.value)));
  $('#volBtn').addEventListener('click', () => { audio.muted = !audio.muted; updateVolIcon(); });

  /* ---------- Mini + Fullscreen player ---------- */
  $('#miniMain').addEventListener('click', openFullscreen);
  $('#miniPlay').addEventListener('click', togglePlay);
  $('#fsClose').addEventListener('click', closeFullscreen);
  $('#fsLike').addEventListener('click', () => { if (state.currentSongId) toggleFav(state.currentSongId); });
  $('#fsPlay').addEventListener('click', togglePlay);
  $('#fsNext').addEventListener('click', () => nextTrack(false));
  $('#fsPrev').addEventListener('click', prevTrack);
  $('#fsShuffle').addEventListener('click', toggleShuffle);
  $('#fsRepeat').addEventListener('click', cycleRepeat);
  $('#fsQueue').addEventListener('click', openQueue);
  $('#fsProg').addEventListener('input', (e) => seekTo(parseFloat(e.target.value)));

  /* ---------- Queue panel ---------- */
  $('#queueClose').addEventListener('click', closeQueue);
  $('#panelBackdrop').addEventListener('click', closeQueue);
  $('#btnClearQueue').addEventListener('click', clearQueue);

  /* ---------- Mobile chrome ---------- */
  $('#hamburgerBtn').addEventListener('click', () => {
    $('#sidebar').classList.add('open');
    $('#sidebarBackdrop').hidden = false;
  });
  $('#sidebarBackdrop').addEventListener('click', () => {
    $('#sidebar').classList.remove('open');
    $('#sidebarBackdrop').hidden = true;
  });
  $('#searchToggleBtn').addEventListener('click', () => {
    $('#searchInput').focus();
    $('#searchInput').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---------- Songs toolbar ---------- */
  $('#genreFilter').addEventListener('change', renderSongs);
  $('#sortSongs').addEventListener('change', renderSongs);
  $('#btnPlayAll').addEventListener('click', () => {
    const ids = $$('#songsGrid [data-action="play"][data-id]').map(n => n.dataset.id);
    if (ids.length) playSong(ids[0], ids);
    else showToast('No songs available', 'info');
  });

  /* ---------- Playlists ---------- */
  $('#btnCreatePlaylist').addEventListener('click', openCreatePlaylistModal);

  /* ---------- Settings ---------- */
  $('#themeSelect').addEventListener('change', (e) => {
    settings.theme = e.target.value;
    applyTheme();
    saveSettings();
    showToast('Theme updated', 'success');
  });
  $('#autoplayToggle').addEventListener('click', () => {
    settings.autoplay = !settings.autoplay;
    setSwitch($('#autoplayToggle'), settings.autoplay);
    saveSettings();
    showToast(settings.autoplay ? 'Autoplay On' : 'Autoplay Off');
  });
  $('#motionToggle').addEventListener('click', () => {
    settings.reduceMotion = !settings.reduceMotion;
    applyMotion();
    saveSettings();
    showToast(settings.reduceMotion ? 'Reduced animations on' : 'Animations restored');
  });
  $('#settingsVolume').addEventListener('input', (e) => setVolume(parseFloat(e.target.value)));

  $('#btnClearRecent').addEventListener('click', () =>
    confirmAction('Clear Recently Played', 'This removes your playback history.', 'Clear', () => {
      recentIds = [];
      saveRecent();
      renderRecent();
      showToast('Recently played cleared', 'info');
    }));
  $('#btnClearFavs').addEventListener('click', () =>
    confirmAction('Clear Favorites', 'This removes all favorite songs.', 'Clear', () => {
      favIds = [];
      saveFavs();
      syncHearts();
      renderFavorites();
      showToast('Favorites cleared', 'info');
    }));
  $('#btnClearPlaylists').addEventListener('click', () =>
    confirmAction('Clear Playlists', 'This deletes every playlist you created. Built-in playlists stay.', 'Clear', () => {
      userPlaylists = [];
      saveUserPlaylists();
      renderPlaylists();
      showToast('Playlists cleared', 'info');
    }));
  $('#btnClearAll').addEventListener('click', () =>
    confirmAction('Reset Everything', 'This clears favorites, playlists, recently played and all settings.', 'Reset', () => {
      localStorage.removeItem(K.favs);
      localStorage.removeItem(K.playlists);
      localStorage.removeItem(K.recent);
      localStorage.removeItem(K.settings);
      favIds = [];
      recentIds = [];
      userPlaylists = [];
      settings = { ...defaultSettings };
      applySettings();
      saveSettings();
      renderAll();
      syncHearts();
      updatePlayerUI();
      showToast('All local data cleared', 'success');
    }));

  /* ---------- Owner / footer links ---------- */
  const waHref = 'https://wa.me/2349051906943?text=' + encodeURIComponent('Hello NEXXO TECH! I found you through NΞXXØ PLAY.');
  const waBtn = $('#btnWhatsApp');
  if (waBtn) waBtn.href = waHref;
  ['footerContact', 'footerContact2', 'footerContact3'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', () => window.open(waHref, '_blank', 'noopener'));
  });
  ['footerChannel', 'footerChannel2'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', () => window.open('https://whatsapp.com/channel/0029VbDhLCrKmCPMvaFrOn0z', '_blank', 'noopener'));
  });

  /* ---------- Global listeners ---------- */
  document.addEventListener('click', globalClickHandler);
  document.addEventListener('error', imgErrorHandler, true);
  document.addEventListener('keydown', keyHandler);
  window.addEventListener('scroll', closeDropdown, { passive: true });
  window.addEventListener('resize', debounce(() => { syncPlayerVisibility(); closeDropdown(); }, 150));
}

/* ============================================================
   24. INITIALIZATION
   ============================================================ */
async function init() {
  await loadMusicData(); // falls back to local library automatically

  // Demo of the "download unavailable" state (streaming-only tracks)
  songs.forEach(s => { if (s.id === 's5' || s.id === 's17') s.downloadable = false; });

  applySettings();
  renderAll();
  registerEvents();

  window.scrollTo(0, 0);

  // Loading screen → reveal app
  setTimeout(() => {
    const ls = $('#loadingScreen');
    ls.classList.add('done');
    const app = $('#app');
    app.hidden = false;
    app.style.opacity = '0';
    app.style.transition = 'opacity 0.7s ease';
    requestAnimationFrame(() => { app.style.opacity = '1'; });
    setTimeout(() => ls.remove(), 800);
  }, 1100);
}

document.addEventListener('DOMContentLoaded', init);
