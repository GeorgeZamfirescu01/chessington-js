import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position = board.findPiece(this);
        const availableMoves: Square[] = [];

        function isIn(row: number, col: number) {
            return row >= 0 && col >= 0 && row < 8 && col < 8;
        }

        const offsets = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [-1, -1],
            [1, -1],
            [-1, 1],
        ];

        offsets.forEach(offset => {
            const [dr, dc] = offset;
            const newRow = position.row + dr, newCol = position.col + dc;
            if (isIn(newRow, newCol)) {
                availableMoves.push(new Square(newRow, newCol));
            }
        });

        return availableMoves;
    }
}
