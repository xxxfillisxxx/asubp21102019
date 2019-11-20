/**
 * NewsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const rssParser = require('rss-parser')

module.exports = {

    

    // ...sails.config.news.reduce((acc, n) => {
    //     const { url, name, withProxy, title } = n
    //     return {
    //         ...acc,
    //         [name]: async (req, res) => {
    //             const data = await sails.helpers.request.with({
    //                 url,
    //                 withProxy
    //             })
    //             const parser = new rssParser()
    //             const news = await parser.parseString(data)
    //             if (title) news.title = title
    //             return res.json({ news })
    //         }
    //     }
    // }, {
    //     sources: async (req, res) => {
    //         return res.json({sources: sails.config.news.map(n => n.name)})
    //     }
    // }),

    async getBySource(req, res) {
        try {
            const { source: name } = req.allParams()
            const [ source ] = await News.find({ name })
            if (!source) {
                return res.status(400).end()
            }
            const { url, withProxy, title } = source
            const data = await sails.helpers.request.with({
                url, withProxy
            })
            const parser = new rssParser()
            const news = await parser.parseString(data)
            if (title) news.title = title
            return res.json({ news })
        } catch (error) {
            console.error(error)
            return res.json({})
        }
    },

    sources: async (req, res) => {
        let sources = await News.find().sort('orderField ASC')
        sources = sources.map(s => s.name)
        return res.json({ sources })
    },

    async count(req, res) {
        try {
            const { count } = await sails.helpers.count.with({ req, model: News })
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
            _ids = ids
        } catch (error) {
            return res.status(400).end()
        }

        try {
            const destroyed = await News.destroy({ id: _ids })
            return res.json({ destroyed: _ids })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

};

