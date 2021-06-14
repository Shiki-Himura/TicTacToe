var field = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

var player_one = true;

function buttonClick(e, x, y)
{
    console.log(e);
    console.log(x,y);    

    //replace with 1d array function
    e.target.textContent = "X";
    e.target.disabled = true;
    field[x][y] = 1;
    player_one = false;

    bestMove(field);
    render(field);
    validate(field);
    winnerAlert(field);
}

function render(tmp_field)
{
    var newArr = [];

    for(var i = 0; i < tmp_field.length; i++)
    {
        newArr = newArr.concat(tmp_field[i]);
    }

    var b = document.getElementsByClassName("gamebtn");
    for(var i = 0; i < newArr.length; i++)
    {
        if(newArr[i] != 0 && newArr[i] == 2)
        {
            b[i].textContent = "O";
        }
    }

    console.log(tmp_field);
    console.log(b);
}


function validate(tmp_field)
{
    for(var i = 0; i < 3; i++)
    {
        if(tmp_field[i][0] != 0 && equals3(tmp_field[i][0], tmp_field[i][1], tmp_field[i][2])
        || tmp_field[0][i] != 0 && equals3(tmp_field[0][i], tmp_field[1][i], tmp_field[2][i]))
        {
            return 1;
        }
    }

    if(tmp_field[0][0] != 0 && equals3(tmp_field[0][0], tmp_field[1][1], tmp_field[2][2])
    || tmp_field[0][2] != 0 && equals3(tmp_field[0][2], tmp_field[1][1], tmp_field[2][0]))
    {
        return 1;
    }
    
    var empty_field = false;

    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(tmp_field[i][j] == 0)
            {
                empty_field = true;
            }
        }
    }

    if(empty_field == false)
    {
        return 0;
    }
    else
    {
        return 2;
    }
}

function equals3(one, two, three)
{
    return one == two && one == three;
}

function bestMove(tmp_field)
{
    var bestScore = +Infinity;
    var move = {  };

    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(tmp_field[i][j] == 0)
            {
                tmp_field[i][j] = 2;

                var score = miniMax(tmp_field, true);
                if(score < bestScore)
                {
                    bestScore = score;
                    move = { i,j }
                }
                tmp_field[i][j] = 0;
            }
        }
    }

    tmp_field[move.i][move.j] = 2;    

    var b = document.getElementsByClassName("gamebtn");
    console.log(tmp_field);
    console.log(b);
}

function miniMax(tmp_field, player)
{
    var bestScore;
    var game_over = validate(tmp_field);
    
    if(game_over != 2)
    {
        if(player == true && game_over != 0)
            return -10
        else if(game_over != 0)
            return 10
        else
            return 0
    }

    if(player == true)
    {
        bestScore = -Infinity;
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if(tmp_field[i][j] == 0)
                {
                    tmp_field[i][j] = 1;
                    var score = miniMax(tmp_field, false);

                    if(score > bestScore)
                    {
                        bestScore = score;
                    }
                    tmp_field[i][j] = 0;
                }
            }
        }
        return bestScore;
    }
    else
    {
        bestScore = +Infinity;
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if(tmp_field[i][j] == 0)
                {
                    tmp_field[i][j] = 2;
                    var score = miniMax(tmp_field, true);
                    
                    if(score < bestScore)
                    {
                        bestScore = score;
                    }
                    tmp_field[i][j] = 0;
                }
            }
        }

        return bestScore;
    }
}

function resetApp()
{
    window.location.reload();
}

function winnerAlert(field)
{
    if(validate(field) == 1)
    {
        alert("You´ve Won!");
    }
}

