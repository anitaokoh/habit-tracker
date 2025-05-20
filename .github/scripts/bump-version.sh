#!/bin/bash

# This script calculates the next semantic version based on commit messages
# and generates a changelog since the last tag.

# Get latest tag (or default to 0.0.0)
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
echo "Latest tag: $LATEST_TAG"

# Parse version from tag
MAJOR=$(echo $LATEST_TAG | cut -d. -f1 | tr -d 'v')
MINOR=$(echo $LATEST_TAG | cut -d. -f2)
PATCH=$(echo $LATEST_TAG | cut -d. -f3)

# Check for keywords in commit messages to determine bump type
FEAT=$(git log $LATEST_TAG..HEAD --pretty=format:'%s' | grep -i '^feat:' | wc -l)
FIX=$(git log $LATEST_TAG..HEAD --pretty=format:'%s' | grep -i '^fix:' | wc -l)
CHORE=$(git log $LATEST_TAG..HEAD --pretty=format:'%s' | grep -i '^chore:' | wc -l)
BREAKING=$(git log $LATEST_TAG..HEAD --pretty=format:'%s' | grep -i 'BREAKING CHANGE' | wc -l)

echo "Found $BREAKING breaking changes, $FEAT new features, $FIX bug fixes, and $CHORE chores"

# Determine version bump
if [ $BREAKING -gt 0 ]; then
  MAJOR=$((MAJOR + 1))
  MINOR=0
  PATCH=0
elif [ $FEAT -gt 0 ]; then
  MINOR=$((MINOR + 1))
  PATCH=0
elif [ $FIX -gt 0 ] || [ $CHORE -gt 0 ]; then
  # Only bump patch version for fix or chore commits
  PATCH=$((PATCH + 1))
else
  # No version change if no fix, chore, feat, or breaking changes
  echo "No version bump needed - no fix, chore, feat, or breaking changes detected"
fi

# Set new version
NEW_VERSION="v$MAJOR.$MINOR.$PATCH"
echo "New version: $NEW_VERSION"

# Set outputs for GitHub Actions
if [ -n "$GITHUB_OUTPUT" ]; then
  echo "new_version=$NEW_VERSION" >> $GITHUB_OUTPUT
fi

# Create release notes based on commits
echo "## Changelog" > changelog.md

# Features
if [ $FEAT -gt 0 ]; then
  echo -e "\n### New Features" >> changelog.md
  git log $LATEST_TAG..HEAD --pretty=format:'- %s' | grep -i '^feat:' | sed 's/^feat: //' >> changelog.md
fi

# Fixes
if [ $FIX -gt 0 ]; then
  echo -e "\n### Bug Fixes" >> changelog.md
  git log $LATEST_TAG..HEAD --pretty=format:'- %s' | grep -i '^fix:' | sed 's/^fix: //' >> changelog.md
fi

# Chores
if [ $CHORE -gt 0 ]; then
  echo -e "\n### Maintenance" >> changelog.md
  git log $LATEST_TAG..HEAD --pretty=format:'- %s' | grep -i '^chore:' | sed 's/^chore: //' >> changelog.md
fi

# Other changes
echo -e "\n### Other Changes" >> changelog.md
git log $LATEST_TAG..HEAD --pretty=format:'- %s' | grep -v -i '^feat:' | grep -v -i '^fix:' | grep -v -i '^chore:' >> changelog.md

# Output the changelog
echo "Generated changelog:"
cat changelog.md

# If the script is called with the --apply flag, it will tag the repository
if [ "$1" = "--apply" ]; then
  git tag -a $NEW_VERSION -m "Release $NEW_VERSION"
  echo "Tagged repository with $NEW_VERSION"
  echo "To push the tag, run: git push origin $NEW_VERSION"
fi
