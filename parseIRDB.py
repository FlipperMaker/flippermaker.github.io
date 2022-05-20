#https://github.com/logickworkshop/Flipper-IRDB

#Todo: Rewrite this to scan github for new devices

import requests

remotes = []

#remotes = [['', '', '', ''],
#           ['', '', '', '']]

remotesAc = [['ac', 'ACs', 'Dreo', 'Dreo_Heater.ir'],
             ['ac', 'ACs', 'Dyson', 'Dyson_Air_Multiplier.ir'],
             ['ac', 'ACs', 'Dyson', 'Dyson_HP09.ir'],
             ['ac', 'ACs', 'GoldenVantage', 'GoldenVantage_AF510_Fireplace.ir'],
             ['ac', 'ACs', 'Homedics', 'Homedics_Humidifier.ir'],
             ['ac', 'ACs', 'JETTools', 'JETTools_AFS-1000B.ir'],
             ['ac', 'ACs', 'Koldfront', 'Koldfront_WAC12001.ir'],
             ['ac', 'ACs', 'LG', 'LG_AC.ir'],
             ['ac', 'ACs', 'Lasko', 'Lasko_Fan.ir'],
             ['ac', 'ACs', 'Lasko', 'Lasko_Fan_Simple.ir'],
             ['ac', 'ACs', 'Lasko', 'Lasko_Heater.ir'],
             ['ac', 'ACs', 'Vornado', 'Vornado.ir'],
             ['ac', 'ACs', 'Whynter', 'Whynter_AC.ir'],
             ['ac', 'ACs', 'Zenith', 'Zenith_AC.ir'],
             ['ac', 'ACs', '', 'Pelonis_PFS40D6ABB.ir']] #Example of Raw for implementation

remotesAudioReceivers = [['audioreceivers', 'Audio Receivers', 'Onkyo', 'Onkyo.ir'],
                         ['audioreceivers', 'Audio Receivers', 'Onkyo', 'Onkyo_RC627S.ir'],
                         ['audioreceivers', 'Audio Receivers', 'Sony', 'Sony_MHC-GS300AV.ir']]


remotesBluRay = [['bluray', 'Blu-Ray', 'LG', 'LG_BlueRay.ir'],
                 ['bluray', 'Blu-Ray', 'Toshiba', 'Toshiba_SE-R0398.ir']]

remotesCctv = [['cctv', 'CCTV', 'BrandUnknown', 'Szxlcom_cams.ir'],
               ['cctv', 'CCTV', 'MarshallElectronics', 'Marshall_CV610.ir']]

remotesCableBoxes = [['cableboxes', 'Cable Boxes', 'Amino', 'Amino_Amigo.ir'],
                     ['cableboxes', 'Cable Boxes', 'DIRECTV', 'DIRECTV.ir'],
                     ['cableboxes', 'Cable Boxes', 'Telus', 'Telus_OptikTV.ir']]

remotesCameras = [['cameras', 'Cameras', 'Sony', 'Nikon.ir'],
                  ['cameras', 'Cameras', 'Sony', 'Sony.ir']]


remotesConsoles = [['consoles', 'Consoles', 'Microsoft', 'Xbox.ir']]


remotesConverters = [['converters', 'Converters', 'RME', 'RME_ADI-2_DAC_FS.ir']]

remotesHeadUnits = [['headunits', 'Head Units', 'GPX', 'GPX_CDRadio.ir'],
                    ['headunits', 'Head Units', 'Pioneer', 'Pioneer_DMH-1770NEX.ir']]

remotesLedLighting = [['ledlighting', 'LED Lighting', 'Amazon', 'Amazon_LED_Lights.ir'],
                      ['ledlighting', 'LED Lighting', 'BrandUnknown', '44_Button_LED.ir'],
                      ['ledlighting', 'LED Lighting', 'BrandUnknown', 'Color_Change_Bulb_Remote.ir'],
                      ['ledlighting', 'LED Lighting', 'BrandUnknown', 'DMX_Light.ir'],
                      ['ledlighting', 'LED Lighting', 'BrandUnknown', 'LEDStrip.ir'],
                      ['ledlighting', 'LED Lighting', 'BrandUnknown', 'LED_44Key.ir'],
                      ['ledlighting', 'LED Lighting', 'BrandUnknown', 'Light_Strip.ir'],
                      ['ledlighting', 'LED Lighting', 'BrandUnknown', 'Magic_Lighting_Remote.ir'],
                      ['ledlighting', 'LED Lighting', 'BrandUnknown', 'Practical_Series_2.ir'],
                      ['ledlighting', 'LED Lighting', 'MonsterIlluminessence', 'MonsterIlluminessence_LED.ir']]

