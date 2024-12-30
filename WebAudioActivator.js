const audioElement = document.createElement('audio');
audioElement.id = 'audio';
audioElement.style.display = 'none';
document.body.appendChild(audioElement);

(function () {
    const hoaAudio = document.getElementById('audio');
    const profilesWithMusic = {
        '/': '/song.mp3',
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
