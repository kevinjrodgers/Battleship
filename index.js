function createShip(shipLength) {
    return {
        shipLength: shipLength,
        shipSegments: Array(shipLength), 
        hasSunk: false,
        hit(/*position*/) {
            // Takes an x-coord and y-coord and marks that position on the ship as 'hit'
            //this.shipSegments[position-1] = 'hit';
            this.shipLength--;
        },
        isSunk() {
            // Calculates if sunk based on ship length and whether all their positions are 'hit'
            /*for(let shipStatusLoop = 0; shipStatusLoop < this.shipSegments.length; shipStatusLoop++) {
                if(this.shipSegments[shipStatusLoop] != 'hit') {
                    this.hasSunk = false;
                    return this.hasSunk;
                }
            }
            this.hasSunk = true;
            return this.hasSunk;*/
            if(shipLength < 1) {
                return true;
            }
        }
    }
}

function Coordinate(x, y) {
    this.x = x;
    this.y = y;
    this.hitStatus = 'not hit';
    this.whatShip;
}

function createGameboard() {
    function coordinatesArraySetup() {
        let letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let coordinateArray = new Array(100);
        let elem = 0;
        for(let letterLoop = 0; letterLoop < letterArray.length; letterLoop++) {
            for(let numLoop = 0; numLoop < numArray.length; numLoop++) {
                let newCoordinate = new Coordinate(letterArray[letterLoop], numArray[numLoop]);
                coordinateArray[elem] = newCoordinate;
                elem++;
            }
        }
        return coordinateArray;
    }

    return {
        shipsLeft: 1,
        coordinateArray: coordinatesArraySetup(),
        findCoordinateInArray(coordX, coordY) {
            for(let coordinateLoop = 0; coordinateLoop < this.coordinateArray.length; coordinateLoop++) {
                if(this.coordinateArray[coordinateLoop].x == coordX && this.coordinateArray[coordinateLoop].y == coordY) {
                    return coordinateLoop;
                }
            }
        },
        placeShip(coordX, coordY, currShipLength) {
            // Place a ship here
            let newShip = createShip(currShipLength);
            let coordinateArrayElem = this.findCoordinateInArray(coordX, coordY);
            this.coordinateArray[coordinateArrayElem].whatShip = newShip;
        },
        receiveAttack(coordX, coordY) {
            let coordinateElem = this.findCoordinateInArray(coordX, coordY);
            this.coordinateArray[coordinateElem].hitStatus = 'hit';
            if(this.coordinateArray[coordinateElem].whatShip != null) {
                // If there is a ship that exists in the element, do the hit() function
                this.coordinateArray[coordinateElem].whatShip.hit();
                let sunkValue = this.coordinateArray[coordinateElem].whatShip.isSunk();
                if(sunkValue == true) {
                    this.shipsLeft--;
                    this.checkForGameOver();
                }
            }
        },
        checkForGameOver() {
            if(this.shipsLeft < 1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
}

function createPlayer() {
    return {
        
    }
}

module.exports = {
    createShip, 
    createGameboard
};