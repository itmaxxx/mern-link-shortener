const { Router } = require('express')
const shortid = require('shortid')
const config = require('config')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const { route } = require('./auth.routes')
const router = Router()

router.post('/generate', auth, async(req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { to } = req.body

        const code = shortid.generate()

        const exists = await Link.findOne({ to })

        if (exists) {
            return res.json({ link: exists })
        }

        const from = `${baseUrl}/t/${code}`

        const link = new Link({
            code, from, to, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
})

router.get('/', auth, async(req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
})

module.exports = router