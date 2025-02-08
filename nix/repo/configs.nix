{
  inputs,
  cell,
}: let
  inherit (inputs.std.data) configs;
  inherit (inputs.std.lib.dev) mkNixago;
in {
  # Tool Homepage: https://editorconfig.org/
  editorconfig = (mkNixago configs.editorconfig) {
    data = {};
  };

  # Tool Homepage: https://numtide.github.io/treefmt/
  treefmt = (mkNixago configs.treefmt) {
    data = {};
  };

  conform = (mkNixago configs.conform) {
    data =
      {
        inherit (inputs) cells;
      }
      // {
        commit.conventional.scopes = inputs.std.dmerge.append ["flake"];
      };
  };

  # Tool Homepage: https://github.com/evilmartians/lefthook
  lefthook = (mkNixago configs.lefthook) {
    data = {};
  };

  githubsettings = (mkNixago configs.githubsettings) {
    data = {
      repository = {
        name = "Sinagram-App";
        inherit (import (inputs.self + /flake.nix)) description;
        homepage = "";
        topics = ["Typescript" "ReactNative"];
        default_branch = "master";
        allow_squash_merge = false;
        allow_merge_commit = false;
        allow_rebase_merge = true;
        delete_branch_on_merge = true;
        private = true;
        has_issues = false;
        has_projects = false;
        has_wiki = false;
        has_downloads = false;
      };
    };
  };
}
