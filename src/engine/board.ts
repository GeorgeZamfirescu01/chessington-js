import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import King from "./pieces/king";

export default class Board {
    public currentPlayer: Player;
    public moveCounter: number = 0;
    public enPassant?: Square = undefined;
    public BOARD_SIDE = 8;
    private readonly board: (Piece | undefined)[][];

    constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public isIn(row: number, col: number) {
        return row >= 0 && col >= 0 && row < 8 && col < 8;
    }

    public canBeTaken(byPlayer: Player, row: number, col: number) {
        const square = new Square(row, col);
        return this.isIn(row, col) && this.getPiece(square)?.player !== byPlayer;
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);

            movingPiece.previousPosition = fromSquare;
            movingPiece.timeLastMoved = this.moveCounter;
            this.moveCounter++;

            if (this.enPassant !== undefined && toSquare.equals(this.enPassant)) {
                this.setPiece(new Square(fromSquare.row, toSquare.col), undefined);
            }

            this.enPassant = undefined;
        }
    }

    public findKings() {
        const kings: {[key: string]: Square} = {};

        for (const [rowIdx, row] of this.board.entries()) {
            for (const [colIdx, piece] of row.entries()) {
                if (!!piece && piece instanceof King) {
                    kings[piece.player.toString()] = new Square(rowIdx, colIdx);
                }
            }
        }

        return kings;
    }

    public isInCheck(player: Player) {
        const mainKingSquare = this.findKings()[player.toString()];
        for (const piece of this.board.flat(1)) {
            if (!!piece && piece.player !== player) {
                if (piece.getAvailableMoves(this).filter(square => square.equals(mainKingSquare)).length > 0) {
                    return true;
                }
            }
        }

        return false;
    }

    public isInCheckmate(player: Player) {
        if (!this.isInCheck(player)) {
            return false;
        }

        let escaped = false;
        for (const piece of this.board.flat(1)) {
            if (!!piece && piece.player === player) {
                for (const toSquare of piece.getAvailableMoves(this)) {
                    const copiedBoard: Board = JSON.parse(JSON.stringify(this));
                    const copyPiece = copiedBoard.getPiece(this.findPiece(piece));
                    copyPiece?.moveTo(copiedBoard, toSquare);
                    if (!copiedBoard.isInCheck(player)) {
                        escaped = true;
                        break;
                    }
                }
            }
            if (escaped) {
                break;
            }
        }

        return escaped;
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
}
