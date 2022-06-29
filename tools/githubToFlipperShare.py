import requests
import json
import pathlib
'''
Instructions:

*Create a folder in the same directory as githubToFlipperShare.py called "sharefiles"
*Delete all files in your local folder "sharefiles"
*Add any new repos to the python code that you want it to scrape
*Run the script
*Copy all the files except the "generalShareUrls.txt" to the folder "sharefiles" (https://github.com/FlipperMaker/flippermaker.github.io/tree/main/sharefiles)
*Copy the text in "generalShareUrls.txt" and replace everything in the file after "##External:" in the file generalShareUrls.txt (https://github.com/FlipperMaker/flippermaker.github.io/blob/main/generalShareUrls.txt)

Notes:
Will be integraded into Flipper Maker eventually


'''

def RepoLoader(shareUrlNameBase, repoUrl, baseFileUrl, validFileTypes, writeFiles = True):
    shareUrlNamePart2 = ''
    #validFileTypes = ['.sub', '.txt', '.ibtn', '.ir', '.rfid', '.fmf', '.nfc', '.u2f']
    if len(validFileTypes) == 0: 
        #.txt excluded because multiple Flipper files can use this extension or repos have random .txt files
        #.u2f excluded because theres no reason to include it currently
        validFileTypes = ['.sub', '.ibtn', '.ir', '.rfid', '.fmf', '.nfc']
    #validFileTypes = ['.md']
    xjson = json.loads(requests.get(repoUrl).text)
    filePath = ''
    retByDir = {}
    for i in xjson["tree"]:
        filePath = i["path"]
        file_extension = pathlib.Path(filePath).suffix.strip()
        fileDir = ''
        fileName = pathlib.Path(filePath).name.strip()
        if '/' in filePath: fileDir = filePath[0:filePath.rfind('/')]

        #Check if the file has a valid extension
        if file_extension not in validFileTypes: continue
        
        fileDirClean = fileDir.replace('/','_').replace('-','_').replace('-_','_').replace('_-','_').replace('__','_').strip()
        
        fileDir = fileDir.replace('#', '%23')
        fileDirClean = fileDirClean.replace('#', '%23').replace('Sub_GHz', 'SubGHz')
        fileName = fileName.replace('#', '%23')
        fileFullUrl = baseFileUrl+fileDir+'/'+fileName
        fileFullUrl = fileFullUrl.replace('//', '/').replace('+', '%2B')
        if 'https://' not in fileFullUrl and 'https:/' in fileFullUrl: fileFullUrl = fileFullUrl.replace('https:/', 'https://')
        
        #Files and directories to skip
        if 'touchtunes' in fileName.lower(): continue
        if 'touchtunes' in fileDir.lower(): continue
        if '_CSV-IRDB_'.lower() in fileFullUrl.lower(): continue
        if 'unit_tests'.lower() in fileDirClean.lower(): continue
        if 'assets_resources'.lower() in fileDirClean.lower(): continue

        if fileDirClean not in retByDir: retByDir[fileDirClean] = []
        retByDir[fileDirClean].append(fileFullUrl)

    generalShareUrls = []
    if writeFiles:
        if len(retByDir) < 100: #Quit running if you have more than 100 directories
            for i in retByDir:
                generalShareUrls.append(shareUrlNameBase+'-'+i+'~https://github.com/FlipperMaker/flippermaker.github.io/blob/main/sharefiles/'+shareUrlNameBase+'_'+i+'.txt')
                with open('sharefiles/'+shareUrlNameBase+'_'+i+'.txt', 'w') as f:
                    print('\n'.join(retByDir[i]), file=f)
            with open('sharefiles/generalShareUrls.txt', 'a') as f:
                print('\n'.join(generalShareUrls), file=f)
        else:
            print('Too Many Files.', shareUrlNameBase, len(retByDir))
    return retByDir


def getApiUrl(repo, branch):
    return 'https://api.github.com/repos/'+repo+'/git/trees/'+branch+'?recursive=1'
def getRawFileUrl(repo, branch):
    return 'https://raw.githubusercontent.com/'+repo+'/'+branch+'/'


#TARGET REPOS
reposList = []#[shareUrlNameBase, repoUrl, baseFileUrl, valid fileExtensions, writeFiles, printOutput]
targetRepos = [['UberGuidoZ', 'UberGuidoZ/Flipper', 'main', [], True, False],
               ['WetoxTeam', 'wetox-team/flipperzero-goodies', 'master', [], True, False],
               ['FlipperIRDB', 'logickworkshop/Flipper-IRDB', 'main', [], False, False],
               ['Eng1n33r', 'Eng1n33r/flipperzero-firmware', 'dev', [], False, False],
               ['Hak5', 'hak5/usbrubberducky-payloads', 'master', ['.txt'], False, False],
               ['MuddledBox', 'MuddledBox/FlipperZeroSub-GHz', 'main', [], True, False],
               ['', '', '', [], False, False]]
for i in targetRepos:
    if len(i[0]) == 0: continue
    reposList.append([i[0], getApiUrl(i[1], i[2]), getRawFileUrl(i[1], i[2]), i[3], i[4], i[5]])


for repo in reposList:
    a = RepoLoader(repo[0],repo[1],repo[2],repo[3],repo[4])
    if repo[5]:
        for i in a:
            print(i)
            print(a[i])
            print()
            print()












        












