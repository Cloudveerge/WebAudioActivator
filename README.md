# WebAudioActivator

## Overview
`WebAudioActivator` is a lightweight JavaScript script designed to enable audio playback on web pages, overcoming autoplay restrictions in modern browsers. It triggers audio playback when the user interacts with the page, such as clicking or pressing a key. This approach ensures that audio is played in compliance with browser policies while providing a seamless user experience.

## Features
- **Autoplay Bypass**: The script overcomes the limitations of modern browsers that restrict audio autoplay.
- **User Interaction**: Audio playback is triggered by user actions like mouse clicks or keyboard presses.
- **Customizable Paths**: The script allows you to map specific URLs to unique audio tracks for different pages or sections of your site.
- **Lightweight**: The script is minimalistic and adds no significant overhead to your page's load time.

## Installation

To use `WebAudioActivator` on your website, simply include the following JavaScript code in your webpage:

```html
<script>
  const audioElement = document.createElement('audio');
  audioElement.id = 'audio';
  audioElement.style.display = 'none';
  document.body.appendChild(audioElement);

  (function () {
    const hoaAudio = document.getElementById('audio');
    const profilesWithMusic = {
      '/': '/song.mp3', // Add your custom paths and audio file associations here
    };
    const currentPath = window.location.pathname;

    if (profilesWithMusic.hasOwnProperty(currentPath)) {
        hoaAudio.src = profilesWithMusic[currentPath];

        function catchHandler() {
            let inputListener;
            inputListener = function () {
                hoaAudio.play();
                document.removeEventListener('mousedown', inputListener);
                document.removeEventListener('keydown', inputListener);
            };

            document.addEventListener('mousedown', inputListener);
            document.addEventListener('keydown', inputListener);
        }

        if (hoaAudio.readyState > 1) {
            hoaAudio.play().catch(catchHandler);
        } else {
            hoaAudio.addEventListener('canplay', function () {
                hoaAudio.play().catch(catchHandler);
            });
        }
    }
  })();
</script>
```

## Configuration
The script includes an object `profilesWithMusic` where you can define the paths for which you want specific audio files to play. For example:

```javascript
const profilesWithMusic = {
  '/': '/song.mp3',  // Audio will play for the root URL
  '/profile': '/profile-music.mp3', // Custom audio for profile page
};
```

### Notes:
- The audio file paths should be relative to your server's root.
- This script works by appending a hidden `<audio>` element to the page, which is controlled via JavaScript.

## Browser Compatibility
This script works across modern web browsers. However, audio autoplay restrictions are handled differently by each browser, so it may require user interaction to begin playback.

## License
`WebAudioActivator` is released under the [MIT License](LICENSE).

---
