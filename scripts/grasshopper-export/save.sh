#!/bin/bash

# Ensure urls.txt exists
if [[ ! -f urls.txt ]]; then
    echo "urls.txt not found!"
    exit 1
fi

# Create a directory for the downloaded HTML files and MP3s
mkdir -p downloaded_html
mkdir -p downloaded_mp3

# Step 1: Download HTML pages listed in urls.txt
while IFS= read -r url; do
    wget --header="Cookie: __RequestVerificationToken=***REMOVED***; .GRASSHOPPERAUTH=***REMOVED***;" -P downloaded_html "$url"
done < urls.txt

# Step 2: Parse each HTML file for URLs matching the regex and download the MP3 files
for html_file in downloaded_html/*; do
    grep -oE 'https://nuui.us.grasshopper.com/File/DownloadGreeting\?greetingID=.{8}-.{4}-.{4}-.{4}-.{12}' "$html_file" | while IFS= read -r mp3_url; do
        wget -P downloaded_mp3 "$mp3_url"
    done
done
