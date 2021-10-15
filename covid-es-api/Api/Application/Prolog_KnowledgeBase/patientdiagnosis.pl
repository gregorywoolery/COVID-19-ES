

covert(temp).

convert(Temp):-write('Enter the temperature'),nl,read(Temp),
   Newtemp is Temp+32,
    write(Newtemp).

/*
This is to check if the reading shows that the blood pressure is high
0 = yes
1 = no
*/
blood_presure_check(Systolic,Diastolic):-Systolic=<140,Diastolic=<90->Answer is 0.
