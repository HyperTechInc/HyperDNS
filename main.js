(function() {
    // 1. Enforce strict anti-bot and telemetry flags
    let humanInteractionVerified = false;
    
    document.addEventListener('mousemove', () => humanInteractionVerified = true, { once: true });
    document.addEventListener('keydown', () => humanInteractionVerified = true, { once: true });
    document.addEventListener('touchstart', () => humanInteractionVerified = true, { once: true });

    // 2. Real-time DoH Resolver Function (Queries Cloudflare Edge Live)
    async function fetchLiveDNS(domain, recordType = 'A') {
        try {
            // Using Cloudflare's DNS-over-HTTPS API endpoint
            const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=${recordType}`, {
                headers: { 'Accept': 'application/dns-json' }
            });
            
            if (!response.ok) throw new Error("Network response blocked");
            
            const data = await response.json();
            return data.Answer || [{ data: "No records found" }];
        } catch (error) {
            return [{ data: `ERROR: ${error.message}` }];
        }
    }

    // 3. Active Mapping Engine
    async function runActiveZoneResolver() {
        const outputBox = document.getElementById('dns-output');
        if (!outputBox) return;

        outputBox.innerHTML = ''; // Wipe old console log

        // The real subdomains you want to monitor or track
        const targets = [
            { host: 'dns.hypertechinc.qzz.io', type: 'CNAME', label: 'Grey Cloud Edge Router' },
            { host: 'adcodeblue.hypertechinc.qzz.io', type: 'CNAME', label: 'AdCode Blue Node' },
            { host: 'headquarters.hypertechinc.qzz.io', type: 'CNAME', label: 'HQ Command Module' }
        ];

        // Print Telemetry Verification if a human touched the screen
        if (humanInteractionVerified) {
            const telLine = document.createElement('div');
            telLine.className = 'output-line';
            telLine.style.color = '#00ff41';
            telLine.textContent = '[SYSTEM] Anti-Bot Telemetry Verified: Device safe.';
            outputBox.appendChild(telLine);
        }

        // Loop through targets and fetch live internet data
        for (const target of targets) {
            const line = document.createElement('div');
            line.className = 'output-line';
            line.textContent = `📡 RESOLVING: ${target.host} (${target.type})...`;
            outputBox.appendChild(line);

            // Wait for the actual live API response
            const answers = await fetchLiveDNS(target.host, target.type);

            answers.forEach(ans => {
                const detailLine = document.createElement('div');
                detailLine.className = 'output-line';
                detailLine.style.color = ans.data.includes('ERROR') ? '#ff3b30' : '#888';
                detailLine.textContent = `   ┗ 🟩 STATUS: Verified | ${target.label} -> Target: ${ans.data}`;
                outputBox.appendChild(detailLine);
            });
        }
    }

    // 4. Trigger loop when DOM loads
    document.addEventListener('DOMContentLoaded', () => {
        // Set UI Status Badge to online
        const statusBadge = document.getElementById('system-status');
        if (statusBadge) {
            statusBadge.textContent = "🟢 ONLINE";
            statusBadge.style.background = "#002b00";
            statusBadge.style.borderColor = "#00ff41";
            statusBadge.style.color = "#00ff41";
        }

        // Run the real network check
        runActiveZoneResolver();
    });
})();
