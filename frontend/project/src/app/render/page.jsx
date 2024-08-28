"use client";
import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const RenderPage = () => {
  const [roadmap, setRoadmap] = useState({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const savedRoadmap = JSON.parse(localStorage.getItem('roadmap'));
    if (savedRoadmap) {
      setRoadmap(savedRoadmap);
    }
  }, []);

  // Handle node click event to set selected node and show sidebar
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setIsSidebarVisible(true);
  };

  // Handle close button click to hide sidebar
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className="flex h-screen ">
      {/* Main ReactFlow area */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-3xl font-bold">Roadmap Full Stack</h1>
       
      </div>
      <div className="reactflow-wrapper w-full h-full">
        <ReactFlow
          nodes={roadmap.nodes}
          edges={roadmap.edges}
          onNodeClick={onNodeClick}
          fitView
        >
          <Controls />
        </ReactFlow>
      </div>

      {/* Sidebar for displaying selected node's details */}
      <div
        className={`node-details transition-transform transform ${isSidebarVisible ? 'translate-x-0' : 'translate-x-full'} md:w-1/4 w-3/4`}
        style={{
          padding: '10px',
          backgroundColor: 'black',
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100%',
          zIndex: 10, 
          transition: 'transform 0.3s ease',
        }}
      >
        <Button onClick={closeSidebar} variant="destructive" className="mb-2">
          Close
        </Button>
        {selectedNode ? (
          <Card>
            <CardHeader>
              <CardTitle>Node Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Label:</strong> {selectedNode.data.label}</p>
              <p><strong>Type:</strong> {selectedNode.type}</p>
              <p><strong>Position:</strong> X: {selectedNode.position.x}, Y: {selectedNode.position.y}</p>
            </CardContent>
          </Card>
        ) : (
          <p>please select node</p>
        )}
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <RenderPage />
  </ReactFlowProvider>
);
