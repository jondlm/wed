source ./scripts/keys.sh

export ACCESS_KEY=$PREVIEW_ACCESS_KEY

rm -rf public

roots compile -e production

