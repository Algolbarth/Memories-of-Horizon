# 🎴 Memories of Horizon

Memories of Horizon is a roguelike card game inspired by Magic: the Gathering and Heartstone battleground.
Create your decks with 500+ cards and try to survive to 100 various situations.
You can also use pre-built decks if you prefer.
Each deck have his own gameplan : increase your stats or decrease your opponent's one, drink potions or eat food, equip weapons or armors, call creatures or use actions, use mana with mages or construct buildings, etc.
With 12 elements, you can combine all the cards to create ultimate synergies.

**Note:** MoH is an independant French game, it is completely free but only available in French.

## 🕹️ Install

Download release files here :

### [🪟 For Windows](https://github.com/Algolbarth/memories-of-horizon/blob/main/release/windows)

### [🐧 For Linux](https://github.com/Algolbarth/memories-of-horizon/blob/main/release/linux)

**Note:** Audio files are not supported by Tauri on Linux at this time, so music is disabled in this version.

## 🛠️ Requirements for dev
MoH use Tauri (typescript/svelte + Rust) to build a webapp and a desktop application with the same architecture. Deno is used to compile typescript.

### [⚙️ Rust](https://github.com/rust-lang/rust)

Install using shell :
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Check is Rust is properly installed :
```
rustc --version
cargo --version
```

### [🦕 Deno](https://github.com/denoland/deno)

Install using shell :
```
curl -fsSL https://deno.land/install.sh | sh
```

Install using npm :
```
npm install -g deno
```

Install using cargo :
```
cargo install deno --locked
```

Check is Deno is properly installed :
```
deno --version
```

### [🟡​🔵​ Tauri](https://github.com/tauri-apps/tauri)

Install Tauri requirements using shell :
```
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

### [MoH Files](https://github.com/Algolbarth/memories-of-horizon)

Clone MoH repository :
```
git clone https://github.com/Algolbarth/memories-of-horizon.git
cd memories-of-horizon
deno install
```

Run MoH as an webapp :
```
deno task dev
```

Build MoH as a linux app :
```
deno task tauri build
```

Build MoH as an Windows app :
```
deno task tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc
```

## 📜 Roadmap
Next ajustements, new cards and mechanics are listed here :
```
- New elemental creatures for each element
- Update general interface
```
Read [Remaining.md](https://github.com/Algolbarth/memories-of-horizon/blob/main/REMAINING.md) to find out about all the features and content currently planned (non-definitive and non-exhaustive list).