import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position = board.findPiece(this);
        const availableMoves: Square[] = [];

        const availableDirections: number[][] = [
            [1, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
        ];

        availableDirections.forEach(direction => {
            const [dr, dc] = direction;

            for (let offset = 1; offset < 7; offset++) {
                const newRow = position.row + dr * offset;
                const newCol = position.col + dc * offset;
                const newSquare = new Square(newRow, newCol);

                if ((!board.isIn(newRow, newCol)) || board.getPiece(newSquare) !== undefined) {
                    if (board.canBeTaken(this.player, newRow, newCol)) {
                        if (!(board.getPiece(new Square(newRow, newCol)) instanceof King)) {
                            availableMoves.push(newSquare);
                        } else {
                            this.checks = true;
                        }
                    }
                    break;
                }

                availableMoves.push(newSquare);
            }
        });

        return availableMoves;
    }

    public clone() {
        const copy = new Bishop(this.player);
        copy.previousPosition = this.previousPosition;

        return copy;
    }
}
