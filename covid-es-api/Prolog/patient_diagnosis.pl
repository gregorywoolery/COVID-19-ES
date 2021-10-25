
celsius_to_Fahrenheit(C_Temp, Result):-
    Result is C_Temp + 32.

/*
This is to check if the reading shows that the blood pressure is high
0 = yes
1 = no
*/
blood_presure_check(Systolic, Diastolic, Result):-
    Systolic =< 140,
    Diastolic =< 90 ->
    Result is 0. %Low blood pressure

%Else result 1-> High blood pressure


alert_spike(Ans):-(Ans==y)->CovidNum is NewCovidNum+1,
    actions(Ans);write('Okay').

actions(Ans):-write('The short term actions are as follows: '),
    write('The long term actions are as follows:').