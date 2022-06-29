# Flipper Maker Tools

### githubToFlipperShare.py
Scrapes preselected repos to find Flipper Zero compatable files to add to the "File Install/Share" tool on Flipper Maker.
Note: I plan on intigrating this into Flipper Maker's code so that every time a user visits the website it generates the list of files automatically.
#### Instructions 
* Create a folder in the same directory as githubToFlipperShare.py called "sharefiles"
* <ins>Delete all files in your local folder "sharefiles"</ins>
* Add any new repos to the python code that you want it to scrape
* Run the script
* Copy all the files except the "generalShareUrls.txt" to the folder [`sharefiles`](https://github.com/FlipperMaker/flippermaker.github.io/tree/main/sharefiles)
* Copy the text in "generalShareUrls.txt" and replace everything in the file after "##External:" in the file [`generalShareUrls.txt`](https://github.com/FlipperMaker/flippermaker.github.io/blob/main/generalShareUrls.txt)


