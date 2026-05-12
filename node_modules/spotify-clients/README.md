# Spotify Clients

A lightweight, fast, and completely **dependency-free** JavaScript library to interact with the Spotify Web API and download tracks.

Features a native `fetch` instance that mimics Axios behavior, and supports both CommonJS (CJS) & ECMAScript Modules (ESM) environments out of the box!

## 📦 Setup

Place this module in your project. No `npm install` of third-party dependencies required!

## 🚀 Usage

### CommonJS (CJS)
```javascript
const sp = require('./spotify-clients');

async function test() {
    // Search 
    const res = await sp.search("blue");
    console.log(res);
}

test();
```

### ES Modules (ESM)
```javascript
import sp, { search, download } from './spotify-clients';

// Using Default Export
const res = await sp.search("blue");
console.log(res);

// Using Named Exports
const trackData = await download('https://open.spotify.com/track/23WxsmliKISYaCfam8iPPG');
console.log(trackData);
```

## ✨ Features
- **`sp.search(query)`** - Search for tracks, albums, artists, podcasts, and playlists.
- **`sp.track(id)`** - Get detailed information about a specific Spotify track.
- **`sp.artist(id)`** - Fetch an artist's profile, header image, stats, and top tracks.
- **`sp.album(id)`** - Retrieve album metadata and partial tracklists.
- **`sp.playlist(id)`** - Get a public playlist along with its tracks.
- **`sp.download(url)`** - Parse a Spotify URL to extract a direct high-quality download URL.
