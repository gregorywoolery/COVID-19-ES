%Identify which covid variant is present
identify_covid_variant(Symptom,Variant):-
    symptoms_type_variant(_,Variant,Symptom).

%Check if patient has covid
has_covid(Symptom):-
    symptoms_type_variant(_,_,Symptom).

%Identify the type of symptom, whether mild or severe
identify_covid_type(Symptom,Type):-
    symptoms_type_variant(Type,_,Symptom).

identify_covid_type_variant(Type, Variant, Symptom):-
    symptoms_type_variant(Type, Variant, Symptom).

%Rule: Convert a Celsius reading to Fahrenheit
cal_celsius_to_fahrenheit(C_Temp,TempReading):-
    TempReading is(C_Temp * 9/5) + 32.

%Rule: Checks the blood pressure, if result is high(0), low(1)
cal_low_blood_pressure_check(Systolic, Diastolic, Reading):-
    Systolic < 90, Diastolic < 60 -> Reading is 1;
    Reading is 0.

%Rule: Displays short term actions.
all_short_term_actions(Actions):-
    short_term_actions(Actions).

%Rule: Displays long term actions.
all_long_term_actions(Actions):-
    long_term_actions(Actions).

%Rule: Alert system if there is a spike in cases, above 120 cases
alert_spike(Amt_Cases):-
    Amt_Cases >= 120,actions(ShortTermActions, LongTermActions);
    nl,write('No Alert').

%Rule: Displays both short and long term actions
actions(ShortTermActions, LongTermActions):-
    all_short_term_actions(ShortTermActions),
    all_long_term_actions(LongTermActions).

%Rule: Searches through a list and returns element if found.
member(X,[X|_]).
member(X,[_|T]):-
    member(X,T).