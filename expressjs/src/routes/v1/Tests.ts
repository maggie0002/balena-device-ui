import express from 'express'
import Logger from '@/common/logger'
import queueCache from '@/middleware/queueCache'

const router = express.Router()

// Cache tests
router.get('/v1/test/cache', queueCache, (_req, res) => {
  Logger.warn('Running test route.')
  res.send({ test: 'Testing Cache' })
})

router.get('/v1/test/cache2', queueCache, (_req, res) => {
  Logger.warn('Running test route.')
  res.send({ test2: 'Testing Cache 2' })
})

export default router
