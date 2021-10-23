mild_symptom("dizziness").
mild_symptom("blurred vision").
mild_symptom("fever").
mild_symptom("cough").
mild_symptom("loss of smell and taste").
mild_symptom("sore throat").
mild_symptom("muscle aches").
mild_symptom("tiredness").
mild_symptom("headache").
mild_symptom("diarrhoea").

mild_symptom_fact("Typically last about 7-10 days").


severe_symptom("fainting").
severe_symptom("difficulty breathing").
severe_symptom("confusion").
severe_symptom("chest pain").


covid_variant("Regular").
covid_variant("Delta").
covid_variant("Mu").

covid_variant_symptoms(["difficulty breathing","muscle aches","congestion","cough","runny nose","headache","fever"],regular).
covid_variant_symptoms(["chest pain","difficulty breathing","confusion","dizziness","sore_throat","congestion","cough","runny nose","headache","fever"],delta).
covid_variant_symptoms(["blurred vision","diarrhea","loss of taste and smell","congestion","cough","runny nose","headache","fever"],mu).

blood_presure_check_symptoms("blurred vision").
blood_presure_check_symptoms("dizziness").
blood_presure_check_symptoms("fainting").
