function Breadcrumb({ $app, initialState, onClick, onClickRoot }) {
  this.state = initialState
  this.onClick = onClick
  this.onClickRoot = onClickRoot

  this.$target = document.createElement('nav');
  this.$target.className = "breadcrumb";
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if(this.state) {
      this.$target.innerHTML = `<div class="nav-menu">root</div>${this.state.map((node, index) => {
        return `<div class="nav-menu" data-index="${index}">${node}</div>`
      }).join("")}`
      this.$target.querySelectorAll('.nav-menu').forEach($node => {
        //onClick
        $node.addEventListener('click', (e) => {
          const { index } = e.target.dataset 

          if(!index) {
            this.onClickRoot();
          }else{
            this.onClick();
          }
        
        })
      })

    }
  }

  this.render();
}

export default Breadcrumb;