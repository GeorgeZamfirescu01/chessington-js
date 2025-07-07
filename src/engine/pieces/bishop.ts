import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position = board.findPiece(this);
        const availableMoves = [];
        const BOARD_SIDE = 8;

        function isIn(idx: number): boolean {
            return idx >= 0 && idx < 8;
        }

        for (let i = 0; i < BOARD_SIDE; i++) {
            if (i != position.row) {
                const dif = i - position.row;
                if (isIn(position.col + dif)) {
                    availableMoves.push(new Square(i, position.col + dif));
                }
                if (isIn(position.col - dif)) {
                    availableMoves.push(new Square(i, position.col - dif));
                }
            }
        }

        return availableMoves;
    }
}
