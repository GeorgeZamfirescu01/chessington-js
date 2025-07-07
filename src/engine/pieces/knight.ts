import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position = board.findPiece(this);
        const availableMoves: Square[] = [];

        const options = [[1, 1], [-1, -1], [-1, 1], [1, -1]];
        options.forEach(option => {
            const [rowSign, colSign] = option;

            let newRow = position.row + 2 * rowSign;
            let newCol = position.col + 1 * colSign;
            if (board.isIn(newRow, newCol)) {
                if (board.canBeTaken(this.player, newRow, newCol)) {
                    if (!(board.getPiece(new Square(newRow, newCol)) instanceof King)) {
                        availableMoves.push(new Square(newRow, newCol));
                    } else {
                        this.checks = true;
                    }
                }
            }
            newRow = position.row + 1 * rowSign;
            newCol = position.col + 2 * colSign;
            if (board.isIn(newRow, newCol)) {
                if (board.canBeTaken(this.player, newRow, newCol) && !(board.getPiece(new Square(newRow, newCol)) instanceof King)) {
                    if (!(board.getPiece(new Square(newRow, newCol)) instanceof King)) {
                        availableMoves.push(new Square(newRow, newCol));
                    } else {
                        this.checks = true;
                    }
                }
            }
        });

        return availableMoves;
    }

    public clone() {
        const copy = new Knight(this.player);
        copy.previousPosition = this.previousPosition;

        return copy;
    }
}
