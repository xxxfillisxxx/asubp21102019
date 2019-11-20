/**
 * CommentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async find(req, res) {
        console.log(req.session)
        const params = req.allParams()
        let comments = []
        // if(req.session.user){
        //     if (!req.session.user.isAdmin) {
                // const userId = req.session.user.id
                // const permissions = await Permission.find({ where: { user: userId } }).populate('subsystem')
    
                // subsystems = permissions.map(p => p.subsystem)
        //     } else {
               comments = await Comments.find(params).populate('user')
        //     }
        // }   
        return res.json(comments)
    },
    async count(req, res) {
        try {
            const { count } = await sails.helpers.count.with({ req, model: Comments })
            return res.json({ count })
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    },
    async getComments(req, res) {
        try {
            let Comments = []
            if(req.session.user.isFO||req.session.user.isAdmin){
                users = await Comments.find()
            }else{
                users.push(await User.findOne({ id: req.session.user.id }))
            }         
            return res.json([ ...users ])
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    },
};

