

% covert(temp).

% convert(Temp):-
%    Newtemp is Temp+32,
%    write(Newtemp).

celsius_to_Fahrenheit(C_Temp):-
    F_Temp is (C_Temp * 9//5) + 32.

/*
This is to check if the reading shows that the blood pressure is high
0 = yes
1 = no
*/
blood_presure_check(Systolic,Diastolic):-Systolic=<140,Diastolic=<90->Answer is 0.
