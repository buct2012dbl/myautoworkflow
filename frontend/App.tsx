import React, { useEffect, useState } from "react";
import ReactFlow, { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

const fetchWorkflow = async () => {
  const res = await fetch("/workflow.json");
  return res.json();
};

function mapNodes(nodes: any[]): Node[] {
  return nodes.map((n, idx) => ({
    id: n.id,
    type: "default",
    data: { label: `${n.type}` },
    position: { x: 100, y: idx * 100 + 50 }
  }));
}

function mapEdges(edges: any[]): Edge[] {
  return edges.map((e) => ({
    id: `${e.from}-${e.to}`,
    source: e.from,
    target: e.to
  }));
}

export default function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    fetchWorkflow().then((wf) => {
      setNodes(mapNodes(wf.nodes));
      setEdges(mapEdges(wf.edges));
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}