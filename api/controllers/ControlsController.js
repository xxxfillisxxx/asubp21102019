/**
 * ControlsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async find(req, res) {        
        const params = req.allParams()
        let controls = []       
        controls = await Controls.find(params)
        return res.json(controls)
    },
  
    async getControl (req, res) {
        const params = req.allParams()
        
        let control = null
        let user=null
        control = await Controls.findOne({id:params.id}).populate('comments') 
                     
            for(let comment of control.comments){
                user = await User.findOne( {id:comment.user});
                comment.user=user.login
                 
            }   
                                
        return res.json(control)
    },
    async count(req, res) {
        try {
            const { count } = await sails.helpers.count.with({ req, model: Controls })
            return res.json({ count })
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    },

};

