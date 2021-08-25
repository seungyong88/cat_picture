// import { request } from "./api/api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";

// App.js
function App($app) {
  this.state = {
    isRoot: false,
    nodes: [
      {
        id: "5",
        name: "2021/04",
        type: 'DIRECTORY',
        filePath: null,
        parent: {
          id: 1,
        }
      },
      {
        id: "19",
        name: "물 마시는 사진",
        type: 'FILE',
        filePath: "/images/a2i.jpg",
        parent: {
          id: 1,
        }
      }
    ],
    depth: [
      {
        id: "5",
        name: "2021/04",
        type: 'DIRECTORY',
        filePath: null,
        parent: {
          id: 1,
        }
      },
      {
        id: "19",
        name: "물 마시는 사진",
        type: 'FILE',
        filePath: "/images/a2i.jpg",
        parent: {
          id: 1,
        }
      }
    ]
  }

  // nav 생성
  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth
  })

  // 사진첩 생성 생성
  const nodes = new Nodes({
    $app, 
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: (node) => {
      if(node.type === "DIRECTORY"){
        // DIRECTORY 처리
        alert('DIRECTORY');
      }else if(node.type === "FILE"){
        // FILE 처리
        alert('FILE');
      }
    }
  })

  breadcrumb.setState(this.state);
  nodes.setState(this.state);
}

export default App;