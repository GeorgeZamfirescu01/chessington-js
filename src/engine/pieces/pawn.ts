import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position = board.findPiece(this);
        const direction = this.player === Player.WHITE ? 1 : -1;
        const availableMoves = [];


        availableMoves.push(new Square(position.row + direction, position.col));
        if (this.player === Player.WHITE && position.row === 1 || this.player === Player.BLACK && position.row === 7) {
            availableMoves.push(new Square(position.row + 2 * direction, position.col));
        }

        return availableMoves;
    }
}
