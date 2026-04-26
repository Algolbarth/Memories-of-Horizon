# setup release files for linux
deno task tauri build
cp "./src-tauri/target/release/bundle/appimage/Memories of Horizon_0.0.3_amd64.AppImage" ./release/linux
cp "./src-tauri/target/release/bundle/deb/Memories of Horizon_0.0.3_amd64.deb" ./release/linux 
cp "./src-tauri/target/release/bundle/rpm/Memories of Horizon-0.0.3-1.x86_64.rpm" ./release/linux 

# setup release files for windows
deno task tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc
cp "./src-tauri/target/x86_64-pc-windows-msvc/release/bundle/nsis/Memories of Horizon_0.0.3_x64-setup.exe" ./release/windows