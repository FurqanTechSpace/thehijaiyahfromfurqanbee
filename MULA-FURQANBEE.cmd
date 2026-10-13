@echo off
cd /d "%~dp0"
set "FURQAN_NODE=node"
where node >nul 2>&1
if errorlevel 1 (
  set "FURQAN_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
)
"%FURQAN_NODE%" server.cjs --open
if errorlevel 1 (
  echo Tidak dapat membuka pelayan. Node.js diperlukan atau port 4320 masih digunakan.
  pause
)
