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
    // let boardData = board.addTilesetImage('board')
    console.log('board is added')
    const tileset = board.addTilesetImage('all tiles', 'background')
    console.log('tileset added')
    const firstLayer = board.createStaticLayer('Tile Layer 1', tileset, 0, 0)
    console.log('first layer added')

    // this.physics.world.bounds.width = board.width
    // this.physics.world.bounds.height = board.height

    //getting object layers from json file
    const interviewObj = board.getObjectLayer('Interview').objects
    const drawCardObj = board.getObjectLayer('Draw a card').objects
    const coffeeBreakObj = board.getObjectLayer('Coffee Break').objects[0]
    const stealSomeTechObj = board.getObjectLayer('Steal some tech').objects[0]
    const queuesObj = board.getObjectLayer('Queues').objects[0]
    const stacksObj = board.getObjectLayer('Stacks').objects[0]
    const linkedListsObj = board.getObjectLayer('Linked lists').objects[0]
    const treesObj = board.getObjectLayer('Trees').objects[0]
    const graphsObj = board.getObjectLayer('Graphs').objects[0]
    const gotaBugObj = board.getObjectLayer('Got a bug').objects[0]
    const newInvestorObj = board.getObjectLayer('New Investor').objects[0]
    const sequelizeObj = board.getObjectLayer('Sequelize').objects[0]
    const firebaseObj = board.getObjectLayer('Firebase').objects[0]
    const expressObj = board.getObjectLayer('Express').objects[0]
    const mongoDBObj = board.getObjectLayer('MongoDB').objects[0]
    const loseMoneyObj = board.getObjectLayer('Lose money').objects[0]
    const middlewareObj = board.getObjectLayer('Middleware').objects[0]
    const authObj = board.getObjectLayer('Auth').objects[0]
    const codeDesignObj = board.getObjectLayer('Code design').objects[0]
    const materialUIObj = board.getObjectLayer('MaterialUI').objects[0]
    const cssObj = board.getObjectLayer('CSS').objects[0]
    const htmlObj = board.getObjectLayer('HTML').objects[0]
    const stuckOnBugObj = board.getObjectLayer('Stuck on bug').objects[0]
    const semanticUIObj = board.getObjectLayer('SemanticUI').objects[0]
    const reactObj = board.getObjectLayer('React').objects[0]
    const reactNativeObj = board.getObjectLayer('React native').objects[0]
    const emberObj = board.getObjectLayer('Ember').objects[0]
    const vueObj = board.getObjectLayer('Vue').objects[0]
    const angularObj = board.getObjectLayer('Angular').objects[0]
    const goObj = board.getObjectLayer('Go').objects[0]

    this.singleTilesArr = [
      goObj,
      loseMoneyObj,
      mongoDBObj,
      expressObj,
      firebaseObj,
      sequelizeObj,
      newInvestorObj,
      gotaBugObj,
      graphsObj,
      treesObj,
      linkedListsObj,
      stacksObj,
      queuesObj,
      stealSomeTechObj,
      coffeeBreakObj,
      angularObj,
      vueObj,
      emberObj,
      reactNativeObj,
      reactObj,
      semanticUIObj,
      stuckOnBugObj,
      htmlObj,
      cssObj,
      materialUIObj,
      codeDesignObj,
      authObj,
      middlewareObj
    ]

    console.log('checking draw card props', drawCardObj)

    //CREATING GROUPS FOR TILES BELOW
    this.interviewGroup = this.physics.add.group({})
    this.drawCardGroup = this.physics.add.group({})

    this.interviewArr = []
    interviewObj.forEach(object => {
      console.log('INTERVIEW PLACEMENT WORKS')
      let obj = this.interviewGroup.create(object.x, object.y, 'tile')
      obj.setOrigin(0)
      obj.body.width = object.width
      obj.body.height = object.height
      this.interviewArr.push(obj)
    })
    this.drawCardArr = []
    drawCardObj.forEach(object => {
      console.log('DRAW CARD PLACEMENT WORKS')
      let obj = this.drawCardGroup.create(object.x, object.y, 'tile')
      obj.setOrigin(0)
      obj.body.width = object.width
      obj.body.height = object.height
      this.drawCardArr.push(obj)
    })

    //SINGLE TILE PLACEMENT BELOW
    this.placementArr = []
    this.singleTilesArr.forEach(object => {
      let obj = this.physics.add.sprite(object.x, object.y, object.name)
      obj.setOrigin(0)
      obj.body.width = object.width
      obj.body.height = object.height
      this.placementArr.push(obj)
    })

    // PATH TILES IN ORDER FROM GO TO FINISH
    this.tilePathArr = this.placementArr

    //insert draw card right at 6th idx
    this.tilePathArr.splice(6, 0, this.drawCardArr[1])
    //insert interview right at 8th idx
    this.tilePathArr.splice(8, 0, this.interviewArr[1])
    //insert interview top at 13th idx
    this.tilePathArr.splice(13, 0, this.interviewArr[0])
    //insert draw card top at 16th idx
    this.tilePathArr.splice(16, 0, this.drawCardArr[0])
    //insert interview left at 20th idx
    this.tilePathArr.splice(20, 0, this.interviewArr[2])
    //insert draw card left at 24th idx
    this.tilePathArr.splice(24, 0, this.drawCardArr[2])
    //insert interview bottom at 31st idx
    this.tilePathArr.splice(31, 0, this.interviewArr[3])
    //insert draw card bottom at 32nd idx
    this.tilePathArr.splice(32, 0, this.drawCardArr[3])
    console.log(this.tilePathArr)

    // Rendering sprites picked for game
    // it's only like this because the template literal WON'T WORK!!!!! don't be mad
    let player1
    let player2
    let player3
    let player4

    let players = [player1, player2, player3, player4]

    newGame.on('start', imageNameArray => {
      console.log('here it is AGAIN...', imageNameArray)
      for (let i = 0; i < imageNameArray.length; i++) {
        players[i] = this.physics.add.sprite(
          i % 2 ? 680 : 730,
          i > 1 ? 730 : 680,
          imageNameArray[i]
        )
        players[i].setScale(0.3)
      }
    })

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
      frameRate: 15 + Math.floor(Math.random() * 3), // randomness to avoid the same rolling patterns
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
      onComplete: stopAnims
    })

    // function called when the tween stops
    function stopAnims() {
      // console.log("stopAnims ran!", first.frame, second.frame)
      console.log(
        'You rolled: ',
        diceFrameMap[first.frame.name] + diceFrameMap[second.frame.name]
      )
      anim1.pause()
      anim2.pause()
      first.isRolling = false
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
            console.log('how many times??')
            phaserE.emit('playerLanded', 'challenge', 'frontend')
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
        console.log('switchSprite ran!')
        console.log('arguments:', arguments)
        console.log('targets[0].frame', targets[0].frame)
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

  update() {
    // this.interviewGroup(this.doge)
    //SPRITE ANIMATION
    // let spriteMovement = {velocity: 8}
    // this.placementArr.forEach(placement => {
    //   this.physics.add.overlap(
    //     this.doge,
    //     placement,
    //     this.activateFunc,
    //     null,
    //     this
    //     )
    //   })
    // activateFunc(player, tile) {
    //   console.log('inside the func')
    //   tile.disableBody()
    // }
  }
}
