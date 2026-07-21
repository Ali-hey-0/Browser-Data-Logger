<div align="center">🌐 Browser Data Logger

Browser Telemetry, Fingerprinting & Web API Research Toolkit

<p>
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=2800&pause=700&color=3498DB&center=true&vCenter=true&width=650&lines=Browser+Telemetry;Web+API+Research;Fingerprinting+Studies;Security+Research+Toolkit" alt="Typing SVG" />
</p><p>
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger">
    <img src="https://img.shields.io/badge/Status-Research%20Project-3498DB?style=for-the-badge" alt="Project Status">
  </a>
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger/stargazers">
    <img src="https://img.shields.io/github/stars/Ali-hey-0/Browser-Data-Logger?style=for-the-badge&color=yellow" alt="GitHub Stars">
  </a>
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger/network/members">
    <img src="https://img.shields.io/github/forks/Ali-hey-0/Browser-Data-Logger?style=for-the-badge&color=blue" alt="GitHub Forks">
  </a>
  <a href="https://github.com/Ali-hey-0/Browser-Data-Logger/issues">
    <img src="https://img.shields.io/github/issues/Ali-hey-0/Browser-Data-Logger?style=for-the-badge&color=red" alt="GitHub Issues">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/Ali-hey-0/Browser-Data-Logger?style=for-the-badge&color=green" alt="License">
  </a>
</p><p>
  <strong>A modular browser telemetry and Web API research tool for studying what modern browsers expose about their execution environment.</strong>
</p><p>
  <sub>Built with vanilla JavaScript • Designed for authorised research, testing, and education</sub>
</p></div>---

«[!WARNING]
Authorised use only.

This project can interact with highly sensitive browser capabilities, including device sensors, location APIs, clipboard APIs, media devices, interaction events, and screen sharing. Use it only on systems you own or have explicit permission to test.

Do not deploy this project against unsuspecting users or collect personal data without informed consent and an appropriate legal basis.»

---

✨ What Is This?

Browser Data Logger is a client-side JavaScript research toolkit that explores the information exposed by modern browser APIs.

It collects browser telemetry from multiple independent sources, normalises the results into a single report, and can stream the collected data through:

- 📡 WebSocket — machine-readable real-time telemetry
- 🤖 Telegram Bot API — human-readable reports and optional media delivery

The project is intentionally built around a modular collector architecture. Each capability runs independently and failures are isolated, allowing unsupported or blocked browser APIs to fail without necessarily stopping the rest of the collection pipeline.

In one sentence

«A browser-side telemetry laboratory for studying browser capabilities, device metadata, fingerprinting surfaces, permissions, sensors, and real-time data transport.»

---

🧭 Project at a Glance

Layer| Responsibility
🧩 Collectors| Query individual browser APIs and data sources
🧠 Aggregator| Combine results into a unified telemetry object
🛡️ Error Isolation| Prevent one failed API from stopping the entire collection cycle
📦 Formatter| Convert collected data into a Telegram-compatible report
📡 WebSocket Transport| Stream structured JSON events and full snapshots
🤖 Telegram Transport| Deliver text reports and optional JPEG captures
🔁 Collection Loop| Periodically repeat the collection process

---

📚 Table of Contents

