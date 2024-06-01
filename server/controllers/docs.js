const Docs = require("../models/docs")

// Get all documents
const getAllDocs = async (req, res) => {
  try {
    const docs = await Docs.findAll()
    res.status(200).json(docs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a document by ID
const getDocsById = async (req, res) => {
  const { id } = req.params
  try {
    const doc = await Docs.findByPk(id)
    if (!doc) {
      return res.status(404).json({ error: "Document not found" })
    }
    res.status(200).json(doc)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPublicDocs = async (req, res) => {
  try {
    const publicDocs = await Docs.findAll({
      where: {
        status: "public",
      },
    })
    res.status(200).json(publicDocs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create a new document
const createDocs = async (req, res) => {
  const { name, status } = req.body
  console.log(req.body)
  const filePath = req.file.filename // Assuming you're using Multer for file uploads

  try {
    const newDoc = await Docs.create({ name, filePath, status })
    res.status(201).json(newDoc)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a document
const updateDocs = async (req, res) => {
  const { id } = req.params
  const { name, status } = req.body

  try {
    const doc = await Docs.findByPk(id)
    if (!doc) {
      return res.status(404).json({ error: "Document not found" })
    }

    doc.name = name || doc.name
    doc.status = status || doc.status
    await doc.save()

    res.status(200).json(doc)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a document
const deleteDocs = async (req, res) => {
  const { id } = req.params

  try {
    const doc = await Docs.findByPk(id)
    if (!doc) {
      return res.status(404).json({ error: "Document not found" })
    }

    await doc.destroy()
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllDocs,
  getDocsById,
  createDocs,
  updateDocs,
  deleteDocs,
  getPublicDocs,
}
