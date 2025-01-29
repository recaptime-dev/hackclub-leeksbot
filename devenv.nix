{ pkgs, prisma-utils, nixpkgs, ... }:

#let
#  prisma =
#    (prisma-utils.lib.prisma-factory {
#      inherit nixpkgs;
#      prisma-fmt-hash = "sha256-4zsJv0PW8FkGfiiv/9g0y5xWNjmRWD8Q2l2blSSBY3s="; # just copy these hashes for now, and then change them when nix complains about the mismatch
#      query-engine-hash = "sha256-6ILWB6ZmK4ac6SgAtqCkZKHbQANmcqpWO92U8CfkFzw=";
#      libquery-engine-hash = "sha256-n9IimBruqpDJStlEbCJ8nsk8L9dDW95ug+gz9DHS1Lc=";
#      schema-engine-hash = "sha256-j38xSXOBwAjIdIpbSTkFJijby6OGWCoAx+xZyms/34Q=";
#    }).fromNpmLock
#      ./package-lock.json; # <--- path to our package-lock.json file that contains the version of prisma-engines
#in
{
  # https://devenv.sh/reference/options/
  packages =  with pkgs; [
    gitFull
    prisma-engines
    openssl
  ];

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim_22;
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  services.postgres = {
    enable = true;
    package = pkgs.postgresql_17;
  };

  dotenv.disableHint = true;

  env = {
    PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
    PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
    PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
    PRISMA_INTROSPECTION_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/introspection-engine";
	  PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
  };

  devcontainer = {
    enable = true;
    settings = {
      updateContentCommand = "echo \"info: skipping 'devenv test' per https://github.com/cachix/devenv/issues/1120 for now\"";
    };
  };

  #enterShell = prisma.shellHook;
}