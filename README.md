# CondoWorks

This program contains two files that are for CondoWorks UW Co-op Coding Test.
Written by Francis He

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


To run the Scraper

```bash
node scraper.js [username] [password] [filename].pdf
```

Scraper takes 3 arguments: username, password and desired PDF filename. Username and password are required. If desired PDF filename is not given, default name is given as Invoice.pdf. 