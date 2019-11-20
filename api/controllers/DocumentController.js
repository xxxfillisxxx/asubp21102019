/**
 * DocumentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const path = require('path')
const SkipperDisk = require('skipper-disk')
const dirname = path.resolve(sails.config.appPath, 'files/documents')

module.exports = {

    destroy: async (req, res) => {
        try {
            return res.json(await Document.destroy(req.allParams()).meta({fetch: true}))
        } catch (error) {
            return res.serverError(error)
        }

    },

    create: (req, res) => {
        try {

            req.file('file').upload(
                {
                    //TODO Move to config
                    maxBytes: 1024*1024*300,
                    dirname
                },
                async (err, uploadedFiles) => {
                    if (err) return res.serverError(err)
                    if (uploadedFiles.length !== 1) return res.badRequest('Ошибка прикрепления файлов')

                    const { size, type, filename } = uploadedFiles[0]
                    const basename = path.basename(uploadedFiles[0].fd)
                    const params = req.allParams()
                    console.log('PARAMS', params)
                    const { name, description, category, orderField, publishedAt } = params
                    console.log('PUBLIDHED AT', publishedAt)
                    const file = await File.create({ size, type, filename, basename }).fetch()
                    const document = await Document.create({ name, description, category, orderField, file: file.id, publishedAt }).fetch()
                    console.log(document)
                    const { id } = document

                    return res.json(await Document.findOne({ id }))
                }
            )
        } catch (error) {
            return res.serverError(error)
        }
    },

     update(req, res) {
        /*const { id, ...params } = req.allParams()
        return res.json(await Document.findOne({ id }))*/
        req.file('file').upload(
            {
                //TODO Move to config
                maxBytes: 1024*1024*300,
                dirname
            }, async (err, uploadedFiles) => {
                if (err) return res.serverError(err)
                let file = null
                if (uploadedFiles.length > 0) {
                    const { size, type, filename } = uploadedFiles[0]
                    const basename = path.basename(uploadedFiles[0].fd)
                    file = await File.create({ size, type, filename, basename }).fetch()
                }

                const { id, ...params } = req.allParams()
                let document_curr=await Document.findOne({ id })
                params.id = id

                if (file) {
                    console.log('file', file)
                    params.file = file.id
                    await Document.updateOne({ id }, params)

                    const fileOld = await File.findOne({id:document_curr.file })
                    fs.unlink(dirname+'/'+fileOld.basename, (err) => {
                        if (err) throw err;
                        console.log(dirname+'/'+fileOld.basename+' was deleted');
                    });
                    const destroyedFiles = await File.destroy({ id: document_curr.file })                    
                }else{
                    let {file,...params_new}=params
                    await Document.updateOne({ id }, params_new)
                }
                

                return res.json(await Document.findOne({ id }))
            })
    },

    async count(req, res) {
        try {
            const { count } = await sails.helpers.count.with({ req, model: Document })
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
            const documents= await Document.find({
                id: { in: _ids }
            })
            const files = await File.find({
                id: { in: documents.map(a => a.file) }
            })
            console.log(files)
            files.forEach(file => {
                fs.unlink(dirname+'/'+file.basename, (err) => {
                    if (err) throw err;
                    console.log(dirname+'/'+file.basename+' was deleted');
                });
            });
            const destroyed = await Document.destroy({ id: _ids })
            const destroyedFiles = await File.destroy({ id: files.map(a => a.id) })
            return res.json({ destroyed: _ids })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

};

