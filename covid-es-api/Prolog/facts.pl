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

covid_variant_symptoms(["difficulty breathing","muscle aches","congestion","cough","runny nose","headache","fever"], regular).
covid_variant_symptoms(["chest pain","confusion","dizziness","sore_throat"], delta).
covid_variant_symptoms(["blurred vision","diarrhea","loss of taste and smell"], mu).

blood_presure_check_symptoms("blurred vision").
blood_presure_check_symptoms("dizziness").
blood_presure_check_symptoms("fainting").


short_term_actions_after_covid("Quarentine for 14 days").
short_term_actions_after_covid("Keep in touch with your family doctor").
short_term_actions_after_covid("Drink a lot of water").
short_term_actions_after_covid("Only go to a hospital if you need oxygen").
longterm_actions_after_covid("Keep track of your symptoms and inform a medical proffesional even post-covid").

covid_precautions("Maintain a safe distance from others (at least 1 metre), even if they don’t appear to be sick.").
covid_precautions("Wear a mask in public, especially indoors or when physical distancing is not possible.").
covid_precautions("Choose open, well-ventilated spaces over closed ones. Open a window if indoors.").
covid_precautions("Clean your hands often. Use soap and water, or an alcohol-based hand rub.").
covid_precautions("Get vaccinated when it’s your turn. Follow local guidance about vaccination.").
covid_precautions("Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.").
covid_precautions("Stay home if you feel unwell.").
covid_precautions("Get tested for covid-19. If you show any symptoms").