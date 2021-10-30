%Identify which covid variant is present
identify_covid_variant(Symptom,Variant):-
    symptoms_type_variant(_,Variant,Symptom).

%Check if patient has covid
has_covid(Symptom):-
    symptoms_type_variant(_,_,Symptom).

%Identify the type of symptom, whether mild or severe
identify_covid_type(Symptom,Type):-
    symptoms_type_variant(Type,_,Symptom).

%Rule: Convert a Celsius reading to Fahrenheit
cal_celsius_to_fahrenheit(C_Temp,TempReading):-
    TempReading is(C_Temp * 9/5) + 32.

%Rule: Checks the blood pressure, if result is high(0), low(1)
cal_low_blood_pressure_check(Systolic, Diastolic,Reading):-
    Systolic < 90, Diastolic < 60 -> Reading is 1;
    Reading is 0.

%Rule: Displays short term actions.
all_short_term_actions:-
    short_term_actions(X), nl, write(X).

%Rule: Displays long term actions.
all_long_term_actions:-
    long_term_actions(X), nl, write(X).

%Rule: Alert system if there is a spike in cases, above 120 cases
alert_spike(Amt_Cases):-
    Amt_Cases >= 120,actions;
    nl,write('No Alert').

%Rule: Displays both short and long term actions
actions:-
    write('The short term actions are as follows:'),
    nl,all_short_term_actions;
    nl,write('The long term actions are as follows:'),
    nl,all_long_term_actions.

%Rule: Searches through a list and returns element if found.
member(X,[X|_]).
member(X,[_|T]):-
    member(X,T).