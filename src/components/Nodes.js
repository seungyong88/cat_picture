function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;

  // Component 를 렌더링 할 Dom 을 this.$target 이라는 이름으로 생성
  this.$target = document.createElement("div");
  this.$target.className = "Nodes";

  $app.appendChild(this.$target);

  // state를 받아서 현재 컴포넌트의 state 를 변경하고 다시 렌더링 하는 함수
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  // 파라메터가없는 Nodes의 render 함수
  this.render = () => {
    if(this.state.nodes) {
      const nodesTemplate = this.state.nodes.map(node => {
        const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png';
        
        return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" data-node-id="${node.id}" />
            <div>${node.name}</div>
          </div>
        `
      }).join('');

      this.$target.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="/assets/prev.png"><div>${nodesTemplate}` : nodesTemplate;
    
    
      this.$target.querySelectorAll('.Node').forEach($node => {
        $node.addEventListener('click', (e) => {
          const { nodeId }  = e.target.dataset;
          const selectedNode = this.state.nodes.find(node => node.id === nodeId);
    
          if(selectedNode) {
            this.onClick(selectedNode);
          }
        })
      })
    
    }
  }

  


  this.render();
}

export default Nodes;