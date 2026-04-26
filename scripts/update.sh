# update files on windows
deno task tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc --no-bundle
cp "./src-tauri/target/x86_64-pc-windows-msvc/release/memories-of-horizon.exe" "/mnt/c/Users/paulp/AppData/Local/Memories of Horizon/memories-of-horizon.exe"