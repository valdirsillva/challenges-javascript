import express from 'express'
import { Idea } from '../models/idea.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find()
    res.json({ success: true, data: ideas })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    res.status(201).json({ success: true, data: idea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10)
  })

  try {
    const savedIdea = await idea.save()
    res.status(201).json({ success: true, data: savedIdea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag
        }
      },
      { new: true }
    )
    res.status(204).json({ success: true, data: updatedIdea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deteledIdea = await Idea.findByIdAndDelete(req.params.id)
    res.status(204).json({ success: true, data: deteledIdea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

export { router }