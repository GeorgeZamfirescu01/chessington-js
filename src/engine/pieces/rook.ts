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

        const availableDirections: [boolean, [number, number]][] = [
            [true, [1, 0]],
            [true, [-1, 0]],
            [true, [0, 1]],
            [true, [0, -1]],
        ];

        availableDirections.forEach(info => {
            const [available, dirChange] = info;
            const [dr, dc] = dirChange;


            for (let offset = 1; offset < 7; offset++) {
                if (dr !== 0) {
                    const newRow = position.row + dr * offset;
                    const newSquare = new Square(newRow, position.col);

                    if ((!isIn(newRow, position.col)) || board.getPiece(newSquare) !== undefined) {
                        break;
                    }

                    availableMoves.push(newSquare);
                }

                if (dc !== 0) {
                    const newCol = position.col + dc * offset;
                    const newSquare = new Square(position.row, newCol);

                    if ((!isIn(position.row, newCol)) || board.getPiece(newSquare) !== undefined) {
                        break;
                    }

                    availableMoves.push(newSquare);
                }
            }
        });

        return availableMoves;
    }
}
