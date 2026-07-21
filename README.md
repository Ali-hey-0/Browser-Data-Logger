<p align="center">
  <img
    src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=2500&pause=500&color=3498DB&center=true&vCenter=true&width=700&lines=Browser+Data+Logger;Browser+Telemetry+Research;Web+API+Capability+Research"
    alt="Browser Data Logger"
  />
</p><h1 align="center">Browser Data Logger</h1><p align="center">
  A modular JavaScript browser telemetry and Web API capability-research project.
</p><p align="center">
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger">
    <img src="https://img.shields.io/badge/Status-Research%20Project-blue?style=for-the-badge" alt="Project Status">
  </a>
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger/stargazers">
    <img src="https://img.shields.io/github/stars/Ali-hey-0/Browser-Data-Logger?style=for-the-badge&color=yellow" alt="GitHub Stars">
  </a>
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger/network/members">
    <img src="https://img.shields.io/github/forks/Ali-hey-0/Browser-Data-Logger?style=for-the-badge&color=blue" alt="GitHub Forks">
  </a>
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger/issues">
    <img src="https://img.shields.io/github/issues/Ali-hey-0/Browser-Data-Logger?style=for-the-badge&color=red" alt="Open Issues">
  </a>
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Ali-hey-0/Browser-Data-Logger?style=for-the-badge&color=green" alt="License">
  </a>
</p><p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-capabilities">Capabilities</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-security">Security</a>
</p>---

«[!WARNING]

Authorised Use Only

This project can interact with highly sensitive browser capabilities, including geolocation, camera, microphone, clipboard, screen capture, browser storage, device information, and interaction events.

Use it only on systems, browsers, and devices that you own or are explicitly authorised to test.

Do not deploy it against unsuspecting users. Browser permission prompts do not replace informed consent, legal authorisation, or responsible data handling.»

---

«[!CAUTION]

Credential Security

Never commit a real Telegram bot token, API key, private key, password, or production credential to this repository.

If a credential has ever been exposed in source code or Git history, revoke or rotate it immediately.»

---

📑 Table of Contents

