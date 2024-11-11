import './style.css';
import { Player, Computer } from './player.js';
import { DOM } from './dom.js';

const player1 = new Player('Player');
const player2 = new Computer('Computer');
const player1Board = player1.getGameboard();
const player2Board = player2.getGameboard();

//Initialize Player 1 Board. TODO: Allow player to place ships

player1Board.place(player1Board.getCarrier(), [0, 0], 'south');
player1Board.place(player1Board.getBattleship(), [1, 0], 'south');
player1Board.place(player1Board.getDestroyer(), [2, 0], 'south');
player1Board.place(player1Board.getSubmarine(), [3, 0], 'south');
player1Board.place(player1Board.getPatrol(), [4, 0], 'south');

const dom = new DOM(player1, player2);
