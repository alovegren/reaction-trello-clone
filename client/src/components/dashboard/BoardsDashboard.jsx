import React, { useEffect } from "react";
import BoardTile from "./BoardTile";
import { useSelector, useDispatch } from "react-redux";
import CreateBoardTile from "./CreateBoardTile";
import { fetchBoards } from "../../features/boards/boards";

const BoardsDashboard = (props) => {
  const boards = useSelector((state) => state.boards);

  const boardTiles = boards.map((board) => {
    return <BoardTile key={board._id} title={board.title} id={board._id} />;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <main className="dashboard">
      <section className="board-group">
        <header>
          <div className="board-section-logo">
            <span className="person-logo"></span>
          </div>
          <h2>Personal Boards</h2>
        </header>

        <ul className="dashboard-board-tiles">
          {boardTiles}
          <CreateBoardTile onClick={props.onNewBoardClick} />
        </ul>
      </section>
    </main>
  );
};

export default BoardsDashboard;