- "🔭 Overview" (#-overview)
- "🎯 Project Goals" (#-project-goals)
- "✨ Capabilities" (#-capabilities)
- "🧩 Capability Matrix" (#-capability-matrix)
- "🧠 Architecture" (#-architecture)
- "⚡ Quick Start" (#-quick-start)
- "⚙️ Configuration" (#️-configuration)
- "📡 Output Channels" (#-output-channels)
- "📊 Data Model" (#-data-model)
- "📖 Collector Reference" (#-collector-reference)
- "🔒 Security" (#-security)
- "⚠️ Limitations" (#️-limitations)
- "🛠️ Troubleshooting" (#️-troubleshooting)
- "❓ FAQ" (#-faq)
- "🗺️ Roadmap" (#️-roadmap)
- "🤝 Contributing" (#-contributing)
- "📜 License" (#-license)
- "📬 Contact" (#-contact)

---

🔭 Overview

Browser Data Logger is a browser-side JavaScript research project that explores the information and capabilities exposed by modern Web APIs.

The project is structured around independent collectors that attempt to gather browser, device, network, permission, sensor, storage, and interaction-related telemetry.

Collected data can be:

- Aggregated into a human-readable report.
- Sent to a configured Telegram bot.
- Streamed as JSON over WebSocket.
- Used for browser capability research and controlled security experiments.

The project is particularly useful for investigating the practical boundary between:

Browser API
     ↓
Browser Support
     ↓
Permission State
     ↓
Available Data
     ↓
Reliability of the Result

A capability being present in the code does not guarantee that:

- The browser implements the API.
- The API is available on the current platform.
- The user grants permission.
- The returned information is accurate.
- The result is stable or unique.

---

🎯 Project Goals

1. Web API Capability Research

Explore which browser APIs are available across different browsers, devices, operating systems, and security contexts.

2. Modular Telemetry Collection

Keep data collectors conceptually independent so individual capabilities can be studied, modified, or disabled.

3. Fault-Tolerant Collection

A failure in one collector should ideally not prevent unrelated collectors from completing.

4. Browser Fingerprinting Research

Study the types of rendering, hardware, runtime, and environment signals exposed by browsers.

5. Real-Time Telemetry

Provide optional output through a WebSocket connection for custom dashboards and analysis pipelines.

---

✨ Capabilities

The current implementation contains collectors for the following areas:

Category| Capability
🔐 Security Context| HTTPS detection
🔑 Permissions| Camera, geolocation, microphone, notifications, MIDI, USB
🌐 Network| Public IP and IP-derived metadata
📍 Geolocation| Browser geolocation and reverse geocoding
🖥️ Device| User agent, platform, language, screen, timezone, hardware hints
🖌️ Fingerprinting| Canvas, WebGL, Web Audio, fonts, WebAssembly
🎮 Graphics| WebGPU adapter metadata
🕵️ Experimental Probing| Resource timing/cache heuristics
🔋 Battery| Battery level and charging state
📶 Network Information| Connection type, downlink, RTT, save-data
📳 Sensors| Motion, orientation, ambient light where supported
📋 Clipboard| Clipboard text access where permitted
💾 Storage| Cookies, localStorage, sessionStorage, IndexedDB availability
🖧 WebRTC| ICE candidate/network information
🎤 Microphone| Audio analyser metadata after permission
📸 Camera| Camera enumeration and still-image capture
🖥️ Screen Capture| User-approved display capture
⌨️ Interaction| Keyboard, mouse, and click events
🎮 Gamepad| Connected gamepad information
🎹 MIDI| MIDI input/output devices
🔌 USB| Previously authorised USB devices
🥽 WebXR| Immersive VR support
📜 History| Limited history-state information
🧩 Extension Probing| Experimental browser-extension signals
⚠️ Diagnostics| Per-module error reporting

---

🧩 Capability Matrix

Capability| Permission Required| Secure Context| Browser / Platform Dependent
Public IP lookup| No| No| Yes
IP metadata| No| No| Yes
Geolocation| Yes| Usually| Yes
Camera| Yes| Usually| Yes
Microphone| Yes| Usually| Yes
Screen Capture| Yes + user selection| Yes| Yes
Clipboard Read| Often| Yes| Highly
Device Motion| Sometimes| Often| Highly
Device Orientation| Sometimes| Often| Highly
Ambient Light| Sometimes| Usually| Highly
WebGPU| No explicit permission in most cases| Usually| Highly
Battery API| No| Browser-dependent| Highly
WebRTC| Browser-controlled| Usually| Yes
Gamepad| Device-dependent| No| Yes
Web MIDI| Browser-dependent| Browser-dependent| Limited
WebUSB| User interaction + permission| Yes| Limited
WebXR| Device/browser-dependent| Usually| Limited
Local Storage| No| No| Same-origin restricted

«Browser APIs evolve continuously. The actual result depends on browser engine, version, operating system, privacy settings, extensions, enterprise policy, and user permissions.»

---

🧠 Architecture

flowchart TD
    A[Browser Loads java.js] --> B[Initialise Runtime]
    B --> C[Create WebSocket]
    C --> D[Collection Cycle]

    D --> E[Permission Collector]
    D --> F[Network & IP]
    D --> G[Device Information]
    D --> H[Fingerprinting]
    D --> I[WebGPU]
    D --> J[Geolocation]
    D --> K[Battery]
    D --> L[Network Information]
    D --> M[Sensors]
    D --> N[Clipboard]
    D --> O[Storage]
    D --> P[WebRTC]
    D --> Q[Interaction Events]
    D --> R[Microphone]
    D --> S[Screen Capture]
    D --> T[Camera]
    D --> U[Gamepad]
    D --> V[MIDI]
    D --> W[USB]
    D --> X[WebXR]
    D --> Y[History]
    D --> Z[Extension Probes]

    E --> AA[Collected Data Object]
    F --> AA
    G --> AA
    H --> AA
    I --> AA
    J --> AA
    K --> AA
    L --> AA
    M --> AA
    N --> AA
    O --> AA
    P --> AA
    Q --> AA
    R --> AA
    S --> AA
    T --> AA
    U --> AA
    V --> AA
    W --> AA
    X --> AA
    Y --> AA
    Z --> AA

    AA --> AB[Format Report]
    AB --> AC[Telegram Text]
    AA --> AD[Telegram Photos]
    AA --> AE[WebSocket JSON]

    D --> AF[Periodic Recollection]
    AF --> D

Runtime flow

At a high level, the intended runtime flow is:

Initialisation
     ↓
WebSocket connection
     ↓
Collection cycle
     ↓
Independent collectors
     ↓
Aggregate collectedData
     ↓
Format human-readable report
     ↓
Telegram delivery
     ↓
Optional media delivery
     ↓
WebSocket JSON delivery
     ↓
Periodic recollection

---

⚡ Quick Start

1. Clone the repository

git clone https://github.com/Ali-hey-0/Browser-Data-Logger.git
cd Browser-Data-Logger

2. Include the script

If "java.js" is used as an external script:

<script src="./java.js"></script>

If the code is intended to be embedded directly into HTML, place it inside a "<script>" element.

«Do not include a literal "</script>" closing tag inside an external ".js" file.»

3. Configure the runtime

At minimum, configure:

const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';
const WS_URL = 'wss://your-websocket-server.example';
const DEBUG = false;

4. Serve the application

For basic local development:

python3 -m http.server 8000

Then open the application through:

http://localhost:8000

Many browser APIs require HTTPS or a secure context. "localhost" is treated specially by browsers, but API behaviour still varies.

5. Enable debug logging when necessary

const DEBUG = true;

Then inspect the browser console for:

- Collector errors.
- WebSocket errors.
- Permission failures.
- Telegram delivery failures.
- Browser API compatibility issues.

---

⚙️ Configuration

The runtime configuration is conceptually:

const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';
const DEBUG = false;
const WS_URL = 'wss://your-websocket-server.example';

"BOT_TOKEN"

Telegram Bot API authentication token.

This is a secret and should never be committed to a public repository.

"CHAT_ID"

The destination Telegram chat identifier.

"DEBUG"

Controls diagnostic logging.

When enabled, the project logs errors and warnings to the browser console.

"WS_URL"

The WebSocket endpoint used for:

- Initial connection.
- Real-time event delivery.
- Final aggregated JSON delivery.

Use "wss://" for encrypted WebSocket transport in production.

---

📡 Output Channels

The project currently uses two output channels.

Telegram

Telegram is used for human-readable reporting.

The collection cycle can send:

1. A formatted text report.
2. A camera image, if captured.
3. A screen-capture image, if captured.

The formatted report is truncated to Telegram's message-size limit.

WebSocket

WebSocket is used for structured real-time events.

Examples of event categories include:

{
  "ipDetails": {
    "city": "Example City",
    "country": "Example Country"
  }
}

{
  "batteryUpdate": {
    "charging": true,
    "timestamp": "2026-07-21T14:22:10.123Z"
  }
}

{
  "networkUpdate": {
    "type": "4g",
    "downlink": 10,
    "rtt": 50
  }
}

{
  "interaction": "Click:320,240:12345.67"
}

The final collection object is also sent as a JSON payload at the end of the collection cycle.

---

📊 Data Model

A collection cycle begins with:

{
  timestamp: "2026-07-21T14:22:10.123Z"
}

Depending on browser support and permission state, additional fields may include:

isSecure
securityWarning
permissions
ipAddress
ipDetails
deviceInfo
fingerprint
webgpu
visitedSites
geolocation
address
addressDetails
geolocationFallback
battery
network
accelerometer
gyroscope
ambientLight
clipboard
storage
localIPs
interactions
audioMetadata
screenCapture
camera
gamepads
midi
usb
xr
history
extensions

Errors are represented through fields such as:

permissionsError
ipError
deviceInfoError
fingerprintError
webgpuError
cacheError
geoError
batteryError
networkError
sensorError
clipboardError
storageError
webRtcError
interactionError
audioError
screenError
gamepadError
midiError
usbError
xrError
historyError
extensionError
cameraError

---

📖 Collector Reference

🔐 HTTPS / Secure Context

The collector checks:

window.location.protocol === 'https:'

If the page is not served over HTTPS, the project records a security warning.

Many sensitive browser APIs require a secure context.

---

🔑 Permissions

The project attempts to query permission states for:

- "camera"
- "geolocation"
- "microphone"
- "notifications"
- "midi"
- "usb"

Possible states generally include:

granted
denied
prompt

However, not every browser supports every permission name.

---

🌐 Public IP and IP Metadata

The project performs two network requests:

1. Public IP lookup.
2. IP metadata enrichment.

The resulting metadata may include:

- IP address.
- City.
- Region.
- Country.
- ISP/organisation.
- Approximate latitude.
- Approximate longitude.
- Postal code.
- Timezone.
- ASN.

IP-derived geolocation is approximate and should not be confused with GPS-level positioning.

---

📍 Geolocation

When the secure-context requirement is satisfied, the project requests high-accuracy browser geolocation.

Potentially collected fields:

latitude
longitude
accuracy
altitude
heading
speed

The coordinates may then be sent to a reverse-geocoding service to obtain:

- Human-readable address.
- Road.
- City/town.
- State.
- Country.
- Postal code.

If browser geolocation fails and IP metadata is available, the project may use IP-derived coordinates as a fallback.

---

🖥️ Device Information

The collector attempts to record:

- User agent.
- Platform.
- Primary language.
- Preferred languages.
- Screen resolution.
- Color depth.
- Device pixel ratio.
- Timezone.
- Hardware concurrency.
- Device memory hint.
- Touch support.
- WebDriver state.
- Referrer.
- Current URL.
- Window dimensions.
- Screen orientation.
- JavaScript heap information where exposed.
- Performance timing information where available.

Some values are cached in memory for subsequent collection cycles.

---

🖌️ Fingerprinting Signals

The fingerprint collector currently investigates several browser characteristics.

Canvas

The project creates a canvas and renders text containing a random value.

The resulting canvas data URL is stored as a rendering signal.

Because the rendered content includes randomness, this should not be treated as a stable deterministic fingerprint without additional processing.

WebGL

Potentially collected values include:

- Renderer.
- Vendor.
- WebGL version.
- Supported extensions.

Web Audio

The project records audio-context characteristics such as:

- Sample rate.
- Maximum channel count.

Fonts

A predefined list of fonts is tested.

The current implementation uses a basic style-property heuristic, which should not be considered a reliable font-enumeration method.

WebAssembly

The project attempts to instantiate a minimal WebAssembly module to test support.

---

🎮 WebGPU

If "navigator.gpu" is available, the project attempts to request an adapter and record:

- Device.
- Vendor.
- Architecture.

Support is highly browser- and platform-dependent.

---

🕵️ Experimental Resource Timing Probes

The project attempts to measure loading times for selected external resources.

The intention is to investigate whether timing may provide cache-related signals.

This technique is experimental and unreliable.

Possible sources of false results include:

- Network latency.
- CDN behaviour.
- Browser caching policy.
- Resource redirects.
- Cache partitioning.
- Privacy protections.
- Query-string cache busting.

The resulting value should not be treated as reliable browsing-history data.

---

🔋 Battery

Where supported, the project reads:

- Battery level.
- Charging state.
- Charging time.
- Discharging time.

It also registers a charging-state change handler for WebSocket updates.

The Battery Status API is restricted or unavailable in many modern browsers.

---

📶 Network Information

Where "navigator.connection" is available, the project records:

- Effective connection type.
- Estimated downlink.
- Estimated RTT.
- Save-data preference.

A change handler can emit updated network information through WebSocket.

These values are estimates rather than guaranteed physical network measurements.

---

📳 Sensors

The project attempts to collect:

Device Motion

x
y
z

Device Orientation

alpha
beta
gamma

Ambient Light

Illuminance in lux where the API is available.

Sensor availability varies significantly between browsers and devices.

---

📋 Clipboard

In a secure context, the project attempts to read clipboard text through the Clipboard API.

Clipboard access is heavily restricted by modern browser security policies.

A failed read is expected in many environments.

---

💾 Browser Storage

The project attempts to inspect:

- "document.cookie"
- "localStorage"
- "sessionStorage"
- IndexedDB availability

The available data is restricted by:

- Same-origin policy.
- HttpOnly cookie protection.
- Browser privacy settings.
- Storage partitioning.

---

🖧 WebRTC Network Candidates

The project creates an "RTCPeerConnection" and gathers ICE candidates.

It attempts to extract IPv4 addresses from candidate strings.

Modern browsers may:

- Mask local addresses.
- Expose mDNS hostnames.
- Restrict candidate information.
- Behave differently depending on privacy settings.

Therefore, the result is browser-dependent.

---

⌨️ Interaction Events

The project registers handlers for:

- Keyboard events.
- Mouse movement.
- Click events.

Events may be forwarded through WebSocket and appended to the collection object.

Because keyboard and interaction telemetry can contain highly sensitive information, this collector should only be enabled for a clearly defined authorised research purpose.

---

🎤 Microphone Metadata

After microphone permission is granted, the project:

1. Requests an audio stream.
2. Creates an "AudioContext".
3. Connects the stream to an analyser.
4. Reads frequency-domain data.
5. Records summary metadata.
6. Stops the media tracks.

The current implementation records analyser statistics rather than intentionally storing a raw audio recording.

---

📸 Camera

The camera collector:

1. Enumerates video input devices.
2. Records the number of detected cameras.
3. Records available labels where exposed.
4. Attempts multiple video constraints.
5. Captures a single frame.
6. Encodes the frame as JPEG.
7. Sends the resulting image through configured output channels.

Camera access requires browser permission.

Device labels may be unavailable until permission has been granted.

---

🖥️ Screen Capture

The project uses:

navigator.mediaDevices.getDisplayMedia()

The browser displays its native screen-sharing selection flow.

The user must explicitly select and approve a capture source.

The project does not bypass this browser-controlled permission process.

---

🎮 Gamepad

The project reads connected gamepads and records:

- Gamepad ID.
- Button count.
- Axis count.

It also registers a connection event for newly connected devices.

---

🎹 MIDI

Where Web MIDI is available, the project attempts to record:

- MIDI input names.
- MIDI output names.

Support is browser-dependent.

---

🔌 USB

Where WebUSB is available, the project reads previously authorised devices.

Potential fields include:

- Vendor ID.
- Product ID.
- Product name.

The project also registers a USB connection handler.

WebUSB access is strongly restricted by browser security policies.

---

🥽 WebXR

The project checks whether the browser reports support for:

immersive-vr

This is a capability check, not proof that a compatible VR headset is currently connected.

---

📜 History State

The project records:

- "window.history.length"
- "window.history.state"

This does not provide unrestricted access to a user's browsing history.

---

🧩 Browser Extension Probing

The project contains experimental probes intended to investigate whether selected extension-related resources produce timing signals.

This technique is highly unreliable.

Results can be affected by:

- Browser engine.
- Extension implementation.
- Extension IDs.
- Resource loading behaviour.
- Privacy protections.

It should not be considered a reliable extension-detection mechanism.

---

⚠️ Error Reporting

Collectors use isolated error handling and record error context where possible.

Example:

cameraError:
NotAllowedError: Permission denied

This allows unsupported APIs and denied permissions to be distinguished from broader application failures.

---

🔒 Security

Sensitive information

This project may process:

- Precise geolocation.
- IP addresses.
- Device fingerprints.
- Browser metadata.
- Camera images.
- Screen captures.
- Clipboard contents.
- Keyboard events.
- Mouse events.
- Local network information.
- Browser storage data.

Treat all collected data as potentially sensitive.

Telegram credential exposure

The current architecture places the Telegram Bot API credential in browser-side JavaScript.

This means that anyone who can inspect the page source or runtime can potentially obtain the token.

For production systems, the preferred architecture is:

Browser
   ↓
Your Backend
   ↓
Telegram Bot API

rather than:

Browser
   ↓
Telegram Bot API

The same principle applies to other secrets.

Transport security

Use:

HTTPS
WSS

for sensitive deployments.

Encryption in transit does not compensate for:

- Excessive data collection.
- Weak access controls.
- Exposed credentials.
- Unauthorised deployment.

Data minimisation

Enable only the collectors required for the specific research objective.

A technically possible data point is not automatically a necessary data point.

---

⚠️ Limitations

This project is fundamentally constrained by the browser security model.

Important limitations include:

- Browser API support varies.
- Permissions may be denied.
- Some APIs require secure contexts.
- Some APIs require user gestures.
- Some APIs are deprecated or restricted.
- Mobile browsers behave differently from desktop browsers.
- Privacy-focused browsers may deliberately reduce information exposure.
- Browser extensions can modify behaviour.
- Fingerprints are probabilistic.
- IP geolocation is approximate.
- WebRTC information may be masked.
- Resource timing heuristics are unreliable.
- Camera and microphone access are permission-gated.
- Screen capture requires explicit user selection.
- Background execution is restricted on many platforms.

The project should therefore be understood as a browser capability research tool, not as a guaranteed complete device-information extractor.

---

🛠️ Troubleshooting

Symptom| Likely Cause| Suggested Action
Script does not start| Syntax error or invalid runtime configuration| Check DevTools Console
WebSocket fails immediately| "WS_URL" missing, invalid, or server unavailable| Verify endpoint and server status
Telegram messages fail| Invalid token or chat ID| Verify credentials and API response
Camera fails| Permission denied or insecure context| Use a supported secure context
Screen capture fails| User cancelled the browser dialog| Approve a capture source
Geolocation fails| Permission denied or unavailable| Check browser permission state
Clipboard fails| Browser security policy| Use a supported secure context and user gesture where required
Sensors never return| No sensor event or unsupported API| Add timeout handling and verify device support
Some fields are missing| Unsupported API or denied permission| Check the corresponding collector
WebRTC returns no IP| Browser privacy protection| Expected in modern environments
Extension detection is inaccurate| Experimental heuristic| Treat results as unreliable
Report is truncated| Telegram message size limit| Reduce output or implement chunking
Collection runs repeatedly but no data is sent| Collector execution or WebSocket state issue| Inspect the actual collection flow and connection state

---

❓ FAQ

Does this project access every browser capability?

No.

It can only access APIs implemented by the browser and allowed by the browser security model.

Can it bypass camera, microphone, or screen-capture permissions?

No.

The browser controls these permission flows.

Can it read a user's entire browsing history?

No.

The History API does not provide unrestricted browser-history access.

Is the browser fingerprint unique?

No.

Fingerprinting produces probabilistic signals and can change over time.

Does IP geolocation provide exact location?

No.

IP geolocation is approximate. Browser geolocation can be significantly more precise when permission is granted.

Why use Telegram and WebSocket together?

They serve different purposes:

Channel| Primary Purpose
Telegram| Human-readable reports and optional media
WebSocket| Real-time machine-readable events

Can individual collectors be disabled?

The architecture is intended to support independent collector control.

A future configuration layer should make this explicit rather than requiring manual code modification.

Is this suitable for normal website analytics?

Generally, no.

For ordinary analytics, use a purpose-built analytics system that follows data-minimisation principles.

---

🗺️ Roadmap

Architecture

- [ ] Fix and formalise collector execution model.
- [ ] Introduce explicit collector registry.
- [ ] Add collector enable/disable configuration.
- [ ] Add execution timeouts.
- [ ] Add WebSocket connection-state guards.
- [ ] Separate collection from transport.
- [ ] Move Telegram delivery behind a backend service.

Reliability

- [ ] Add browser compatibility detection.
- [ ] Add structured error objects.
- [ ] Add timeout handling for sensors and media APIs.
- [ ] Add schema validation.
- [ ] Add event versioning.
- [ ] Improve retry and backoff handling.

Privacy

- [ ] Add privacy-preserving collection profiles.
- [ ] Add explicit collector consent configuration.
- [ ] Add data redaction.
- [ ] Add retention controls.
- [ ] Add sensitive-field filtering.

Observability

- [ ] Live WebSocket dashboard.
- [ ] Collector success/failure metrics.
- [ ] Browser compatibility matrix.
- [ ] Structured event logging.
- [ ] Elasticsearch/Kibana integration.

Research

- [ ] Cross-browser comparison suite.
- [ ] Fingerprinting-resistance experiments.
- [ ] Web API availability benchmark.
- [ ] Permission-behaviour matrix.
- [ ] Mobile-vs-desktop capability analysis.

---

🤝 Contributing

Contributions are welcome in the areas of:

- Browser compatibility.
- Reliability.
- Documentation.
- Privacy controls.
- Testing.
- Error handling.
- Research tooling.

Development workflow

git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature

Then open a Pull Request.

Contribution guidelines

- Do not commit credentials or secrets.
- Keep collectors modular.
- Handle unsupported APIs gracefully.
- Document permission requirements.
- Document browser compatibility.
- Avoid unnecessary sensitive-data collection.
- Add appropriate error handling.
- Keep changes focused and reviewable.

---

📜 License

Distributed under the MIT License.

See ""LICENSE"" (LICENSE) for details.

---

📬 Contact

Ali-Hey-0

- GitHub: "@Ali-hey-0"
- Project: "Browser-Data-Logger"

For bugs, feature requests, or responsible security disclosures, please open an issue in the repository.

---

<p align="center">
  Made with ❤️ and JavaScript by <strong>Ali-Hey-0</strong>
</p>
