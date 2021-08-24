// import { request } from "./api/api.js";
// import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";

// App.js
function App($app) {
  
  const nodeItem = [
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

  const nodes = new Nodes({
    $app, 
    initialState: {
      node: nodeItem
    }
  })

  // 이후 nodes를 갱신할 일이 있다면 nodes.setState를 호출
  const nextState = {
    node: nodeItem
  }

  nodes.setState(nextState);
}

export default App;