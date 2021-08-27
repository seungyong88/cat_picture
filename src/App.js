import Nodes from "./components/Nodes.js";
import Breadcrumb from "./components/Breadcrumb.js";
import { request } from './api/index.js'

function App($app) {
  this.state = {
    isRoot: true,
    nodes: [],
    breadcrumb: [],
    depth: [],
  }

  const breadcrumb = new Breadcrumb({
    $app, 
    // initialState: this.state.depth
    initialState: this.state.depth
  })

  const nodes = new Nodes({
    $app, 
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    },
    onClick: async (node) => {
      if(node.type === "DIRECTORY") {
        // DIRECTORY인 경우 처리
        // 여기에서 Breadcrumb 관련 처리를 하게 되면 nodes에서는 breadcrumb 처리를 몰라도 됨
        const nextNodes = await request(node.id);
        this.setState({
          ...this.state,
          depth: [...this.state.depth, node],
          nodes: nextNodes,
        })
      }else if(node.type === "FILE") {
        // FILE 의 경우 처리
        console.log("d");
      }
    } 
  });

  this.setState = (nextState) => {
    this.state = nextState
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    })
  }

  this.init = async () => {
    try{
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes
      })
    }catch(e) {
      throw new Error(e.message);
    }
  }

  this.init();
}

export default App;