#!/bin/bash
set -e

# set colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # reset color

# check dependencies
if ! command -v gh &> /dev/null; then
  echo -e "${RED}Erreur : GitHub CLI (gh) n'est pas installé.${NC}"
  exit 1
fi

if ! command -v deno &> /dev/null; then
  echo -e "${RED}Erreur : Deno n'est pas installé.${NC}"
  exit 1
fi

if ! gh auth status &> /dev/null; then
  echo -e "${RED}Erreur : tu n'es pas connecté à GitHub CLI.${NC}"
  exit 1
fi

# read current version
CURRENT_VERSION=$(deno eval "const config = JSON.parse(Deno.readTextFileSync('src-tauri/tauri.conf.json'));console.log(config.version);")

echo -e "${BLUE}Version actuelle : ${YELLOW}$CURRENT_VERSION${NC}"

# choose bumping mode
echo ""
echo "Quel type de release ?"
echo "  1) patch  (${CURRENT_VERSION%.*}.$(( ${CURRENT_VERSION##*.} + 1 )))"
echo "  2) minor"
echo "  3) major"
echo ""
read -rp "Choix [1/2/3] : " BUMP_CHOICE

IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

case $BUMP_CHOICE in
  1) PATCH=$((PATCH + 1)) ;;
  2) MINOR=$((MINOR + 1)); PATCH=0 ;;
  3) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  *)
    echo -e "${RED}Choix invalide.${NC}"
    exit 1
    ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
echo -e "\n${GREEN}Bump : $CURRENT_VERSION → $NEW_VERSION${NC}\n"

# update config files
echo -e "${BLUE}Mise à jour de tauri.conf.json...${NC}"
deno eval "
  const path = 'src-tauri/tauri.conf.json';
  const config = JSON.parse(Deno.readTextFileSync(path));
  config.version = '$NEW_VERSION';
  Deno.writeTextFileSync(path, JSON.stringify(config, null, 2) + '\n');
"

echo -e "${BLUE}Mise à jour de Cargo.toml...${NC}"
sed -i "0,/^version = \".*\"/{s/^version = \".*\"/version = \"$NEW_VERSION\"/}" src-tauri/Cargo.toml

echo -e "${BLUE}Mise à jour de package.json...${NC}"
deno eval "
  const path = 'package.json';
  const pkg = JSON.parse(Deno.readTextFileSync(path));
  pkg.version = '$NEW_VERSION';
  Deno.writeTextFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
"

# clean release folder
echo -e "${BLUE}Nettoyage du dossier release...${NC}"
rm -rf ./release

# build linux versions
echo -e "\n${BLUE}Build Linux...${NC}"
deno task tauri build

mkdir -p ./release/linux
cp "./src-tauri/target/release/bundle/appimage/Memories of Horizon_${NEW_VERSION}_amd64.AppImage" ./release/linux/
cp "./src-tauri/target/release/bundle/deb/Memories of Horizon_${NEW_VERSION}_amd64.deb" ./release/linux/
cp "./src-tauri/target/release/bundle/rpm/Memories of Horizon-${NEW_VERSION}-1.x86_64.rpm" ./release/linux/

# build windows version
echo -e "\n${BLUE}Build Windows...${NC}"
deno task tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc

mkdir -p ./release/windows
cp "./src-tauri/target/x86_64-pc-windows-msvc/release/bundle/nsis/Memories of Horizon_${NEW_VERSION}_x64-setup.exe" ./release/windows/

# git commit
echo -e "\n${BLUE}Commit et tag git...${NC}"
git add src-tauri/tauri.conf.json src-tauri/Cargo.toml src-tauri/Cargo.lock package.json
git commit -m "chore: upgrade version to $NEW_VERSION"
git tag "v$NEW_VERSION"
git push

# make github release
echo -e "\n${BLUE}Création de la GitHub Release v$NEW_VERSION...${NC}"
gh release create "v$NEW_VERSION" \
  ./release/linux/*.AppImage \
  ./release/linux/*.deb \
  ./release/linux/*.rpm \
  ./release/windows/*.exe \
  --title "Release v$NEW_VERSION" \
  --generate-notes

echo -e "\n${GREEN}✓ Release v$NEW_VERSION publiée avec succès !${NC}"