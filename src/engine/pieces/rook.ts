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
        const availableMoves = [];

        for (let i = 0; i < 8; i++) {
            if (i != position.row) {
                availableMoves.push(new Square(i, position.col));
            }
            if (i != position.col) {
                availableMoves.push(new Square(position.row, i));
            }
        }

        return availableMoves
    }
}