remotesMiscellaneous = [['miscellaneous', 'Miscellaneous', 'AMI', 'AMI_Jukebox.ir'],
                        ['miscellaneous', 'Miscellaneous', 'Hasbro/Furby', 'Furby.ir'],
                        ['miscellaneous', 'Miscellaneous', 'LG', 'LG.ir'],
                        ['miscellaneous', 'Miscellaneous', 'LaserX', 'LaserX_Tag.ir'],
                        ['miscellaneous', 'Miscellaneous', '', 'HDMI_Switch.ir']]

remotesProjectors = [['projectors', 'Projectors', 'BenQ', 'BenQ.ir'],
                     ['projectors', 'Projectors', 'BrandUnknown', 'LED Smart Home Theater Projector.ir'],
                     ['projectors', 'Projectors', 'BrandUnknown', 'Scrn_innov.ir'],
                     ['projectors', 'Projectors', 'BrandUnknown', 'Stlth_acou.ir'],
                     ['projectors', 'Projectors', 'Casio', 'Casio_YT-130.ir'],
                     ['projectors', 'Projectors', 'Da-Lite', 'Da-Lite_ProjectorScreen.ir'],
                     ['projectors', 'Projectors', 'Dragonfly', 'Dragonfly_Screen.ir'],
                     ['projectors', 'Projectors', 'Epson', 'Epson.ir']]

remotesSoundBars = [['SoundBars', 'SoundBars', 'Bose', 'Bose_Solo_2.ir'],
                    ['SoundBars', 'SoundBars', 'Bose', 'Bose_Solo_5.ir'],
                    ['SoundBars', 'SoundBars', 'Bose', 'Bose_Soundbar.ir'],
                    ['SoundBars', 'SoundBars', 'BrandUnknown', 'Amz_snd_bar.ir'],
                    ['SoundBars', 'SoundBars', 'BrandUnknown', 'Soundblasterx.ir'],
                    ['SoundBars', 'SoundBars', 'Klipsch', 'Klipsch_Soundbar.ir'],
                    ['SoundBars', 'SoundBars', 'Sony', 'Sony_MHC-GS300AV.ir'],
                    ['SoundBars', 'SoundBars', 'Sony', 'Sony_Old_XBR.ir'],
                    ['SoundBars', 'SoundBars', 'Sony', 'Sony_RDH-GTK33IP.ir'],
                    ['SoundBars', 'SoundBars', 'Vizio', 'Vizio_Soundbar.ir'],
                    ['SoundBars', 'SoundBars', 'Yamaha', 'Yamaha_RX.ir']]

remotesStreamingDevices = [['StreamingDevices', 'Streaming Devices', 'Apple', 'Apple_TV.ir'],
                           ['StreamingDevices', 'Streaming Devices', 'Roku', 'Roku.ir'],
                           ['StreamingDevices', 'Streaming Devices', 'Roku', 'Roku2.ir'],
                           ['StreamingDevices', 'Streaming Devices', 'Roku', 'Roku_Alternate.ir']]



