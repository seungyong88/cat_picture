import { request } from "./api/index.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";

// App.js
function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectFilePath: null,
    selectedNodeImage: null,
  }

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedNodeImage
  })

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

  this.setState = nextState => {
    this.state = nextState 
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    });

    imageView.setState(this.state.selectFilePath);  
  }


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