// puzzle-game.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [tiles, setTiles] = useState([]);
    const [emptyTileIndex, setEmptyTileIndex] = useState(8);

    useEffect(() => {
      const initTiles = Array(9).fill().map((_, index) => ({
        image: `${assetsUrl}/random-photo-${index + 1}.jpg`,
        index
      }));
      shuffle(initTiles);
      setTiles(initTiles);
      setEmptyTileIndex(initTiles.findIndex((tile) => tile.index === 8));
    }, []);

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const swapTiles = (index) => {
      if (Math.abs(index - emptyTileIndex) === 3 || Math.abs(index - emptyTileIndex) === 1) {
        const newTiles = [...tiles];
        [newTiles[index], newTiles[emptyTileIndex]] = [newTiles[emptyTileIndex], newTiles[index]];
        setTiles(newTiles);
        setEmptyTileIndex(index);

        if (newTiles.every((tile, i) => tile.index === i)) {
          setScore(score + 1);
          shuffle(newTiles);
          setTiles(newTiles);
          setEmptyTileIndex(newTiles.findIndex((tile) => tile.index === 8));
        }
      }
    };

    return React.createElement(
      'div',
      { className: "puzzle-game" },
      React.createElement('h2', null, "Puzzle Game"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: "game-board" },
        tiles.map((tile, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `tile ${index === emptyTileIndex ? 'empty' : ''}`,
              onClick: () => swapTiles(index)
            },
            index !== emptyTileIndex && React.createElement('img', { src: tile.image, alt: `Tile ${index}` })
          )
        )
      )
    );
  };

  return () => React.createElement(PuzzleGame, { assetsUrl: assetsUrl });
};

console.log('Puzzle Game script loaded');
