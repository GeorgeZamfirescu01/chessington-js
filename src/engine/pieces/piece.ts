import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;
    public timeLastMoved: number = 0;
    public previousPosition?: Square = undefined;
    public checks: boolean = false;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board): Square[] {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public clone() {
        const copy = new Piece(this.player);
        copy.previousPosition = this.previousPosition;

        return copy;
    }
}
