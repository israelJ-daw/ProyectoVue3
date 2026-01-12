export const fetchFeaturedData = async () => {
  try {
    const proxy = "http://localhost:8080/"; // Tu proxy local
    const artistsUrl = "https://api.deezer.com/chart/0/artists";
    const songsUrl = "https://api.deezer.com/chart/0/tracks";

    const requestOptions = {
      headers: {
        "X-Requested-With": "XMLHttpRequest", // Cabecera obligatoria para CORS Anywhere
      },
    };

    const [artistsResponse, songsResponse] = await Promise.all([
      fetch(proxy + artistsUrl, requestOptions),
      fetch(proxy + songsUrl, requestOptions),
    ]);

    const artistsData = await artistsResponse.json();
    const songsData = await songsResponse.json();

    console.log("🎤 Artistas:", artistsData);
    console.log("🎵 Canciones:", songsData);

    return {
      artists: artistsData.data || [],
      songs: songsData.data || [],
    };
  } catch (error) {
    console.error("❌ Error al obtener datos:", error);
    return { artists: [], songs: [] };
  }
};

export const fetchArtistDetails = async (artistId) => {
  try {
    const proxy = "http://localhost:8080/";
    const artistUrl = `https://api.deezer.com/artist/${artistId}`;
    const topTracksUrl = `https://api.deezer.com/artist/${artistId}/top?limit=5`;
    const albumsUrl = `https://api.deezer.com/artist/${artistId}/albums`;

    const requestOptions = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

    const [artistRes, tracksRes, albumsRes] = await Promise.all([
      fetch(proxy + artistUrl, requestOptions),
      fetch(proxy + topTracksUrl, requestOptions),
      fetch(proxy + albumsUrl, requestOptions),
    ]);

    const artist = await artistRes.json();
    const tracks = await tracksRes.json();
    const albums = await albumsRes.json();

    return {
      artist: artist,
      tracks: tracks.data || [],
      albums: albums.data || [],
    };
  } catch (error) {
    console.error("❌ Error al obtener detalles del artista:", error);
    return null;
  }
};
