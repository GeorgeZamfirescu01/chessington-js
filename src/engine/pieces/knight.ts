import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position = board.findPiece(this);
        const availableMoves: Square[] = [];

        function isIn(row: number, col: number) {
            return row >= 0 && col >= 0 && row < 8 && col < 8;
        }

        const options = [[1, 1], [-1, -1], [-1, 1], [1, -1]];
        options.forEach(option => {
            const [rowSign, colSign] = option;

            let newRow = position.row + 2 * rowSign;
            let newCol = position.col + 1 * colSign;
            if (isIn(newRow, newCol)) {
                availableMoves.push(new Square(newRow, newCol));
            }
            newRow = position.row + 1 * rowSign;
            newCol = position.col + 2 * colSign;
            if (isIn(newRow, newCol)) {
                availableMoves.push(new Square(newRow, newCol));
            }
        });

        return availableMoves;
    }
}