- "✨ What Is This?" (#-what-is-this)
- "🧭 Project at a Glance" (#-project-at-a-glance)
- "🧰 Capabilities" (#-capabilities)
- "🏗️ Architecture" (#️-architecture)
- "🔄 Collection Lifecycle" (#-collection-lifecycle)
- "⚡ Quick Start" (#-quick-start)
- "⚙️ Configuration" (#️-configuration)
- "📡 WebSocket Integration" (#-websocket-integration)
- "🤖 Telegram Integration" (#-telegram-integration)
- "📊 Data Catalog" (#-data-catalog)
- "🔐 Permissions & Browser Restrictions" (#-permissions--browser-restrictions)
- "🔒 Security & Privacy" (#-security--privacy)
- "⚠️ Known Limitations" (#️-known-limitations)
- "🛠️ Troubleshooting" (#️-troubleshooting)
- "🗺️ Roadmap" (#️-roadmap)
- "🤝 Contributing" (#-contributing)
- "📜 License" (#-license)

---

🧰 Capabilities

The project is organised around independent data-collection modules.

<details>
<summary><strong>🖥️ Browser & Device Telemetry</strong></summary><br>Collects browser and execution-environment metadata such as:

- User agent
- Platform
- Preferred language and languages
- Screen resolution
- Color depth
- Device pixel ratio
- Time zone
- Hardware concurrency
- Device memory, where exposed
- Touch capability
- WebDriver flag
- Referrer
- Current URL
- Window dimensions
- Screen orientation
- JavaScript heap information, where available
- Basic performance timing information

Static values are cached in memory after the first collection cycle.

</details><details>
<summary><strong>🎨 Fingerprinting Surfaces</strong></summary><br>Explores several browser fingerprinting surfaces:

Surface| What is examined
🖼️ Canvas| Canvas rendering output
🎮 WebGL| Renderer, vendor, version, supported extensions
🔊 Audio| Audio context characteristics
🔤 Fonts| Availability of selected fonts
🧱 WebAssembly| Basic WASM support

«Fingerprinting results are environment-dependent and should not be interpreted as a guaranteed unique device identifier.»

</details><details>
<summary><strong>🌐 Network & Location</strong></summary><br>The project can combine:

- Public IP lookup
- IP-based geolocation metadata
- ISP / organisation information
- ASN
- Time zone
- Approximate coordinates
- Browser geolocation, when available and permitted
- Reverse geocoding through OpenStreetMap Nominatim

The project attempts to distinguish between precise browser-provided location and approximate IP-based location.

</details><details>
<summary><strong>🔋 Runtime & Connection State</strong></summary><br>Where supported by the browser:

- Battery level
- Charging state
- Charging and discharging estimates
- Effective network type
- Estimated downlink
- RTT
- Data saver status

Some state changes can be forwarded as live WebSocket events.

</details><details>
<summary><strong>📱 Sensors & Hardware APIs</strong></summary><br>The collector can probe browser-accessible capabilities including:

- Accelerometer data
- Device orientation
- Ambient light sensors
- Gamepads
- MIDI devices
- USB devices
- WebXR immersive VR support

Support varies significantly between browsers, operating systems, and permission models.

</details><details>
<summary><strong>📋 Storage & Client-Side State</strong></summary><br>The current implementation inspects the availability and accessible contents of:

- Cookies available to the current document
- "localStorage"
- "sessionStorage"
- IndexedDB availability
- Navigation history metadata

«The browser's same-origin policy still applies. A page cannot arbitrarily read storage belonging to unrelated origins.»

</details><details>
<summary><strong>🎙️ Media APIs</strong></summary><br>With browser permission and a secure context, the project can interact with:

- 🎤 Microphone input
- 📸 Camera input
- 🖥️ Screen sharing

The resulting media data is converted into JPEG or metadata representations before being transmitted.

</details><details>
<summary><strong>⌨️ Interaction Telemetry</strong></summary><br>The collector can observe selected interaction events during the page lifetime, including:

- Keyboard events
- Mouse movement
- Click events

The current implementation limits some interaction collection to reduce unbounded growth.

</details><details>
<summary><strong>📡 Multi-Channel Delivery</strong></summary><br>Collected information can be delivered through two independent channels:

WebSocket

Structured JSON suitable for:

- Dashboards
- Monitoring systems
- Event pipelines
- Custom analysis tools

Telegram

Human-readable reports with optional JPEG media attachments.

Both delivery paths implement retry behaviour with exponential backoff.

</details>---

🏗️ Architecture

The system follows a simple collect → aggregate → format → transmit pipeline.

flowchart TD
    A["Browser Loads java.js"] --> B["Initialize WebSocket"]
    B --> C["Start Collection Cycle"]

    C --> D["Parallel Collectors"]

    D --> D1["Permissions"]
    D --> D2["IP & Network"]
    D --> D3["Device Metadata"]
    D --> D4["Fingerprinting"]
    D --> D5["WebGPU"]
    D --> D6["Geolocation"]
    D --> D7["Battery"]
    D --> D8["Sensors"]
    D --> D9["Clipboard"]
    D --> D10["Storage"]
    D --> D11["WebRTC"]
    D --> D12["Interactions"]
    D --> D13["Media Devices"]
    D --> D14["Gamepad / MIDI / USB"]
    D --> D15["WebXR / History / Extensions"]

    D1 --> E["Unified Telemetry Object"]
    D2 --> E
    D3 --> E
    D4 --> E
    D5 --> E
    D6 --> E
    D7 --> E
    D8 --> E
    D9 --> E
    D10 --> E
    D11 --> E
    D12 --> E
    D13 --> E
    D14 --> E
    D15 --> E

    E --> F["Format Report"]
    F --> G["Telegram"]
    E --> H["WebSocket JSON"]

    G --> I["Text Report"]
    G --> J["Optional JPEG Media"]

    E --> K["Periodic Recollection"]
    K --> C

Core design principles

⚡ Parallel collection

Independent collectors are executed concurrently using "Promise.all".

This reduces the time required to complete a collection cycle, although some APIs may still introduce their own delays.

🧱 Failure isolation

Each collector has its own error boundary.

A failure in one capability should not necessarily prevent other collectors from completing.

🗃️ In-memory caching

Some relatively static data is cached:

- Device metadata
- Fingerprinting results
- IP-derived details

This reduces repeated work during subsequent collection cycles.

🔁 Retry with exponential backoff

Telegram delivery retries failed requests using progressively longer delays:

1s → 2s → 4s → 8s → 16s

The same strategy is used for text messages and media uploads.

---

🔄 Collection Lifecycle

Each collection cycle follows this general sequence:

┌────────────────────┐
│  Start Collection  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Check Secure Context│
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Run Collectors      │
│ in Parallel         │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Aggregate Results   │
└─────────┬──────────┘
          │
          ├──────────────► WebSocket JSON
          │
          ▼
┌────────────────────┐
│ Format Text Report  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Telegram Delivery   │
└─────────┬──────────┘
          │
          ├──────────────► Text Report
          │
          └──────────────► Optional Media
          
          ▼
┌────────────────────┐
│ Wait ~120 seconds   │
└─────────┬──────────┘
          │
          └──────────────► Repeat

---

⚡ Quick Start

1. Clone the repository

git clone https://github.com/Ali-hey-0/Browser-Data-Logger.git
cd Browser-Data-Logger

2. Configure "java.js"

Open the configuration section at the top of the file:

const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';
const DEBUG = false;

«Never commit a real Telegram bot token to a public repository.»

For production deployments, use a server-side relay or another secret-management mechanism instead of exposing credentials in browser-delivered JavaScript.

3. Serve the project

Many browser APIs require a secure context.

For a basic local test:

python3 -m http.server 8000

Then open:

http://localhost:8000

"localhost" is treated as a secure context for many browser APIs.

For remote deployments, use HTTPS.

4. Load the script

Include the JavaScript file in your page:

<script src="./java.js"></script>

The script automatically initialises its WebSocket connection and begins a collection cycle.

---

⚙️ Configuration

The main configuration values are:

Variable| Purpose
"BOT_TOKEN"| Telegram Bot API credential
"CHAT_ID"| Destination Telegram chat
"DEBUG"| Enables verbose browser-console logging
"WS_URL"| WebSocket endpoint

Example:

const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';
const DEBUG = false;

Recommended configuration model

For a real deployment:

Browser
   │
   ▼
Client Collector
   │
   ▼
Your Backend
   ├── Telegram API
   ├── Database
   ├── Dashboard
   └── Analysis Pipeline

This is preferable to placing sensitive API credentials directly inside client-side JavaScript.

---

📡 WebSocket Integration

The collector sends structured JSON messages to the configured WebSocket endpoint.

Minimal Node.js receiver

npm init -y
npm install ws

Create "server.js":

const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
    console.log('Received:', data.toString());
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server listening on ws://localhost:8080');

Run:

node server.js

Then configure:

const WS_URL = 'ws://localhost:8080';

For production, use "wss://" behind a properly configured TLS endpoint.

---

Example WebSocket events

IP metadata

{
  "ipDetails": {
    "city": "Example City",
    "country": "Example Country",
    "asn": "AS12345"
  }
}

Battery update

{
  "batteryUpdate": {
    "charging": true,
    "timestamp": "2026-07-21T14:22:10.123Z"
  }
}

Interaction event

{
  "interaction": "Click:320,540:123456.78"
}

Full collection snapshot

{
  "timestamp": "2026-07-21T14:22:10.123Z",
  "isSecure": true,
  "deviceInfo": {},
  "network": {},
  "battery": {}
}

---

🤖 Telegram Integration

Telegram is used as a human-readable delivery channel.

The collector can send:

📝 Text reports

A formatted summary of the collected telemetry.

📸 Camera captures

When:

- A camera is available
- The browser grants access
- The page runs in a suitable secure context

🖥️ Screen captures

When:

- The browser supports screen sharing
- The user explicitly approves the native browser screen-sharing prompt

🔁 Retry behaviour

Failed requests are retried with exponential backoff.

Attempt 1 → 1 second
Attempt 2 → 2 seconds
Attempt 3 → 4 seconds
Attempt 4 → 8 seconds
Attempt 5 → 16 seconds

---

📊 Data Catalog

🖥️ Device Metadata

Data| Availability
User agent| Usually available
Platform| Usually available
Language| Usually available
Screen size| Usually available
Pixel ratio| Usually available
Time zone| Usually available
CPU core count| Browser-dependent
Device memory| Browser-dependent
Touch support| Usually available
WebDriver flag| Browser-dependent
Referrer| Depends on navigation context
JavaScript heap| Browser-dependent

---

🎨 Fingerprinting

The project examines:

- Canvas rendering
- WebGL renderer information
- WebGL vendor information
- Supported WebGL extensions
- Audio context characteristics
- Selected font availability
- WebAssembly support

«Fingerprinting data is inherently browser- and environment-dependent.»

---

🌐 Network

The project can collect:

- Public IP address
- Approximate IP location
- ISP / organisation
- ASN
- Region
- Country
- Postal code
- Time zone
- Approximate coordinates

The implementation uses external services for IP and geolocation enrichment.

---

📍 Geolocation

When available and permitted:

Browser Geolocation
        │
        ▼
Latitude / Longitude
        │
        ▼
Reverse Geocoding
        │
        ▼
Human-Readable Address

If browser geolocation fails, the implementation may retain approximate IP-based location information when available.

---

🔋 Battery & Network State

Collected battery values may include:

- Battery percentage
- Charging state
- Charging time
- Discharging time

Network values may include:

- Effective connection type
- Estimated downlink
- RTT
- Data saver state

---

📱 Sensors

Supported environments may expose:

- Accelerometer readings
- Device orientation
- Ambient light level

Availability varies considerably by:

- Browser
- OS
- Device
- Permission model
- Secure-context requirements

---

📦 Storage

The project checks:

Cookies
├── document.cookie

localStorage
├── Key/value data available to the current origin

sessionStorage
├── Session-scoped key/value data

IndexedDB
└── Availability

The browser's same-origin policy remains in effect.

---

🖧 WebRTC

The project creates a temporary peer connection and observes ICE candidate information exposed by the browser.

The resulting data may contain locally exposed network addresses depending on:

- Browser implementation
- WebRTC privacy protections
- Network configuration
- mDNS obfuscation

---

🎙️ Microphone

With permission, the implementation:

1. Requests microphone access.
2. Creates an audio context.
3. Analyses the audio stream.
4. Extracts basic frequency-domain metadata.
5. Stops the media tracks.

The current implementation sends metadata rather than storing a continuous audio recording.

---

📸 Camera

The camera module:

1. Enumerates video input devices.
2. Attempts several camera constraints.
3. Captures a single frame.
4. Converts the frame to JPEG.
5. Sends the resulting image through the configured delivery channel.

---

🖥️ Screen Capture

The screen-capture module uses the browser's native screen-sharing API.

The user must interact with the browser's permission dialog.

The collector does not silently bypass the browser's native screen-sharing permission flow.

---

⌨️ Interaction Events

The implementation can observe:

Keyboard Events
      │
      ├── Key
      └── Timestamp

Mouse Events
      │
      ├── Movement
      ├── Coordinates
      └── Timestamp

Click Events
      │
      ├── Coordinates
      └── Timestamp

---

🎮 Hardware & Extended APIs

Additional capability checks include:

- Gamepads
- MIDI devices
- USB devices
- WebXR / immersive VR support
- Browser history metadata
- Selected extension-detection experiments

Support is highly browser-dependent.

---

🔐 Permissions & Browser Restrictions

Modern browsers intentionally restrict many sensitive APIs.

Capability| Typical requirement
📍 Geolocation| User permission + suitable context
🎤 Microphone| User permission + secure context
📸 Camera| User permission + secure context
🖥️ Screen sharing| Explicit user interaction
📋 Clipboard| Secure context and browser restrictions
🔌 USB| Browser permission / user interaction
🎹 MIDI| Browser-dependent permission model
📱 Sensors| Device and browser support
🥽 WebXR| Compatible hardware and browser

A failed collection attempt does not necessarily indicate a software bug.

It may simply mean:

API unavailable
      OR
Permission denied
      OR
Browser restriction
      OR
Insecure context
      OR
Operating-system limitation

---

🔒 Security & Privacy

This project can process highly sensitive information.

Treat the following as sensitive:

- Precise location
- Camera images
- Screen captures
- Clipboard content
- Keyboard events
- Local network information
- Device fingerprints
- Storage data

Deployment recommendations

✅ Do

- Use only on authorised systems.
- Obtain informed consent where required.
- Use HTTPS/WSS in real deployments.
- Protect Telegram credentials.
- Avoid committing secrets to Git.
- Minimise collected data where possible.
- Restrict access to receiving systems.
- Delete data that is no longer necessary.

❌ Do not

- Deploy it secretly against third parties.
- Use it as a covert surveillance mechanism.
- Collect credentials or personal information without authorisation.
- Expose bot tokens or backend secrets in public repositories.
- Assume that a browser permission prompt automatically makes a deployment legally compliant.

---

⚠️ Known Limitations

Browser APIs are not uniform.

The same code can behave differently across:

- Chromium
- Firefox
- Safari
- Android browsers
- iOS browsers
- Desktop environments

Some APIs may be:

- Completely unavailable
- Permission-gated
- Disabled by browser policy
- Restricted to secure contexts
- Limited by privacy protections
- Inconsistent across devices

The project should therefore be considered an experimental browser telemetry research tool, not a universal device-identification system.

---

🛠️ Troubleshooting

Telegram messages are not arriving

Check:

- Bot token
- Chat ID
- Network connectivity
- Telegram API availability
- Browser console output with "DEBUG = true"

---

Camera or microphone access fails

Check:

- HTTPS or "localhost"
- Browser permission state
- Operating-system permissions
- Whether another application is using the device

---

Geolocation fails

Possible causes:

- User denied permission
- No location provider available
- Browser restrictions
- Timeout
- Insecure context

The implementation may fall back to approximate IP-based location when available.

---

WebSocket connection fails

Verify:

WS_URL
   │
   ├── Correct protocol
   ├── Correct hostname
   ├── Correct port
   └── Server is running

Use:

ws://

for local development and:

wss://

for TLS-protected deployments.

---

The script appears to stop

Enable:

const DEBUG = true;

Then inspect the browser console for errors.

---

🗺️ Roadmap

📊 Observability

- Structured event schemas
- Better collector status reporting
- Per-module execution metrics
- Collection latency measurements

🖥️ Dashboard

- Real-time WebSocket dashboard
- Device/session timeline
- Collector status visualisation
- Event filtering

🧩 Plugin Architecture

A future collector interface could allow modules such as:

registerCollector({
    name: 'customCollector',
    collect: async () => {
        return {};
    }
});

This would make new capabilities easier to add without modifying the core pipeline.

🗄️ Data Backends

Potential integrations:

- PostgreSQL
- MongoDB
- Elasticsearch
- InfluxDB
- ClickHouse

🛡️ Privacy Engineering

Future improvements could include:

- Explicit per-category consent
- Data minimisation modes
- Collector allowlists
- Redaction policies
- Local-only operation
- Configurable retention

---

🤝 Contributing

Contributions are welcome.

Development workflow

git checkout -b feature/your-feature

Make your changes, test them, and commit:

git add .
git commit -m "Add your feature"
git push origin feature/your-feature

Then open a Pull Request.

Contribution principles

- Keep collectors modular.
- Handle unsupported APIs gracefully.
- Avoid breaking existing configuration unnecessarily.
- Document browser-specific behaviour.
- Do not introduce hard-coded secrets.
- Clearly document sensitive data collection.
- Prefer explicit, understandable code over opaque abstractions.

---

📜 License

This project is distributed under the MIT License.

See ""LICENSE"" (LICENSE) for the full license text.

---

🔗 Project

Repository:
https://github.com/Ali-hey-0/Browser-Data-Logger

For bugs, suggestions, and responsible security reports, please open a GitHub Issue.

---

<div align="center">Built for browser research, API experimentation, and security education.

<br>Made with ❤️ and JavaScript by
<a href="https://github.com/Ali-hey-0">Ali-Hey-0</a>

</div>
