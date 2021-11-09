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

precaution_exist(ShortTerm, LongTerm, Precaution):-
    short_term_actions(ShortTerm),
    long_term_actions(LongTerm),
    covid_precautions(Precaution).


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



%Statistics section
%The percentage of persons with mild symptoms, the percentage of persons with severe symptoms, the
% percentage of persons with the Delta variant and the percentage of
% persons with the Mu variant.


%the percentage of perosns with and without covid
pos_neg_calculation(Total,Covidpositive,Covidnegative, RiskPercentaage, NoneRiskPercentage):-
    Perpos is Covidpositive/Total, RiskPercentaage is Perpos * 100,
    Perneg is Covidnegative/Total, NoneRiskPercentage is Perneg * 100.

%percentage of persons with mild and severe symptoms
symptoms_type_calculations(Postotal, Mild, Severe, MildPercentage, ServerePercentage):-
    Persevere is Severe/Postotal, ServerePercentage is Persevere * 100,
    Permild is Mild/Postotal, MildPercentage is Permild * 100.


%percentage of persons with the Delta variant and the Mu variant
variant_calculations(Postotal,Mu,Delta, Regular, MuPercentage, DeltaPercentage, RegularPercentage):-
    PerMu is Mu/Postotal, MuPercentage is PerMu*100,
    PerDelta is Delta/Postotal, DeltaPercentage is PerDelta*100,
    PerRegular is Regular/Postotal, RegularPercentage is PerRegular*100.


%Percentage of persons with low blood pressure
lowblood_calculations(Bp,Total):-
    Bp is Bp/Total,Bpanswer is Bp*100,
    write('The percentage of patients with low blood pressure: '),write(Bpanswer),write('%').
