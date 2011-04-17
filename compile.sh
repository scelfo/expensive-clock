#!/bin/bash

./check_and_fetch_closure.sh

echo ""
echo "#####################################################"
echo "# Compiling src/ into obfuscated javascript in js/..."
echo ""

src_files='-i src/clock.js -i src/submit.js'
output_file=js/clock.js
./closure/closure-library/closure/bin/build/closurebuilder.py \
    --root=./closure/closure-library/ \
    --root=src/ \
    ${src_files} \
    --output_mode=compiled \
    --compiler_jar=./closure/compiler.jar \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
    > ${output_file}
