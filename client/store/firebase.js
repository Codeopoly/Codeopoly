import React, {createContext, useEffect} from 'react'
import firebaseConfig from '../../config/fbConfig'
import app from 'firebase/app'
import 'firebase/firestore'
// React hooks for redux!
import {useDispatch} from 'react-redux'
