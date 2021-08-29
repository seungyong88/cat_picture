function Breadcrumb({ $app, initialState=[], onClick }) {
  this.state = initialState;
  this.onClick = onClick;
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
      template = this.state.depth.map((depth, index) => `<div class="nav-item" data-index=${index}>${depth.name}</div>`).join('');
    }

    this.$target.innerHTML = `
    <div class="nav-item">
      root
    </div>${template}
    `;
  }

  // 이벤트 위임
  this.$target.addEventListener('click', (e) => {
    const $navItem = e.target.closest('.nav-item');

    if($navItem) {
      const { index } = $navItem.dataset
      this.onClick(index ? parseInt(index, 10) : null);
    }
  });

  this.render();
}


export default Breadcrumb;