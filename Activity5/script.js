const apiKey = 'AIzaSyBGPOdORIziu2fGARP7bsLrWKZPhN8GkIo'; // Your YouTube API key
const playlistId = 'PLqxhrTh_8Qd8H_IWq7uoe8SpgyP4x3jJO'; // Your playlist ID
const maxResults = 7; // Number of videos to fetch
const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet&maxResults=${maxResults}`;
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    const carouselInner = document.getElementById('carousel-inner');
    if (data.items && data.items.length > 0) {
      data.items.forEach((item, index) => {
        const videoId = item.snippet.resourceId.videoId;
        // Create a new carousel item
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item', 'carousel-fade');
        if (index === 0) {
          carouselItem.classList.add('active'); // Mark the first item as active
        }
        // Create iframe for YouTube video
        const iframe = document.createElement('iframe');
        iframe.width = '560'; // Standard YouTube video width
        iframe.height = '315'; // Standard YouTube video height
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.frameBorder = '0';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        // Append iframe to carousel item
        carouselItem.appendChild(iframe);
        // Append carousel item to the carousel-inner
        carouselInner.appendChild(carouselItem);
      });
    } else {
      console.error('No videos found in the playlist.');
    }
  })
  .catch((error) => {
    console.error('Error fetching YouTube videos:', error);
  });