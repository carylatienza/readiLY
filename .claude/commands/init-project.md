---
description: Set up the Android toolchain on a new Windows machine and check the build
---

# Initialize Project

Set up a Windows machine to build and run the readiLY Android app. The stack and constraints are in `.agents/plans/00-master-build-plan.md` §2; read it if you have not.

- **Shell:** every command below is **PowerShell** (Windows PowerShell 5.1 or later). Use `curl.exe`, not `curl`, which is an alias in 5.1.
- **No admin rights:** install everything under `%LOCALAPPDATA%`. If any step needs admin rights or a reboot, stop and ask the user.
- **Versions:** look up the current ones; the examples below are from 2026-11-16.

## 1. Check what is already there

```powershell
java -version
"JAVA_HOME=$env:JAVA_HOME"; "ANDROID_HOME=$env:ANDROID_HOME"
adb version
android --sdk="$env:ANDROID_HOME" sdk list
```

Skip a step only if everything it installs is already listed. Java must report 17. A different JDK can stay installed; install 17 alongside it and point `JAVA_HOME` at 17.

## 2. JDK 17

```powershell
$api = "https://api.adoptium.net/v3/assets/latest/17/hotspot?architecture=x64&image_type=jdk&os=windows&vendor=eclipse"
$pkg = (Invoke-RestMethod $api)[0].binary.package      # .link, .checksum (SHA-256)
$zip = "$env:TEMP\jdk17.zip"
curl.exe -sSL -o $zip $pkg.link
if ((Get-FileHash $zip -Algorithm SHA256).Hash -ne $pkg.checksum.ToUpper()) { throw "JDK checksum mismatch" }
Expand-Archive $zip "$env:LOCALAPPDATA\Programs" -Force   # creates e.g. jdk-17.0.21+9
```

## 3. Android SDK command-line tools

The current Windows zip and its **SHA-1** are in `https://dl.google.com/android/repository/repository2-3.xml` under `cmdline-tools;latest` (file name `commandlinetools-win-<build>_latest.zip`).

```powershell
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
curl.exe -sSL -o "$env:TEMP\cmdline.zip" "https://dl.google.com/android/repository/commandlinetools-win-<build>_latest.zip"
(Get-FileHash "$env:TEMP\cmdline.zip" -Algorithm SHA1).Hash   # compare with the XML
Expand-Archive "$env:TEMP\cmdline.zip" "$sdk\cmdline-tools" -Force
Rename-Item "$sdk\cmdline-tools\cmdline-tools" latest         # tools must sit in cmdline-tools\latest\bin
```

## 4. Environment variables

Set them for the user only. **Never use `setx` on `Path`**: it truncates at 1024 characters and merges the machine Path into the user Path.

```powershell
$jdk = (Get-ChildItem "$env:LOCALAPPDATA\Programs" -Directory -Filter "jdk-17*" | Select-Object -Last 1).FullName
[Environment]::SetEnvironmentVariable('JAVA_HOME', $jdk, 'User')
[Environment]::SetEnvironmentVariable('ANDROID_HOME', $sdk, 'User')
$p = [Environment]::GetEnvironmentVariable('Path', 'User')       # the user Path only
$add = "$jdk\bin", "$sdk\cmdline-tools\latest\bin", "$sdk\platform-tools", "$sdk\emulator" |
  Where-Object { $p -notlike "*$_*" }
if ($add) { [Environment]::SetEnvironmentVariable('Path', ($p.TrimEnd(';') + ';' + ($add -join ';')), 'User') }
```

Open a new terminal so the variables load.

## 5. SDK packages

`sdkmanager` is deprecated from cmdline-tools 23.0; use the `android sdk` CLI that ships beside it.

**Stop and ask the user before installing packages.** Installing them accepts Google's Android SDK licence on the user's behalf.

```powershell
android --sdk="$env:ANDROID_HOME" sdk install "platform-tools" "platforms;android-<compileSdk>" "build-tools;<version AGP needs>"
```

`compileSdk` and the build-tools version come from `app/build.gradle.kts` and the AGP release notes once the project exists. On 2026-11-16 they were `android-36` and `36.1.0`.

## 6. Test target

### A physical device (preferred)

Ask the user to enable Developer options and USB debugging, plug the device in, and accept the "Allow USB debugging" prompt.

```powershell
adb devices -l
adb shell getprop ro.product.model
adb shell getprop ro.build.version.release
adb shell "head -1 /proc/meminfo"
```

Record the model, Android version and RAM. If the device has more than 4 GB of RAM, say so next to every memory or speed figure, since school tablets are smaller.

### An emulator (no phone yet)

This uses Android 9 (API 28), the app's minimum, on a tablet-sized screen.

```powershell
android --sdk="$env:ANDROID_HOME" sdk install "emulator" "system-images;android-28;default;x86_64"
emulator -accel-check
```

`-accel-check` must report WHPX or AEHD as usable. If it does not, the "Windows Hypervisor Platform" feature needs turning on, which takes admin rights and a reboot, so ask the user. Without acceleration the emulator is too slow to use.

```powershell
"no" | avdmanager create avd -n readily_api28 -k "system-images;android-28;default;x86_64" -d pixel_c --force
```

Piping `"no"` answers the custom-hardware prompt, so the command does not hang.

Edit `config.ini` in the AVD folder. That is `$env:USERPROFILE\.android\avd\readily_api28.avd`, or the folder under `$env:ANDROID_AVD_HOME` if that variable is set.

- Set `hw.ramSize` to no more than half of the host's RAM. Read the host's RAM with `(Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB`.
- Check that `hw.audioInput=yes` is there, so the emulator uses this PC's microphone.

```powershell
Start-Process emulator -ArgumentList '-avd','readily_api28','-no-snapshot-save'
adb wait-for-device; adb shell getprop sys.boot_completed   # repeat until it prints 1
```

Emulator memory and speed figures are not device figures; never report them as such.

## 7. Build and test (once the Gradle project exists)

```powershell
.\gradlew.bat ktlintCheck lintDebug assembleDebug testDebugUnitTest assembleDebugAndroidTest
.\gradlew.bat installDebug
```

## Do not

- Run anything that needs admin rights without asking.
- Record children's voices on the test device; use founders' adult voices only (master plan §8).
- Commit model binaries, recordings or `local.properties`.
