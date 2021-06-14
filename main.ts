namespace SpriteKind {
    export const Object = SpriteKind.create()
    export const Statue = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const dialoguetriggerone = SpriteKind.create()
    export const dialoguetrigger2 = SpriteKind.create()
    export const dialoguetrigger3 = SpriteKind.create()
    export const coin = SpriteKind.create()
    export const laddertriggerone = SpriteKind.create()
    export const coin2 = SpriteKind.create()
    export const defeated = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const photos = SpriteKind.create()
    export const bigTentacle = SpriteKind.create()
    export const flower = SpriteKind.create()
    export const waterEnemy = SpriteKind.create()
    export const cutsceneTrigger = SpriteKind.create()
    export const waiting = SpriteKind.create()
    export const endTrigger = SpriteKind.create()
    export const waterFlower = SpriteKind.create()
    export const castleFlower = SpriteKind.create()
}
namespace StatusBarKind {
    export const cooldown = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.waterEnemy, function (sprite, otherSprite) {
    pause(200)
    if (controller.B.isPressed()) {
        otherSprite.setKind(SpriteKind.defeated)
        animation.runImageAnimation(
        Tesseract,
        assets.animation`tesseractAttack`,
        1000,
        false
        )
        otherSprite.ay = -200
        animation.runImageAnimation(
        otherSprite,
        assets.animation`waterEnemyDefeat`,
        100,
        false
        )
    } else {
        tesseracthealth.value += -1
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`dark sky trigger`, function (sprite, location) {
    tiles.replaceAllTiles(assets.tile`dark sky trigger`, assets.tile`transparency16`)
    scene.setBackgroundColor(12)
    game.showLongText("TESSERACT: The sky is purple now?!  The darkness has almost took over.  I have to act quickly.", DialogLayout.Bottom)
    tessStopAnim()
})
function tessIdleAnimHead () {
    animation.runImageAnimation(
    Tesseract,
    assets.animation`tessHeadIdleFloat`,
    350,
    true
    )
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    if (cutsceneHappening == false) {
        if (controller.B.isPressed()) {
            animation.runImageAnimation(
            Tesseract,
            assets.animation`tesseractAttack`,
            200,
            false
            )
            animation.runImageAnimation(
            finalBoss,
            assets.animation`darknessBossHurt`,
            100,
            false
            )
            bossHealth.value += -1
            scene.setBackgroundColor(1)
            pause(200)
            scene.setBackgroundColor(15)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lava2`, function (sprite, location) {
    tesseracthealth.value = 1
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 1, function (status) {
    pause(100)
    tesseracthealth.value = 0
    if (fightingBoss == true) {
        endAttack()
        bossHealth.value = 50
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`bluephototrigger`, function (sprite, location) {
    scene.setBackgroundColor(8)
    tiles.setTilemap(tilemap`blueVoid`)
    photo.destroy()
    Tesseract.destroy()
    game.splash("You collected part " + photoCounter + "/6", "of Photo! Congratulations!")
    photoCounter += 1
    game.splash("Collect the Purple Photo", "at the end of the level.")
    scene.setBackgroundColor(6)
    tiles.setTilemap(tilemap`6`)
    spawnTesseract()
    photo = sprites.create(assets.image`purple photo`, SpriteKind.Goal)
    photo.setPosition(223, 114)
    destroyPrevious()
    for (let value of tiles.getTilesByType(assets.tile`purplecointile`)) {
        coins = sprites.create(assets.image`redcoin`, SpriteKind.coin)
        animation.runImageAnimation(
        coins,
        assets.animation`purpleLight`,
        350,
        true
        )
        tiles.placeOnTile(coins, value)
        tiles.setTileAt(value, assets.tile`orangeBricks`)
    }
    for (let value of tiles.getTilesByType(assets.tile`enemy`)) {
        flower = sprites.create(assets.image`flowerCaller`, SpriteKind.castleFlower)
        tiles.placeOnTile(flower, value)
        tiles.setTileAt(value, assets.tile`orangeBricks`)
    }
})
function levelOneSong () {
    music.playMelody("G B A G C5 B A B ", 120)
    music.playMelody("C5 A B G A F G E ", 120)
    music.playMelody("B A G A G F A C5 ", 120)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.laddertriggerone, function (sprite, otherSprite) {
    cutsceneHappening = true
    tessStopAnim()
    tiles.setWallAt(tiles.getTileLocation(89, 6), false)
    tiles.setWallAt(tiles.getTileLocation(90, 6), false)
    tiles.setWallAt(tiles.getTileLocation(91, 6), false)
    animation.runImageAnimation(
    Tesseract,
    assets.animation`tessClimb`,
    200,
    true
    )
    story.spriteMoveToLocation(Tesseract, 1448, 80, 100)
    tiles.setWallAt(tiles.getTileLocation(89, 6), true)
    tiles.setWallAt(tiles.getTileLocation(90, 6), true)
    tiles.setWallAt(tiles.getTileLocation(91, 6), true)
    pause(100)
    Tesseract.ay = 750
    tessStopAnim()
    cutsceneHappening = false
    controller.moveSprite(Tesseract, 100, 0)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`bossDebug`, function (sprite, location) {
    scene.setBackgroundColor(10)
    tiles.setTilemap(tilemap`purpleVoid`)
    photo.destroy()
    Tesseract.destroy()
    game.splash("You collected part " + photoCounter + "/6", "of Photo! Congratulations!")
    triggerForCutscene = sprites.create(assets.image`photoCutsceneTrigger`, SpriteKind.cutsceneTrigger)
    triggerForCutscene.setPosition(256, 416)
    photoCounter += 1
    game.splash("Stand on the pillar.")
    scene.setBackgroundColor(15)
    tiles.setTilemap(tilemap`level10`)
    spawnTesseract()
    destroyPrevious()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.bigTentacle, function (sprite, otherSprite) {
    tesseracthealth.value += -1
    pause(500)
    tiles.destroySpritesOfKind(SpriteKind.bigTentacle)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Statue, function (sprite, otherSprite) {
    controller.moveSprite(Tesseract, 0, 0)
    cutsceneHappening = true
    tessIdleAnimHead()
    animation.runImageAnimation(
    Tesseract,
    assets.animation`tessHeaddleAttack`,
    1000,
    false
    )
    pause(1000)
    tessIdleAnimHead()
    animation.runImageAnimation(
    Statue,
    assets.animation`statueHeadFall`,
    100,
    false
    )
    pause(1300)
    animation.runImageAnimation(
    Tesseract,
    assets.animation`tessHeadShrink`,
    150,
    false
    )
    pause(750)
    Statue.destroy()
    Tesseract.destroy()
    tessHead = 1
    spawnTesseract()
    Tesseract.setPosition(1198, 82)
    cutsceneHappening = false
    controller.moveSprite(Tesseract, 100, 0)
})
function destroyPrevious () {
    tiles.destroySpritesOfKind(SpriteKind.coin)
    tiles.destroySpritesOfKind(SpriteKind.Enemy)
    tiles.destroySpritesOfKind(SpriteKind.defeated)
    tiles.destroySpritesOfKind(SpriteKind.flower)
    tiles.destroySpritesOfKind(SpriteKind.waterEnemy)
    tiles.destroySpritesOfKind(SpriteKind.waiting)
    tiles.destroySpritesOfKind(SpriteKind.dialoguetriggerone)
    tiles.destroySpritesOfKind(SpriteKind.dialoguetrigger2)
    tiles.destroySpritesOfKind(SpriteKind.dialoguetrigger3)
    tiles.destroySpritesOfKind(SpriteKind.laddertriggerone)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutsceneHappening == false) {
        if (Tesseract.vy == 0) {
            if (Tesseract.tileKindAt(TileDirection.Left, assets.tile`water`) == false) {
                Tesseract.vy = -350
            }
        }
    }
})
function bulletAttack () {
    animation.runImageAnimation(
    finalBoss,
    assets.animation`darknessBossBullet`,
    500,
    false
    )
    pause(1500)
    bullet = sprites.create(assets.image`projectile`, SpriteKind.Projectile)
    bullet.setPosition(Math.trunc(finalBoss.x), Math.trunc(finalBoss.y) + 13)
    bulletTargetX = Math.trunc(Tesseract.x)
    bulletTargetY = Math.trunc(Tesseract.y)
    story.spriteMoveToLocation(bullet, bulletTargetX, bulletTargetY, 200)
    if (Math.trunc(bullet.x) == bulletTargetX && Math.trunc(bullet.y) == bulletTargetY || bullet.overlapsWith(Tesseract)) {
        animation.runImageAnimation(
        bullet,
        assets.animation`bulletExplode`,
        100,
        false
        )
        pause(400)
        bullet.destroy()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.dialoguetrigger3, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.showLongText("TESSERACT: Darkness tentacles!?  I don't want to get hurt...", DialogLayout.Bottom)
    tessIdleAnimHead()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutsceneHappening == false) {
        if (tessHead == 1) {
            animation.runImageAnimation(
            Tesseract,
            assets.animation`tessLeftWalk`,
            200,
            true
            )
        } else {
            animation.runImageAnimation(
            Tesseract,
            assets.animation`tessLeftFloat`,
            350,
            true
            )
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.waterFlower, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.waiting)
    animation.runImageAnimation(
    otherSprite,
    assets.animation`flowerRing`,
    200,
    false
    )
    music.siren.play()
    pause(1200)
    music.stopAllSounds()
    pause(1200)
    for (let value of tiles.getTilesByType(assets.tile`enemySpawnWater`)) {
        waterMonster = sprites.create(assets.image`waterEnemy`, SpriteKind.waterEnemy)
        for (let value of sprites.allOfKind(SpriteKind.waterEnemy)) {
            animation.runImageAnimation(
            waterMonster,
            assets.animation`waterEnimSwim`,
            200,
            true
            )
        }
        tiles.placeOnTile(waterMonster, value)
        waterMonster.y += -10
    }
})
function leaveLiquidTess () {
    Tesseract.ay = 750
    controller.moveSprite(Tesseract, 100, 0)
}
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (cutsceneHappening == false) {
        if (tessHead == 1) {
            tessStopAnim()
        } else {
            tessIdleAnimHead()
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (cutsceneHappening == false) {
        if (tessHead == 1) {
            tessStopAnim()
        } else {
            tessIdleAnimHead()
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`orangephototrigger`, function (sprite, location) {
    scene.setBackgroundColor(4)
    tiles.setTilemap(tilemap`orange`)
    photo.destroy()
    Tesseract.destroy()
    ladder_trigger.destroy()
    game.splash("You collected part " + photoCounter + "/6", "of Photo! Congratulations!")
    photoCounter += 1
    scene.setBackgroundColor(3)
    game.splash("Collect the Yellow Photo", "at the end of the level.")
    tiles.setTilemap(tilemap`3`)
    spawnTesseract()
    photo = sprites.create(assets.image`yellow photo`, SpriteKind.Goal)
    photo.setPosition(1519, 60)
    destroyPrevious()
    for (let value of tiles.getTilesByType(assets.tile`yellowcointile`)) {
        coins = sprites.create(assets.image`redcoin`, SpriteKind.coin)
        animation.runImageAnimation(
        coins,
        assets.animation`yellowLight`,
        350,
        true
        )
        tiles.placeOnTile(coins, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`greenphototrigger`, function (sprite, location) {
    scene.setBackgroundColor(7)
    tiles.setTilemap(tilemap`greenVoid`)
    photo.destroy()
    Tesseract.destroy()
    game.splash("You collected part " + photoCounter + "/6", "of Photo! Congratulations!")
    photoCounter += 1
    game.splash("Collect the Blue Photo", "at the end of the level.")
    scene.setBackgroundColor(6)
    tiles.setTilemap(tilemap`5`)
    spawnTesseract()
    photo = sprites.create(assets.image`blue photo`, SpriteKind.Goal)
    photo.setPosition(3120, 316)
    destroyPrevious()
    for (let value of tiles.getTilesByType(assets.tile`bluecointile`)) {
        coins = sprites.create(assets.image`redcoin`, SpriteKind.coin)
        animation.runImageAnimation(
        coins,
        assets.animation`blueLight`,
        350,
        true
        )
        tiles.placeOnTile(coins, value)
        tiles.setTileAt(value, assets.tile`water`)
    }
    for (let value of tiles.getTilesByType(assets.tile`enemy`)) {
        flower = sprites.create(assets.image`flowerCaller`, SpriteKind.waterFlower)
        tiles.placeOnTile(flower, value)
        tiles.setTileAt(value, assets.tile`water`)
    }
    game.showLongText("TESSERACT: The sky is completely black now.  I really have to hurry.", DialogLayout.Bottom)
    tessStopAnim()
    game.splash("Move joystick up and down", "while in water to swim.")
})
function tessStopAnim () {
    animation.stopAnimation(animation.AnimationTypes.All, Tesseract)
    tessX = Math.trunc(Tesseract.x)
    tessY = Math.trunc(Tesseract.y)
    Tesseract.destroy()
    spawnTesseract()
    Tesseract.setPosition(tessX, tessY)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`darkness tentacles2`, function (sprite, location) {
    tesseracthealth.value = 1
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    fightingBoss = false
    status.destroy()
    finalBoss.setKind(SpriteKind.defeated)
    animation.runImageAnimation(
    finalBoss,
    assets.animation`darknessBossDie`,
    100,
    false
    )
    pause(2900)
    photo = sprites.create(assets.image`pure photo`, SpriteKind.Object)
    photo.setPosition(256, 406)
    triggerForCutscene.setKind(SpriteKind.endTrigger)
    game.splash("Collect the", "pure Photo.")
    tessStopAnim()
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    pause(100)
    game.splash("Oh no!  You died!", "Want to try again?")
    Tesseract.destroy()
    spawnTesseract()
    if (fightingBoss == true) {
        endAttack()
        bossHealth.value = 50
    }
    tesseracthealth.value = 6
})
function tentacleAttack () {
    animation.runImageAnimation(
    finalBoss,
    assets.animation`darknessBossTentacle`,
    500,
    false
    )
    pause(3000)
    tentacle = sprites.create(assets.image`tentacle`, SpriteKind.bigTentacle)
    tentacle.setPosition(Math.trunc(finalBoss.x), Math.trunc(finalBoss.y) - 11)
    animation.runImageAnimation(
    tentacle,
    assets.animation`tentacleSwing`,
    100,
    false
    )
    pause(1400)
    tentacle.destroy()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutsceneHappening == false) {
        if (tessHead == 1) {
            animation.runImageAnimation(
            Tesseract,
            assets.animation`tessRightWalk`,
            200,
            true
            )
        } else {
            animation.runImageAnimation(
            Tesseract,
            assets.animation`tessRightFloat`,
            350,
            true
            )
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    tesseracthealth.value += -1
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`redphototrigger`, function (sprite, location) {
    scene.setBackgroundColor(2)
    tiles.setTilemap(tilemap`red`)
    photo.destroy()
    Tesseract.destroy()
    game.splash("You collected part " + photoCounter + "/6", "of Photo! Congratulations!")
    photoCounter += 1
    scene.setBackgroundColor(9)
    game.splash("Collect the Orange Photo", "at the end of the level.")
    tiles.setTilemap(tilemap`2`)
    spawnTesseract()
    photo = sprites.create(assets.image`orange photo`, SpriteKind.Goal)
    photo.setPosition(1552, 60)
    destroyPrevious()
    ladder_trigger = sprites.create(assets.image`ladder trigger`, SpriteKind.laddertriggerone)
    ladder_trigger.setPosition(1448, 176)
    for (let value of tiles.getTilesByType(assets.tile`orangecointile`)) {
        coins = sprites.create(assets.image`redcoin`, SpriteKind.coin)
        animation.runImageAnimation(
        coins,
        assets.animation`orangeLight`,
        350,
        true
        )
        tiles.placeOnTile(coins, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`darknessTentaclesCastle`, function (sprite, location) {
    tesseracthealth.value = 1
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`orangephototrigger0`, function (sprite, location) {
    scene.setBackgroundColor(5)
    tiles.setTilemap(tilemap`yellowvoid`)
    photo.destroy()
    Tesseract.destroy()
    game.splash("You collected part " + photoCounter + "/6", "of Photo! Congratulations!")
    photoCounter += 1
    game.splash("Collect the Green Photo", "at the end of the level.")
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`4`)
    spawnTesseract()
    photo = sprites.create(assets.image`green photo`, SpriteKind.Goal)
    photo.setPosition(304, 28)
    destroyPrevious()
    for (let value of tiles.getTilesByType(assets.tile`greencointile`)) {
        coins = sprites.create(assets.image`redcoin`, SpriteKind.coin)
        animation.runImageAnimation(
        coins,
        assets.animation`greenLight`,
        350,
        true
        )
        tiles.placeOnTile(coins, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`enemy`)) {
        flower = sprites.create(assets.image`flowerCaller`, SpriteKind.flower)
        tiles.placeOnTile(flower, value)
        tiles.setTileAt(value, assets.tile`jungleFloorBG`)
    }
})
function endAttack () {
    tiles.destroySpritesOfKind(SpriteKind.bigTentacle)
    tiles.destroySpritesOfKind(SpriteKind.Projectile)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.baDing.play()
    otherSprite.destroy()
    tesseracthealth.value += 2
})
controller.combos.attachCombo("UUDDLRLRBA", function () {
    if (0 < 25) {
        game.showLongText("Seems like you know the Konami code!  You know, I'm really surprised someone would think to enter it.  I had to download an extension to even get this to work, afterall.  FYI, I'm about to rant about the characters I used in this game.  Feel free to skip.", DialogLayout.Full)
        game.showLongText("Though Tesseract is player 1, I actually thought of The One first.  It's kind of hard to explain everything about The One.  I can explain Tesseract though.  When she took control of that statue as a body, it turned into gallium, a metal that melts in", DialogLayout.Full)
        game.showLongText("your hand.  It's pretty cool, look it up if you get a chance!  Anyway, Tesseract's head is just that-- a tesseract.  That's the 4-d equivalent of a cube.  They're also pretty interesting, and they have many other names, including the hypercube, the 8-cell,", DialogLayout.Full)
        game.showLongText("and the 4-cube.  If you look it up and find it interesting, I'd suggest also looking up the Klein bottle, as well as the youtube videos \"There are 48 regular Polyhedra\" and \"Non-Euclidean Geometry Explained - Hyperbolica Devlog #1\".", DialogLayout.Full)
        game.showLongText("Anyway, I should stop ranting and let you play the game.  Thanks for reading!  And if you didn't read it, that's fine too!  You're here to play a platformer, not learn about geometry, afterall. -Bee", DialogLayout.Full)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.flower, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.waiting)
    animation.runImageAnimation(
    otherSprite,
    assets.animation`flowerRing`,
    200,
    false
    )
    music.siren.play()
    pause(1200)
    music.stopAllSounds()
    pause(1800)
    for (let value of tiles.getTilesByType(assets.tile`jungleFloorBGSpawn`)) {
        darknessMonster = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
        tiles.placeOnTile(darknessMonster, value)
        darknessMonster.y += -10
        darknessMonster.ay = 750
    }
    for (let value of tiles.getTilesByType(assets.tile`enemySpawn`)) {
        darknessMonster = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
        tiles.placeOnTile(darknessMonster, value)
        darknessMonster.y += -10
        darknessMonster.ay = 750
    }
    cutsceneHappening = true
    game.showLongText("TESSERACT: Darkness creatures?!  I spoke too soon!  I have to defend myself.  I", DialogLayout.Bottom)
    tessStopAnim()
    game.showLongText("need to reunite the six pieces of Photo.  Only then can they permanently banish the darkness.", DialogLayout.Bottom)
    game.splash("Darkness puddles", "will not hurt you.")
    game.splash("Press B while touching", "an enemy to attack.")
    pause(100)
    cutsceneHappening = false
    controller.moveSprite(Tesseract, 100, 0)
    tiles.setWallAt(tiles.getTileLocation(23, 23), false)
    tiles.setWallAt(tiles.getTileLocation(23, 22), false)
    tiles.setWallAt(tiles.getTileLocation(23, 21), false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.dialoguetriggerone, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.showLongText("TESSERACT: I should probably go find a body...  Oh!  That statue over there will work!", DialogLayout.Bottom)
    tessIdleAnimHead()
    game.splash("Collect the statue.")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.endTrigger, function (sprite, otherSprite) {
    triggerForCutscene.destroy()
    game.showLongText("PHOTO: You did it, Tesseract!  Thank you so much!  Now I can finally banish the darkness!  On the count of three, ready?", DialogLayout.Bottom)
    tessStopAnim()
    game.showLongText("TESSERACT: Ready.", DialogLayout.Bottom)
    game.showLongText("PHOTO: One...", DialogLayout.Bottom)
    game.showLongText("...two...", DialogLayout.Bottom)
    game.showLongText("...THREE!", DialogLayout.Bottom)
    Tesseract.destroy()
    tesseracthealth.setBarBorder(2, 1)
    tesseracthealth.destroy()
    finalBoss.destroy()
    tiles.setTilemap(tilemap`level18`)
    scene.setBackgroundColor(1)
    pause(2000)
    photo.destroy()
    tiles.setTilemap(tilemap`level11`)
    scene.setBackgroundImage(assets.image`end screen`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`darkness tentacles0`, function (sprite, location) {
    tesseracthealth.value = 1.001
    pause(100)
    game.splash("Oh no!  You died!", "Want to try again?")
    Tesseract.destroy()
    tesseracthealth.value = 6
    Tesseract = sprites.create(assets.image`Tesseract Head`, SpriteKind.Player)
    scene.cameraFollowSprite(Tesseract)
    Tesseract.ay = 750
    controller.moveSprite(Tesseract, 100, 0)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`purplePhotoTrigger`, function (sprite, location) {
    scene.setBackgroundColor(10)
    tiles.setTilemap(tilemap`purpleVoid`)
    photo.destroy()
    Tesseract.destroy()
    game.splash("You collected part " + photoCounter + "/6", "of Photo! Congratulations!")
    triggerForCutscene = sprites.create(assets.image`photoCutsceneTrigger`, SpriteKind.cutsceneTrigger)
    triggerForCutscene.setPosition(256, 416)
    photoCounter += 1
    game.splash("Stand on the pillar.")
    scene.setBackgroundColor(15)
    tiles.setTilemap(tilemap`level10`)
    spawnTesseract()
    destroyPrevious()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`levelFourDebug`, function (sprite, location) {
    scene.setBackgroundColor(5)
    tiles.setTilemap(tilemap`yellowvoid`)
    photo.destroy()
    Tesseract.destroy()
    game.splash("You collected part " + photoCounter + "/6", "of Photo! Congratulations!")
    photoCounter += 1
    game.splash("Collect the Green Photo", "at the end of the level.")
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`4`)
    spawnTesseract()
    photo = sprites.create(assets.image`green photo`, SpriteKind.Goal)
    photo.setPosition(304, 28)
    destroyPrevious()
    for (let value of tiles.getTilesByType(assets.tile`greencointile`)) {
        coins = sprites.create(assets.image`redcoin`, SpriteKind.coin)
        animation.runImageAnimation(
        coins,
        assets.animation`greenLight`,
        350,
        true
        )
        tiles.placeOnTile(coins, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`enemy`)) {
        flower = sprites.create(assets.image`flowerCaller`, SpriteKind.flower)
        tiles.placeOnTile(flower, value)
        tiles.setTileAt(value, assets.tile`jungleFloorBG`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.dialoguetrigger2, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.showLongText("PHOTO: Hello Tesseract.  It is I, Photo.  I have been waiting for someone like you.", DialogLayout.Bottom)
    tessStopAnim()
    game.showLongText("TESSERACT: ...Creator..?", DialogLayout.Bottom)
    game.showLongText("PHOTO: Yes.  As you know, I can only talk to others when I split myself into colors.  The problem is, I can't find the other parts of me.", DialogLayout.Bottom)
    game.showLongText("TESSERACT: Are you asking me to... find the rest of you..?", DialogLayout.Bottom)
    game.showLongText("PHOTO: Correct.  Are you up to it?", DialogLayout.Bottom)
    game.showLongText("TESSERACT: Yes.  It's truly an honor, Photo.", DialogLayout.Bottom)
    game.splash("Collect the Red Photo.")
})
function levelTwoSong () {
    music.playMelody("E - E - B - E - ", 400)
    music.playMelody("E - D G F D F A ", 400)
    music.playMelody("C5 - C5 - A G - C5 ", 320)
    music.playMelody("- C5 A F G E G B ", 320)
    music.playMelody("E - E - E - B - ", 400)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`treetrig`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`tree`)
    game.showLongText("TESSERACT: Ah, this place seems calm.  Finally, a break.", DialogLayout.Bottom)
    tessStopAnim()
    tiles.setWallAt(tiles.getTileLocation(16, 23), false)
    tiles.setWallAt(tiles.getTileLocation(16, 22), false)
    tiles.setWallAt(tiles.getTileLocation(16, 21), false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`darkness tentacles`, function (sprite, location) {
    tesseracthealth.value = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.castleFlower, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.waiting)
    animation.runImageAnimation(
    otherSprite,
    assets.animation`flowerRing`,
    200,
    false
    )
    music.siren.play()
    pause(1200)
    music.stopAllSounds()
    pause(1200)
    for (let value of tiles.getTilesByType(assets.tile`enemySpawnBricks`)) {
        darknessMonster = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
        tiles.placeOnTile(darknessMonster, value)
        darknessMonster.y += -10
        darknessMonster.ay = 750
    }
})
function spawnTesseract () {
    Tesseract = sprites.create(assets.image`Tesseract 32 x 32`, SpriteKind.Player)
    scene.cameraFollowSprite(Tesseract)
    Tesseract.ay = 750
    controller.moveSprite(Tesseract, 100, 0)
}
function bossFightSong () {
    for (let index = 0; index < 2; index++) {
        music.playMelody("C - C - C - C - ", 320)
    }
    for (let index = 0; index < 2; index++) {
        music.playMelody("C - C E C - C G ", 320)
    }
    for (let index = 0; index < 2; index++) {
        music.playMelody("E D G F B A C5 B ", 160)
    }
    for (let index = 0; index < 2; index++) {
        music.playMelody("C5 A C5 G A B G E ", 320)
        music.playMelody("E F D G F B A C5 ", 320)
    }
}
function enterLiquidTess () {
    Tesseract.ay = 1000
    controller.moveSprite(Tesseract, 50, 0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.cutsceneTrigger, function (sprite, otherSprite) {
    cutsceneHappening = true
    Tesseract.destroy()
    photo = sprites.create(assets.image`photoCutscene`, SpriteKind.Object)
    photo.setPosition(257, 411)
    animation.runImageAnimation(
    photo,
    assets.animation`photoCircle`,
    350,
    false
    )
    pause(7850)
    game.showLongText("PHOTO: You did it, Tesseract!  Thank you!  Now, all I have to do is banish the dark-", DialogLayout.Bottom)
    tiles.setWallAt(tiles.getTileLocation(15, 27), false)
    tiles.setWallAt(tiles.getTileLocation(15, 28), false)
    tiles.setWallAt(tiles.getTileLocation(16, 27), false)
    tiles.setWallAt(tiles.getTileLocation(16, 28), false)
    finalBoss = sprites.create(assets.image`darknessBoss`, SpriteKind.boss)
    finalBoss.setPosition(256, 400)
    photo.destroy()
    bossHealth = statusbars.create(50, 8, StatusBarKind.EnemyHealth)
    bossHealth.max = 50
    bossHealth.value = 50
    bossHealth.setColor(12, 15)
    bossHealth.setLabel("Boss's HP", 10)
    bossHealth.positionDirection(CollisionDirection.Bottom)
    bossHealth.setBarBorder(1, 10)
    fightingBoss = true
    game.splash("Defeat the boss", "to save Photo!")
    spawnTesseract()
    Tesseract.setPosition(257, 448)
    triggerForCutscene.setKind(SpriteKind.waiting)
    cutsceneHappening = false
    controller.moveSprite(Tesseract, 100, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    pause(200)
    if (controller.B.isPressed()) {
        otherSprite.setKind(SpriteKind.defeated)
        animation.runImageAnimation(
        Tesseract,
        assets.animation`tesseractAttack`,
        1000,
        false
        )
        animation.runImageAnimation(
        otherSprite,
        assets.animation`enemyDefeat`,
        100,
        false
        )
    } else {
        tesseracthealth.value += -1
    }
})
let darknessMonster: Sprite = null
let tentacle: Sprite = null
let tessY = 0
let tessX = 0
let ladder_trigger: Sprite = null
let waterMonster: Sprite = null
let bulletTargetY = 0
let bulletTargetX = 0
let bullet: Sprite = null
let triggerForCutscene: Sprite = null
let flower: Sprite = null
let fightingBoss = false
let bossHealth: StatusBarSprite = null
let finalBoss: Sprite = null
let cutsceneHappening = false
let photoCounter = 0
let coins: Sprite = null
let tesseracthealth: StatusBarSprite = null
let photo: Sprite = null
let Statue: Sprite = null
let tessHead = 0
let Tesseract: Sprite = null
scene.setBackgroundColor(9)
Tesseract = sprites.create(assets.image`Tesseract Head`, SpriteKind.Player)
tessHead = 0
tessIdleAnimHead()
scene.cameraFollowSprite(Tesseract)
tiles.setTilemap(tilemap`1`)
Tesseract.ay = 750
Statue = sprites.create(assets.image`statue w head`, SpriteKind.Statue)
Statue.setPosition(1198, 82)
photo = sprites.create(assets.image`red photo`, SpriteKind.Goal)
photo.setPosition(1551, 204)
let dialogueTrigger = sprites.create(assets.image`dialoge trigger 1`, SpriteKind.dialoguetriggerone)
dialogueTrigger.setPosition(1154, 82)
dialogueTrigger = sprites.create(assets.image`dialoge trigger 1`, SpriteKind.dialoguetrigger2)
dialogueTrigger.setPosition(1490, 240)
dialogueTrigger = sprites.create(assets.image`dialoge trigger 1`, SpriteKind.dialoguetrigger3)
dialogueTrigger.setPosition(279, 370)
tesseracthealth = statusbars.create(25, 4, StatusBarKind.Health)
tesseracthealth.positionDirection(CollisionDirection.Top)
tesseracthealth.setColor(5, 11)
tesseracthealth.max = 6
tesseracthealth.setOffsetPadding(-60, 5)
tesseracthealth.setLabel("Tesseract's HP")
tesseracthealth.setBarBorder(1, 1)
for (let value of tiles.getTilesByType(assets.tile`redcointile`)) {
    coins = sprites.create(assets.image`redcoin`, SpriteKind.coin)
    animation.runImageAnimation(
    coins,
    assets.animation`redLight`,
    350,
    true
    )
    tiles.placeOnTile(coins, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
photoCounter = 1
cutsceneHappening = false
game.splash("CONTROLS:", "Joystick: Move / A: Jump")
pause(1300)
game.showLongText("TESSERACT: What are these red things..?", DialogLayout.Bottom)
controller.moveSprite(Tesseract, 100, 0)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.waterEnemy)) {
        value.follow(Tesseract, 50)
    }
    for (let value of sprites.allOfKind(SpriteKind.defeated)) {
        value.follow(Tesseract, 0)
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.follow(Tesseract, 50)
        if (value.vx <= -0.1) {
            timer.background(function () {
                animation.runImageAnimation(
                value,
                assets.animation`darknessMonsterLeft`,
                1000,
                false
                )
            })
        } else if (value.vx >= 0.1) {
            timer.background(function () {
                animation.runImageAnimation(
                value,
                assets.animation`darknessMonsterRight`,
                1000,
                false
                )
            })
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.defeated)) {
        value.follow(Tesseract, 0)
    }
})
forever(function () {
    if (fightingBoss == true) {
        if (Math.percentChance(50)) {
            endAttack()
            tentacleAttack()
        } else {
            endAttack()
            bulletAttack()
        }
        pause(6000)
    }
})
forever(function () {
    if (cutsceneHappening == true) {
        controller.moveSprite(Tesseract, 0, 0)
    }
})
forever(function () {
    if (Tesseract.tileKindAt(TileDirection.Center, assets.tile`lava3`)) {
        tesseracthealth.value += -1
        pause(1000)
    }
})
forever(function () {
    if (fightingBoss == true) {
        pause(10000)
        tesseracthealth.value += 1
    }
})
forever(function () {
    if (fightingBoss == true) {
        bossFightSong()
    } else {
        if (photoCounter == 1) {
            levelOneSong()
        } else if (photoCounter == 2) {
            levelTwoSong()
        } else if (photoCounter == 3) {
        	
        } else if (photoCounter == 4) {
        	
        } else if (photoCounter == 5) {
        	
        } else if (photoCounter == 6) {
        	
        } else if (photoCounter == 7) {
        	
        }
    }
})
forever(function () {
    // this is the code for the water
    if (Tesseract.tileKindAt(TileDirection.Center, assets.tile`water`)) {
        Tesseract.ay = 50
        controller.moveSprite(Tesseract, 75, 75)
    } else if (Tesseract.tileKindAt(TileDirection.Center, assets.tile`sky`)) {
        leaveLiquidTess()
        controller.moveSprite(Tesseract, 100, 0)
    } else if (Tesseract.tileKindAt(TileDirection.Bottom, assets.tile`water`)) {
        leaveLiquidTess()
        controller.moveSprite(Tesseract, 100, 0)
    } else if (Tesseract.tileKindAt(TileDirection.Center, assets.tile`lava3`)) {
        enterLiquidTess()
    } else if (Tesseract.tileKindAt(TileDirection.Center, assets.tile`lavaExitTrigger`)) {
        leaveLiquidTess()
    }
})
