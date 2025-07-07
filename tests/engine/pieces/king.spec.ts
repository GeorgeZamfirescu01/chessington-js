import 'chai/register-should';
import King from '../../../src/engine/pieces/king';
import Pawn from '../../../src/engine/pieces/pawn';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Queen from "../../../src/engine/pieces/queen";

describe('King', () => {

    let board: Board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.deep.include.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('can get checked', () => {
        const king = new King(Player.WHITE);
        const queen = new Queen(Player.BLACK);
        board.setPiece(new Square(7, 0), king);
        board.setPiece(new Square(5, 1), queen);

        board.isInCheck(Player.WHITE).should.be.equal(false);

        king.moveTo(board, new Square(7, 1));
        board.isInCheck(Player.WHITE).should.be.equal(true);
    })

    it('can get checkmated', () => {
        const king = new King(Player.WHITE);
        const queen = new Queen(Player.BLACK);
        const pawn = new Pawn(Player.WHITE);

        board.setPiece(new Square(7, 0), king);
        board.setPiece(new Square(6, 0), queen);
        board.isInCheckmate(Player.WHITE).should.be.equal(false);

        board.setPiece(new Square(5, 1), pawn);
        board.isInCheckmate(Player.WHITE).should.be.equal(true);
    })

    // it('can do castling on kingside', () => {
    //     const king = new King(Player.WHITE);
    //     const rook = new Rook(Player.WHITE);
    //     board.setPiece(new Square(0, 4), king);
    //     board.setPiece(new Square(0, 7), rook);
    //
    //     king.moveTo(board, new Square(0, 5));
    //
    //     board.findPiece(rook).should.deep.equal(new Square(0, 5));
    //     board.findPiece(king).should.deep.equal(new Square(0, 6));
    // });
    //
    // it('can not do castling on kingside with piece in-between', () => {
    //     const king = new King(Player.WHITE);
    //     const rook = new Rook(Player.WHITE);
    //     const knight = new Knight(Player.WHITE);
    //     board.setPiece(new Square(0, 4), king);
    //     board.setPiece(new Square(0, 6), knight);
    //     board.setPiece(new Square(0, 7), rook);
    //
    //     king.moveTo(board, new Square(0, 5));
    //
    //     board.findPiece(rook).should.deep.equal(new Square(0, 7));
    //     board.findPiece(king).should.deep.equal(new Square(0, 4));
    // });
    //
    // it('can not do castling on kingside in check', () => {
    //     const king = new King(Player.WHITE);
    //     const rook = new Rook(Player.WHITE);
    //     const knight = new Knight(Player.WHITE);
    //     board.setPiece(new Square(0, 4), king);
    //     board.setPiece(new Square(0, 6), knight);
    //     board.setPiece(new Square(0, 7), rook);
    //
    //     king.moveTo(board, new Square(0, 5));
    //
    //     board.findPiece(rook).should.deep.equal(new Square(0, 7));
    //     board.findPiece(king).should.deep.equal(new Square(0, 4));
    // });
});
