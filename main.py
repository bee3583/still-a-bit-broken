@namespace
class SpriteKind:
    Object = SpriteKind.create()
    Statue = SpriteKind.create()
    Goal = SpriteKind.create()
    dialoguetriggerone = SpriteKind.create()
    dialoguetrigger2 = SpriteKind.create()
    dialoguetrigger3 = SpriteKind.create()
    coin = SpriteKind.create()

def on_overlap_tile(sprite, location):
    global photocounter
    game.splash("You collected part " + str(photocounter) + "/6",
        "of Photo! Congratulations!")
    photocounter += 1
    game.over(True, effects.star_field)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        invistrigger
    """),
    on_overlap_tile)

def on_on_overlap(sprite, otherSprite):
    global Statue2, Tesseract
    Statue2.destroy()
    Statue2 = sprites.create(assets.image("""
        statue w-o head
    """), SpriteKind.Statue)
    Statue2.set_position(1198, 82)
    pause(1000)
    Statue2.destroy()
    Tesseract.destroy()
    Tesseract = sprites.create(assets.image("""
            Tesseract 32 x 32
        """),
        SpriteKind.player)
    Tesseract.set_position(1198, 82)
    Tesseract.ay = 750
    scene.camera_follow_sprite(Tesseract)
    controller.move_sprite(Tesseract, 100, 0)
sprites.on_overlap(SpriteKind.player, SpriteKind.Statue, on_on_overlap)

def on_a_pressed():
    if Tesseract.vy == 0:
        Tesseract.vy = -350
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap2(sprite, otherSprite):
    trigger_3.destroy()
    game.show_long_text("TESSERACT: Darkness tentacles!?  I don't want to get hurt...",
        DialogLayout.BOTTOM)
sprites.on_overlap(SpriteKind.player,
    SpriteKind.dialoguetrigger3,
    on_on_overlap2)

def on_b_repeated():
    game.splash("X=" + str(int(Tesseract.x)) + "Y=" + str(int(Tesseract.y)))
controller.B.on_event(ControllerButtonEvent.REPEATED, on_b_repeated)

def on_combos_attach_combo():
    game.show_long_text("Seems like you know the Konami code!  You know, I'm really surprised someone would think to enter it.  I had to download an extension to even get this to work, afterall.  FYI, I'm about to rant about the characters I used in this game, so you can skip this if you want.",
        DialogLayout.FULL)
    game.show_long_text("Though Tesseract is player 1, I actually thought of The One first.  It's kind of hard to explain everything about The One.  I can explain Tesseract though.  When she took control of that statue as a body, it turned into gallium, a metal that melts in",
        DialogLayout.FULL)
    game.show_long_text("your hand.  It's pretty cool, look it up if you get a chance!  Anyway, Tesseract's head is just that-- a tesseract.  That's the 4-d equivalent of a cube.  They're also pretty interesting, and they have many other names, including the hypercube, the 8-cell,",
        DialogLayout.FULL)
    game.show_long_text("and the 4-cube.  If you look it up and find it interesting, I'd suggest also looking up the Klein bottle, as well as the youtube videos \"There are 48 regular Polyhedra\" and \"Non-Euclidean Geometry Explained - Hyperbolica Devlog #1\".",
        DialogLayout.FULL)
    game.show_long_text("Anyway, I should stop ranting and let you play the game.  Thanks for reading!  And if you didn't read it, that's fine too!  You're here to play a platformer, not learn about geometry, afterall. -Bee",
        DialogLayout.FULL)
controller.combos.attach_combo("UUDDLRLRBA", on_combos_attach_combo)

def on_on_overlap3(sprite, otherSprite):
    trigger1.destroy()
    game.show_long_text("TESSERACT: I should probably go find a body...  Oh!  That statue over there will work!",
        DialogLayout.BOTTOM)
    game.splash("Collect the statue.")
sprites.on_overlap(SpriteKind.player,
    SpriteKind.dialoguetriggerone,
    on_on_overlap3)

def on_on_overlap4(sprite, otherSprite):
    trigger2.destroy()
    game.show_long_text("PHOTO: Hello Tesseract.  It is I, Photo.  I have been waiting for someone like you.",
        DialogLayout.BOTTOM)
    game.show_long_text("TESSERACT: ...Creator..?", DialogLayout.BOTTOM)
    game.show_long_text("PHOTO: Yes.  As you know, I can only talk to others when I split myself into colors.  The problem is, I can't find the other parts of me.",
        DialogLayout.BOTTOM)
    game.show_long_text("TESSERACT: Are you asking me to... find the rest of you..?",
        DialogLayout.BOTTOM)
    game.show_long_text("PHOTO: Correct.  Are you up to it?", DialogLayout.BOTTOM)
    game.show_long_text("TESSERACT: Yes.  It's truly an honor, Photo.",
        DialogLayout.BOTTOM)
    game.splash("Collect the Red Photo.")
sprites.on_overlap(SpriteKind.player,
    SpriteKind.dialoguetrigger2,
    on_on_overlap4)

def on_overlap_tile2(sprite, location):
    game.splash("The darkness got you!", "Want to try again?")
    game.over(False, effects.dissolve)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        darkness tentacles
    """),
    on_overlap_tile2)

photocounter = 0
coin2: Sprite = None
trigger_3: Sprite = None
trigger2: Sprite = None
trigger1: Sprite = None
Statue2: Sprite = None
Tesseract: Sprite = None
scene.set_background_color(9)
Tesseract = sprites.create(assets.image("""
    Tesseract Head
"""), SpriteKind.player)
controller.move_sprite(Tesseract, 100, 0)
scene.camera_follow_sprite(Tesseract)
tiles.set_tilemap(tilemap("""
    1
"""))
Tesseract.ay = 750
Statue2 = sprites.create(assets.image("""
    statue w head
"""), SpriteKind.Statue)
Statue2.set_position(1198, 82)
red_photo = sprites.create(assets.image("""
    red photo
"""), SpriteKind.Goal)
red_photo.set_position(1551, 204)
trigger1 = sprites.create(assets.image("""
        dialoge trigger 1
    """),
    SpriteKind.dialoguetriggerone)
trigger1.set_position(1154, 82)
trigger2 = sprites.create(assets.image("""
        dialoge trigger 1
    """),
    SpriteKind.dialoguetrigger2)
trigger2.set_position(1490, 240)
trigger_3 = sprites.create(assets.image("""
        dialoge trigger 1
    """),
    SpriteKind.dialoguetrigger3)
trigger_3.set_position(279, 370)
for value in tiles.get_tiles_by_type(assets.tile("""
    coin tile
""")):
    coin2 = sprites.create(assets.image("""
        coin
    """), SpriteKind.coin)
    tiles.place_on_tile(coin2, value)
photocounter = 1
pause(1100)
game.splash("CONTROLS:", "Joystick: Move / A: Jump")