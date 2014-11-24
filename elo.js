$(function(){
    var expected = function(A, B) {
	return 1 / (1 + Math.pow(10, ((B - A) / 400)));
    };

    var elo_delta = function(old, exp, score, k) {
	return k * (score - exp);
    };

    $('#main-form').submit(function(evt){
	evt.preventDefault();
	var elo1 = parseInt($('#elo-1').val());
	var elo2 = parseInt($('#elo-2').val());
	var kfactor = parseInt($('#kfactor').val());
	var outcome = $('#outcome').val();

	var player_1_exp = expected(elo1, elo2);
	var player_2_exp = 1 - player_1_exp;

	if (outcome == "1") {
	    outcome = 1;
	} else if (outcome == "X") {
	    outcome = .5;
	} else if (outcome == "2") {
	    outcome = 0;
	} else {
	    alert("The world exploded!");
	    return;
	}

	var delta1 = Math.round(elo_delta(elo1, player_1_exp, outcome, kfactor));
	var delta2 = Math.round(elo_delta(elo2, player_2_exp, 1 - outcome, kfactor));

	var output = "Calculating ELO ratings:\n" +
	             "------------------------\n\n";

        output += "Elo1: " + elo1 + "\n";
        output += "Elo2: " + elo2 + "\n";
        output += "Outcome: " + outcome + "\n";
        output += "K-Factor: " + kfactor + "\n\n";

	if (elo1 > elo2) {
	    output += "Player #1 had a " + Math.round(player_1_exp * 100) +
		" chance of winning\n\n";
	}
	else if (elo2 > elo1) {
	    output += "Player #2 had a " + Math.round(player_2_exp * 100) +
		" chance of winning\n\n";
	}
	else {
	    output += "Both players had equal odds of winning\n\n";
	}

	output += "Player #1: " + (delta1 >= 0 ? "+" : "") + delta1;
	output += " (new rating: " + (elo1 + delta1) + ")\n";
	output += "Player #2: " + (delta2 >= 0 ? "+" : "") + delta2;
	output += " (new rating: " + (elo2 + delta2) + ")\n";

	// alert(output);

	$('#results').text(output);

    });
});

// def expected(A, B):
//     "\"\"
//     Calculate expected score of A in a match against B
//     :param A: Elo rating for player A
//     :param B: Elo rating for player B
//     \"\"\"
//     return 1 / (1 + 10 ** ((B - A) / 400))


// def elo(old, exp, score, k=32):
//     \"\"\"
//     Calculate the new Elo rating for a player
//     :param old: The previous Elo rating
//     :param exp: The expected score for this match
//     :param score: The actual score for this match
//     :param k: The k-factor for Elo (default: 32)
//     \"\"\"
//     return old + k * (score - exp)
