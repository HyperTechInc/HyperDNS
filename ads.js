/**
 * HYPERTECH-HQ ADVERTISEMENT ENGINE
 * Target Platform: Custom Xiaomi Brand Native Loop
 * File: ads.js
 */

(function() {
    'use strict';

    // Array holding your raw YouTube video reference tags
    const XiaomiMediaCatalog = [
        "QidbE2POFQZS31aTq",
        "DPmIry09qC1UKoB2C"
    ];

    let currentMediaIndex = 0;
    let isDeviceAudioMuted = true;

    // Inject corporate style configurations safely to keep it hidden from adblock patterns
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .xiaomi-sponsor-wrapper {
            border: 2px solid #ff4a00;
            background-color: #140a00;
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 0 15px rgba(255, 74, 0, 0.2);
            font-family: monospace;
        }
        .xiaomi-sponsor-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ff4a00;
            font-weight: bold;
            font-size: 0.85rem;
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(255, 74, 0, 0.3);
            padding-bottom: 6px;
        }
        .xiaomi-video-viewport {
            position: relative;
            width: 100%;
            padding-top: 56.25%; /* Clean 16:9 Aspect Frame ratio */
            background-color: #000;
            border-radius: 4px;
            overflow: hidden;
        }
        .xiaomi-video-viewport iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }
        .xiaomi-control-strip {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
        }
        .xiaomi-btn {
            background: #2b1100;
            border: 1px solid #ff4a00;
            color: #ff4a00;
            padding: 3px 8px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.75rem;
            font-family: monospace;
        }
        .xiaomi-btn:hover {
            background: #ff4a00;
            color: #000;
        }
    `;
    document.head.appendChild(styleElement);

    function initializeXiaomiAdPlayer() {
        const frameAnchor = document.getElementById('hypertech-sponsor-frame');
        if (!frameAnchor) return;

        // Build HTML component structure completely within logic thread
        frameAnchor.innerHTML = `
            <div class="xiaomi-sponsor-wrapper">
                <div class="xiaomi-sponsor-header">
                    <span>🔥 SPONSOR PHONE DISPLAY // XIAOMI PLATFORM</span>
                    <span style="color: #fff; font-size: 0.75rem;">[AUDIO: <span id="ad-audio-lbl">MUTED</span>]</span>
                </div>
                <div class="xiaomi-video-viewport">
                    <iframe id="xiaomi-embed-node" 
                        src="" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="xiaomi-control-strip">
                    <button class="xiaomi-btn" id="xiaomi-toggle-mute">🔊 UNMUTE</button>
                    <button class="xiaomi-btn" id="xiaomi-force-rotation">NEXT PROMO ⏭️</button>
                </div>
            </div>
        `;

        // Attach event actions safely
        document.getElementById('xiaomi-toggle-mute').addEventListener('click', toggleAudioFeed);
        document.getElementById('xiaomi-force-rotation').addEventListener('click', rotateActivePromoElement);

        // Run primary pipeline boot
        updateVideoEmbedTarget();
        
        // Execute rapid lifecycle check tracking: Cycle video elements automatically every 35 seconds
        setInterval(rotateActivePromoElement, 35000);
    }

    function updateVideoEmbedTarget() {
        const playerFrame = document.getElementById('xiaomi-embed-node');
        if (!playerFrame) return;

        const videoId = XiaomiMediaCatalog[currentMediaIndex];
        // Build embed targeting strings leveraging YouTube Player Parameters API
        // loops target explicitly, triggers auto-execution behaviors natively
        let targetUri = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}&loop=1&enablejsapi=1`;
        
        if (isDeviceAudioMuted) {
            targetUri += "&mute=1";
        }

        playerFrame.src = targetUri;
    }

    function rotateActivePromoElement() {
        currentMediaIndex = (currentMediaIndex + 1) % XiaomiMediaCatalog.length;
        updateVideoEmbedTarget();
        console.log(`[SPONSOR ENGINE] Switched target catalog node to slot index: ${currentMediaIndex}`);
    }

    function toggleAudioFeed() {
        const muteButton = document.getElementById('xiaomi-toggle-mute');
        const audioLabel = document.getElementById('ad-audio-lbl');
        
        isDeviceAudioMuted = !isDeviceAudioMuted;
        
        if (isDeviceAudioMuted) {
            muteButton.textContent = "🔊 UNMUTE";
            if (audioLabel) audioLabel.textContent = "MUTED";
        } else {
            muteButton.textContent = "🔇 MUTE";
            if (audioLabel) audioLabel.textContent = "ACTIVE";
        }
        
        // Force rendering state reconstruction to reload parameters cleanly via safe context shifts
        updateVideoEmbedTarget();
    }

    // Delay initiation until DOM asset configuration loop settles safely
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeXiaomiAdPlayer);
    } else {
        initializeXiaomiAdPlayer();
    }

})();
      
