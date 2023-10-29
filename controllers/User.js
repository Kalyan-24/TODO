import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../models/User.js"
import Todo from "../models/Todo.js"

const JWT_SECRET = 'sdjfhujasfhliarjoieurcainlerusekfhvisuinhurrrbfubyuistio4su9tus48sstvnthnsrufv89ru'

const getHomeController = async (req, res) => {

    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const message = req.flash('message')

    const { token } = req.cookies

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        try {
            const user = await User.findById(decoded.id)

            res.render('./user/home', { message, name: user.username })
        }
        catch (err) {
            res.redirect('/logout')
        }
    }
    catch (error) {
        res.redirect('/logout')
    }
}

const getProfile = async (req, res) => {

    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const { username } = req.params

    const { token } = req.cookies

    if (token) {
        try {

            const decoded = jwt.verify(token, JWT_SECRET)

            try {
                const user = await User.findById(decoded.id)

                if (user.username === username) {
                    res.render('./user/my-profile', { user: user })
                }
                else {
                    try {
                        const user = await User.findOne({ username })

                        if (user) {
                            res.render('./user/others-profile', { user: user })
                        }
                        else {
                            res.send('<h1 style="color: red;">404 Not found</h1>')
                        }
                    }
                    catch (err) {
                        res.send(err.message)
                    }
                }
            }
            catch (err) {
                res.redirect('/logout')
            }
        }
        catch (error) {
            res.redirect('/logout')
        }
    }
    else {
        try {
            const user = await User.findOne({ username })

            if (user) {
                res.render('./user/others-profile', { user: user })
            }
            else {
                res.send('<h1 style="color: red;">404 Not found</h1>')
            }
        }
        catch (err) {
            res.send(err.message)
        }
    }
}

const postUpdateProfileController = async (req, res) => {

    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const { firstname, lastname } = req.body

    const { token } = req.cookies

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        try {
            const user = await User.findById(decoded.id)

            const _id = user._id

            if (user) {

                await User.updateOne(
                    { _id },
                    {
                        $set: { firstname, lastname }
                    }
                )

                res.json({
                    status: 'Success', message: 'Profile Updated Successfully'
                })
            }
            else {
                // req.flash('message', 'Oops! Something went Wrong!...')
                res.json({
                    status: 'Error', message: 'Oops! Something went Wrong!...'
                })
            }

        }
        catch (e) {
            res.redirect('/logout')
        }
    }
    catch (error) {
        res.redirect('/logout')
    }
}

const getChangePassword = async (req, res) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const { token } = req.cookies

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        try {
            const user = await User.findById(decoded.id)

            res.render('./user/change-password')
        }
        catch (err) {
            res.redirect('/logout')
        }
    }
    catch (error) {
        res.redirect('/logout')
    }
}

const postChangePassword = async (req, res) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const { oldpassword, newpassword } = req.body

    const { token } = req.cookies

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        try {
            const user = await User.findById(decoded.id)

            const _id = user._id

            if (user) {
                if (await bcrypt.compare(oldpassword, user.password)) {
                    await User.updateOne(
                        { _id },
                        {
                            $set: { password: await bcrypt.hash(newpassword, 10) }
                        }
                    )

                    res.json({
                        status: 'Success', message: 'Password Updated Successfully'
                    })
                }
                else {
                    res.json({
                        status: 'Error', message: 'Enter correct Password'
                    })
                }
            }
        }
        catch (err) {
            res.send(err.message)
        }
    }
    catch (error) {
        res.redirect('/logout')
    }
}

const postAddNewTODO = async (req, res) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const { TODOTitle, TODODescription } = req.body

    const { token } = req.cookies

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        try {
            const user = await User.findById(decoded.id)

            const _id = user._id

            if (user) {
                Todo.create({
                    title: TODOTitle,
                    description: TODODescription,
                    userID: _id
                })

                res.json({status: 'Success', message: 'Todo Created!'})
            }
        }
        catch (err) {
            res.send(err.message)
        }
    }
    catch (error) {
        res.redirect('/logout')
    }
}

const getMySavedTODOs = async (req, res) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const { token } = req.cookies

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        try {
            const user = await User.findById(decoded.id)

            const _id = user._id

            if (user) {
                const todos = await Todo.find({userID: _id})

                res.json({status: 'Success', data: todos})
            }
        }
        catch (err) {
            res.send(err.message)
        }
    }
    catch (error) {
        res.redirect('/logout')
    }
}

const completeTODO = async (req, res) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const { todoId } = req.params

    const { token } = req.cookies

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        try {
            const user = await User.findById(decoded.id)

            if (user) {
                const task = await Todo.findById(todoId)

                task.isCompleted = !task.isCompleted
                task.save()
            }

            res.json({status: 'Success', message: 'Todo Deleted!'})
        }
        catch (err) {
            res.send(err.message)
        }
    }
    catch (error) {
        res.redirect('/logout')
    }
}

const deleteTODO = async (req, res) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')

    const { todoId } = req.params

    const { token } = req.cookies

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        try {
            const user = await User.findById(decoded.id)

            if (user) {
                await Todo.deleteOne({_id: todoId})
            }

            res.json({status: 'Success', message: 'Todo Deleted!'})
        }
        catch (err) {
            res.send(err.message)
        }
    }
    catch (error) {
        res.redirect('/logout')
    }
}

export { getHomeController, getProfile, postUpdateProfileController, getChangePassword, postChangePassword, postAddNewTODO, getMySavedTODOs, completeTODO, deleteTODO }