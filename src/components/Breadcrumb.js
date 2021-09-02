function Breadcrumb({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement('nav');
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    //render 
    let breadcrumbTemplate = '';
    if(this.state.length > 0) {
      breadcrumbTemplate = `${this.state.map((node, index) => `<div class="nav-item" data-index="${index+1}">${node.name}</div>`).join('')}`;
    }

    this.$target.innerHTML = `<div class="nav-item" data-index="0">root</div>${breadcrumbTemplate}`;
  }

  this.$target.addEventListener('click', e => {
    const $navItem = e.target.closest('.nav-item');
    
    if($navItem) {
      const { index } = $navItem.dataset;

      this.onClick(index);
    }
  })

  this.render();
}


export default Breadcrumb;
