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

        const squareForward = new Square(position.row + direction, position.col);
        const squareTwoForward = new Square(position.row + 2 * direction, position.col);

        function isIn(row: Number, col: Number) {
            return row >= 0 && col >= 0 && row < 8 && col < 8;
        }

        const canBeTaken = (row: number, col: number) => {
            const square = new Square(row, col);
            return isIn(row, col) && board.getPiece(square)?.player !== this.player &&
                board.getPiece(square)?.constructor.name != 'King';
        }

        if (isIn(squareForward.row, squareForward.col) && board.getPiece(squareForward) === undefined) {
            availableMoves.push(new Square(position.row + direction, position.col));
            if (isIn(squareTwoForward.row, squareTwoForward.col) && board.getPiece(squareTwoForward) === undefined) {
                if (this.player === Player.WHITE && position.row === 1 || this.player === Player.BLACK && position.row === 6) {
                    availableMoves.push(squareTwoForward);
                }
            }
        }

        let newSquare = new Square(position.row + direction, position.col + 1);
        if (canBeTaken(position.row + direction, position.col + 1) && board.getPiece(newSquare) !== undefined) {
            availableMoves.push(newSquare);
        }
        newSquare = new Square(position.row + direction, position.col - 1);
        if (canBeTaken(position.row + direction, position.col - 1) && board.getPiece(newSquare) !== undefined) {
            availableMoves.push(newSquare);
        }

        // checking for en passant
        newSquare = new Square(position.row, position.col + 1);
        let otherPiece = board.getPiece(newSquare);
        if (canBeTaken(position.row, position.col + 1) && otherPiece?.constructor.name === 'Pawn' &&
                otherPiece.player !== this.player && otherPiece.timeLastMoved === board.moveCounter - 1 &&
                otherPiece.previousPosition !== undefined && Math.abs(otherPiece.previousPosition.row - newSquare.row) === 2) {
            availableMoves.push(new Square(position.row + direction, position.col + 1));
            board.enPassant = new Square(position.row + direction, position.col + 1);
        }
        newSquare = new Square(position.row, position.col - 1);
        otherPiece = board.getPiece(newSquare);
        if (canBeTaken(position.row, position.col - 1) && otherPiece?.constructor.name === 'Pawn' &&
                otherPiece.player !== this.player && otherPiece.timeLastMoved === board.moveCounter - 1 &&
                otherPiece.previousPosition !== undefined && Math.abs(otherPiece.previousPosition.row - newSquare.row) === 2) {
            availableMoves.push(new Square(position.row + direction, position.col - 1));
            board.enPassant = new Square(position.row + direction, position.col - 1);
        }

        return availableMoves;
    }
}
