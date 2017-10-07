import os
import sys

from PIL import Image


SCRIPT_DIR = "/var/projects/pokyfriends/pmdexplorers/"
RED = "#C9594E"
BLUE = "#72C2E8"
BLACK = "#084D2A"
WHITE = "#FFFFFF"

def main():
    try:
        game1 = sys.argv[-1].upper().replace(" ", "_")[:32]
        game2 = sys.argv[-2].upper().replace(" ", "_")[:32]
        words1 = "EXPLORERS OF " + game1
        words2 = "EXPLORERS OF " + game2
    except:
        print('python explorers_of.py time darkness')
        return False


    phrases = []
    for i in range(0,2):
        color = ["blue", "red"][i]
        if i == 0:
            words = words1
        else:
            words = words2
        font = Image.open(
            os.path.join(SCRIPT_DIR, "static", "pmdexplorers", color+"_font.png")
        )

        glyphs = []
        for glyph in words:
            if glyph == " ":
                glyph_char = Image.new("RGBA", (20,100))
            else:
                glyph_char = get_glyph(glyph, font)
            glyphs.append(glyph_char)

        # Stitch the letters together
        phrase_width = 0
        # Calculate the width
        for glyph in glyphs:
            phrase_width += glyph.width

        phrase = Image.new("RGBA", (phrase_width, 100))
        # Paste the glyphs
        x = 0
        for glyph in glyphs:
            phrase.paste(glyph, (x, 0))
            x += glyph.width


        phrases.append(phrase.copy())

    # Ok, now make the box art!
    cover = Image.open(os.path.join(SCRIPT_DIR, "static", "pmdexplorers", "covers.png"))

    # Blit the PMD logos
    darkness = Image.open(os.path.join(SCRIPT_DIR, "static", "pmdexplorers", "pmd_darkness.png"))
    time = Image.open(os.path.join(SCRIPT_DIR, "static", "pmdexplorers", "pmd_time.png"))


    darkness = darkness.resize((188, 84), Image.ANTIALIAS)
    x  = (290 - 188) // 2
    cover.paste(darkness, (x, 0), darkness)

    time = time.resize((188, 84), Image.ANTIALIAS)
    x  = 297 + (290 - 188) // 2
    cover.paste(time, (x, 0), time)


    # Blit the Subtitles
    percent = 188 / phrases[1].width
    height = int(phrases[1].height * percent)
    shrunk = phrases[1].resize((188, height), Image.ANTIALIAS)
    x  = (290 - 188) // 2
    cover.paste(shrunk, (x, 85), shrunk)

    percent = 188 / phrases[0].width
    height = int(phrases[0].height * percent)
    shrunk = phrases[0].resize((188, height), Image.ANTIALIAS)
    x  = 297 + (290 - 188) // 2
    cover.paste(shrunk, (x, 85), shrunk)

    # Crop to a single game if necessary
    if game1 == "---":
        cover = cover.crop((0, 0, 290, cover.height))
    elif game2 == "---":
        cover = cover.crop((300, 0, 588, cover.height))


    filename = game2.replace(" ", "_") + "-" + game1.replace(" ", "_")
    filename = filename.lower()

    cover.save(os.path.join(SCRIPT_DIR, "static", "pmdexplorers", "output", filename + ".png"))
    return True

def get_glyph(glyph, font):
    if glyph == "_":
        img = Image.new("RGBA", (35,100))
        return img

    char_x = (ord(glyph) - 65) % 10
    char_y = (ord(glyph) - 65) // 10

    x = 12 + (113 * char_x)
    y = 15 + (219 * char_y)

    crop = font.crop((x, y, x+100, y+100))

    img = Image.new("RGBA", (100,100))
    img.paste(crop, (0, 0))

    # Crop off excess padding on the left
    crop_left = -1

    for x in range(0, img.width):
        for y in range(0, img.height):
            pixel = img.getpixel((x, y))
            if pixel != (0, 0, 0, 0):
                crop_left = x
                break
        if crop_left != -1:
            break

    img = img.crop((crop_left, 0, img.width - crop_left, img.height))

    # Crop off excess padding on the right
    crop_right = -1
    for x in range((img.width - 1), 0, -1):
        for y in range(0, img.height):
            pixel = img.getpixel((x, y))
            if pixel != (0, 0, 0, 0):
                crop_right = x
                break
        if crop_right != -1:
            break

    img = img.crop((0, 0, crop_right, img.height))

    return img


if __name__ == "__main__":
    main()
