!/bin/bash

now=$(date)

echo "Starting application : $now"
echo "-- > Compiling and Starting New Build < --"
tsc
echo "-- > Build ready < --"
npm run devStart