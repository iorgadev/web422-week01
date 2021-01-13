#!/usr/bin/env bash

git checkout -B gh-pages master
npm run build
git add dist -f
git commit -m "Update gh-pages with new build"
git push origin gh-pages -f
git checkout master
