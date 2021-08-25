// api.js

// end point를 상수처리 해두면 나중에 변경 되었을 경우 처리하기 쉬움
const API_ENDPOINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

// const request = (nodeId) => {
//   // nodeId 유무에 따라  root directory를 조회할지 특정 directory 조회 할지 처리

//   fetch(`${API_END_POINT}/${nodeId ? nodeId: ''}`)
//     .then((res) => {
//       if(!res.ok) {
//         throw new Error('서버의 상태가 이상합니다.!');
//       }

//       return res.json();
//     })
//     .catch((e) => {
//       throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
//     })
// }

export const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/${nodeId ? nodeId: ''}`)

    if(!res.ok) {
      throw new Error('서버의 상태가 이상합니다!')
    }

    return await res.json();

  }catch(e) {
    throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
  }
}

// const API_ENDPOINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
// export const request = async (nodeId) => {
//   try{
//     const result = await fetch(`${API_ENDPOINT}/${nodeId ? nodeId : ''}`);
//     if(result.status < 300) return result.json();
//     else if(result.status < 400) throw new Error(`Code ${result.status} : Redirection Error`)
//     else if(result.status < 500) throw new Error(`Code ${result.status} : Client Error`)
//     else if(result.status < 600) throw new Error(`Code ${result.status} : Server Error`)
//   }catch(err) {
//     throw new Error(`${err.message}`)
//   }
// }

// const api = {
//   fetchRoot() {
//     return request();
//   },
//   // 특정 dirtory 내용을 가저오는 API
//   fetchDirectory(nodeId) {
//     return request(nodeId);
//   }
// };