#!/bin/sh

[ ! -f "$1" ] &&
	echo "Give \`sup\` a page which has been added/updated." &&
	exit 1

# You will want to change these variables to your needs.
website="https://tillmanns-cyber.space"
rssfile="blog.xml"
htmlfile="blog.html" 
# In order to cleanly use sed on a multi-line file, we have to use `tr` to
# convert newlines to a set character, then run sed, then reconvert the
# character. Unfortunately, due to a current issue in GNU's tr, characters of
# more than one byte are not functioning properly. It would be more ideal to
# use a rarer character (some random Tamil character, for example), but ^ is
# one byte.
replchar='^'
# So if you have a page with ^ in it, you'll have to change this to another
# single byte character that isn't in the page like ~ or something.

link="$website/$1"
titleh1="$(sed -n 's/<h1 id="blog-title">\(.*\)<\/h1>/\1/Ip' "$1")"
titledate="$(sed -n 's/<h2 id="blog-date">\(.*\)<\/h2>/\1/Ip' "$1")"
title="$titleh1 $titledate"
tagline="$(sed -n 's/<h4>\[\(.*\)\]<\/h4>/\1/Ip' "$1")"

# Check and see if this page has already been added to the RSS feed.
if grep -q "<guid.*>$link</guid>" "$rssfile"; then
	# Do this if it has been adding and we are updating it.

	# If updating a file, we append the time/date to the GUID, as all GUIDs
	# must be unique to validate an RSS feed. Even feed readers that follow
	# GUIDs will still be lead to the same page with this.
	guid="$link#$(date '+%y%m%d%H%M%S')"
	title="$title (Updated)"
	echo "Explain the nature of the update:"
	read -r content
	[ -z "$content" ] && content="New updates to $link"
else
	# Do this if it is a new page.

	guid=$link
	# Get the page body content, excluding the nav and footer.
	content="$(tr '\n' $replchar < "$1" | sed "
	s/.*<main>//
	s/<h1 id=\"blog-title\">.*<\/h1>//
	s/<h2 id=\"blog-date\">.*<\/h2>//
	s/<\/main>.*//
	" | tr -s $replchar '\n')"
fi

rssdate="$(LC_TIME=en_US date '+%a, %d %b %Y %H:%M:%S %z')"

# Eh, I'm a brainlet and I'm not sure how to elegantly add in the content to
# the RSS feed without first writing it out to a file. This is because if we
# tried run, say, a sed substitute command, we'd have to escape with \
# basically every other character. If you know how to do it without creating a
# temporary file, tell me. I do the same in lb, actually.
temp="$(mktemp)";
trap 'rm -f "$temp"' 0 1 2 3 15	# Delete temp file after script termination.
echo "
<item>
<title>$title</title>
<guid>$guid</guid>
<link>$link</link>
<pubDate>$rssdate</pubDate>
<description><![CDATA[$content
]]></description>
</item>
" > "$temp"

sed -i "/<!-- LB -->/r $temp" "$rssfile"

# temp="$(mktemp)";
# trap 'rm -f "$temp"' 0 1 2 3 15	# Delete temp file after script termination.
# echo "
# 	<div id="boxed">
# 		<h2><a href="./$1" id="link">$titleh1</a></h2>
# 		<p>$tagline</p>
# 	</div>
# 	<br>
# " > "$temp"

# sed -i "/<!-- NEXT -->/r $temp" "$htmlfile"