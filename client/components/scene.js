/* eslint-disable max-statements */
import EventDispatcher from '../../utility/eventDispatcher'
import {newGame} from './playerPanels'
import {EventEmitter} from 'events'
import {tileInfoObject} from '../../utility/tileInfoObject'

export const phaserE = new EventEmitter()

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain')
  }

  preload() {
    this.load.image('background', 'assets/tilemaps/background.png')
    this.load.image('drawCard', 'assets/tilemaps/draw_card.png')
    this.load.image('interview', 'assets/tilemaps/interview.png')
    this.load.tilemapTiledJSON('board', 'assets/tilemaps/tile_board.json')
    this.load.spritesheet('dice', 'assets/dice.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.image('doge', 'assets/doge.png')
    this.load.image('cody', 'assets/cody.png')
    this.load.image('cat', 'assets/cat.png')
    this.load.image('kid', 'assets/kid.png')
    this.load.image('kermit', 'assets/kermit.png')
    this.load.image('marshall', 'assets/marshall.png')

    this.load.spritesheet('card1', 'assets/callstack/1.png', {
      frameWidth: 425,
      frameHeight: 275
    })
  }
  create() {
    this.emitter = EventDispatcher.getInstance()

    this.keys = this.input.keyboard.createCursorKeys()

    let board = this.make.tilemap({key: 'board'})
    const tileset = board.addTilesetImage('all tiles', 'background')
    const firstLayer = board.createStaticLayer('Tile Layer 1', tileset, 0, 0)

    //Rendering sprites picked for game
    //it's only like this because the template literal WON'T WORK!!!!! don't be mad
    let player1
    let player2
    let player3
    let player4

    let players = []
    let currentPlayer
    const playerLocations = {
      player1Loc: 0,
      player2Loc: 0
    }

    newGame.on('start', (imageNameArray, hostStatusArray) => {
      for (let i = 0; i < imageNameArray.length; i++) {
        players[i] = this.physics.add.sprite(
          i % 2 ? 680 : 730,
          i > 1 ? 730 : 680,
          imageNameArray[i] // This array might not be in the order we want
        )
        players[i].setScale(0.3)
        if (i > 1) {
          playerLocations[`player${i + 1}Loc`] = 0
        }
        players[i].name = `player${i + 1}`
      }
      players.filter(player => {
        return player !== undefined
      })
      // For now, our starting player is host
      currentPlayer = players[hostStatusArray.indexOf(true)]
    })

    const movePlayer = (player, diceRoll) => {
      let propertyName = `${player.name}Loc`
      let currentLoc = playerLocations[propertyName]
      let newLoc = currentLoc + diceRoll
      let locDifference = newLoc - currentLoc
      let newX
      let newY
      // if player is already stuck on a bug
      if (player.bug === true) {
        playerLocations[propertyName] = 9
        return (player.bug = false)
      } else {
        // Adjust if we went past GO
        if (newLoc > 35) {
          newLoc = newLoc - 35
          // Emit signal passed GO
          console.log('i passed go!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          phaserE.emit('playerPassedGo')
        }
        console.log('player locations:', playerLocations)
        console.log('propertyName:', propertyName)
        console.log('current location:', currentLoc)
        console.log('New Location:', newLoc)
        // when a player gets sent to the stuck on a bug tile
        if (newLoc === 27 || newLoc === 9) {
          newX = tileInfoObject[9].x
          newY = tileInfoObject[9].y
          player.bug = true
          phaserE.emit('playerOnBug', player)
        } else {
          newX = tileInfoObject[newLoc].x
          newY = tileInfoObject[newLoc].y
        }
        // Adjust if space is occupied
        if (tileInfoObject[newLoc].occupied) {
          if (newLoc <= 9) {
            // bottom of board
            newY = newY + 50 // move down
          } else if (newLoc <= 18) {
            newX = newX - 50 // move left
          } else if (newLoc <= 27) {
            newY = newY - 50 // move up
          } else if (newLoc <= 35) {
            newX = newX + 50 // move right
          }
        }
      }
      const playerTween = this.add.tween({
        targets: player,
        x: newX,
        y: newY,
        duration: 300 * locDifference,
        onComplete: emitPlayerLanded,
        onCompleteParams: [
          tileInfoObject[newLoc].category,
          tileInfoObject[newLoc].challenge
        ]
      })

      // Edit the playerLocations object:
      playerLocations[propertyName] = newLoc
      // And the tileInfoObject:
      tileInfoObject[currentLoc].occupied = false
      tileInfoObject[newLoc].occupied = true
    }

    const emitPlayerLanded = paramArray => {
      let array = paramArray.callbacks.onComplete.params
      // console.log('emitPlayer paramArray:', array)
      let challenge = array[3] ? 'challenge' : null
      let callstackId = 1 // default to the one card we have lol
      if (array[2] === 'Callstack') {
        // flip a card
        phaserE.emit('flipCard')
        // Theoretically set callstackId based on the shuffled deck of cards that Phaser should be keeping track of.
      }
      phaserE.emit('playerLanded', challenge, array[2], callstackId) // challenge = "challenge" or null, category name (i.e. Frontend)
    }

    // Code for the dice:
    const first = this.add.sprite(180, 200, 'dice')
    const second = this.add.sprite(280, 200, 'dice')
    const diceFrameMap = {
      // Frame name (key) : number on die (value)
      0: 6,
      1: 1,
      2: 2,
      3: 5,
      4: 3,
      5: 4
    }

    // dice animations
    const anim1 = this.anims.create({
      key: 'firstDiceRoll',
      repeat: -1,
      frameRate: 15 + Math.floor(Math.random() * 7),
      frames: this.anims.generateFrameNames('dice', {start: 0, end: 5})
    })
    const anim2 = this.anims.create({
      key: 'secondDiceRoll',
      repeat: -1,
      frameRate: 18 + Math.floor(Math.random() * 7),
      frames: this.anims.generateFrameNames('dice', {start: 0, end: 5})
    })

    // dice tween
    const rollingDiceTween = this.tweens.add({
      targets: [first, second],
      angle: 360.0,
      duration: 50,
      repeat: 10,
      paused: true,
      onComplete: stopAnims,
      onCompleteScope: this
    })

    // function called when the tween stops
    function stopAnims() {
      first.anims.pause(
        first.anims.currentAnim.frames[Math.floor(Math.random() * 6)]
      )
      second.anims.pause(
        second.anims.currentAnim.frames[Math.floor(Math.random() * 6)]
      )
      let diceRoll =
        diceFrameMap[first.frame.name] + diceFrameMap[second.frame.name]
      console.log('You rolled: ', diceRoll)
      first.isRolling = false
      phaserE.emit(
        'playerRolled',
        diceFrameMap[first.frame.name],
        diceFrameMap[second.frame.name]
      )

      movePlayer(currentPlayer, diceRoll)
      // Then update currentPlayer
      let nextPlayerIndex = players.indexOf(currentPlayer) + 1
      if (nextPlayerIndex >= players.length) {
        nextPlayerIndex = 0
      }
      currentPlayer = players[nextPlayerIndex]
    }

    let diceGroup = this.add.group([first, second])
    let diceArray = diceGroup.getChildren()
    // To keep track of whether it's the first time we're rolling the dice:
    let firstTime = true

    diceArray.forEach(die => {
      die.setInteractive()
      // Give each die the ability to do things when clicked
      die.on('pointerdown', function() {
        console.log('I clicked first die!')

        if (firstTime) {
          // If it's the first time rolling, we need to play the animation.
          console.log('Playing firstDiceRoll')
          firstTime = false
          rollingDiceTween.play()
          first.anims.play('firstDiceRoll')
          second.anims.play('secondDiceRoll')
        } else {
          // All other times, we need to resume the animation.
          console.log('Resuming firstDiceRoll')
          rollingDiceTween.play()
          first.anims.resume()
          second.anims.resume()
        }
      })
    })

    // Code for dice roll broadcast:
    const showRoll = (die1, die2) => {
      let frame1
      let frame2
      for (let key in diceFrameMap) {
        if (die1 === diceFrameMap[key]) {
          frame1 = key
        }
        if (die2 === diceFrameMap[key]) {
          frame2 = key
        }
      }

      if (firstTime) {
        first.anims.play('firstDiceRoll')
        second.anims.play('secondDiceRoll')
      } else {
        first.anims.resume()
        second.anims.resume()
      }

      first.anims.pause(first.anims.currentAnim.frames[frame1])
      second.anims.pause(second.anims.currentAnim.frames[frame2])

      movePlayer(currentPlayer, die1 + die2)
      // Then update currentPlayer
      let nextPlayerIndex = players.indexOf(currentPlayer) + 1
      if (nextPlayerIndex >= players.length) {
        nextPlayerIndex = 0
      }
      currentPlayer = players[nextPlayerIndex]
    }

    // When I see the signal from my client, I will show the roll of the other player:
    newGame.on('socketSaysSomeoneRolled', (die1, die2) => {
      showRoll(die1, die2)
    })

    // Code for Callstack deck:
    const deckSpot = this.game.config.width * 0.65
    const myScale = 0.4 / (768 / this.game.config.width) // since 0.4 is the perfect scale for a screen of 768 px width, calculate the scale for this game's width accordingly
    const gameOptions = {
      flipSpeed: 200, // flipping speed in milliseconds
      flipZoom: 1.2 // flipping zoom ratio. Simulates the card to be raised when flipping
    }

    // Make a group of cards
    // Might need to put in a for loop atfer making 20 different cards
    let group = this.add.group({
      key: 'card1', //refers to preload name of spritesheet; in this case, I am using the same image for all 20 cards
      frame: 0,
      repeat: 19, // for 20 cards total
      setRotation: {value: -0.7},
      setScale: {x: myScale},
      setXY: {x: deckSpot, y: deckSpot, stepX: 2},
      maxSize: 20, // max number of group members (i.e. max number of cards in deck)
      name: 'callstackDeck',
      type: 'callstackDeckType'
      // removeCallback could be used to add the card to an array for reshuffling later
    })

    // Get all the group members (aka all the cards in the group)
    let callstackCards = group.getChildren()
    let card = callstackCards.pop()
    console.log('arr of children?:', callstackCards)

    // For each card, make it clickable and assign it functions/tweens to run when clicked.
    phaserE.on('flipCard', () => {
      if (card === undefined) {
        card = callstackCards.pop()
      }
      console.log('I landed on callstack!')
      if (!card.isFlipping) {
        // make it flip now!
        card.isFlipping = true
        console.log('card scale', card.scale)
        console.log('card scaleX', card.scaleX)
        console.log('card scaleY', card.scaleY)
        myFlipTween.play()
      }
    })

    const myFlipTween = this.tweens.add({
      targets: card,
      scaleX: 0,
      scaleY: gameOptions.flipZoom,
      duration: gameOptions.flipSpeed / 2,
      paused: true,
      onComplete: switchSprite,
      onCompleteParams: [card]
    })

    function switchSprite(tween, targets, gameObject) {
      targets[0].setFrame(1 - targets[0].frame.name)
      backFlipTween.play()
    }

    const backFlipTween = this.tweens.add({
      targets: card,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      duration: gameOptions.flipSpeed / 2,
      paused: true,
      onComplete: backFlipDone,
      completeDelay: 3000
    })

    function switchSprite(tween, targets, gameObject) {
      console.log('switchSprite ran!')
      console.log('arguments:', arguments)
      console.log('targets[0].frame', targets[0].frame)
      targets[0].setFrame(1 - targets[0].frame.name)
      backFlipTween.play()
    }

    function backFlipDone() {
      console.log('backFlipDone ran!')
      card.canBeDismissed = true
      card.destroy()
      console.log('what are callstackCards in backFlipDone?', callstackCards)
      card = callstackCards.pop()
    }

    // End Callstack Deck code.
  }

  update() {}
}
