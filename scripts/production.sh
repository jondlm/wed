#!/bin/bash
set -e # exit with nonzero exit code if anything fails

if [ -f "./scripts/keys.sh" ]; then
  source ./scripts/keys.sh
fi

export ACCESS_KEY=$PREVIEW_ACCESS_KEY

rm -rf public || exit 0;

roots compile -e production

cd public
git init
git config user.name "Travis CI"
git config user.email "jondlm@gmail.com"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

