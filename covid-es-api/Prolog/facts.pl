%Facts: Covid Variants
covid_variant(regular).
covid_variant(delta).
covid_variant(mu).

%When patient has covid
%Facts: Mild Symptom
mild_symptom_fact("Typically last about 7-10 days").

%Facts: blood pressure check symptoms
blood_pressure_check_symptoms("blurred vision").
blood_pressure_check_symptoms("dizziness").
blood_pressure_check_symptoms("fainting").

%Facts: Covid precautions
covid_precautions("Maintain a safe distance from others (at least 1 metre), even if they do not appear to be sick.").
covid_precautions("Wear a mask in public, especially indoors or when physical distancing is not possible.").
covid_precautions("Choose open, well-ventilated spaces over closed ones. Open a window if indoors.").
covid_precautions("Clean your hands often. Use soap and water, or an alcohol-based hand rub.").
covid_precautions("Get vaccinated when it is your turn. Follow local guidance about vaccination.").
covid_precautions("Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.").
covid_precautions("Stay home if you feel unwell.").
covid_precautions("Get tested for covid-19. If you show any symptoms").

%Facts: Short term and long term actions for Covid
short_term_actions("Quarantine for 14 days").
short_term_actions("Keep in touch with your family doctor").
short_term_actions("Drink a lot of water").
short_term_actions("Only go to a hospital if you need oxygen").
long_term_actions("Keep track of your symptoms and inform a medical proffesional even post-covid").


%Relationship: Covid symptoms to their type and variant
symptoms_type_variant(severe, regular, "difficulty breathing").
symptoms_type_variant(mild, regular, "muscle aches").
symptoms_type_variant(mild, regular, "congestion").
symptoms_type_variant(mild, regular, "cough").
symptoms_type_variant(mild, regular, "runny nose").
symptoms_type_variant(mild, regular, "headache").
symptoms_type_variant(mild, regular, "fever").
symptoms_type_variant(severe, regular, "fainting").
symptoms_type_variant(severe, delta, "chest pain").
symptoms_type_variant(severe, delta, "confusion").
symptoms_type_variant(mild, delta, "dizziness").
symptoms_type_variant(mild, delta, "sore throat").
symptoms_type_variant(severe, mu, "blurred vision").
symptoms_type_variant(mild, mu, "diarrhea").
symptoms_type_variant(severe, mu, "loss of taste and smell").
blood_pressure_check_symptoms("congestion").