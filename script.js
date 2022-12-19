function replay() {
    window.location.reload();
}

function generateTable() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    let countOne = 10;
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
                if (i - 1 >= 0 && j - 1 >= 0 && matrix[i - 1][j - 1] == 10) {
                    ++matrix[i][j];
                }
                if (i - 1 >= 0 && matrix[i - 1][j] == 10) {
                    ++matrix[i][j];
                }
                if (i - 1 >= 0 && j + 1 <= 8 && matrix[i - 1][j + 1] == 10) {
                    ++matrix[i][j];
                }
                if (j + 1 <= 8 && matrix[i][j + 1] == 10) {
                    ++matrix[i][j];
                }
                if (i + 1 <= 8 && j + 1 <= 8 && matrix[i + 1][j + 1] == 10) {
                    ++matrix[i][j];
                }
                if (i + 1 < 9 && matrix[i + 1][j] == 10) {
                    ++matrix[i][j];
                }
                if (i + 1 <= 8 && j - 1 >= 0 && matrix[i + 1][j - 1] == 10) {
                    ++matrix[i][j];
                }
                if (j - 1 >= 0 && matrix[i][j - 1] == 10) {
                    ++matrix[i][j];
                }
            }
        }
    }
    findCell(matrix);
}

function cellValue(matrix, row, column) {
    if (matrix[row][column] == 0) {
        document.getElementById('' + row + '' + column + '').innerHTML = ' ';
        document.getElementById('' + row + '' + column + '').style.background = 'green';
    } else if (matrix[row][column] > 0 && matrix[row][column] < 10) {
        document.getElementById('' + row + '' + column + '').innerHTML = matrix[row][column];
        document.getElementById('' + row + '' + column + '').style.background = 'green';
    }
}

function neighboursValues(matrix, k, l) {
    if (k - 1 >= 0) {
        cellValue(matrix, k - 1, l);
    } 
    if (k + 1 <= 8) {
        cellValue(matrix, k + 1, l);
    }
    if (l + 1 <= 8) {
        cellValue(matrix, k, l + 1);
    } 
    if (l - 1 >= 0) {
        cellValue(matrix, k, l - 1);
    }
    if (k + 1 <= 8 && l + 1 <= 8) {
        cellValue(matrix, k + 1, l + 1);
    }
    if (k + 1 <= 8 && l - 1 >= 0) {
        cellValue(matrix, k + 1, l - 1);
    }
    if (k - 1 >= 0 && l + 1 <= 8) {
        cellValue(matrix, k - 1, l + 1);
    }
    if (k - 1 >= 0 && l - 1 >= 0) {
        cellValue(matrix, k - 1, l - 1);   
    }
}

function cellsResult(matrix, row, column) {
    document.getElementById('' + row + '' + column + '').innerHTML = ' ';
    document.getElementById('' + row + '' + column + '').style.background = 'green';
    neighboursValues(matrix, row, column);
}

/*function north(matrix, row, column) {
    let isTrue = true;
    for (let j = column; j >= 0 && isTrue == true; --j) {
        let isSafe = true, isNull = 0;
        for (let i = row; i >= 0 && isSafe == true; --i) {
            if (matrix[i][j] == 0) { 
                ++isNull;   
                cellsResult(matrix, i, j);
            } else {
                isSafe = false;
            }
        }
        if (isNull == 0) {
            isTrue = false;
        }
    }
    let isTrue2 = true;
    for (let j = column; j <= 8 && isTrue2 == true; ++j) {
        let isSafe = true, isNull = 0;
        for (let i = row; i >= 0 && isSafe == true; --i) {
            if (matrix[i][j] == 0) { 
                ++isNull;   
                cellsResult(matrix, i, j);
            } else {
                isSafe = false;
            }
        }
        if (isNull == 0) {
            isTrue2 = false;
        }
    }
}

function south(matrix, row, column) {
    let isTrue = true;
    for (let j = column; j <= 8 && isTrue == true; ++j) {
        let isSafe = true, isNull = 0;
        for (let i = row; i <= 8 && isSafe == true; ++i) {
            if (matrix[i][j] == 0) { 
                ++isNull;   
                cellsResult(matrix, i, j);
            } else {
                isSafe = false;
            }
        }
        if (isNull == 0) {
            isTrue = false;
        }
    }
    let isTrue2 = true;
    for (let j = column; j >= 0 && isTrue2 == true; --j) {
        let isSafe = true, isNull = 0;
        for (let i = row; i <= 8 && isSafe == true; ++i) {
            if (matrix[i][j] == 0) { 
                ++isNull;   
                cellsResult(matrix, i, j);
            } else {
                isSafe = false;
            }
        }
        if (isNull == 0) {
            isTrue2 = false;
        }
    }
}

function east(matrix, row, column) {
    let isTrue = true;
    for (let i = row; i <= 8 && isTrue == true; ++i) {
        let isSafe = true, isNull = 0;
        for (let j = column; j <= 8 && isSafe == true; ++j) {
            if (matrix[i][j] == 0) { 
                ++isNull;   
                cellsResult(matrix, i, j);
            } else {
                isSafe = false;
            }
        }
        if (isNull == 0) {
            isTrue = false;
        }
    }
    let isTrue2 = true;
    for (let i = row; i >= 0 && isTrue2 == true; --i) {
        let isSafe = true, isNull = 0;
        for (let j = column; j <= 8 && isSafe == true; ++j) {
            if (matrix[i][j] == 0) { 
                ++isNull;   
                cellsResult(matrix, i, j);
            } else {
                isSafe = false;
            }
        }
        if (isNull == 0) {
            isTrue2 = false;
        }
    }
}

function west(matrix, row, column) {
    let isTrue = true;
    for (let i = row; i <= 8 && isTrue == true; ++i) {
        let isSafe = true, isNull = 0;
        for (let j = column; j >= 0 && isSafe == true; --j) {
            if (matrix[i][j] == 0) { 
                ++isNull;   
                cellsResult(matrix, i, j);
            } else {
                isSafe = false;
            }
        }
        if (isNull == 0) {
            isTrue = false;
        }
    }
    let isTrue2 = true;
    for (let i = row; i >= 0 && isTrue2 == true; --i) {
        let isSafe = true, isNull = 0;
        for (let j = column; j >= 0 && isSafe == true; --j) {
            if (matrix[i][j] == 0) { 
                ++isNull;   
                cellsResult(matrix, i, j);
            } else {
                isSafe = false;
            }
        }
        if (isNull == 0) {
            isTrue2 = false;
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
                    cellsResult(matrix, i, j);
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
                       /* west(matrix, i, j);
                        east(matrix, i, j);
                        south(matrix, i, j);
                        north(matrix, i, j);*/
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