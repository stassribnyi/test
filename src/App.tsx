import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  ReactFlowProps,
  type Node as NodeType,
  useReactFlow,
  ReactFlowProvider,
  ConnectionMode,
  ConnectionLineType,
  Panel,
  ReactFlowInstance,
  EdgeTypes,
  Edge,
  ControlButton,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import downloadIcon from "../public/download icon.jpg";

import { DEFAULT_SIZE, initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes, DEFAULT_EDGE } from "./edges";

import ContextMenu from "./ContextMenu";
import SideBar from "./SideBar";
import { DnDProvider, useDnD } from "./DnDContext";
import { AppNode } from "./nodes/types";
import DownloadButton from "./DownloadButton";
import { toPng } from "html-to-image";

function export2txt(data: object) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], {
      type: "text/plain",
    })
  );
  a.setAttribute("download", "diagram.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

let fileHandle;
async function fileOpen() {
  [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  return file.text();
}

const flowKey = "example-flow";
let id = 0;
const getId = () => `dndnode_${id++}`;

function ExportToPNGButton({
  exportTarget,
}: {
  exportTarget?: HTMLDivElement | null;
}) {
  return (
    <ControlButton
      onClick={() => {
        if (!exportTarget) {
          return;
        }

        toPng(exportTarget, {
          filter: (node) =>
            !(
              node?.classList?.contains("react-flow__minimap") ||
              node?.classList?.contains("react-flow__controls")
            ),
        }).then((dataUrl) => {
          const a = document.createElement("a");
          a.setAttribute("download", "reactflow.png");
          a.setAttribute("href", dataUrl);
          a.click();
        });
      }}
    >
      <img src={downloadIcon} alt="Export" width="16px" height="16px" />
    </ControlButton>
  );
}

function DnDFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [type] = useDnD();
  const { screenToFlowPosition, setViewport } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const [menu, setMenu] = useState<{
    id: number;
    top?: number | boolean;
    left?: number | boolean;
    right?: number | boolean;
    bottom?: number | boolean;
  } | null>(null);

  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((edges) => addEdge({ ...connection, ...DEFAULT_EDGE }, edges)),
    [setEdges]
  );

  const onNodeContextMenu: ReactFlowProps["onNodeContextMenu"] = useCallback(
    (event: React.MouseEvent, node: NodeType) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current?.getBoundingClientRect();
      if (!pane) {
        return;
      }

      console.log(event.clientX, event.clientY);

      setMenu({
        id: node.id as any,
        top: event.clientY < pane.height - 200 ? event.clientY : false,
        left: event.clientX < pane.width - 200 ? event.clientX : false,
        right:
          event.clientX >= pane.width - 200
            ? pane.width - event.clientX
            : false,
        bottom:
          event.clientY >= pane.height - 200
            ? pane.height - event.clientY
            : false,
      });
    },
    [setMenu]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => {
    setMenu(null);
    setNodes((old) =>
      old.map((item) => {
        return {
          ...item,
          data: { ...item.data, edit: false },
          style: {
            ...item.style,
            width: item.measured?.width || item.style?.width,
            height: item.measured?.height || item.style?.height,
          },
        };
      })
    );
  }, [setMenu, setNodes]);
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const variant = event.dataTransfer.getData("text/plain");

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${variant} node`, variant },
        style: {
          ...DEFAULT_SIZE,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<
    AppNode,
    Edge
  > | null>(null);
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));

      export2txt(flow);
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    fileOpen().then((result) => {
      const flow = JSON.parse(result);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    });
    // const restoreFlow = async () => {
    //   const flow = JSON.parse(localStorage.getItem(flowKey) as any);

    //   if (flow) {
    //     const { x = 0, y = 0, zoom = 1 } = flow.viewport;
    //     setNodes(flow.nodes || []);
    //     setEdges(flow.edges || []);
    //     setViewport({ x, y, zoom });
    //   }
    // };

    // restoreFlow();
  }, [setNodes, setViewport]);

  const onNodeDoubleClick: ReactFlowProps["onNodeDoubleClick"] = (_, node) => {
    setNodes((nds) =>
      nds.map((item) => {
        if (node.data.edit) {
          return item;
        }

        return {
          ...item,
          data: { ...item.data, edit: item.id === node.id },
        };
      })
    );
  };

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onInit={setRfInstance}
          onNodeDoubleClick={onNodeDoubleClick}
          onConnect={onConnect}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeOrigin={[0.5, 0.5]}
          connectionMode={ConnectionMode.Loose}
          snapToGrid
          snapGrid={[10, 10]}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <Background gap={10} />
          <MiniMap />
          <Controls>
            <ExportToPNGButton exportTarget={ref.current} />
          </Controls>
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
          <DownloadButton />

          <Panel position="top-left">
            <button onClick={onSave}>save</button>
            <button onClick={onRestore}>restore</button>
          </Panel>
        </ReactFlow>
      </div>
      <SideBar />
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
