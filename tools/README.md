# Flipper Maker Tools
Tools created for testing and developing Flipper Maker

<br />

## githubToFlipperShare.py
Scrapes preselected repos to find Flipper Zero compatable files to add to the "File Install/Share" tool on Flipper Maker.
Note: I plan on intigrating this into Flipper Maker's code so that every time a user visits the website it generates the list of files automatically.
#### Instructions
<details><summary>View Instructions</summary><p>
	
* Create a folder in the same directory as githubToFlipperShare.py called "sharefiles"
* <ins>Delete all files in your local folder "sharefiles"</ins>
* Add any new repos to the python code that you want it to scrape
* Run the script
* Copy all the files except the "generalShareUrls.txt" to the folder [`sharefiles`](https://github.com/FlipperMaker/flippermaker.github.io/tree/main/sharefiles)
* Copy the text in "generalShareUrls.txt" and replace everything in the file after "##External:" in the file [`generalShareUrls.txt`](https://github.com/FlipperMaker/flippermaker.github.io/blob/main/generalShareUrls.txt)

</p></details>
<br />

## keyboardRec.py
Created debug and capture keyboard input and to test out what keys the Flipper Zero sends when using the commands `ALTSTRING`, `ALTSTRING`, and `ALTCODE`.
#### Instructions 
<details><summary>View Instructions</summary><p>
	
* Python 3.7
* After running the Python code, a log of key commands will be printed to the terminal window.
	
</p></details>

#### Notes 
<details>
<summary>View Notes</summary>
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

#### Output Examples
<details>
<summary>View Example 1</summary>
<p>
 
```
Alt Code:
	int:97
	hex:61
	str:a
	unicode:a  U+0061
 original:[ALT][9][7][/ALT]
FULL: Parsed_B: 97  (Original: [ALT][9][7][/ALT])

Alt Code:
	int:51
	hex:33
	str:3
	unicode:3  U+0033
 original:[ALT][5][1][/ALT]
FULL: Parsed_B: 51  (Original: [ALT][5][1][/ALT])

```
 
</p>
</details>


<details>
<summary>View Example 2</summary>
<p>
 
Input: `A a very Helpful tool ctrl+c`
```
Parsed_B: A  (Original: [SHIFT][A][/SHIFT])
FULL: Parsed_B: A  (Original: [SHIFT][A][/SHIFT])
 
Parsed_B: a very H  (Original: [BACKSPACE][A][SPACE][V][E][R][Y][SPACE][SHIFT][H][/SHIFT])
FULL: Parsed_B: a very H  (Original: [BACKSPACE][A][SPACE][V][E][R][Y][SPACE][SHIFT][H][/SHIFT])
 
Parsed_B: elpful tool  (Original: [E][L][P][SPACE][F][U][L][SPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][F][U][L][SPACE][T][O][O][L])
FULL: Parsed_B: elpful tool  (Original: [E][L][P][SPACE][F][U][L][SPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][F][U][L][SPACE][T][O][O][L])
 
Parsed_B: c  (Original: [CTRL][C][/CTRL])
FULL: Parsed_B: c  (Original: [CTRL][C][/CTRL])

```
 
</p>
</details>
