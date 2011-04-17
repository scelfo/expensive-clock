#!/bin/bash
echo "Downloading/updating closure components:"

if [ -d closure/closure-library ]
then
  echo ""
  echo "###############################################################################"
  echo "# Closure source exists, run 'svn up closure/closure-library/' to fetch latest."
else
  echo ""
  echo "################################"
  echo "# Checking out closure source..."
  echo ""
  # checkout closure source
  svn checkout http://closure-library.googlecode.com/svn/trunk/ closure/closure-library/
fi

if [ -f closure/compiler.jar ]
then
  echo ""
  echo "################################################################################"
  echo "# Closure compiler exists, 'rm closure/compiler.jar' and re-run to fetch latest."
  echo ""
else
  echo ""
  echo "##########################################"
  echo "# Fetching and extracting closure compiler."
  echo ""
  # fetch the closure compiler
  curl -O http://closure-compiler.googlecode.com/files/compiler-latest.zip
  unzip compiler-latest.zip compiler.jar -d closure
  rm compiler-latest.zip
fi

