/**
 * ContactController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    async count(req, res) {
        try {
            const { count } = await sails.helpers.count.with({ req, model: Contact })
            return res.json({ count })
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

            if (!ids || ids.length === 0) {
                throw('Need at least one id for removing')
            }

            _ids = ids
        } catch (error) {
            return res.status(400).end()
        }

        try {    
            const destroyed = await Contact.destroy({ id: _ids })            
            /*await Distributive.resort()*/
            return res.json({ destroyed: _ids })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    

};
