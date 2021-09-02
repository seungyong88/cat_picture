function Loading({ $app, initialState }) {
  this.state = initialState; // Loading state
  this.$target = document.createElement('div');
  this.$target.className = "Loading Modal";
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    this.$target.style.display = 'none';

    if(this.state) {
      const loadingImagePath = `./assets/nyan-cat.gif`;
      this.$target.innerHTML = `<div><img src=${loadingImagePath} /></div>`;
      this.$target.style.display = 'block';
    }
  }

  this.$target.addEventListener('click', e => {
    const $clickTarget = e.target.closest('.Modal img');

    if($clickTarget === null) {
      this.onClose();
    }
  })
  
  this.render();
}


export default Loading;