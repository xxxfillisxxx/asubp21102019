/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    async login(req, res) {
        try {
            const { login, password } = req.allParams()

            const user = await User.findOne({ login })
            if (!user) return res.status(403).end()

            console.log(user, login, password)

            const validPassword = await sails.helpers.passwordCompare.with({ password, hash: user.password })
            if (!validPassword) return res.status(403).end()

            console.log('compared')

            req.session.user = {
                id: user.id,
                login: user.login,
                isAdmin: user.isAdmin,
                isFO: user.isFO
            }

            // const { token, exp } = await sails.helpers.jwtSign.with({ login, hash: user.password })

            // console.log('token', token)

            return res.json({ user })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async logout(req, res) {
        req.session.user = null
        return res.status(200).end()
    },

    async getUsersEdit(req, res) {
        try {
            let users = []
            if(req.session.user.isAdmin){
                users = await User.find()
            }else{
                users.push(await User.findOne({ id: req.session.user.id }))
            }         
            return res.json([ ...users ])
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    },
    async getUsers(req, res) {
        try {
            let users = []
            if(req.session.user.isFO||req.session.user.isAdmin){
                users = await User.find({select:['id', 'login']})
            }else{
                users.push(await User.findOne({ id: req.session.user.id }))
            }         
            return res.json([ ...users ])
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    },

    async count(req, res) {
        try {
            if(req.session.user.isAdmin){
                const { count } = await sails.helpers.count.with({ req, model: User }) 
                return res.json({ count })
            }else{
                return res.json({ count:1 })
            }            
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    },

    async destroyByIds (req, res) {
        
        let _ids = []

        try {
            const params = req.allParams()
            const { ids } = params
            _ids = ids
        } catch (error) {
            return res.status(400).end()
        }

        try {
            const destroyed = await User.destroy({ id: _ids })
            return res.json({ destroyed: _ids })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async addSubsystem (req, res) {
        const { userId, subsystemId } = req.allParams()
        const permission = await Permission.findOrCreate({ user: userId, subsystem: subsystemId }, { user: userId, subsystem: subsystemId })
        console.log(permission)
        return res.json({ permission })
    },

    async removeSubsystem (req, res) {
        const { userId, subsystemId } = req.allParams()
        const result = await Permission.destroyOne({ user: userId, subsystem: subsystemId })
        if (result) {
            return res.json({ error: false })
        } else {
            return res.status(400).json({ error: true })
        }
    }

};

