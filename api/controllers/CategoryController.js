/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const path = require('path')
const SkipperDisk = require('skipper-disk')
const dirname = path.resolve(sails.config.appPath, 'files/documents')

module.exports = {

    async count(req, res) {
        try {
            const { count } = await sails.helpers.count.with({ req, model: Category })
            return res.json({ count })
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    },
  
    destroy: async (req, res) => {
        try {
            return res.json(await Category.destroy(req.allParams()).meta({fetch: true}))
        } catch (error) {
            return res.error(error)
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
            const documents= await Document.find({category: _ids})
            const files = await File.find({id:  documents.map(a => a.file)})     
            const destroyed = await Category.destroy({ id: _ids })
            files.forEach(file => {
                fs.unlink(dirname+'/'+file.basename, (err) => {
                    if (err) throw err;
                    console.log(dirname+'/'+file.basename+' was deleted');
                });
            });
            const destroyedFiles = await File.destroy({ id: files.map(a => a.id) }) 
            /*await Category.resort()*/
            return res.json({ destroyed: _ids })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    

};

