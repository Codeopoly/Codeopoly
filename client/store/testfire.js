const CREATE_PLAYER = 'CREATE_PLAYER'

export const playerActionCreator = data => {
  return {
    type: CREATE_PLAYER,
    data
  }
}

export const playerThunk = data => {
  return async (dispatch, {getFirestore}) => {
    const fireStore = getFirestore()
    console.log()
    try {
      console.log('try block executed')
      await fireStore.collection('players').add({
        startupName: 'Alison',
        hasUI: 'none',
        hasFrontend: 'none',
        hasBackend: 'none',
        hasAlgorithm: 'none',
        hasMiddleware: 'none',
        seedMoney: 50,
        location: 1,
        game_id: 1,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwKVFwjXGAiso3ijDjk6RYWqZZVstt4FSB5w&usqp=CAU'
      })
    } catch (error) {
      console.error(error)
    }

    dispatch(playerActionCreator(data))
  }
}
