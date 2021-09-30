# CondoWorks

This program contains two files that are for CondoWorks UW Co-op Coding Test.
Written by Francis He (f27he@uwaterloo.ca).

## Start-up

Download puppeteer to run the second part of this program

```bash
npm install puppeteer
```

## Usage

To run the Parser:

```bash
node parser.js test-q1.txt
```

Parser takes the file name as the argument, in the place of the text file name. 


To run the Scraper:

```bash
node scraper.js Invoice.pdf
```

Scraper takes the desired file name as the argument, in the place of the pdf file name. If not stated, defaults to Invoice.pdf in the local folder. 