remotesTv = [['tv', 'TVs', 'Hisense', 'Hisense_RokuTV.ir'],
           ['tv', 'TVs', 'LG', 'LG_C1.ir'],
           ['tv', 'TVs', 'NEC', 'NEC.ir'],
           ['tv', 'TVs', 'Panasonic', 'Panasonic_TC-P50S2.ir'],
           ['tv', 'TVs', 'Philips', 'Philips_32PFL4208T.ir'],
           ['tv', 'TVs', 'Samsung', 'Samsung.ir'],
           ['tv', 'TVs', 'Samsung', 'Samsung_BN59.ir'],
           ['tv', 'TVs', 'Samsung', 'Samsung_BN5901301A.ir'],
           ['tv', 'TVs', 'Samsung', 'Samsung_E6.ir'],
           ['tv', 'TVs', 'Samsung', 'Samsung_TV.ir'],
           ['tv', 'TVs', 'Sharp', 'Sharp_Roku_TV.ir'],
           ['tv', 'TVs', 'Sony', 'Sony_Bravia.ir'],
           ['tv', 'TVs', 'Sony', 'Sony_XBR.ir'],
           ['tv', 'TVs', 'Sony', 'Sony_XBR_RMT-TX200U.ir'],
           ['tv', 'TVs', 'Sunbrite', 'Sunbrite.ir'],
           ['tv', 'TVs', 'TCL', 'TCL_32S327.ir'],
           ['tv', 'TVs', 'TCL', 'TCL_UnknownModel1.ir'],
           ['tv', 'TVs', 'TCL', 'TCL_UnknownModel2.ir'],
           ['tv', 'TVs', 'Toshiba', 'Toshiba_32AV502U.ir'],
           ['tv', 'TVs', 'Vizio', 'Vizio.ir'],
           ['tv', 'TVs', 'Westinghouse', 'Westinghouse.ir'],
           ['tv', 'TVs', '', 'APEX LE4643T TV.ir'],
           ['tv', 'TVs', '', 'LG_55UN7300AUD.ir']]





remotes.extend(remotesTv)
remotes.extend(remotesAc)
remotes.extend(remotesAudioReceivers)
remotes.extend(remotesBluRay)
remotes.extend(remotesCctv)
remotes.extend(remotesCableBoxes)
remotes.extend(remotesCameras)
remotes.extend(remotesConsoles)
remotes.extend(remotesConverters)
remotes.extend(remotesHeadUnits)
remotes.extend(remotesLedLighting)
remotes.extend(remotesMiscellaneous)
remotes.extend(remotesProjectors)
remotes.extend(remotesSoundBars)
remotes.extend(remotesStreamingDevices)

def genCode(inp):
    devType = inp[0].lower()
    devTypeB = devType.capitalize()
    categoryProper = inp[1].replace(" ", "%20")
    categoryProperClean = inp[1].replace(" ", "_")
    brand = inp[2]
    fileName = inp[3].replace(" ", "%20")
    fileNameClean = inp[3].replace(" ", "_")
    remoteName = fileNameClean.replace(".ir", "").replace("-", "_")

    urlPath = 'https://raw.githubusercontent.com/logickworkshop/Flipper-IRDB/main/'+categoryProper+'/'+brand+'/'+fileName
    if brand == '':
        urlPath = 'https://raw.githubusercontent.com/logickworkshop/Flipper-IRDB/main/'+categoryProper+'/'+fileName
    x = requests.get(urlPath)
    buttons = []
    for i in x.text.split('#'):
        ii = i.strip()
        if 'type: parsed' in ii:
            tname = ''
            ttype = ''
            tprotocol = ''
            taddress = ''
            tcommand = ''
            for o in ii.split('\n'):
                oo = o.strip().split(': ')
                if oo[0] == 'name':
                    tname = oo[1]
                elif oo[0] == 'type':
                    ttype = oo[1]
                elif oo[0] == 'protocol':
                    tprotocol = oo[1]
                elif oo[0] == 'address':
                    taddress = oo[1]
                elif oo[0] == 'command':
                    tcommand = oo[1]
                if tname != '' and ttype != '' and tprotocol != '' and taddress != '' and tcommand != '':
                    buttons.append('this.ir'+devTypeB+'["'+remoteName+'"].addButton(new irDeviceButton("'+tname+'", "'
                                   +ttype+'", "'+tprotocol+'", "'+taddress+'", "'+tcommand+'"));');
    if len(buttons) > 0:            
        print('this.ir'+devTypeB+'["'+remoteName+'"] = new irDevice("'+remoteName+'");')
        for i in buttons:
            print(i)

        print('this.irAll["'+devType+'_'+remoteName+'"] = this.ir'+devTypeB+'["'+remoteName+'"];')
        print()
for i in remotes:
    genCode(i)
    
    
#var btn = new irDeviceButton(btnName, irType, irProtocol, btnAddress, btnCommand);
#var device = new irDevice(irName, irType, irProtocol);
#device.addButton(btn)






