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
      console.log("@@@@@@@@@", this.state);
      const template = `${this.state.nodes.map(node => {
        const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png';

        return `<li class="Node" data-node-id="${node.id}">
          <img src="${iconPath}" />
          ${node.name}, ${node.id}
        </li>`
      }).join('')}`

      const prevIconPath = './assets/prev.png';
      this.$target.innerHTML = `${!this.state.isRoot?`<div class="Node"><img src="${prevIconPath}" />Back</div>${template}`:template}`;
    }
  }

  this.$target.addEventListener('click', (e) => {
    // $target 하위에 있는 html 요소 클릭시 이벤트가 상위로 계속 전파 되면서
    // $target 까지 오게 됨. 이 특성을 이용한 기법

    //closet를 이용하면 현재 클릭한 요소와 제일 인접한 요소를 가져올 수 있음.
    const $node = e.target.closest('.Node');

    if($node) {
      const { nodeId } = $node.dataset

      if(!nodeId) {
        this.onBackClick();
        return;
      }

      const selectedNode = this.state.nodes.find(node => node.id === nodeId) 

      if(selectedNode) {
        this.onClick(selectedNode);
      }
    }

  })


  this.render();
}

export default Nodes;