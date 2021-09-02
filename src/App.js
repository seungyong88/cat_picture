import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from './components/Nodes.js'
import ImageViewer from './components/ImageViewer.js'
import Loading from './components/Loading.js';
import { request } from "./api/api.js";

const cache = {} 

function App($app) {
  this.state = {
    nodes: [],
    depth: [],
    selectedImage: ''
  }

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: index => {
      if(index == this.state.depth.length) {
        return;
      }
      
      if(index == 0) {
        init();
        return ;
      }

      const nextState = {...this.state};
      const nextDepth = this.state.depth.slice(0, index);
      const nextNodes = cache[nextDepth[nextDepth.length-1].id];

      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes:nextNodes
      })
    }
  })

  const nodes = new Nodes({
    $app,
    initialState: {
      nodes: this.state.nodes
    },
    onClick: async selectedNode => {
      try {
        if(selectedNode.type === "DIRECTORY") {
          let nextNodes = null;

          if(!cache[selectedNode.id]) {
            nextNodes = await loadingRequest(selectedNode.id);
            cache[selectedNode.id] = nextNodes;
          }

          this.setState({
            ...this.state,
            isRoot: false,
            nodes: cache[selectedNode.id],
            depth: [...this.state.depth, selectedNode]
          })

        }else{ // 파일
          imageViewer.setState(selectedNode.filePath);
        }
      }catch(e) {
        throw new Error(e);
      }
    },
    onClickBack: async () => {
      try {
        const depthArr = [...this.state.depth];
        depthArr.pop();
        const prevNode = depthArr[depthArr.length-1];
        
        if(depthArr.length == 0) {
          init();
          return;
        }

        this.setState({
          ...this.state,
          nodes: cache[prevNode.id],
          depth: depthArr,
        })
      } catch(e) {
        throw new Error(e);
      }
    }
  })

  const imageViewer = new ImageViewer({
    $app,
    initialState: this.state.selectedImage,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImage: '',
      })
    }
  })

  const loading = new Loading({
    $app,
    initialState: false,
  })

  this.setState = nextState => {
    this.state = nextState;
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    })

    breadcrumb.setState(this.state.depth);
    imageViewer.setState(this.state.selectedImage);
  }

  const init = async () => {
    try {
      // const jsonData = await fetch("./test.json") // json 파일 읽어오기
      // const data = await jsonData.json();
      let data = '';
      if(!cache.root)  {
        data = await loadingRequest();
        cache.root = data;
      }

      this.setState({
        ...this.state,
        isRoot: true,
        nodes: cache.root,
        depth: [],
      });
    }catch(e) {
      throw new Error(e);
    }
  }

  const loadingRequest = async id => {
    try {
      loading.setState(true);
      return await request(id);
    }catch(e) {
      throw new Error(e);
    } finally {
      loading.setState(false);
    }
  }

  init();
}

export default App;