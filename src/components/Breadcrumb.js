function Breadcrumb({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement('nav');
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);
  
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if(this.state.nodes) {
      const nodesTemplate = this.state.nodes.map(node => {
        const iconPath = node.type === "FILE" ? './assets/file.png' : './assets/directory.png';
        console.log(node.type);
        return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" data-node-id="${node.id}" />
            <div>${node.name}</div>
          </div>
        `;
      }).join('')

      this.$target.innerHTML = nodesTemplate;
    }

    // 렌더링 된 이후 클릭 가능한 모든 요소에 click 이벤트 걸기
    this.$target.querySelectorAll('.Node').forEach($node => {
      $node.addEventListener('click', (e) => {
        console.log(e.target);
        const { nodeId } = e.target.dataset;
        console.log(nodeId);
      })
    })
  }

}

export default Breadcrumb;