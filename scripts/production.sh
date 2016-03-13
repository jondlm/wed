source ./scripts/keys.sh

export ACCESS_KEY=$PRODUCTION_ACCESS_KEY

roots -e production compile
TEMP_DIR = "/tmp/`date +%s`"

mkdir "$TEMP_DIR"

