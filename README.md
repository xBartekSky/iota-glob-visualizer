#  IOTA Network Explorer & 3D Visualizer

Aplikacja mobilna stworzona w React Native (Expo), służąca do wizualizacji infrastruktury sieci IOTA. Projekt łączy grafikę 3D z analizą danych blockchain w czasie rzeczywistym.

##  Kluczowe funkcje

- **Interaktywny Glob 3D:** Wizualizacja położeń walidatorów na żywo przy użyciu silnika `@react-three/fiber`.
- **Klastrowanie Walidatorów:** Inteligentne grupowanie blisko położonych węzłów dla zachowania czytelności mapy.
- **Kalkulator Stakingu:** Narzędzie do estymacji nagród (APY) w ujęciu dziennym, miesięcznym i rocznym.
- **Dashboard Sieci:** Tabela z sortowaniem i wyszukiwaniem aktywnych walidatorów (Stake, Voting Power, Komisja).
- **Live Blocks:** Podgląd najnowszych checkpointów i transakcji w sieci IOTA.
- **Automatyczna Geolokalizacja:** Wykrywanie fizycznej lokalizacji serwerów na podstawie ich adresów sieciowych.

##  Stack Technologiczny

- **Framework:** React Native (Expo)
- **Język:** TypeScript
- **Silnik 3D:** Three.js / React Three Fiber
- **Testy:** Jest & React Native Testing Library
- **Komunikacja:** JSON-RPC 2.0 (Fetch API)

##  Decyzje techniczne 

Zdecydowałem się na poniższe rozwiązania, aby zapewnić najwyższą jakość kodu i UX:

* **Wizualizacja 3D (React Three Fiber):** Wykorzystanie WebGL pozwala na płynne renderowanie przy 60 FPS, co nadaje aplikacji nowoczesny, profesjonalny charakter.
* **Klastrowanie (Supercluster):** Walidatorzy często znajdują się w tych samych centrach danych. Użyłem klastrowania, aby mapa pozostała czytelna – zamiast setek nakładających się punktów, użytkownik widzi przejrzyste grupy (wieksze punkty na globie).
* **Architektura .env:** Cała konfiguracja (linki RPC, API geolokalizacji) jest wydzielona do zmiennych środowiskowych. Aplikacja jest gotowa do przełączenia między sieciami Mainnet/Testnet.
* **Wydajność (Memoizacja):** Użyłem `useMemo` oraz `useCallback` przy ciężkich obliczeniach na danych z sieci, aby zminimalizować zużycie procesora i baterii w urządzeniu mobilnym.

##  Instalacja i uruchomienie

### 1️⃣ Klonowanie repozytorium

```bash
git clone https://github.com/xBartekSky/iota-glob-visualizer.git
cd iota-glob-visualizer
```

### 2️⃣ Instalacja zależności

```bash
npm install
```

W przypadku problemów z peer dependencies, użyj

```bash
npm install --legacy-peer-deps
```

### 3️⃣ Konfiguracja zmiennych środowiskowych
Klonowanie przygotowanego szablonu 
```bash
cp .env.example .env
```

> [!TIP]
> Plik .env.example zawiera już publiczne adresy dla sieci IOTA Mainnet, więc aplikacja jest gotowa do działania natychmiast po skopiowaniu.

### 4️⃣ Uruchomienie apliakcji

```bash
npx expo start
```

## Uruchomienie na urządzeniach

Aplikację można przetestować zarówno na symulatorze, jak i na fizycznym telefonie dzięki środowisku **Expo**.

### 1️⃣ Na fizycznym telefonie (Zalecane)
Jest to najlepszy sposób, aby poczuć płynność wizualizacji globu 3D:
1. Zainstaluj aplikację **Expo Go** ze sklepu App Store (iOS) lub Google Play (Android).
2. Upewnij się, że Twój telefon i komputer są w tej samej sieci Wi-Fi.
3. W terminalu wpisz `npx expo start`.
4. Zeskanuj aparatorem telefonu **kod QR**, który pojawi się w terminalu.

### 2️⃣ Na emulatorze (Android/iOS)
Jeśli masz skonfigurowane środowisko deweloperskie (Android Studio lub Xcode):
1. Uruchom emulator na komputerze.
2. W terminalu po wpisaniu `npx expo start`:
   - Naciśnij klawisz **`a`**, aby uruchomić aplikację na Androidzie.
   - Naciśnij klawisz **`i`**, aby uruchomić aplikację na iOS.

> [!NOTE]
> Ze względu na wykorzystanie **WebGL** do renderowania globu 3D, aplikacja działa znacznie płynniej na fizycznych urządzeniach niż na standardowych emulatorach.


## Źródła danych

Aplikacja pobiera dane bezpośrednio z publicznych źródeł:

IOTA RPC: api.mainnet.iota.cafe (dane o sieci).

Google DNS: Rozwiązywanie nazw domenowych walidatorów.

IP-API: Batchowa geolokalizacja serwerów.
