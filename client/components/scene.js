import AlignGrid from '../../utility/alignGrid'

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

    this.load.image('doge', 'assets/Doge-Meme.png')

    this.load.spritesheet('card1', 'assets/callstack/1.png', {
      frameWidth: 425,
      frameHeight: 275
    })

  }
  create() {
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

    const interviewLayer = board.createStaticLayer('Interview', tileset, 0, 0)
    console.log('interview layer added')

    const interviewTiles = board.createFromObjects('Interview')
    const interviewObj = board.getObjectLayer('Interview').objects
    const drawCardObj = board.getObjectLayer('Draw a card').objects
    //console.log below works!!
    console.log('these are two object layers', interviewObj, drawCardObj)

    //THIS CONSOLE LOGS!!

    this.overlapObjectsGroup = this.physics.add.group({})

    interviewObj.forEach(object => {
      console.log('HI THIS IS WORKING I GUESS????')
      let obj = this.overlapObjectsGroup.create(object.x, object.y, 'tile')
      obj.setOrigin(0)
      obj.body.width = object.width
      obj.body.height = object.height
    })

    // overlapObjectsGroup.refresh()

    // this.physics.add.overlap(this.doge, this.overlapObjectsGroup)


    // const drawCardLayer = board.createStaticLayer('Draw a card', tileset, 0, 0)
    // console.log('draw card layer added')

    this.doge = this.physics.add.sprite(0, 0, 'doge')
    this.doge.setOrigin(-10.5, -10)
    this.doge.setScale(0.07)

    // this.doge.setCollideWorldBounds(true) // don't go out of the map


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
    // this.overlapObjectsGroup(this.doge)
    //SPRITE ANIMATION
    let spriteMovement = {velocity: 8}

    if (this.keys.left.isDown) {
      this.doge.x -= spriteMovement.velocity
    }
    if (this.keys.right.isDown) {
      this.doge.x += spriteMovement.velocity
    }
    if (this.keys.down.isDown) {
      this.doge.y += spriteMovement.velocity
    }
    if (this.keys.up.isDown) {
      this.doge.y -= spriteMovement.velocity
    }

    this.physics.add.overlap(
      this.doge,
      this.overlapObjectsGroup,
      this.activateFunc,
      null,
      this
    )
  }
  activateFunc(player, tile) {
    console.log('inside the func')
    tile.disableBody()
    // try game logic goes here
  }
}
