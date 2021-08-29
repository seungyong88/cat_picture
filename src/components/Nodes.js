function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.onBackClick = onBackClick;
  this.$target = document.createElement("ul");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if(this.state.nodes) {
      const template = `${this.state.nodes.map((node, index) => {
        console.log(node);
        const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png';

        return `<li class="Node">
          <img src="${iconPath}" data-node-id="${node.id}" />
          ${node.name}, ${node.id}
        </li>`
      }).join('')}`

      const prevIconPath = './assets/prev.png';
      this.$target.innerHTML = `${this.state.isRoot?`<div class="Node"><img src="${prevIconPath}" />Back</div>${template}`:template}`;
    }

    // 렌더링 된 이후 클릭 가능한 모든 요소에 click 이벤트 걸기
    this.$target.querySelectorAll('.Node').forEach($node => {
      $node.addEventListener('click', (e) => {
        const { nodeId } = e.target.dataset;

        if(!nodeId) {
          this.onBackClick();
        }

        const selectedNode = this.state.nodes.find(node => node.id == nodeId);

        if(selectedNode) {
          this.onClick(selectedNode);
        }
      })
    })


  }

  this.render();
}

export default Nodes;