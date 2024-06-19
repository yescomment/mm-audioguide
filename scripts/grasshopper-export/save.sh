#!/bin/bash

# Ensure extensionurls.txt exists
if [[ ! -f extensionurls.txt ]]; then
    echo "extensionurls.txt not found!"
    exit 1
fi

# Create a directory for the downloaded HTML files and MP3s
mkdir -p downloaded_extensionhtml
mkdir -p downloaded_greetings

# Step 1: Download HTML pages listed in extensionurls.txt
while IFS= read -r url; do
    wget --header="Cookie: __RequestVerificationToken=***REMOVED***; .GRASSHOPPERAUTH=***REMOVED***;" -P downloaded_html "$url"
done < extensionurls.txt

# Step 2: Parse each HTML file for URLs matching the regex and download the MP3 files
for html_file in downloaded_extensions/*; do
    grep -oE '/File/DownloadGreeting\?greetingID=.{8}-.{4}-.{4}-.{4}-.{12}' "$html_file" | while IFS= read -r mp3_url; do
        wget -P downloaded_mp3 "https://nuui.us.grasshopper.com$mp3_url"
    done
done
