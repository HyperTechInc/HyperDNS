/**
 * HYPERTECH-HQ AUTOMATED ADVERTISEMENT ENGINE
 * Architecture: YouTube IFrame Player API
 * File: ads.js
 */

(function() {
    'use strict';

    // Catalog mapping Video IDs to Channel Credits
    const XiaomiMediaCatalog = [
        { id: "ur-pcOil2Pw", credit: "XIAOMI GLOBAL" },
        { id: "vA302Ps10fQ", credit: "XIAOMI MI" }
    ];

    let currentMediaIndex = 0;
    let isDeviceAudioMuted = true;
    let ytPlayerNode = null;

    // 1. Inject the YouTube IFrame API Script asynchronously
    const apiTag = document.createElement('script');
    apiTag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(apiTag, firstScriptTag);

    // 2. Initialize UI layout wrapper elements
    function buildAdBannerContainer() {
        const frameAnchor = document.getElementById('hypertech-sponsor-frame');
        if (!frameAnchor) return;

        frameAnchor.innerHTML = `
            <div class="ad-banner">
                <div class="xiaomi-sponsor-header">
                    <span>🔥 SPONSOR // XIAOMI PLATFORM</span>
                </div>
                <div class="xiaomi-video-viewport">
                    <div id="xiaomi-player-target"></div>
                </div>
                <div class="credit" id="channel-credit">SOURCE: LOADING...</div>
                <div class="xiaomi-control-strip">
                    <button class="xiaomi-btn" id="xiaomi-toggle-mute">🔊 UNMUTE</button>
                    <button class="xiaomi-btn" id="xiaomi-force-rotation">NEXT PROMO ⏭️</button>
                </div>
            </div>
        `;

        // Bind interactive element controls
        document.getElementById('xiaomi-toggle-mute').addEventListener('click', toggleAudioFeed);
        document.getElementById('xiaomi-force-rotation').addEventListener('click', rotateActivePromoElement);
    }

    // 3. Global Callback called automatically when YouTube API loads down the wire
    window.onYouTubeIframeAPIReady = function() {
        buildAdBannerContainer();
        
        const currentVideo = XiaomiMediaCatalog[currentMediaIndex];
        document.getElementById('channel-credit').textContent = `SOURCE: ${currentVideo.credit}`;

        // Bind raw player node object configurations
        ytPlayerNode = new YT.Player('xiaomi-player-target', {
            height: '100%',
            width: '100%',
            videoId: currentVideo.id,
            playerVars: {
                'autoplay': 1,
                'mute': isDeviceAudioMuted ? 1 : 0,
                'controls': 1,
                'rel': 0,
                'modestbranding': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 4. CRITICAL LOOP: Listen for video states
    function onPlayerStateChange(event) {
        // YT.PlayerState.ENDED equals 0 (Video has completely finished playing)
        if (event.data === YT.PlayerState.ENDED) {
            console.log("[SPONSOR ENGINE] Current clip ended. Proceeding to next index block.");
            rotateActivePromoElement();
        }
    }

    function rotateActivePromoElement() {
        if (!ytPlayerNode) return;
        
        currentMediaIndex = (currentMediaIndex + 1) % XiaomiMediaCatalog.length;
        const targetVideo = XiaomiMediaCatalog[currentMediaIndex];
        
        // Update credit title block text
        document.getElementById('channel-credit').textContent = `SOURCE: ${targetVideo.credit}`;
        
        // Command API to hot-swap video item seamlessly on the fly
        ytPlayerNode.loadVideoById({
            videoId: targetVideo.id,
            startSeconds: 0
        });

        // Maintain mute consistency across dynamic asset generation
        if (isDeviceAudioMuted) {
            ytPlayerNode.mute();
        } else {
            ytPlayerNode.unMute();
        }
    }

    function toggleAudioFeed() {
        if (!ytPlayerNode) return;

        isDeviceAudioMuted = !isDeviceAudioMuted;
        const muteButton = document.getElementById('xiaomi-toggle-mute');

        if (isDeviceAudioMuted) {
            ytPlayerNode.mute();
            muteButton.textContent = "🔊 UNMUTE";
        } else {
            ytPlayerNode.unMute();
            muteButton.textContent = "🔇 MUTE";
        }
    }

})();

