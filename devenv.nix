{ pkgs, ... }:

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
  };

  devcontainer = {
    enable = true;
    settings = {
      updateContentCommand = "echo \"info: skipping 'devenv test' per https://github.com/cachix/devenv/issues/1120 for now\"";
    };
  };
}