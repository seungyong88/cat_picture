function Breadcrumb({ $app, initialState }) {
  this.state = initialState; // 상태 초기화

  // dom 추가
  this.$target = document.createElement('nav');
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  // 상태를 바꿀때 쓰는 함수
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    this.$target.innerHTML = `<div class="nav-item">root</div>${
      this.state.map(
        (node, index) => `<div class="nav-item" data-index=${index}>${node.name}</div>`
      ).join('')
    }`
  }
}

export default Breadcrumb;