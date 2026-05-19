/**
 * MIK EMPIRE CORE SECURITY PROTOCOL & ENGINE
 * System Architecture: Custom Node Resolver & Client Hardening
 * File: main.js
 */

(function() {
    'use strict';

    // ==========================================
    // 1. SYSTEM DEFINITIONS & DICTIONARY LOGIC
    // ==========================================
    const NetworkRegistry = {
        "dns": "dns.hypertechinc.qzz.io -> Cloudflare Grey Cloud Edge Router Node",
        "boss": "boss.hypertechinc.qzz.io -> Redmi 15 4G Command Module [Creek]",
        "hub": "hub.hypertechinc.qzz.io -> Lenovo IdeaPad 3 Management Node",
        "gateway": "gateway.hypertechinc.qzz.io -> Multiworker Strict ISP Asteroid Deflector"
    };

    let allowUsage = true;
    let websiteStatus = "online";
    let webOffline = false;

    // ==========================================
    // 2. CLIENT-SIDE HARDENING & INSPECTION BLOCK
    // ==========================================
    
    // Disable Right-Click Context Menu completely
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    }, false);

    // Trap DevTools hotkeys and block execution
    document.addEventListener('keydown', (e) => {
        // Prevent F12
        if (e.key === "F12") {
            e.preventDefault();
            triggerSecurityAlert("F12 Inspection Attempt Blocked");
            return false;
        }
        // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) {
            e.preventDefault();
            triggerSecurityAlert("Developer Tools Key Combination Blocked");
            return false;
        }
        // Prevent Ctrl+U (View Source)
        if (e.ctrlKey && e.key === "u") {
            e.preventDefault();
            triggerSecurityAlert("Source View Protocol Blocked");
            return false;
        }
    }, false);

    // Rigidly prevent text selection/copying to hold Read-Only integrity
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        triggerSecurityAlert("Data Scrape Prevented: Read-Only Environment");
    }, false);

    function triggerSecurityAlert(message) {
        console.warn(`[SECURITY ALERT] ${message}`);
        const indicator = document.getElementById('security-indicator');
        if (indicator) {
            indicator.textContent = "[TAMPER ATTEMPT DETECTED]";
            indicator.style.color = "#ff3b30";
            setTimeout(() => {
                indicator.textContent = "[SECURE]";
                indicator.style.color = "#00ff41";
            }, 3000);
        }
    }

    // ==========================================
    // 3. TELEMETRY & ANTI-BOT ARCHITECTURE
    // ==========================================
    let humanInteractionVerified = false;
    let interactionTicks = 0;

    function verifyHumanHeuristics() {
        if (humanInteractionVerified) return;
        interactionTicks++;
        
        // Require multiple continuous human telemetry ticks to verify presence
        if (interactionTicks >= 15) {
            humanInteractionVerified = true;
            console.log("[TELEMETRY] Human entity signature matching completed.");
            const outputBox = document.getElementById('dns-output');
            if (outputBox) {
                const verifiedLine = document.createElement('div');
                verifiedLine.className = 'output-line';
                verifiedLine.style.color = '#00ff41';
                verifiedLine.textContent = `[SYSTEM] Anti-Bot Telemetry Verified: Device connection cleared.`;
                outputBox.appendChild(verifiedLine);
            }
        }
    }

    // Capture standard biological movement profiles to eliminate simple headless scraping utilities
    document.addEventListener('mousemove', verifyHumanHeuristics, false);
    document.addEventListener('keydown', verifyHumanHeuristics, false);
    document.addEventListener('touchstart', verifyHumanHeuristics, false);

    // ==========================================
    // 4. PRE-RESOLVER LOOP LOGIC (DNS Simulation)
    // ==========================================
    function runLocalZoneResolver() {
        const outputBox = document.getElementById('dns-output');
        if (!outputBox) return;

        // Clear initial text
        outputBox.innerHTML = '';

        // Dynamic State Grammar Checklist Translation Loop
        if (websiteStatus === "online" && allowUsage === true) {
            Object.keys(NetworkRegistry).forEach((key, index) => {
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.className = 'output-line';
                    line.textContent = `↳ RESOLVING: ${key}.hypertechinc.qzz.io -> Target parsed successfully.`;
                    outputBox.appendChild(line);
                    
                    // Display details inside mock engine console
                    setTimeout(() => {
                        const detailLine = document.createElement('div');
                        detailLine.className = 'output-line';
                        detailLine.style.color = '#888';
                        detailLine.textContent = `  STATUS: 🟩 Mapping verified | Info: ${NetworkRegistry[key]}`;
                        outputBox.appendChild(detailLine);
                    }, 300);

                }, index * 800);
            });
        } else if (webOffline === true) {
            // "but (WebOffline: true) then (MakeWebBeOnline: true)" custom parsing logic block
            const errorLine = document.createElement('div');
            errorLine.className = 'output-line';
            errorLine.style.color = '#ff3b30';
            errorLine.textContent = '❌ [CRITICAL] WebOffline evaluated to TRUE. Routing through proxy failover...';
            outputBox.appendChild(errorLine);
        }
    }

    // Trigger local loop iteration upon DOM resolution
    document.addEventListener('DOMContentLoaded', () => {
        // Enforce state rule engine immediately
        if (webOffline === true) {
            const statusBadge = document.getElementById('system-status');
            if (statusBadge) {
                statusBadge.textContent = "🟥 OFFLINE";
                statusBadge.style.background = "#2b0000";
                statusBadge.style.borderColor = "#ff3b30";
                statusBadge.style.color = "#ff3b30";
            }
        }
        runLocalZoneResolver();
    });

})();

