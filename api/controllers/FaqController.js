/**
 * FaqController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    async count(req, res) {
        try {
            const { count } = await sails.helpers.count.with({ req, model: Faq })
            return res.json({ count })
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    },
  
    destroy: async (req, res) => {
        try {
            return res.json(await Faq.destroy(req.allParams()).meta({fetch: true}))
        } catch (error) {
            return res.error(error)
        }
        
    },

    async destroyByIds (req, res) {
        let _ids = []

        try {
            const params = req.allParams()
            const { faqs:ids } = params
            console.log(ids)

            if (!ids || ids.length === 0) {
                throw('Need at least one id for removing')
            }

            _ids = ids
        } catch (error) {
            console.log(error)
            return res.status(400).end()
        }

        try {
            const destroyed = await Faq.destroy({ id: _ids })
            //await Faq.resort()
            return res.json({ destroyed: _ids })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

};

