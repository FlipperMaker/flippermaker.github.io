from typing import Iterable, Union, Any


def encode(pin, command):
        frame = 0x5D
        
        for bit in range(8):
                frame <<= 1
                if pin&(1<<bit):
                        frame |= 1
        frame <<= 16
        frame |= (command << 8)
        frame |= (command ^ 0xFF)
        ook = ""
        for i in range(8+8+16):
                if (frame & 0x80000000):
                        ook +="1000"
                        frame <<=1
                else:
                        ook += "10"
                        frame <<=1
        ook = "111111111111111100000000" + ook + "1000"
        return ook
        ook = hex(int(ook,2))[2:-1]
        
        if len(ook) % 2 == 1:
                ook += '0'
        ook = bin(int(ook,16))#[2:-1]
        return ook
    
def encode_touchtunes(command, pin=0x00):
    frame = 0x5D
    
    for bit in range(8):
        frame <<= 1
        if pin&(1<<bit):
            frame |= 1
    frame <<= 16
    frame |= (command << 8)
    frame |= (command ^ 0xFF)
    ook = ""
    for i in range(8+8+16):
        if (frame & 0x80000000):
            ook +="1000"
            frame <<=1
        else:
            ook += "10"
            frame <<=1
    return "1"*16 + "0"*8 + ook + "1000"

def gen_sub(freq, zerolen, onelen, repeats, pause, bits):
    res = f"""Filetype: Flipper SubGhz RAW File
Version: 1
Frequency: {freq}
Preset: FuriHalSubGhzPresetOok650Async
Protocol: RAW
"""
    if pause == 0:
        # Pause must be non-zero.
        pause = zerolen

    data = []
    prevbit = None
    prevbitlen = 0
    for bit in bits:
        if prevbit and prevbit != bit:
            data.append(prevbitlen)
            prevbitlen = 0

        if bit == '1':
            prevbitlen += onelen
        else:
            prevbitlen -= zerolen

        prevbit = bit

    if prevbit == '1':
        data.append(prevbitlen)
        data.append(-pause)
    else:
        data.append(prevbitlen - pause)

    datalines = []
    for i in range(0, len(data), 512):
        batch = [str(n) for n in data[i:i+512]]
        datalines.append(f'RAW_Data: {" ".join(batch)}')
    res += '\n'.join(datalines)

    return res

print(encode(0x00, 0x78))
print()
print('332301940919237549348497458148837504')
print()
print('')
print()
print('ttencoder')
print()
a = encode_touchtunes(0x78, 0x00)
print(a)
print()
print(gen_sub(433920000, 566, 566, 1, 0, encode_touchtunes(0x78, 0x00)))
print()
print(gen_sub(433920000, 566, 566, 1, 0, encode(0x00, 0x78)))










