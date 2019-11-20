/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path')
const SkipperDisk = require('skipper-disk')
const dirname = path.resolve(sails.config.appPath, 'files/documents')

module.exports = {
    download: async (req, res) => {
        try {
            const { id, filename } = req.allParams()
            const file = await File.findOne({ id })
            if (!file) return res.badRequest('Файл не найден')

            const fileAdapter = SkipperDisk()

            console.log(file)
            res.set("Content-Type", file.type)
            if (filename) {
                res.set("Content-disposition", 'inline')
            } else {
                res.set("Content-disposition", `attachment; filename=${encodeURIComponent(file.filename)}`)
            }

            fileAdapter.read(`${dirname}/${file.basename}`)
            .on('error', (err) => res.serverError(err))
            .pipe(res)

        } catch (error) {
            return res.serverError(error)
        }
    },

};

