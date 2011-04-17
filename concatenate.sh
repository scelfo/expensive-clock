#!/bin/bash

./check_and_fetch_closure.sh

src_files='-i src/clock.js -i src/submit.js'
output_file=js/clock.js
./closure/closure-library/closure/bin/build/closurebuilder.py \
    --root=./closure/closure-library/ \
    --root=src/ \
    ${src_files} \
    --output_mode=script \
    > ${output_file}
