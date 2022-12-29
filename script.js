function replay() {
    window.location.reload();
}

function generateTable() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    for (let i = 0; i < 9; ++i) {
        const row = document.createElement("tr");
        for (let j = 0; j < 9; ++j) {
            const cell = document.createElement("td");
            cell.id = '' + i + '' + j + '';
            const cellText = document.createTextNode(' ');
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
        row.setAttribute("border", "2");
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    tbl.id = 'gameTable';
    document.getElementById('button').disabled = true;
    pressCell();
}

function checkBorders(row, col, firstRow, firstCol, lastRow, lastCol) {
    if (row - 1 >= 0) {
        firstRow.value = row - 1;
    }
    if (col - 1 >= 0) {
        firstCol.value = col - 1;
    }
    if (row + 1 <= 8) {
        lastRow.value = row + 1;
    }
    if (col + 1 <= 8) {
        lastCol.value = col + 1;
    }
}

function numMinesNeighbours(matrix, row, col, numNeighbours, step) {
    const firstRow = {value: row}, firstCol = {value: col}, lastRow = {value: row}, lastCol = {value: col};
    checkBorders(row, col, firstRow, firstCol, lastRow, lastCol);
    for (let i = firstRow.value; i <= lastRow.value; ++i) {
        for (let j = firstCol.value; j <= lastCol.value; ++j) {
            if (matrix[i][j] == 10 && step == 1) {
                ++numNeighbours.value;
            } else if (matrix[i][j] == 0 && i != row && j != col && step == 2) {
                cellsResult(i, j);
            } else if (matrix[i][j] > 0 && matrix[i][j] < 10 && step == 2) {
                document.getElementById('' + i + '' + j + '').innerHTML = matrix[i][j];
                document.getElementById('' + i + '' + j + '').style.background = 'green';
            }
        }
    }
}

function pressCell() {
    let minesCounter = 10;
    let matrix = [[],[],[],[],[],[],[],[],[],[],[]];
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            let randomNum = Math.floor(Math.random() * 5);
            if (randomNum == 4 && minesCounter > 0) {
                matrix[i][j] = 10;
                --minesCounter;
            } else {
                matrix[i][j] = 0;
            }
        } 
    }
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (matrix[i][j] == 0) {
                const numNeighbours = {value: matrix[i][j]}, step = 1;
                numMinesNeighbours(matrix, i, j, numNeighbours, step);
                matrix[i][j] = numNeighbours.value;
            }
        }
    }
    findCell(matrix);
}

function cellsResult(row, column) {
    document.getElementById('' + row + '' + column + '').innerHTML = ' ';
    document.getElementById('' + row + '' + column + '').style.background = 'green';
}

/*function neighboursValues(matrix, k, l) {
    const firstRow = {value: k}, firstCol = {value: l}, lastRow = {value: k}, lastCol = {value: l};
    checkBorders(k, l, firstRow, firstCol, lastRow, lastCol);
    for (let i = firstRow.value; i <= lastRow.value; ++i) {
        for (let j = firstCol.value; j <= lastCol.value; ++j) {
            if (matrix[i][j] == 0 && i != k && j != l) {
                cellsResult(i, j);
            } else if (matrix[i][j] > 0 && matrix[i][j] < 10) {
                document.getElementById('' + i + '' + j + '').innerHTML = matrix[i][j];
                document.getElementById('' + i + '' + j + '').style.background = 'green';
            }
        }
    }
}*/

