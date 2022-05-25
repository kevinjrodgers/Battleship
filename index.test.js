const indexTest = require('./index.js');

test('ship length', () => {
    let cruiserShip = indexTest.createShip(5);
    expect(cruiserShip.shipSegments.length).toBe(5);
});

test('ship hit', () => {
    let cruiserShip = indexTest.createShip(5);
    cruiserShip.hit(3);
    expect(cruiserShip.shipSegments[2]).toBe('hit');
});

test('ship sunk', () => {
    let cruiserShip = indexTest.createShip(3);
    cruiserShip.hit(1);
    cruiserShip.hit(2);
    cruiserShip.hit(3);
    expect(cruiserShip.isSunk()).toBe(true);
});

test('ship not sunk', () => {
    let cruiserShip = indexTest.createShip(3);
    cruiserShip.hit(1);
    cruiserShip.hit(3);
    expect(cruiserShip.isSunk()).toBe(false);
});

/*test('gameboard has ship on coordinate', () => {
    let gameboard = indexTest.createGameboard();
    gameboard.placeShip('A', '2');
    expect(gameboard.coordinateArray[1].whichShip).toBe('cruiser');
});
*/

test('coordinate array - A - x', () => {
    let gameboard = new indexTest.createGameboard();
    expect(gameboard.coordinateArray[0].x).toBe('A');
});

test('coordinate array - A - y', () => {
    let gameboard = new indexTest.createGameboard();
    expect(gameboard.coordinateArray[0].y).toBe(1);
});

test('coordinate array - J - x', () => {
    let gameboard = new indexTest.createGameboard();
    expect(gameboard.coordinateArray[99].x).toBe('J');
});

test('coordinate array - J - y', () => {
    let gameboard = new indexTest.createGameboard();
    expect(gameboard.coordinateArray[99].y).toBe(10);
});

test('coord array test - x', () => {
    let gameboard = new indexTest.createGameboard();
    expect(gameboard.coordinateArray[10].x).toBe('B');
});

test('coord array test - y', () => {
    let gameboard = new indexTest.createGameboard();
    expect(gameboard.coordinateArray[10].y).toBe(1);
});

test('place ship on board, random spot', () => {
    let gameboard = new indexTest.createGameboard();
    gameboard.placeShip('A', 2, 2);
    let arrayElement = gameboard.findCoordinateInArray('J', 10);
    expect(arrayElement).toBe(99);
});

test('place ship on board', () => {
    let gameboard = new indexTest.createGameboard();
    gameboard.placeShip('A', 1, 5);
    expect(gameboard.coordinateArray[0].whatShip.shipLength).toBe(5)
});

test('place ship on board - B row', () => {
    let gameboard = new indexTest.createGameboard();
    let coordXCheck = 'B';
    let coordYCheck = 10;
    let shipLengthCheck = 1;
    gameboard.placeShip(coordXCheck, coordYCheck, shipLengthCheck);
    let elem = gameboard.findCoordinateInArray(coordXCheck, coordYCheck);
    expect(gameboard.coordinateArray[elem].whatShip.shipLength).toBe(1);
});

test('attack on coordinate - ship', () => {
    let gameboard = new indexTest.createGameboard();
    gameboard.placeShip('A', 1, 5);
    gameboard.receiveAttack('A', 1);
    let arrayElement = gameboard.findCoordinateInArray('A', 1);
    expect(gameboard.coordinateArray[arrayElement].whatShip.shipLength).toBe(4);
});

test('attack on coordinate - no ship', () => {
    let gameboard = new indexTest.createGameboard();
    gameboard.receiveAttack('A', 1);
    let arrayElement = gameboard.findCoordinateInArray('A', 1);
    expect(gameboard.coordinateArray[arrayElement].hitStatus).toBe('hit');
});

test('player has no more ships', () => {
    let gameboard = new indexTest.createGameboard();
    gameboard.placeShip('A', 1, 1);
    gameboard.receiveAttack('A', 1);
    expect(gameboard.checkForGameOver()).toBe(true);
});
