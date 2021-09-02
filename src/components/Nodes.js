function Nodes({ $app, initialState, onClick, onClickBack }) {
  this.state = initialState;
  this.onClick = onClick;
  this.onClickBack = onClickBack;
  this.$target = document.createElement('div');
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    //render 
    let NodesTemplate = '';
    if(this.state.nodes.length > 0) {
      NodesTemplate = `${this.state.nodes.map(node => {
        let imgPath = node.type === "DIRECTORY" ? "./assets/directory.png" : "./assets/file.png"; 

        return `
        <div class="Node" data-node-id="${node.id}">
          <img src="${imgPath}" />
          <div>${node.name}</div>
        </div>`;
        
      }).join('')}`;
    }

    this.$target.innerHTML = `
      ${!this.state.isRoot? 
        `<div class="Node">
          <img src="./assets/prev.png" />
          <div>prev</div>
        </div>`
        :
        ''}${NodesTemplate}`;
  }

  this.$target.addEventListener('click' , (e) => {
    const $nodeItem = e.target.closest('.Node');

    if($nodeItem) {
      const { nodeId } = $nodeItem.dataset;

      if(!nodeId) {
        this.onClickBack();
        return;
      }
      
      const selectedNode = this.state.nodes.find(node => node.id === nodeId); // 찾아서 던져 줌
      this.onClick(selectedNode);
    }
  })

  this.render();
}


export default Nodes;
