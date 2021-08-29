function Nodes({ $app, initialState }){
  this.state = initialState;
  this.isRoot = true;

  this.$target = document.createElement("ul");
  this.$target.className = "Nodes";

  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if(this.state.nodes) {
      const template = `${this.state.nodes.map(node=> `<div class="node" data-nodeId="${node.id}">${node.name}</div>`).join('')}`
      this.$target.innerHTML = this.isRoot ? `<div class="node">back</div>${template}`: template;

      
    }
  }

  this.render();
}

export default Nodes;