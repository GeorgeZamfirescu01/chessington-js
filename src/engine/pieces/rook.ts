import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position = board.findPiece(this);
        const availableMoves: Square[] = [];

        function isIn(row: Number, col: Number) {
            return row >= 0 && col >= 0 && row < 8 && col < 8;
        }

        const availableDirections: number[][] = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        availableDirections.forEach(direction => {
            const [dr, dc] = direction;

            for (let offset = 1; offset < 7; offset++) {
                    const newRow = position.row + dr * offset;
                    const newCol = position.col + dc * offset;
                    const newSquare = new Square(newRow, newCol);

                    if ((!isIn(newRow, newCol)) || board.getPiece(newSquare) !== undefined) {
                        break;
                    }

                    availableMoves.push(newSquare);
            }
        });

        return availableMoves;
    }
}
