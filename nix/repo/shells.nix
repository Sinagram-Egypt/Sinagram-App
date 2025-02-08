{
  inputs,
  cell,
}: let
  inherit (inputs.std) lib std;
in
  builtins.mapAttrs (_: lib.dev.mkShell) {
    # Tool Homepage: https://numtide.github.io/devshell/
    default = {
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
      ];
    };
  }
