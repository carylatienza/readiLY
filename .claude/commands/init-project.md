---
description: Set up the Android toolchain on a new Windows machine and check the build
---

# Initialize Project

Set up a machine to build and run the readiLY Android app. The stack and constraints are in `.agents/plans/00-master-build-plan.md` §2; read it if you have not.

Install everything in user space (no admin rights needed). Look up current versions instead of copying the ones below; they are examples from 2026-11-16.

## 1. Check what is already there

```bash
java -version; echo "JAVA_HOME=$JAVA_HOME ANDROID_HOME=$ANDROID_HOME"; adb version
```

If `java -version` reports 17 and `adb` runs, skip to step 4.

## 2. JDK 17

Find the current Temurin 17 build and its SHA-256:

```bash
curl -s "https://api.adoptium.net/v3/assets/latest/17/hotspot?architecture=x64&image_type=jdk&os=windows&vendor=eclipse"
```

Download the zip, verify the checksum with `sha256sum -c`, unpack it to `%LOCALAPPDATA%\Programs\`, and set the user variable `JAVA_HOME` to the unpacked folder (for example `jdk-17.0.21+9`). Add `%JAVA_HOME%\bin` to the user `Path`.

## 3. Android SDK

1. Find the current `cmdline-tools;latest` Windows zip and its SHA-1 in `https://dl.google.com/android/repository/repository2-3.xml`.
2. Unpack it so the tools sit at `%LOCALAPPDATA%\Android\Sdk\cmdline-tools\latest\bin`.
3. Set the user variable `ANDROID_HOME` to `%LOCALAPPDATA%\Android\Sdk`. Add `cmdline-tools\latest\bin` and `platform-tools` under it to the user `Path`.
4. **Stop and ask the user before accepting the Android SDK licences.** Accepting them is the user's agreement, not yours. Once they agree:

```bash
sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-<compileSdk>" "build-tools;<version AGP needs>"
```

`compileSdk` and the build-tools version come from `app/build.gradle.kts` and the AGP release notes once the project exists.

Open a new terminal afterwards so the new variables load.

## 4. Test device

Ask the user to enable Developer options and USB debugging on their Android phone or tablet, plug it in, and accept the "Allow USB debugging" prompt. Then:

```bash
adb devices -l
adb shell getprop ro.product.model
adb shell getprop ro.build.version.release
adb shell cat /proc/meminfo | head -1
```

Record the model, Android version and RAM. If the device has more than 4 GB of RAM, say so next to every memory or speed figure, since school tablets are smaller.

**No phone yet? Use an emulator** (Android 9 / API 28, the app's minimum, on a tablet-sized screen):

```bash
android sdk install "emulator" "system-images;android-28;default;x86_64"
emulator -accel-check          # needs WHPX or AEHD hardware acceleration
avdmanager create avd -n readily_api28 -k "system-images;android-28;default;x86_64" -d pixel_c
emulator -avd readily_api28 -no-snapshot-save
```

In `~/.android/avd/readily_api28.avd/config.ini` set `hw.audioInput=yes` (the emulator then uses this PC's microphone) and keep `hw.ramSize` at or below half the host's RAM. Emulator memory and speed figures are not device figures; never report them as such.

## 5. Build and test (once the Gradle project exists)

```bash
./gradlew.bat ktlintCheck lintDebug assembleDebug testDebugUnitTest
./gradlew.bat installDebug
```

## Do not

- Run anything that needs admin rights without asking.
- Record children's voices on the test device; founders' adult voices only (master plan §8).
- Commit model binaries, recordings or `local.properties`.
