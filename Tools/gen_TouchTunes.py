#https://github.com/jimilinuxguy/flipperzero-touchtunes
#https://raw.githubusercontent.com/jimilinuxguy/flipperzero-touchtunes/master/pin/0/0.sub

#Todo:

import requests

def githubURL(pin, button):
    button = urlEncode(button)
    pin = int(pin)
    url = 'https://raw.githubusercontent.com/jimilinuxguy/flipperzero-touchtunes/master/pin/{ttPin}/{ttButton}.sub'.format(ttPin = pin, ttButton = button)
    #print(url)
    return url

def getUrl(url):
    return requests.get(url).text

def clean(lineText):
    return lineText.strip()

def encodeSpace(inputText):
    return inputText.replace(" ", "%20")
def encodeHash(inputText):
    return inputText.replace("#", "%23")
def encodeParenthesis(inputText):
    return inputText.replace(")", "%29").replace("(", "%28")
def urlEncode(inputText):#https://www.w3schools.com/tags/ref_urlencode.asp
    inputText = encodeSpace(inputText)
    inputText = encodeHash(inputText)
    inputText = encodeParenthesis(inputText)
    return inputText

def padString(inputText, nCount = 3):
    return str(inputText).zfill(nCount)

def parseLine(lineText):
    return lineText.split(": ")[1]

def parseFile(fileText):
    if fileText.count('RAW_Data') > 1:
        print('Multiple RAW_Data!')
        return {}
    fileTextClean = []
    fileText = fileText.split('\n')
    for i in fileText:
        o = clean(i)
        if len(o) > 1:
            o = parseLine(o)
            fileTextClean.append(o)
    #print(fileTextClean)
    ret = {"Filetype": fileTextClean[0], "Version": fileTextClean[1],
           "Frequency": fileTextClean[2], "Preset": fileTextClean[3],
           "Protocol": fileTextClean[4], "RAW_Data": fileTextClean[5]}
    return ret

def dictionaryConvert(InputDictionary):
    ret = ''
    for i in InputDictionary:
        ret = '"'+InputDictionary[i]+'"' if ret == '' else ret + ', "'+InputDictionary[i]+'"'
    return ret
        
buttons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
           'A_Left_Arrow', 'B_Right_Arrow', 'F1_Restart', 'F2_Key',
           'F3_Mic_A_Mute', 'F4_Mic_B_Mute', 'Lock_Queue(#)',
           'Mic_Vol_Minus_Down_Arrow', 'Mic_Vol_Plus_Up_Arrow',
           'Music_Karaoke(star)', 'Music_Vol_Zone_1Down',
           'Music_Vol_Zone_1Up', 'Music_Vol_Zone_2Down',
           'Music_Vol_Zone_2Up', 'Music_Vol_Zone_3Down',
           'Music_Vol_Zone_3Up', 'OK', 'On_Off',
           'P1', 'P2_Edit_Queue', 'P3_Skip', 'Pause']
buttonsLong = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
               'A_Left_Arrow', 'B_Right_Arrow', 'F1_Restart', 'F2_Key',
               'F3_Mic_A_Mute', 'F4_Mic_B_Mute', 'Lock_Queue_Hash',
               'Mic_Vol_Minus_Down_Arrow', 'Mic_Vol_Plus_Up_Arrow',
               'Music_Karaoke_Star', 'Music_Vol_Zone_1Down',
               'Music_Vol_Zone_1Up', 'Music_Vol_Zone_2Down',
               'Music_Vol_Zone_2Up', 'Music_Vol_Zone_3Down',
               'Music_Vol_Zone_3Up', 'OK', 'On_Off',
               'P1', 'P2_Edit_Queue', 'P3_Skip', 'Pause']
buttonsShort = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A_LeftArrow', 'B_RightArrow', 'F1Restart', 'F2Key',
                'F3_MicA_Mute', 'F4_MicB_Mute', 'LockQueue',
                'MicVolMinusDownArrow', 'MicVolPlusUpArrow',
                'MusicKaraokeStar', 'Vol_1_Down',
                'Vol_1_Up', 'Vol_2_Down', 'Vol_2_Up', 'Vol_3_Down', 'Vol_3_Up',
                'OK', 'Power', 'P1', 'P2EditQueue', 'P3Skip', 'Pause']

parsed = []
fOut = open("touchtunes.txt", "w")
fOut.truncate()
for i in range(0, 255):
    pin = padString(i)
    parsed.append('this.ttDevices["'+pin+'"] = new subghzDevice("'+pin+'");\n')
    fOut.write('this.ttDevices["'+pin+'"] = new subghzDevice("'+pin+'");\n')
    for x, y in enumerate(buttons):
        a = githubURL(pin,y)
        b = getUrl(a)
        c = parseFile(b)
        btnShort = buttonsShort[x]
        btnLong = buttonsLong[x]
        
        d = 'this.ttDevices["'+pin+'"].addSignal(new subghzDeviceSignalRaw("'+buttonsLong[x]+'", '+dictionaryConvert(c)+'));\n'
        parsed.append(d)
        fOut.write(d)
    parsed.append('\n')
    print(i)


#fOut.write("\n".join(parsed))
fOut.close()



