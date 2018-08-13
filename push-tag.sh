#!/bin/bash
# First Parameter should be: mint, demo, int-*
git tag $1 -f && git push origin $1 -f