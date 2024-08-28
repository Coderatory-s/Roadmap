import React from 'react';
import { useDnD } from './DnDContext';
import { Button } from "@/components/ui/button"

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    
        <aside className="flex flex-col  space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="description text-lg font-semibold text-gray-700 mb-2">
        You can drag these nodes to the pane on the right.
      </div>
      <Button 
        className="dndnode input bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-200 ease-in-out p-4"
        onDragStart={(event) => onDragStart(event, 'input')} 
        draggable
      >
        Input Node
      </Button>
      <Button 
        className="dndnode bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-200 ease-in-out"
        onDragStart={(event) => onDragStart(event, 'default')} 
        draggable
      >
        Default Node
      </Button>
      <Button 
        className="dndnode output bg-green-500 text-white hover:bg-green-600 transition duration-200 ease-in-out"
        onDragStart={(event) => onDragStart(event, 'output')} 
        draggable
      >
        Output Node
      </Button>
      
    </aside>
  
    
  );
};
