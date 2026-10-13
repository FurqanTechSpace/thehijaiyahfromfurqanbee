@echo off
setlocal
set "GIT_EXE=C:\Users\pc1\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe"
set "REPO_DIR=C:\Users\pc1\Documents\Codex\2026-10-09\notion-plugin-notion-openai-curated-remote\work\vercel-repair-repo"
echo FurqanBee - Upload pembaikan gambar dan kamera
echo Repository: FurqanTechSpace/thehijaiyahfromfurqanbee
echo.
echo Langkah 1: Log masuk GitHub dalam browser jika diminta.
"%GIT_EXE%" credential-manager github login --username FurqanTechSpace --browser
if errorlevel 1 goto failed
echo.
echo Langkah 2: Menghantar fail. Jangan tutup tetingkap ini.
"%GIT_EXE%" -C "%REPO_DIR%" push origin main
if errorlevel 1 goto failed
echo.
echo BERJAYA! Fail pembaikan telah dihantar ke GitHub.
echo Tunggu deployment Vercel menjadi Ready, kemudian buka laman anda.
echo Jika rupa lama masih muncul, tekan Muat versi baharu atau cuba Incognito.
echo.
pause
exit /b 0
:failed
echo.
echo Upload belum selesai. Screenshot mesej di atas dan hantar kepada Codex.
echo Tiada force push atau pemadaman sejarah dilakukan.
pause
exit /b 1
