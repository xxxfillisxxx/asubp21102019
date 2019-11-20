/**
 * SubsystemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const count = require('../utils/count')
const fs = require('fs');
const path = require('path')
const SkipperDisk = require('skipper-disk')
const dirname = path.resolve(sails.config.appPath, 'files/documents')

module.exports = {

    async find(req, res) {        
        const params = req.allParams()
        let subsystems = []
        if(req.session.user){
            if (!req.session.user.isAdmin) {
                const userId = req.session.user.id
                const permissions = await Permission.find({ where: { user: userId } }).populate('subsystem')
    
                subsystems = permissions.map(p => p.subsystem)
            } else {
                subsystems = await Subsystem.find(params).populate('categories').populate('faq').populate('distributives')
            }
        }   
        return res.json(subsystems)
    },

    async getFrontend (req, res) {
        const params = req.allParams()
        let subsystems = null
        subsystems = await Subsystem.find(params).populate('categories').populate('faq').populate('distributives').populate('contacts')
        subsystems.forEach(sub=>{
            sub.contacts.sort(
                (prev, next) => prev.orderField - next.orderField
            )
            sub.categories.sort(
                (prev, next) => prev.orderField - next.orderField
            )    
            sub.distributives.sort(
                (prev, next) => prev.orderField - next.orderField
            )        
        })
        return res.json(subsystems)
    },

    async count(req, res) {
        try {
            const { count } = await sails.helpers.count.with({ req, model: Subsystem })
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
            const subsystems = await Subsystem.find({ id: _ids }).populate('categories').populate('distributives')
            let cats=[]
            let dists=[]
            subsystems.forEach(sub=>{
                cats.push(...sub.categories.map(cat=>cat.id))
                dists.push(...sub.distributives.map(dist=>dist.id))
            })
            const categories = await Category.find({ distributive: dists })
            cats.push(...categories.map(cat=>cat.id))
            const documents= await Document.find({category: cats})
            const files = await File.find({id:  documents.map(a => a.file)})     
            const destroyed = await Subsystem.destroy({ id: _ids })
            files.forEach(file => {
                fs.unlink(dirname+'/'+file.basename, (err) => {
                    if (err) throw err;
                    console.log(dirname+'/'+file.basename+' was deleted');
                });
            });
            const destroyedFiles = await File.destroy({ id: files.map(a => a.id) })    
            await Subsystem.resort()
            return res.json({ destroyed: _ids })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    

};

