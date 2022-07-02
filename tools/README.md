# Flipper Maker Tools
Tools created for testing and developing Flipper Maker

<br />

## githubToFlipperShare.py
Scrapes preselected repos to find Flipper Zero compatable files to add to the "File Install/Share" tool on Flipper Maker.
Note: I plan on intigrating this into Flipper Maker's code so that every time a user visits the website it generates the list of files automatically.
#### Instructions 
* Create a folder in the same directory as githubToFlipperShare.py called "sharefiles"
* <ins>Delete all files in your local folder "sharefiles"</ins>
* Add any new repos to the python code that you want it to scrape
* Run the script
* Copy all the files except the "generalShareUrls.txt" to the folder [`sharefiles`](https://github.com/FlipperMaker/flippermaker.github.io/tree/main/sharefiles)
* Copy the text in "generalShareUrls.txt" and replace everything in the file after "##External:" in the file [`generalShareUrls.txt`](https://github.com/FlipperMaker/flippermaker.github.io/blob/main/generalShareUrls.txt)

<br />

## keyboardRec.py
Created debug and capture keyboard input and to test out what keys the Flipper Zero sends when using the commands `ALTSTRING`, `ALTSTRING`, and `ALTCODE`.
#### Instructions 
* Python 3.7
* After running the Python code, a log of key commands will be printed to the terminal window.
#### Notes 
<details>
<summary>BadUSB Notes</summary>
<p>

* `ALTSTRING([int|str]|char)` 
  * Code: `ALTSTRING abc`
  * Output: `abc`
  * Keys Sent (FZ to PC): `[ALT][9][7][/ALT] [ALT][9][8][/ALT] [ALT][9][9][/ALT]`
* `ALTCODE([int|str]|char)`
  * Code: `ALTCODE 1`
  * Output: "1"
  * Keys Sent (FZ to PC): [ALT][4][9][/ALT]
* `ALTCODE([int|str]|char)`
  * Code: `ALTCODE 1 2 3`
  * Output: `1 2 3`
  * Keys Sent (FZ to PC): `[ALT][4][9][/ALT] [ALT][3][2][/ALT] [ALT][5][0][/ALT] [ALT][3][2][/ALT] [ALT][5][1][/ALT]`
* `ALTCHAR(int)`
  * Code: `ALTCHAR 1`
  * Output: `☺`
  * Keys Sent (FZ to PC): `[ALT][1][/ALT]`
  
</p>
</details>
  
