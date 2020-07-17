/* eslint-disable max-statements */
import AlignGrid from '../../utility/alignGrid'
import EventDispatcher from '../../utility/eventDispatcher'
import {newGame} from './playerPanels'
import {EventEmitter} from 'events'

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

    // Rendering sprites picked for game
    // it's only like this because the template literal WON'T WORK!!!!! don't be mad
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

    newGame.on('start', (imageNameArray, hostStatusArray, randomParam) => {
      sceneRandomness = randomParam
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

    const tileInfoObject = {
      0: {
        id: 0,
        x: 680,
        y: 680,
        occupied: false,
        challenge: false,
        category: null
      },
      1: {
        id: 1,
        x: 680 - 65 * 1,
        y: 680,
        occupied: false,
        challenge: true,
        category: 'Misc'
      },
      2: {
        id: 2,
        x: 680 - 65 * 2,
        y: 680,
        occupied: false,
        challenge: true,
        category: 'Misc'
      },
      3: {
        id: 3,
        x: 680 - 65 * 3,
        y: 680,
        occupied: false,
        challenge: true,
        category: 'Misc'
      },
      4: {
        id: 4,
        x: 680 - 65 * 4,
        y: 680,
        occupied: false,
        challenge: false,
        category: 'Callstack'
      },
      5: {
        id: 5,
        x: 680 - 65 * 5,
        y: 680,
        occupied: false,
        challenge: true,
        category: 'Interview'
      },
      6: {
        id: 6,
        x: 680 - 65 * 6,
        y: 680,
        occupied: false,
        challenge: true,
        category: 'UI'
      },
      7: {
        id: 7,
        x: 680 - 65 * 7,
        y: 680,
        occupied: false,
        challenge: true,
        category: 'UI'
      },
      8: {
        id: 8,
        x: 680 - 65 * 8,
        y: 680,
        occupied: false,
        challenge: true,
        category: 'UI'
      },
      9: {
        id: 9,
        x: 680 - 65 * 9,
        y: 680,
        occupied: false,
        challenge: false,
        category: 'bug'
      },
      // Here starts the left side of the board; Semantic UI
      10: {
        id: 10,
        x: 680 - 65 * 9,
        y: 680 - 65 * 1,
        occupied: false,
        challenge: true,
        category: 'UI'
      },
      11: {
        id: 11,
        x: 680 - 65 * 9,
        y: 680 - 65 * 2,
        occupied: false,
        challenge: true,
        category: 'Frontend'
      },
      12: {
        id: 12,
        x: 680 - 65 * 9,
        y: 680 - 65 * 3,
        occupied: false,
        challenge: false,
        category: 'Callstack'
      },
      13: {
        id: 13,
        x: 680 - 65 * 9,
        y: 680 - 65 * 4,
        occupied: false,
        challenge: true,
        category: 'Frontend'
      },
      14: {
        id: 14,
        x: 680 - 65 * 9,
        y: 680 - 65 * 5,
        occupied: false,
        challenge: true,
        category: 'Frontend'
      },
      15: {
        id: 15,
        x: 680 - 65 * 9,
        y: 680 - 65 * 6,
        occupied: false,
        challenge: true,
        category: 'Frontend'
      },
      16: {
        id: 16,
        x: 680 - 65 * 9,
        y: 680 - 65 * 7,
        occupied: false,
        challenge: true,
        category: 'Interview'
      },
      17: {
        id: 17,
        x: 680 - 65 * 9,
        y: 680 - 65 * 8,
        occupied: false,
        challenge: true,
        category: 'Frontend'
      },
      18: {
        id: 18,
        x: 680 - 65 * 9,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: false,
        category: 'Coffee'
      },
      // Here starts the top section's StealSomeTech!
      19: {
        id: 19,
        x: 680 - 65 * 8,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: false,
        category: 'Steal'
      },
      20: {
        id: 20,
        x: 680 - 65 * 7,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: false,
        category: 'Callstack'
      },
      21: {
        id: 21,
        x: 680 - 65 * 6,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: true,
        category: 'Algorithm'
      },
      22: {
        id: 22,
        x: 680 - 65 * 5,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: true,
        category: 'Algorithm'
      },
      23: {
        id: 23,
        x: 680 - 65 * 4,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: true,
        category: 'Interview'
      },
      24: {
        id: 24,
        x: 680 - 65 * 3,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: true,
        category: 'Algorithm'
      },
      25: {
        id: 25,
        x: 680 - 65 * 2,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: true,
        category: 'Algorithm'
      },
      26: {
        id: 26,
        x: 680 - 65 * 1,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: true,
        category: 'Algorithm'
      },
      27: {
        id: 27,
        x: 680,
        y: 680 - 65 * 9,
        occupied: false,
        challenge: false,
        category: 'GotBug'
      },
      // Here starts the right side's Interview!
      28: {
        id: 28,
        x: 680,
        y: 680 - 65 * 8,
        occupied: false,
        challenge: true,
        category: 'Interview'
      },
      29: {
        id: 29,
        x: 680,
        y: 680 - 65 * 7,
        occupied: false,
        challenge: false,
        category: 'Investor'
      },
      30: {
        id: 30,
        x: 680,
        y: 680 - 65 * 6,
        occupied: false,
        challenge: false,
        category: 'Callstack'
      },
      31: {
        id: 31,
        x: 680,
        y: 680 - 65 * 5,
        occupied: false,
        challenge: true,
        category: 'Backend'
      },
      32: {
        id: 32,
        x: 680,
        y: 680 - 65 * 4,
        occupied: false,
        challenge: true,
        category: 'Backend'
      },
      33: {
        id: 33,
        x: 680,
        y: 680 - 65 * 3,
        occupied: false,
        challenge: true,
        category: 'Backend'
      },
      34: {
        id: 34,
        x: 680,
        y: 680 - 65 * 2,
        occupied: false,
        challenge: true,
        category: 'Backend'
      },
      35: {
        id: 35,
        x: 680,
        y: 680 - 65 * 1,
        occupied: false,
        challenge: false,
        category: 'LoseMoney'
      }
    }

    const movePlayer = (player, diceRoll) => {
      let propertyName = `${player.name}Loc`
      let currentLoc = playerLocations[propertyName]
      let newLoc = currentLoc + diceRoll
      // Adjust if we went past GO
      if (newLoc > 35) {
        newLoc = newLoc - 35
        // Emit signal passed GO
      }
      console.log('player locations:', playerLocations)
      console.log('propertyName:', propertyName)
      console.log('current location:', currentLoc)
      console.log('New Location:', newLoc)
      let newX = tileInfoObject[newLoc].x
      let newY = tileInfoObject[newLoc].y
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
      const playerTween = this.add.tween({
        targets: player,
        x: newX,
        y: newY,
        duration: 3000,
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
      phaserE.emit('playerLanded', challenge, array[2]) // challenge = "challenge" or null, category name (i.e. Frontend)
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
      frameRate: 15 + Math.floor(Math.random() * 3),
      frames: this.anims.generateFrameNames('dice', {start: 0, end: 5})
    })
    const anim2 = this.anims.create({
      key: 'secondDiceRoll',
      repeat: -1,
      frameRate: 18 + Math.floor(Math.random() * 3),
      frames: this.anims.generateFrameNames('dice', {start: 2, end: -2})
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
      // onCompleteParams: currentPlayer
    })

    // function called when the tween stops
    function stopAnims() {
      let diceRoll =
        diceFrameMap[first.frame.name] + diceFrameMap[second.frame.name]
      console.log('You rolled: ', diceRoll)
      anim1.pause()
      anim2.pause()
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
          firstTime = false
          rollingDiceTween.play()
          first.play('firstDiceRoll')
          second.play('secondDiceRoll')
        } else {
          // All other times, we need to resume the animation.
          rollingDiceTween.play()
          anim1.resume()
          anim2.resume()
        }
      })
    })

    // Code for dice roll broadcast:
    const showRoll = (die1, die2) => {
      console.log('showRoll ran!! I actually got a broadcast signal!!!')
      console.log('did I even get the data???', die1, die2)
      // Create new animations that are hard-coded to land on same frames as the braodcasting player rolled:
      let dejavu1 = this.anims.create({
        key: 'dejavu1',
        repeat: -1,
        frameRate: 18 + Math.floor(Math.random() * 3),
        frames: this.anims.generateFrameNames('dice', {start: 0, end: 5})
      })
      let dejavu2 = this.anims.create({
        key: 'dejavu2',
        repeat: -1,
        frameRate: 18 + Math.floor(Math.random() * 3),
        frames: this.anims.generateFrameNames('dice', {start: 0, end: 5})
      })

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

      console.log('the frames to stop on', frame1, frame2)
      first.play('dejavu1')
      second.play('dejavu2')

      first.anims.stopOnFrame(first.anims.currentAnim.frames[frame1])
      second.anims.stopOnFrame(second.anims.currentAnim.frames[frame2])

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
    console.log('arr of children?:', callstackCards)

    // For each card, make it clickable and assign it functions/tweens to run when clicked.
    callstackCards.forEach(card => {
      card.setInteractive()
      card.on(
        'pointerdown',
        function() {
          // if the card is not flipping:
          console.log('I clicked the card!')
          if (!card.isFlipping) {
            // make it flip now!
            card.isFlipping = true
            console.log('card scale', card.scale)
            console.log('card scaleX', card.scaleX)
            console.log('card scaleY', card.scaleY)
            myFlipTween.play()
          }
          if (card.canBeDismissed) {
            card.destroy()
          }
        },
        this
      )

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
        onComplete: backFlipDone
      })

      function backFlipDone() {
        console.log('backFlipDone ran!')
        card.canBeDismissed = true
      }
    })

    // End Callstack Deck code.
  }

  update() {}
}
