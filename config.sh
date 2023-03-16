#!/bin/bash

echo $1

case $1 in
  local)
    cp src/config.js src/config.org.js
    cp src/config-local.js  src/config.js
    ;;

  dev)
    cp src/config.js src/config.org.js
    cp src/config-dev.js  src/config.js
    ;;

  prod)
    cp src/config.js src/config.org.js
    cp src/config-prod.js  src/config.js
    ;;
  rollback)
    cp src/config.org.js  src/config.js
    rm src/config.org.js
    ;;
esac
