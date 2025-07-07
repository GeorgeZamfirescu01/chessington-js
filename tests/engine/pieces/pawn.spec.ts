import 'chai/register-should';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import {should} from "chai";

describe('Pawn', () => {
    let board: Board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {
        
        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.WHITE);
            const friendlyPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingKing = new King(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('has its movement timestamps tracked', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            const pawnB = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawnB);


            let moves = pawn.getAvailableMoves(board);
            pawn.moveTo(board, moves[0]);
            moves = pawnB.getAvailableMoves(board);
            pawnB.moveTo(board, moves[0]);
            moves = pawn.getAvailableMoves(board);
            pawn.moveTo(board, moves[0]);

            pawn.timeLastMoved.should.be.equal(2);
        })

        it('can en passant', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            const pawnB = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 1), pawnB);
            const pawnB2 = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 2), pawnB2);


            pawn.moveTo(board, new Square(3, 0));
            pawnB2.moveTo(board, new Square(5, 2));
            pawn.moveTo(board, new Square(4, 0));
            pawnB.moveTo(board, new Square(4, 1));

            const moves = pawn.getAvailableMoves(board);
            moves.should.deep.include(new Square(5, 1));

            console.log(board.enPassant);
            pawn.moveTo(board, new Square(5, 1));
            console.log(board.enPassant);

            should().equal(board.getPiece(new Square(4, 1)), undefined);
        })

    });

    describe('black pawns', () => {

        let board: Board;
        beforeEach(() => board = new Board(Player.BLACK));    
        
        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(3, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.BLACK);
            const friendlyPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingKing = new King(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('can en passant', () => {
            const pawnW = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawnW);
            const pawnB = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 1), pawnB);
            const pawnW2 = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 2), pawnW2);


            pawnW.moveTo(board, new Square(2, 0));
            pawnB.moveTo(board, new Square(4, 1));
            pawnW.moveTo(board, new Square(3, 0));
            pawnB.moveTo(board, new Square(3, 1));
            pawnW2.moveTo(board, new Square(3, 2));

            const moves = pawnB.getAvailableMoves(board);
            moves.should.deep.include(new Square(2, 2));

            pawnB.moveTo(board, new Square(2, 2));

            should().equal(board.getPiece(new Square(3, 2)), undefined);
        })
    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });

});
