#!/bin/bash
THIS_DIR=$(cd $(dirname $0);pwd)
set -eu
cat <<EOT > ${THIS_DIR}/../.env
LOCALUID=`id -u`
LOCALGID=`id -g`
EOT
