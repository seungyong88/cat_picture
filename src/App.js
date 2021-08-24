import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";

// App.js
function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  }

  // Breadcrumb 조율
  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
  })

  // Node 조율
  const nodes = new Nodes({ 
    $app, 
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick:(node) => {
      if(node.type === "DIRECTORY"){
        //디렉토리
      } else {
        // 파일인 경우  
      }
    }
  })
}

export default App;