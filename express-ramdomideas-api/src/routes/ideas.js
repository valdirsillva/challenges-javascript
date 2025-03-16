import express from 'express'
import { Idea } from '../models/idea.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find()
    return res.status(200).json({ success: true, data: ideas })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    return res.status(200).json({ success: true, data: idea })
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
    return res.status(201).json({ success: true, data: savedIdea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    // Match the usernames
    if (idea.username === req.body.username) {
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
      return res.status(204).json({ success: true, data: updatedIdea })
    }
    // Username do not match
    return res.status(403).json({ success: false, error: 'You are authorized to update this resource' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    // Match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id)
      return res.status(204).json({ success: true, data: {} })
    }

    // Usernames do not match
    return res.status(403).json({ success: false, error: 'You are authorized to delete this resource' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})

export { router }