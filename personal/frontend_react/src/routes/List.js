import axios from "axios";
import { useEffect } from "react";

const List = () => {
  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">author</th>
          </tr>
        </thead>
        <tbody id="boards"></tbody>
      </table>
    </>
  );

  // const getBoards = () => {
  function getBoards() {
    axios.get("http://localhost:8080/boards", {})
      .then((response) => {
        const statusCode = response.status;
        console.log("status code: " + statusCode);
        if (statusCode === 200) {
          const boards = response.data;
          document.querySelector("#boards").innerHTML = "";
          boards.forEach((board) => {
            const temp = `
              <tr>
                <th scope="row">${board.id}</th>
                <td>${board.title}</td>
                <td>${board.author}</td>
              </tr>
            `;
            document.querySelector("#boards").insertAdjacentHTML("beforeend", temp);
          });
        }
      })
      .catch((e) => {
        console.log("axios 통신실패");
        console.log(e);
      });
  }
};

export default List;
