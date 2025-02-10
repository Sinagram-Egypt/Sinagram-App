{
  inputs,
  cell,
}: let
  inherit (inputs.std) lib;
  inherit (inputs.nixng) nglib;
  db-image = nglib.makeSystem {
    inherit (inputs) nixpkgs;
    system = "x86_64-linux";
    name = "sinagram-db-service";
    config = {pkgs, ...}: {
      config = {
        dumb-init = {
          enable = true;
          type.services = {};
        };
        nix = {
          loadNixDb = true;
          persistNix = "/nix-persist";
          config = {
            experimental-features = ["nix-command" "flakes"];
            sandbox = true;
            trusted-public-keys = [
              "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
            ];
            substituters = ["https://cache.nixos.org/"];
          };
        };
        services.postgresql = {
          enable = true;
          package = pkgs.postgresql;
          enableTCPIP = true;
          initdbArgs = ["--encoding=UTF-8" "--locale=C"];
          port = 5433;
          initialScript = pkgs.writeText "db-initScript" ''
            CREATE USER db_owner WITH LOGIN PASSWORD 'secure_password';
            GRANT ALL PRIVILEGES ON DATABASE sinagramdb TO db_owner;
            \c sinagramdb;
            GRANT ALL ON SCHEMA public TO db_owner;
          '';
          ensureDatabases = ["sinagramdb"];
          authentication = ''
            host    all             db_owner             0.0.0.0/0            md5
          '';
        };
      };
    };
  };
in
  builtins.mapAttrs (_: lib.dev.mkArion) {
    sinagram-db-service = {
      project.name = "sinagram-db-service";
      docker-compose.volumes = {
        users-data = {};
      };

      services = {
        sinagram-db-service = {
          build.image =
            inputs.nixpkgs.lib.mkForce
            db-image
            .config
            .system
            .build
            .ociImage
            .build;
          service = {
            useHostStore = true;
            container_name = "Sinagram-Postgres-Service";
            stop_signal = "SIGINT";
            ports = ["5433:5433"];
            volumes = ["users-data:/var/lib/postgresql/data"];
          };
        };
      };
    };
  }
