import { request } from "./api/index.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";

// App.js
function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: []
  }

  // nav 생성
  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth
  })

  // 사진첩 생성 생성
  const nodes = new Nodes({
    $app, 
    initialState: [],
    onClick: async (node) => {
      try {
        if(node.type === "DIRECTORY"){
          // DIRECTORY 처리
          const nextNodes = await request(node.id);
          console.log("nextNodes", nextNodes);
          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: nextNodes
          })
        }else if(node.type === "FILE"){
          // FILE 처리


        }
      }catch(e) {
        console.log("e :", e.message);
      }
    }
  })

  breadcrumb.setState(this.state);
  nodes.setState(this.state);

  const init = async () => {
   try {
     const rootNodes = await request();
     breadcrumb.setState({
       ...this.state,
       isRoot: true,
       nodes: rootNodes,
     })
   }catch(e) {
     // 에러 처리하기
   }
  }

  init();

}

export default App;