#!/usr/bin/env bash

# regex to validate in commit msg
commit_regex='([A-Z0-9]-[0-9]+)'
error_msg="Aborting commit. Your commit message is missing either a JIRA Issue ('DT-1111') or 'Merge'"

if ! grep -iqE "$commit_regex" "$1"; then
    echo "$error_msg" >&2
    exit 1
fi
