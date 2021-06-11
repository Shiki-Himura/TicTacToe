var field = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

var player_one = true;



function validate(tmp_field){
    for(var i = 0; i < 3; i++)
    {
        if(tmp_field[i][0] != 0 && equals3(tmp_field[i][0], tmp_field[i][1], tmp_field[i][2])
        || tmp_field[0][i] != 0 && equals3(tmp_field[0][i], tmp_field[1][i], tmp_field[2][i]))
        {
            return 1;
        }

        if(tmp_field[0][0] != 0 && equals3(tmp_field[0][0], tmp_field[1][1], tmp_field[2][2])
        || tmp_field[0][2] != 0 && equals3(tmp_field[0][2], tmp_field[1][1], tmp_field[2][0]))
        {
            return 1;
        }
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

    if(empty_field)
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

function bestMove(tmp_field, player)
{
    var bestScore;
    var move = {  };

    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(tmp_field[i][j] == 0)
            {
                tmp_field[i][j] = 2;
                var score = miniMax(tmp_field, player);
                if(score > bestScore)
                {
                    bestScore = score;
                    move = { i,j }
                }
                tmp_field[i][j] = 0;
            }
        }
    }

    tmp_field[move.i][move.j] = 2;
}

function miniMax(tmp_field, player)
{
    var bestScore;
    var game_over = validate(tmp_field);
    
    if(player && game_over != 0)
    {
        if(game_over == 1)
        {
            return 10;
        }
        else
        {
            return 0;
        }
    }
    else if(game_over != 0)
    {
        if(game_over == 1)
        {
            return -10;
        }
        else
        {
            return 0;
        }
    }

    if(player)
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