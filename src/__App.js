import Nodes from "./components/Nodes.js";
import Breadcrumb from "./components/Breadcrumb.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
import { request } from './api/index.js'

const cache = {}

function App($app) {
  this.state = {
    isRoot: true, // 초기화시 root true
    depth: [], // breadcrumb 에 사용할 depth
    nodes: [], // 디렉토리 안 표시할 nodes
    selectedFilePath: null
  }

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: {
      depth: this.state.depth
    },
    onClick: index => {
      if(index === null) {
        this.setState({
          ...this.state,
          isRoot: true,
          depth: [],
          nodes: cache.rootNodes
        })
        return;
      }

      // 같으면 아무런거 안함
      if(index === this.state.depth.length -1) {
        console.log('같은 위치');
        return;
      }

      const nextState = {...this.state}
      const nextDepth = this.state.depth.slice(0, index+1);

      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length -1].id]
      })
    }
  })

  const nodes = new Nodes({
    $app, 
    initialState: this.state.nodes,
    onClick: async (selectedNode) => {
      try {
        if(selectedNode.type === "DIRECTORY") {
          if(cache[selectedNode.id]) {
            this.setState({
              ...this.state, 
              isRoot: false,
              depth: [...this.state.depth, selectedNode],
              nodes: cache[selectedNode.id]
            })
            // 캐시에 아이디가 존재 한다면 기존과 같음
          }else {
            const nextNodes = await loadingRequest(selectedNode.id);

            this.setState({
              ...this.state,
              isRoot: false,
              depth: [...this.state.depth, selectedNode], // push
              nodes: nextNodes,
            })
            // cache update
            cache[selectedNode.id] = nextNodes;
          }
        }else if(selectedNode.type === "FILE"){
          this.setState({
            ...this.state,
            selectedFilePath: selectedNode.filePath
          })
        }
      } catch(e) {
        throw new Error(e);
      }
    },
    onBackClick: async () => {
      try {
        // 이전 state를 복사하여 처리
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length-1].id;

        // root로 온 경우이므로 root처리
        if(prevNodeId === null) {
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: cache.rootNodes
          })
        }else{
          // const prevNodes = await loadingRequest(prevNodeId);
          this.setState({
            ...this.state,
            isRoot: false,
            nodes: cache[prevNodeId]
          })
        }
      
      } catch(e) {
        throw new Error(e);
      }
    }
  })

  const imageView = new ImageView({
    $app,
    initialState: null,
    onClick: () => {
      this.setState({
        ...this.state,
        selectedFilePath: false
      })
    }
  })

  const loading = new Loading({ 
    $app,
    initialState: true,
  })

  this.setState = nextState => {
    this.state = nextState;

    nodes.setState({ 
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });

    breadcrumb.setState({
      depth: this.state.depth
    });

    imageView.setState(this.state.selectedFilePath);
  }

  const init = async () => {
    try {
      const rootNodes = await loadingRequest();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      })

      cache.rootNodes = rootNodes;
    } catch(e) {
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