const sp = require('./index.js'); // Import module from local index.js

async function runTests() {
    console.log("Starting Spotify Clients testing process...\n");

    try {
        // 1. Test Search
        console.log("1. Testing Search ('a thousand years jvke')...");
        const searchResult = await sp.search("a thousand years jvke");
        console.log("   [Success] Found", searchResult?.top_results?.length || 0, "Top Results.");
        if (searchResult?.top_results?.length > 0) {
            console.log("   -> Top #1:", searchResult.top_results[0].name);
        }
        console.log("---");

        // 2. Test Track
        console.log("2. Testing Track Detail...");
        const trackResult = await sp.track("23WxsmliKISYaCfam8iPPG");
        console.log("   [Success] Track Name:", trackResult?.name || "Not found");
        console.log("---");

        // 3. Test Artist
        console.log("3. Testing Artist Detail...");
        const artistResult = await sp.artist("164Uj4eKjl6zTBKfJLFKKK");
        console.log("   [Success] Artist Name:", artistResult?.name || "Not found");
        console.log("---");

        // 4. Test Album
        console.log("4. Testing Album Detail...");
        const albumResult = await sp.album("7z2Nuz41dkU9ruY5Qkva2L");
        console.log("   [Success] Album Title:", albumResult?.name || "Not found");
        console.log("---");

        // 5. Test Playlist
        console.log("5. Testing Playlist Detail...");
        const playlistResult = await sp.playlist("4IfUIdWEonPys9mYs7zXna");
        console.log("   [Success] Playlist Name:", playlistResult?.name || "Not found");
        console.log("---");

        // 6. Test Downloader
        console.log("6. Testing Downloader...");
        // Target track URL for download
        const downloadResult = await sp.download("https://open.spotify.com/track/23WxsmliKISYaCfam8iPPG");
        if (downloadResult.status) {
            console.log("   [Success] Successfully Generated Link!");
            console.log("   -> Title:", downloadResult.title);
            console.log("   -> Download Link:", downloadResult.dl.substring(0, 50) + "...");
        } else {
            console.log("   [Failed] Failed to download.");
        }
        console.log("---");

        console.log("ALL TESTS COMPLETED SUCCESSFULLY!");

    } catch (err) {
        console.error("\n[Error] An error occurred during testing:");
        console.error(err);
    }
}

runTests();
