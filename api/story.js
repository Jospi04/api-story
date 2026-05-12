import axios from 'axios'
import qs from 'qs'
import spotify from 'spotify-clients'

function formatMs(ms) {
    let minutes = Math.floor(ms / 60000)
    let seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds.padStart(2, '0')}`
}

async function spotifyDownload(url) {
    try {
        // Obtener token CSRF
        const getPage = await axios.get('https://spotmate.online/en')

        const token = getPage.data.match(
            /<meta name="csrf-token" content="(.*?)"/
        )?.[1]

        const cookie = getPage.headers['set-cookie']
            ?.map(v => v.split(';')[0])
            .join('; ')

        const client = axios.create({
            baseURL: 'https://spotmate.online',
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-csrf-token': token,
                'x-requested-with': 'XMLHttpRequest',
                cookie,
                origin: 'https://spotmate.online',
                referer: 'https://spotmate.online/en',
                'user-agent': 'Mozilla/5.0'
            }
        })

        // Convertir
        const convert = await client.post(
            '/convert',
            qs.stringify({
                urls: url
            })
        )

        return convert.data
    } catch (err) {
        console.log(err)
        return null
    }
}

let handler = async (m, { conn, text }) => {

    if (!text) {
        return m.reply('Ingresa el nombre de una canción')
    }

    try {

        // Buscar canción
        const search = await spotify.search(text)

        if (!search?.tracks?.length) {
            return m.reply('No encontré esa canción')
        }

        const song = search.tracks[0]

        // Descargar
        const dl = await spotifyDownload(song.url)

        if (!dl?.url) {
            return m.reply('Error descargando la canción')
        }

        let caption = `
╭━━━〔 SPOTIFY PLAY 〕━━━⬣
┃🎵 Título: ${song.name}
┃👤 Artista: ${song.artists.map(v => v.name).join(', ')}
┃⏱️ Duración: ${formatMs(song.duration_ms)}
╰━━━━━━━━━━━━━━⬣
`

        await conn.sendMessage(m.chat, {
            image: { url: song.album.images[0].url },
            caption
        }, { quoted: m })

        await conn.sendMessage(m.chat, {
            audio: { url: dl.url },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: m })

    } catch (e) {
        console.log(e)
        m.reply('Error al procesar la canción')
    }
}

handler.command = ['spotifyplay', 'sp']
handler.tags = ['downloader']
handler.help = ['spotifyplay <nombre>']

export default handler