// Nodes 컴포넌트 - function 문법 버전
// 생성된 DOM 을 어디에 append 할지를 $app 파라미터로 받기
// 파라메터 구조 분해 할당 방식으로 처리

function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;

  // Nodes 컴포넌트를 렌더링 할 Dom을 this.$target 이라는 이름으로 생성
  this.$target = document.createElement("ul");
  $app.appendChild(this.$target);

  //state를 받아서 현재 컴포넌트의 state를 변경하고 다시 렌더링 하는 함수
  this.setState = nextState => {
    this.state = nextState;
    // render 함수 내에서 this.state 기준으로 렌더링을 하기 때문에,
    // 단순히 이렇게만 해주어도 상태가 변경되면 화면이 알아서 바뀜
    
    this.render();
  }

  this.onClick = onClick;

  // 파라메터가 없는 Nodes의 render 함수.
  // 현재 상태(this.state) 기준으로 렌더링 한다.
  this.render = () => {
    if(this.state.nodes) {
      const nodesTemplate = this.state.nodes
      
      this.$target.innerHTML = this.state.nodes.map(node => 
        `<li>${node.name}</li>`
      ).join("");
    }
  }

  this.render();

 }

 export default Nodes;