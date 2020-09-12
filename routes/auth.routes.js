const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').isLength({ min: 8, max: 32 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ message:'Incorrect data entered', errors: errors.array() })
        }

        const { email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 5)

        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: 'User registered' })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
        console.log('Server error on /api/auth/register', e.message)
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Incorrect password').exists()
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ message:'Incorrect data entered', errors: errors.array() })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        // const hashedPassword = await bcrypt.hash(password, 'mern')

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'User not found' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '24h' }
        )

        res.json({ message: 'Logined', token, userId: user.id })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
        console.log('Server error on /api/auth/login', e.message)
    }
})

module.exports = router