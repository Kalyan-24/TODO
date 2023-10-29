import express from 'express'
import { getHomeController, getProfile, postUpdateProfileController, getChangePassword, postChangePassword, postAddNewTODO, getMySavedTODOs, completeTODO, deleteTODO } from '../controllers/User.js'

const router = express.Router()

router.get('/', getHomeController)

router.post('/api/v1/update-profile', postUpdateProfileController)

router.get('/change-password', getChangePassword)
router.post('/api/v1/change-password', postChangePassword)

router.get('/api/v1/my-saved-todos', getMySavedTODOs)
router.post('/api/v1/add-new-todo', postAddNewTODO)
router.put('/api/v1/:todoId', completeTODO)
router.delete('/api/v1/:todoId', deleteTODO)

router.get('/:username', getProfile)

export default router