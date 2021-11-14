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
    short_term_actions(ShortTerm);
    long_term_actions(LongTerm);
    covid_precautions(Precaution).

symptom_exist(Symptom):-
    symptoms_type_variant(_,_,Symptom).


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

get_Symptoms(BloodPressure, Symptoms):-
    blood_pressure_check_symptoms(BloodPressure),
    symptoms_type_variant(_,_, Symptoms).


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


% covid_risk_analysis(CovidRisk, MildSymptoms, RegularCovidCount, DeltaCovidCount, MuCovidCount, Exposed, RiskAnalysis, CovidRiskHere):-
%     % CovidRisk > 4 -> CovidRisk is CovidRisk + 4;
%     % RegularCovidCount >= 3 -> CovidRisk is CovidRisk + 4;
%     % DeltaCovidCount > 2 -> CovidRisk is CovidRisk + 10;
%     % MuCovidCount > 2 -> CovidRisk is CovidRisk + 10;
%     Exposed == 0 -> CovidRisk = CovidRisk + 3;
%     CovidRisk =< 6 -> RiskAnalysis is 0;
%     CovidRisk > 6 -> RiskAnalysis is 1;
%     CovidRisk > 14 -> RiskAnalysis is 2;
%     CovidRiskHere = 5.


% covid_variant_select(MuCovidCount, DeltaCovidCount, RegularCovidCount, MuSevereCount, MuMildCount, DeltaSevereCount, DeltaMildCount, Variant):-
%     (MuCovidCount > DeltaCovidCount;
%         MuSevereCount >= 1, MuSevereCount >= DeltaSevereCount;
%         MuMildCount >= 1, MuMildCount >= DeltaMildCount -> Variant is 'mu'),
%     (DeltaCovidCount > MuCovidCount;
%         DeltaSevereCount >= 1, DeltaSevereCount >= MuSevereCount;
%         DeltaMildCount >= 1, DeltaMildCount >= MuMildCount -> Variant is 'delta'),
%     (RegularCovidCount >= 2 -> Variant is 'regular').
    

% print(covidRisk)
% covidExposed = patient['covidExposed']
% # riskAnalysisQuery = f"covid_risk_analysis({covidRisk}, {mildSymptoms}, {regularCovidCount}, {deltaCovidCount}, {muCovidCount}, {covidExposed}, RiskAnalysis)"
% riskAnalysisQuery = f"covid_risk_analysis({covidRisk}, {5}, {4}, {3}, {2}, {covidExposed}, RiskAnalysis, CovidRiskHere)"
% riskAnalysisResponse = list(prolog.query(riskAnalysisQuery, maxresult=1))
% # riskAnalysis = riskAnalysisResponse[0]['RiskAnalysis']
% print(riskAnalysisResponse)
