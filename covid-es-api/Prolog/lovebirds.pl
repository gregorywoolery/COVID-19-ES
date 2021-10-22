loves(jack, jane).
loves(jack, mary).
loves(mack, mary).
loves(jane, mack).
loves(mack, jane).
loves(mary, mack).
loves(mack, mack).


% Lovebirds  -  Two persons in love with each other
lovebirds(Person1,Person2):-loves(Person1,Person2),loves(Person2, Person1),Person2\=Person1.


% Cheat - Person in love with multiple persons
cheat(Player):-loves(Player,A),loves(Player,B),A\=B,Player\=A.


%Loser - Person in love with someone but who is not in love with him/her
loser(A):-loves(A, B), not(loves(B, A)).


%Pathetic - Person A loves person B who loves person C. C is not A.
pathetic(A):- loves(A, B), not(loves(B, A)), loves(B, C), C\=A.


%Lover - Loved by multiple persons. Not Themselves
lover(Person):- loves(A, Person), loves(B, Person), not(loves(Person, Person)), Person\=A, Person\=B.

cls :- write('\e[H\e[2J').

% diagnose_patient(symtom,hasFever,hasTaste):-Symptoms(symtom), Fever(hasFever), Taste(hasTaste).