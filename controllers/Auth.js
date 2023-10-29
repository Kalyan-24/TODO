import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/User.js"

const JWT_SECRET = 'sdjfhujasfhliarjoieurcainlerusekfhvisuinhurrrbfubyuistio4su9tus48sstvnthnsrufv89ru'

const getLoginController = (req, res) => {

    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const message = req.flash('message')
    
    res.render('./auth/login', { message })
}

const postLoginController = async (req, res) => {
    var { email } = req.body
    const { password } = req.body

    email = email.toLowerCase()

    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    try {
        let user = await User.findOne({ email })

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {

                const token = jwt.sign(
                    {
                        id: user._id
                    },
                    JWT_SECRET
                )

                res.cookie('token', token, {
                    maxAge: 10 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                })


                req.flash('message', 'Success')
                res.redirect('/')
            }
            else {
                // res.status(400).json({ status: 'Error', error: 'Invalid Email/Password' })
                req.flash('message', 'Error')
                res.redirect('/login')
            }
        }
        else {

            user = await User.findOne({ username: email })

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)

                if (isMatch) {

                    const token = jwt.sign(
                        {
                            id: user._id
                        },
                        JWT_SECRET
                    )

                    res.cookie('token', token, {
                        maxAge: 10 * 24 * 60 * 60 * 1000,
                        httpOnly: true
                    })


                    req.flash('message', 'Success')
                    res.redirect('/')
                    // res.status(200).json({ status: 'Success', message: 'Login Successful', data: token })
                }
                else {
                    // res.status(400).json({ status: 'Error', error: 'Invalid Email/Password' })
                    req.flash('message', 'Error')
                    res.redirect('/login')
                    // res.status(200).json({ status: 'Error', error: 'Invalid Email/Password' })
                }
            }
            else {
                // res.status(400).json({ status: 'Error', error: 'Invalid Email/Password' })
                req.flash('message', 'Error')
                res.redirect('/login')
            }
        }
    }
    catch (error) {
        // res.status(500).json({ status: 'Error', error: error.message })
        res.status(200).json({ status: 'Error', error: error.message })
    }
}

const getRegisterController = (req, res) => {

    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const message = req.flash('message')

    res.render('./auth/register', { message })
}

const postRegisterController = async (req, res) => {
    let {user_name, email} = req.body
    const { password } = req.body

    user_name = user_name.toLowerCase()
    email = email.toLowerCase()

    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    try {
        let user = await User.findOne({ email })


        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10)

            user = User.create({
                username: user_name,
                email: email,
                password: hashedPassword
            })

            req.flash('message', 'Success')
            res.redirect('/login')
        }
        else {
            req.flash('message', 'Error')
            res.redirect('/register')
        }
    }
    catch (error) {
        res.json({ status: 'Error', error: error.message })
    }

}

const postUserNameAvailability = async (req, res) => {

    const { username } = req.body

    const user = await User.findOne({ username })

    if (user) {
        res.json({
            status: 'Error',
            message: 'Username already taken'
        })
    }
    else {
        res.json({
            status: 'Success',
            message: 'Username Available'
        })
    }
}

const postEmailAvailability = async (req, res) => {

    const { email } = req.body

    const user = await User.findOne({ email })

    if (user) {
        res.json({
            status: 'Error',
            message: 'Account already exists'
        })
    }
    else {
        res.json({
            status: 'Success',
            message: 'Email Available'
        })
    }
}

const logoutController = (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
    })

    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    res.redirect('/login')
}

export { getLoginController, postLoginController, getRegisterController, postRegisterController, postUserNameAvailability, postEmailAvailability, logoutController }