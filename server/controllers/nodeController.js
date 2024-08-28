const Node = require('../models/nodeModel');
const Edge = require('../models/EdgeModel');

// Get all nodes
exports.getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find();
    res.status(200).json(nodes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new node
exports.createNode = async (req, res) => {
  const { nodes, edges } = req.body; 
  console.log('Received nodes:', nodes); 
  console.log('Received edges:', edges); 

  try {
    
    const savedNodes = await Node.insertMany(nodes);
    console.log('Saved nodes:', savedNodes); 

    // Create a mapping of original IDs to saved IDs
    const idMapping = savedNodes.reduce((acc, node) => {
      acc[node._id.toString()] = node._id.toString(); 
      return acc;
    }, {});

    // Edges ko save karo agar wo hain
    let savedEdges = [];
    if (edges && edges.length > 0) {
      const edgesToSave = edges.map(edge => ({
        source: idMapping[edge.source], // Map the source ID
        target: idMapping[edge.target], // Map the target ID
        id: edge.id,
      })).filter(edge => edge.source && edge.target); // Filter out edges with undefined source or target

      console.log('Edges to save:', edgesToSave); // Log edges before saving

      if (edgesToSave.length > 0) {
        savedEdges = await Edge.insertMany(edgesToSave);
        console.log('Saved edges:', savedEdges); // Log saved edges
      } else {
        console.warn('No valid edges to save, all edges have undefined source or target.');
      }
    }

   
    for (const node of savedNodes) {
      // Find related edges using the saved edge _id
      const relatedEdges = savedEdges.filter(edge => 
        edge.source.toString() === node._id.toString() || edge.target.toString() === node._id.toString()
      );

      console.log(`Related edges for node ${node._id}:`, relatedEdges); // Log related edges
      node.edges = relatedEdges.map(edge => edge._id); // Edges ko node mein assign karein
      await node.save(); // Node ko update karein
    }

    res.status(201).json({ message: 'Nodes and edges saved successfully', savedNodes });
  } catch (error) {
    console.error('Error saving nodes:', error); // Log error
    res.status(500).json({ message: 'Error saving nodes', error: error.message });
  }
};












// Update a node
exports.updateNode = async (req, res) => {
  const { id } = req.params;
  const { label, type, position, folder } = req.body;

  try {
    const updatedNode = await Node.findByIdAndUpdate(id, {
      label,
      type,
      position,
      folder,
    }, { new: true });

    res.status(200).json(updatedNode);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a node
exports.deleteNode = async (req, res) => {
  const { id } = req.params; // ID ko request parameters se lo
  console.log('Deleting node with ID:', id); // Log the ID

  try {
    const deletedNode = await Node.findByIdAndDelete(id); // Node ko delete karo

    if (!deletedNode) {
      return res.status(404).json({ message: 'Node not found' }); // Agar node nahi mila toh error message bhejo
    }

    res.status(200).json({ message: 'Node deleted successfully' }); // Success message bhejo
  } catch (error) {
    console.error('Error deleting node:', error);
    res.status(500).json({ message: 'Server error' }); // Server error message bhejo
  }
};

