# pet2pet
Studentski projekat iz oblasti Naprednih baza podataka. Bazira se na primeni i koriscenju Apache Cassandra-e. 

Pokretanje aplikacije:
1. Preuzeti projekat iz foldera application kao zip ili pomocu git clone naredbe
2. Projekat otvoriti pomocu Visual Studio Code-a i otvoriti novi terminal
3. U terminalu uneti npm install, pa zatim npm start i aplikacija je pokrenuta (druga opcija za pokretanje je nodemon koji se instalira pomocu komande npm install nodemon -g).
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Pre pokretanja aplikacije:
1. Potrebno je instalirati odgovarajucu verziju apache cassandra sa zvanicnog sajta. 
2. Ukoliko nemate instalirano, instalirati Python 2.7.18 verziju i u System PATH dodati lokaciju na kojoj je instalacija -> C:\PYTHON27
3. Verziju Python-a mozete proveriti u cmd naredbom python --version 
4. Ukoliko nemate instalirano, instalirati JAVA JDK 1.8.0_271 (ili vise) i podesiti JAVA_HOME na C:PROGRAM FILES\JAVA\JDK1.8.0_271
5. Provera verzije se moze izvrsiti pomocu komande echo %JAVA_HOME%

Pokretanje cassandra apache-a:
1. Pokrenuti cmd kao administrator
2. Locirati se do bin foldera koji je u apache-cassandra-3.11.9 folderu -> C:\PROGRAM FILES\APACHE-CASSANDRA-3.11.9\BIN
3. Izvrsiti komandu cassandra
4. Ako se jave problemi i greske pri izvrsavnju, u folderu lib naci folder sigar-bin i preimenovati ga u TERM-sigar-bin 
5. Bez iskljucivanja trenutnog cmd prozora, otvoriti novi i locirati se opet do bin foldera
6. Izvrsiti komandu cqlsh i kada dobijete prikaz: cqlsh>     mozete unositi komande :)

Napomena: Pre pokretanja same aplikacije, cassandra i cqlsh moraju biti pokrenuti u pozadini
