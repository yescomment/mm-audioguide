#!/bin/bash

# Ensure extensionurls.txt exists
if [[ ! -f extensionurls.txt ]]; then
    echo "extensionurls.txt not found!"
    exit 1
fi

# Create a directory for the downloaded HTML files and MP3s
mkdir -p greetings_mp3

# Step 1: Download HTML pages listed in extensionurls.txt
while IFS= read -r url; do
    wget --header="Cookie: __RequestVerificationToken=***REMOVED***; .GRASSHOPPERAUTH=***REMOVED***;" -P downloaded_html "$url"
done < extensionurls.txt
