import { Button, Grid } from "@chakra-ui/core";
import Box from "@chakra-ui/core/dist/Box";

import { createState, useState } from '@hookstate/core'

const length = 3;
const initial = Array.from({ length }, () => Array.from({ length }, () => null));

// console.log('proto :>> ', initial);
const global = createState(initial);
// console.log('board :>> ', global);

export default () => {

  const board = useState(global);

  const getText = (x, y) => {
    let val = board[x][y].get();
    if (val === null || val === undefined)
      return '---'
    if (val === 1)
      return 'X'
    if (val == 0)
      return 'O'
  }

  const getRandomMove = () => {
    let j = 0;
    let remaining = (board.get() as any).reduce((b, n) => {
      for (let i = 0; i < n.length; i++) {
        // console.log('n', n)
        if (!n[i])
          b.push([i, j])
      }
      j++;
      return b;
    }, [])

    // console.log('remaining', remaining)

    let picked = remaining[Math.floor(Math.random() * remaining.length)];
    return picked;
  };

  return (
    <Box>
      <h1>Tictactoe 3-in-row!</h1>
      <button
        // onClick={() => { board.set(x => x.map(y => null)) }}
      >
        Reset</button>
      <Grid templateColumns="repeat(3, 1fr)" width="20%" gap={2}>
        {
          global.map((a, x) =>
            <div key={x}>{a.map((b, y) =>
              <Box
                onClick={() => {
                  // board[x][y].set(v => v === 1 ? 0 : 1);
                  board[x][y].set(v => 1);
                  let tile = getRandomMove();
                  // console.log('getRandomMove()', tile)
                  // board[tile[0], tile[1]].set(t => 0);
                  let _x = tile[0];
                  let _y = tile[1];
                  board[_x][_y].set(t => 0);
                }
                }
                key={y} w="100%" h="10" bg="transparent" fontSize={40} border=".35rem solid #1b1">{getText(x, y)}
              </Box>)}
            </div>
          )
        }
      </Grid>
    </Box>
  );
};


{/* <Box w="100%" h="10" bg="transparent" fontSize={40} border=".35rem solid #1b1">1</Box> */ }