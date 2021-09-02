const IMAGE_URL = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`;

function ImageViewer({ $app, initialState, onClose }) {
  this.state = initialState; // filePath
  this.onClose = onClose;
  this.$target = document.createElement('div');
  this.$target.className = "ImageViewer Modal";
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    this.$target.style.display = 'none';

    if(this.state) {
      this.$target.innerHTML = `<div><img src=${IMAGE_URL}${this.state} /></div>`;
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


export default ImageViewer;