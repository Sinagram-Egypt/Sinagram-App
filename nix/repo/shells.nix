{
  inputs,
  cell,
}: let
  inherit (inputs.std) lib std;
  pkgs = inputs.nixpkgs.appendOverlays [inputs.nixgl.overlay];
in
  builtins.mapAttrs (_: lib.dev.mkShell) {
    # Tool Homepage: https://numtide.github.io/devshell/
    default = let
      # These specific versions are REQUIRED by react native
      # Please do NOT mess with them unless you know what you're doing.
      buildToolsVersion = "35.0.0";
      androidComposition = inputs.nixpkgs.androidenv.composeAndroidPackages {
        toolsVersion = null;
        platformVersions = ["35"];
        buildToolsVersions = [buildToolsVersion "34.0.0"];
        includeNDK = true;
        ndkVersions = ["26.1.10909125"];
        cmakeVersions = ["3.22.1"];
      };
    in {
      name = "Sinagram Dev Shell";

      imports = [std.devshellProfiles.default];

      # Tool Homepage: https://nix-community.github.io/nixago/
      nixago = [
        cell.configs.conform
        cell.configs.editorconfig
        cell.configs.githubsettings
        cell.configs.lefthook
        cell.configs.treefmt
      ];

      commands = [
        {
          package = inputs.makes.packages.default;
          help = "A software supply chain framework powered by Nix.";
        }

        {package = inputs.nixpkgs.nodejs;}

        {
          # Expose platform tools (aka adb & other executables)
          package = androidComposition.platform-tools;
        }

        {
          package = pkgs.nixgl.nixGLIntel;
          help = "NixGL for Intel graphics cards";
        }

        {
          name = "dev";
          command = "nixGLIntel $android/bin/run-test-emulator && npm run android";
          help = "Starts the emulator and builds & runs the app.";
        }

        {package = inputs.nixpkgs.jdk17;}
      ];

      env = [
        {
          name = "ANDROID_SDK_ROOT";
          value = "${androidComposition.androidsdk}/libexec/android-sdk";
        }

        {
          name = "GRADLE_OPTS";
          value = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${androidComposition.androidsdk}/libexec/android-sdk/build-tools/${buildToolsVersion}/aapt2";
        }

        {
          name = "ANDROID_NDK_ROOT";
          value = "${androidComposition.androidsdk}/libexec/android-sdk/ndk-bundle";
        }

        {
          name = "android";
          value = inputs.nixpkgs.androidenv.emulateApp {
            configOptions = {
              "hw.gpu.enabled" = "yes";
            }; # Enable GPU acceleration
            name = "AlGhoul's-Emulator";
            platformVersion = "29";
            abiVersion = "x86";
            systemImageType = "google_apis_playstore";
            # Resolution could be anything you want, keep the others if your Hardware supports KVM (for better performance)
            androidEmulatorFlags = "-skin 480x800 -accel on -gpu host -qemu -enable-kvm";
          };
        }
      ];
    };
  }
