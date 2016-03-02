fswatch src -l 0.1 \
  | egrep --line-buffered '\.(js|less)$' \
  | xargs -n1 -I{} bash -c "clear && node index.js"
