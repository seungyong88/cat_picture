function Breadcrumb({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('nav');
  this.$target.className = "Breadcrumb";

  $app.appendChild(this.$target)
  
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    let template = '';
    if(this.state.depth) {
      template = this.state.depth.map(depth => `<div class="nav-menu">${depth.name}</div>`).join('');
    }

    this.$target.innerHTML = `
    <div class="nav-menu">
      root
    </div>${template}
    `;
  }

}


export default Breadcrumb;