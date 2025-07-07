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
            const newRow = position.row + dr;
            const newCol = position.col + dc;
            if (board.isIn(newRow, newCol)) {
                if (board.canBeTaken(this.player, newRow, newCol) && !(board.getPiece(new Square(newRow, newCol)) instanceof King)) {
                    availableMoves.push(new Square(newRow, newCol));
                }
            }
        });

        return availableMoves;
    }
}
