import { ReactFlowProvider } from "@xyflow/react";
import Graph from "../Graph";

const Layout = () => {
  return (
    <div className="w-screen h-screen fixed">
      <ReactFlowProvider>
        <Graph />
      </ReactFlowProvider>
    </div>
  );
};

export default Layout;