function visitNeighbours(matrix, row, column) {
    let lastRow = 8, lastCol = 8, value1 = 1, value2 = 1;
    for (let step = 1; step <= 4; ++step) {
        let isTrue = true;
        for (let i = row; isTrue == true; i += value1) {
            let isSafe = true, isNull = 0;
            for (let j = column; isSafe == true; j += value2) {
                if (matrix[i][j] == 0) { 
                    ++isNull;   
                    cellsResult(i, j);
                    numMinesNeighbours(matrix, i, j, matrix[i][j], 2);
                    //neighboursValues(matrix, i, j);
                    if (j == lastCol) {
                        isSafe = false;
                    }
                } else {
                    isSafe = false;
                }
            }
            if (i == lastRow) {
                isTrue = false;
            }
            if (isNull == 0) {
                isTrue = false;
            } 
        }
        let isTrue2 = true;
        for (let j = column; isTrue2 == true; j += value2) {
            let isSafe = true, isNull = 0;
            for (let i = row; isSafe == true; i += value1) {
                if (matrix[i][j] == 0) { 
                    ++isNull;   
                    cellsResult(i, j);
                    numMinesNeighbours(matrix, i, j, matrix[i][j], 2);
                    //neighboursValues(matrix, i, j);
                    if (i == lastRow) {
                        isSafe = false;
                    }
                } else {
                    isSafe = false;
                }
            }
            if (j == lastCol) {
                isTrue2 = false;
            }
            if (isNull == 0) {
                isTrue2 = false;
            }                
        }
        if (step % 2 == 0) {
            value1 = -1;
            lastRow = 0;
            value2 = 1;
            lastCol = 8;
        } else {
            value2 = -1;
            lastCol = 0;
        }
    }
}

function findCell(matrix) {
    let numFlags = 10;
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            const id = '' + i + '' + j + '';
            let value = matrix[i][j];
            document.getElementById(id).onclick = function() {
                if (value == 0) {
                    document.getElementById(id).innerHTML = ' ';
                    document.getElementById(id).onclick = null;
                    document.getElementById(id).style.background = 'green';
                    if (i >= 0 && i <= 8 && j >= 0 && j <= 8) {
                        visitNeighbours(matrix, i, j);         
                    }
                } else if (value == 10) {
                    document.getElementById(id).innerHTML = '💣';
                    document.getElementById('output').innerHTML = 'Game over';
                    for (let i = 0; i < 9; ++i) {
                        for (let j = 0; j < 9; ++j) {
                            if (matrix[i][j] == 10) {
                                if (document.getElementById('' + i + '' + j + '').innerHTML == '🚩') {
                                    document.getElementById('' + i + '' + j + '').innerHTML = '🚩';
                                    document.getElementById('' + i + '' + j + '').style.background = 'yellow';
                                } else {
                                    document.getElementById('' + i + '' + j + '').innerHTML = '💣';
                                    document.getElementById('' + i + '' + j + '').style.background = 'red';
                                }
                            } else if (document.getElementById('' + i + '' + j + '').innerHTML == '🚩') {
                                document.getElementById('' + i + '' + j + '').innerHTML = '🚩';
                                document.getElementById('' + i + '' + j + '').style.background = 'pink';
                            }
                        }
                    }
                    for (let i = 0; i < 9; ++i) {
                        for (let j = 0; j < 9; ++j) {
                            document.getElementById('' + i + '' + j + '').onclick = null;
                        }
                    }
                    document.getElementById('replay').innerHTML = '<button id="refresh" class="btn btn-secondary" type="button" onclick="replay()">Play again!</button>'
                } else {
                    document.getElementById(id).innerHTML = value;
                    document.getElementById(id).onclick = null;
                    document.getElementById(id).style.background = 'green';
                }
                document.getElementById(id).onmousedown = null;
            }
            document.getElementById(id).onmousedown = function() {
                let rightclick;
                let e = window.event;
                if (e.which) rightclick = (e.which == 3);
                else if (e.button) rightclick = (e.button == 2);
                if (rightclick == true && numFlags > 0) {
                    --numFlags;
                    console.log(numFlags);
                    document.getElementById(id).innerHTML = '🚩';
                    document.getElementById(id).style.background = 'yellow';
                    document.getElementById(id).onclick = null;
                }
            }
        }
    }
}