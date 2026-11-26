# List Compare

A static web page that compares one main list against several item lists pasted from spreadsheet cells (separated by `;`, tabs or new lines). It sorts and de-duplicates each list, ignoring case and extra spaces, and shows: entries in the main list but in no item, entries in an item but not in the main list, and the same per item. Nothing leaves your browser.

**Problem (Reddit):** [Breaking multiple sources of long strings of data into single, alphabetized columns to compare](https://www.reddit.com/r/excel/comments/1y6a50s/) (r/excel): country lists in one cell from a change order, cover page vs up to 10 affected items. Commas split values only when no `;`, tab or newline is present, because names like "Korea, Republic of" contain commas.

## Use
Open `index.html` in a browser. No install.

## Test
`node test.js`
