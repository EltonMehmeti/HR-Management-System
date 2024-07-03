const Group = require("../models/group");

const getAllGroups = async (req, res) => {
    try {
      const docs = await Group.findAll()
      res.status(200).json(docs)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const createGroup = async (req, res) => {
    const { groupName, description } = req.body
    console.log(req.body)
    try {
      const newDoc = await Group.create({ groupName, description })
      res.status(201).json(newDoc)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const updateGroup = async (req, res) => {
    const { id } = req.params
    const { groupName, description } = req.body
  
    try {
      const doc = await Group.findByPk(id)
      if (!doc) {
        return res.status(404).json({ error: "Document not found" })
      }
  
      doc.groupName = groupName || doc.groupName
      doc.description = description || doc.description
      await doc.save()
  
      res.status(200).json(doc)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  module.exports={
    createGroup,
    getAllGroups,
    updateGroup
  }