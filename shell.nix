with import <nixpkgs> { };

runCommand "nix-shell-env" rec {
  buildInputs = [
    nodejs
    nasm      # for jpegtran-bin
    pkgconfig # for pngquant-bin
    automake  # for gifsicle
    autoconf
    libpng
    python
  ];
  shellHook = ''
    export MANPATH=${lib.makeSearchPath "share/man" buildInputs}:$MANPATH
    export PATH=$PWD/node_modules/.bin:$PATH
  '';
} ""
