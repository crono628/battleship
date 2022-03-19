let edges = [
  9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90,
];

const gameboardFactory = () => {
  const board = [];
  let publicBoard;
  const fleet = [];
  (function createBoard() {
    if (board.length < 100) {
      for (let i = 0; i < 100; i++) {
        board.push({ hasShip: false, shotTaken: false, id: i });
      }
    }
    publicBoard = board.slice();
  })();

  const receiveAttack = (loc) => {
    if (board[loc].shotTaken) {
      return;
    } else {
      board[loc].shotTaken = true;
    }
  };

  let legalEdges = true;
  let horizontal = true;

  const toggleHorizontal = () => (horizontal = !horizontal);

  const checkEdge = (ship, loc) => {
    let counter = 0;
    if (horizontal) {
      let section = board.slice(loc, loc + ship.length);
      for (let i = 0; i < ship.length; i++) {
        if (edges.includes(section[i].id)) {
          counter++;
        }
      }
    }
    if (!horizontal) {
      let sectionArr = [];
      for (let i = 0; i < ship.length; i++) {
        sectionArr.push(loc + i * 10);
      }
      for (let i = 0; i < sectionArr.length; i++) {
        if (sectionArr[i] > 99) {
          counter++;
        }
      }
    }

    if (counter > 1) {
      return (legalEdges = false);
    } else {
      return (legalEdges = true);
    }
  };

  const placeShip = (ship, loc) => {
    checkEdge(ship, loc);
    if (legalEdges && horizontal && loc + ship.length <= 99) {
      let section = board.slice(loc, loc + ship.length);
      let checkOpenSpaces = section.every((spot) => spot.hasShip === false);
      if (checkOpenSpaces) {
        section.forEach((spot) => (board[spot.id].hasShip = true));
      } else return;
    }
    if (legalEdges && !horizontal) {
      let section = [];
      let sectionArr = [];
      for (let i = 0; i < ship.length; i++) {
        sectionArr.push(loc + i * 10);
      }
      if (sectionArr.some((num) => num > 99)) {
        return;
      } else {
        sectionArr.forEach((num) => section.push(board[num]));
      }
      let checkOpenSpaces = section.every((spot) => spot.hasShip === false);
      if (checkOpenSpaces) {
        section.forEach((spot) => (board[spot.id].hasShip = true));
      }
    }
  };

  return { publicBoard, receiveAttack, checkEdge, placeShip, toggleHorizontal };
};

export default gameboardFactory;