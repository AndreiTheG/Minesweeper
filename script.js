function replay() {
    window.location.reload();
}

function generateTable() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    //let countOne = 10;
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

function numMinesNeighbours(matrix, row, col) {
    let firstRow = row, firstCol = col, lastRow = row, lastCol = col, numSteps = 0;
    if (row - 1 >= 0) {
        firstRow = row - 1;
    }
    if (col - 1 >= 0) {
        firstCol = col - 1;
        ++numSteps;
    }
    if (row + 1 <= 8) {
        lastRow = row + 1;
        ++numSteps;
    }
    if (col + 1 <= 8) {
        lastCol = col + 1;
        ++numSteps;
    }
    for (let i = firstRow; i <= lastRow; ++i) {
        for (let j = firstCol; j <= lastCol; ++j) {
            if (i != row && j != col && matrix[i][j] == 10) {
                ++countNeighbours;
            }
        }
    }
    return countNeighbours;
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
                matrix[i][j] += numMinesNeighbours(matrix, i, j);
            }
        }
    }
    findCell(matrix);
}

function cellsResult(matrix, row, column) {
    document.getElementById('' + row + '' + column + '').innerHTML = ' ';
    document.getElementById('' + row + '' + column + '').style.background = 'green';
}

function neighboursValues(matrix, k, l) {
    let firstRow = k, firstCol = l, lastRow = k, lastCol = l;
    if (k - 1 >= 0) {
        firstRow = k - 1;
    }
    if (l - 1 >= 0) {
        firstCol = l - 1;
    }
    if (k + 1 <= 8) {
        lastRow = k + 1;
    }
    if (l + 1 <= 8) {
        lastCol = l + 1;
    }
    for (let j = firstCol; j <= lastCol; ++j) {
        if (matrix[firstRow][j] == 0) {
            cellsResult(matrix, firstRow, j)
        } else if (matrix[firstRow][j] > 0 && matrix[firstRow][j] < 10) {
            document.getElementById('' + firstRow + '' + j + '').innerHTML = matrix[firstRow][j];
            document.getElementById('' + firstRow + '' + j + '').style.background = 'green';
        }
    }
    for (let i = firstRow + 1; i <= lastRow; ++i) {
        if (matrix[i][lastCol] == 0) {
            cellsResult(matrix, i, lastCol)
        } else if (matrix[i][lastCol] > 0 && matrix[i][lastCol] < 10) {
            document.getElementById('' + i + '' + lastCol + '').innerHTML = matrix[i][lastCol];
            document.getElementById('' + i + '' + lastCol + '').style.background = 'green';
        }
    }
    for (let j = lastCol - 1; j >= firstCol; --j) {
        if (matrix[lastRow][j] == 0) {
            cellsResult(matrix, lastRow, j)
        } else if (matrix[lastRow][j] > 0 && matrix[lastRow][j] < 10) {
            document.getElementById('' + lastRow + '' + j + '').innerHTML = matrix[lastRow][j];
            document.getElementById('' + lastRow + '' + j + '').style.background = 'green';
        }
    }
    for (let i = lastRow - 1; i > firstRow; --i) {
        if (matrix[i][firstCol] == 0) {
            cellsResult(matrix, i, firstCol)
        } else if (matrix[i][firstCol] > 0 && matrix[i][firstCol] < 10) {
            document.getElementById('' + i + '' + firstCol + '').innerHTML = matrix[i][firstCol];
            document.getElementById('' + i + '' + firstCol + '').style.background = 'green';
        }
    }
}

function visitNeighbours(matrix, row, column) {
    let lastRow = 8, lastCol = 8, value1 = 1, value2 = 1;
    for (let step = 1; step <= 4; ++step) {
        let isTrue = true;
        for (let i = row; isTrue == true; i += value1) {
            let isSafe = true, isNull = 0;
            for (let j = column; isSafe == true; j += value2) {
                if (matrix[i][j] == 0) { 
                    ++isNull;   
                    cellsResult(matrix, i, j);
                    neighboursValues(matrix, i, j);
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
                    cellsResult(matrix, i, j);
                    neighboursValues(matrix, i, j);
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