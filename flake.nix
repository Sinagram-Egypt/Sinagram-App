{
  description = "A web/cross-platform (mobile) app mono repo, hosting a social type app.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-24.05";
    std = {
      url = "github:divnix/std";
      inputs = {
        devshell.url = "github:numtide/devshell";
        nixago.url = "github:nix-community/nixago";
        arion.url = "github:hercules-ci/arion";
      };
    };
    makes = {
      url = "github:Al-Ghoul/makes";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    nixng = {
      url = "github:Al-Ghoul/NixNG";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = {std, ...} @ inputs:
    std.growOn {
      inherit inputs;
      cellsFrom = ./nix;
      cellBlocks = with std.blockTypes; [
        (nixago "configs")
        (devshells "shells")
      ];
    } {
    };
}
