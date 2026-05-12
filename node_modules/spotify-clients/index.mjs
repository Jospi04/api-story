import sp from './index.js';

export const search = sp.search.bind(sp);
export const track = sp.track.bind(sp);
export const artist = sp.artist.bind(sp);
export const album = sp.album.bind(sp);
export const playlist = sp.playlist.bind(sp);

export const download = sp.download;
export const Parser = sp.Parser;
export const Spotify = sp.Spotify;

export default sp;
