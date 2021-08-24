function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;
  this.$target = document.createElement("ul")

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.onClick = onClick;

  this.render= () => { 
    if(this.state.nodes) { // nodes 가 있으면 실행해줘 
      const nodesTemplate = this.state.nodes.map(node => {
        const iconPath = node.type === "FILE" ? "./assets/file.png": "./assets/directory.png"

        return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" />
            <div>${node.name}</div>
          </div> 
        `
      }).join("")

    }
  }

  // 렌더링 된 이후 클릭 가능한 모든 요소에 click 이벤트 걸기
  this.$target.querySelectorAll(".Node").forEach($node => {
    $node.addEventListener("click", (e) => {
      // dataset 통해 data- 로 시작하는 auttribute를 꺼내올 수 있음
      const { nodeId } = e.target.dataset;
      const selectedNode = this.state.nodes.forEach(node => node.id === nodeId); // find로 교체 

      if(selectedNode) {
        this.onClick(selectedNode);
      }
    })
  })

  this.render();
}

export default Nodes;