const API_URL = 'http://localhost:5000/api/nodes'; // Backend API URL


// Create a new node
export const createNode = async (nodeData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nodeData),  // Ensure this is formatted correctly
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error creating node:', error);
    throw error; // Rethrow error to be handled in handleSave
  }
};



// update
export const updateNode = async (nodeData) => {
    try {
        const response = await fetch(`/api/nodes/${nodeData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nodeData),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        return await response.json(); // Parse the response to JSON
    } catch (error) {
        console.error('Error updating node:', error);
        throw error;
    }
};

  
// Delete a node
// Delete a node
// export const deleteNode = async (id) => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }
//   } catch (error) {
//     console.error('Error deleting node:', error);
//     throw error;
//   }
// };

  
