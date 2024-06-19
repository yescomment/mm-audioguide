#!/bin/bash

# Ensure extensionurls.txt exists
if [[ ! -f greetingurls.txt ]]; then
    echo "greetingurls.txt not found!"
    exit 1
fi

# Create a directory for the downloaded HTML files and MP3s
mkdir -p greetings_mp3

wget --header="Cookie: __RequestVerificationToken=***REMOVED***; .GRASSHOPPERAUTH=***REMOVED***;" -P greetings_mp3 --content-disposition -i greetingurls.txt
