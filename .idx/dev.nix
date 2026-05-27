{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.python311Packages.virtualenv
  ];

  env = {};

  idx = {
    extensions = [];
    previews = {
      enable = true;
      previews = {};
    };
    workspace = {
      onCreate = {
        setup = "python3 -m venv .venv && source .venv/bin/activate && pip install google-adk google-generativeai python-dotenv requests";
      };
    };
  };
}