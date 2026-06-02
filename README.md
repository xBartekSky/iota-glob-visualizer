# IOTA Network Explorer & 3D Visualizer


https://github.com/user-attachments/assets/739f24bc-0274-452a-af09-602ad8194668


A mobile application built with React Native (Expo) designed to visualize the IOTA network infrastructure. The project combines 3D graphics with real-time blockchain data analysis.

## Key Features

- **Interactive 3D Globe:** Real-time visualization of validator locations using the `@react-three/fiber` engine.
- **Validator Clustering:** Intelligent grouping of closely located nodes to maintain map readability.
- **Staking Calculator:** A tool for estimating rewards (APY) on a daily, monthly, and yearly basis.
- **Network Dashboard:** A table with sorting and searching capabilities for active validators (Stake, Voting Power, Commission).
- **Live Blocks:** Real-time preview of the latest checkpoints and transactions in the IOTA network.
- **Automatic Geolocation:** Detection of physical server locations based on their network addresses.

## Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **3D Engine:** Three.js / React Three Fiber
- **Testing:** Jest & React Native Testing Library
- **Communication:** JSON-RPC 2.0 (Fetch API)

## Technical Decisions

I chose the following solutions to ensure the highest code quality and UX:

* **3D Visualization (React Three Fiber):** Using WebGL allows for smooth rendering at 60 FPS, giving the app a modern, professional look.
* **Clustering (Supercluster):** Validators are often located in the same data centers. I used clustering to keep the map readable – instead of hundreds of overlapping points, the user sees clear groups (larger points on the globe).
* **.env Architecture:** All configuration (RPC links, geolocation APIs) is extracted into environment variables. The app is ready to switch between Mainnet and Testnet.
* **Performance (Memoization):** I used `useMemo` and `useCallback` for heavy network data calculations to minimize CPU and battery usage on the mobile device.

## Installation and Setup

### 1️⃣ Clone the repository

```bash
git clone [https://github.com/xBartekSky/iota-glob-visualizer.git](https://github.com/xBartekSky/iota-glob-visualizer.git)
cd iota-glob-visualizer
```

### 2️⃣ Install dependencies

```bash
npm install
```

If you encounter peer dependency issues, run:

```bash
npm install --legacy-peer-deps
```

### 3️⃣ Configure environment variables
Clone the provided template:
```bash
cp .env.example .env
```

> [!TIP]
> The .env.example file already contains public addresses for the IOTA Mainnet, so the application is ready to run immediately after copying.

### 4️⃣ Start the application

```bash
npx expo start
```

## Running on Devices
The application can be tested on both a simulator and a physical phone using the Expo environment.

### 1️⃣ On a physical phone (Recommended)
This is the best way to experience the smooth performance of the 3D globe visualization:
1. Install the Expo Go app from the App Store (iOS) or Google Play (Android).
2. Ensure your phone and computer are on the same Wi-Fi network.
3. In the terminal, run `npx expo start`.
4. Scan the QR code displayed in the terminal with your phone's camera.

### 2️⃣ On an emulator (Android/iOS)
If you have a development environment set up (Android Studio or Xcode):
1. Launch the emulator on your computer.
2. After running `npx expo start` in the terminal::
   - Press **`a`**, to run the app on Android.
   - Press **`i`**, to run the app on iOS.

> [!NOTE]
> Due to the use of WebGL for rendering the 3D globe, the application runs significantly smoother on physical devices than on standard emulators.


## Data Sources

The application fetches data directly from public sources:

IOTA RPC: api.mainnet.iota.cafe (dane o sieci).

Google DNS: Rozwiązywanie nazw domenowych walidatorów.

IP-API: Batchowa geolokalizacja serwerów.
