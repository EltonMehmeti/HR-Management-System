const Explorer = require("../models/explorer");

const getAllExplorer = async (req, res) => {
    try {
      const docs = await Explorer.findAll()
      res.status(200).json(docs)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const createExplorer = async (req, res) => {
    const { name, nationality } = req.body
    console.log(req.body)
    try {
      const newDoc = await Explorer.create({ name, nationality })
      res.status(201).json(newDoc)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const deleteExplorer = async (req, res) => {
    const { id } = req.params;
  
    try {
      const doc = await Explorer.findByPk(id);
      if (!doc) {
        return res.status(404).json({ error: "Document not found" });
      }
  
      await doc.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    deleteExplorer,
    createExplorer,
    getAllExplorer
  }