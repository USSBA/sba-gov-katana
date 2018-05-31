#!/bin/bash -e

# Every command in this script is part of the health check.  Any failing command will short-circuit the whole script

#TODO: Check for something...

if aws sts get-caller-identity > /dev/null 2>&1; then
  echo "Healthcheck: Running in AWS"
  # Add commands to check for AWS permissions, roles, etc here
else
  echo "Healthcheck: NOT running in AWS (or aws-cli not installed)"
fi
