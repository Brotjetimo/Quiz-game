USE quiz;

-- Users
INSERT INTO users (username, password) VALUES
('alice', 'pass123'),
('bob', 'hunter2'),
('charlie', 'qwerty'),
('misty', 'watergym'),
('brock', 'rocksolid'),
('ash', 'pikachu'),
('gary', 'smellya'),
('oak', 'professor'),
('cynthia', 'champion'),
('red', 'mtSilver');

-- Quiz
INSERT INTO quizes (quiz_title, quiz_timer_amount, quiz_score_x_amount, version) VALUES
('Pokemon Knowledge Quiz', 360, 10, 'draft'),
('Lands and Provinces Quiz', 720, 20, 'published');

-- Questions (10 total)
INSERT INTO questions (quiz_id, question, answer, fake_answer_1, fake_answer_2, fake_answer_3) VALUES
(1, 'What type is Pikachu?', 'Electric', 'Fire', 'Water', 'Grass'),
(1, 'Which Pokemon evolves into Charizard?', 'Charmeleon', 'Charmander', 'Vulpix', 'Growlithe'),
(1, 'What type is Squirtle?', 'Water', 'Ice', 'Steel', 'Dragon'),
(1, 'Which Pokemon is known as the Seed Pokemon?', 'Bulbasaur', 'Oddish', 'Chikorita', 'Treecko'),
(1, 'What is the final evolution of Charmander?', 'Charizard', 'Blaziken', 'Typhlosion', 'Infernape'),
(1, 'Which Pokemon is a legendary bird?', 'Zapdos', 'Pidgeot', 'Fearow', 'Swellow'),
(1, 'What type is Geodude?', 'Rock/Ground', 'Steel', 'Rock', 'Ground'),
(1, 'Which Pokemon can evolve into Vaporeon?', 'Eevee', 'Ditto', 'Snorlax', 'Jigglypuff'),
(1, 'Who is known as the Pokemon Professor in Kanto?', 'Professor Oak', 'Professor Elm', 'Professor Birch', 'Professor Rowan'),
(1, 'Which Pokemon is famous for saying its own name repeatedly?', 'Pikachu', 'Meowth', 'Psyduck', 'Magikarp'),

(2, 'What is the capital of the Netherlands?', 'Amsterdam', 'Rotterdam', 'Utrecht', 'Hague'),
(2, 'What is the capital of France?', 'Paris', 'Lyon', 'Marseille', 'Toulouse'),
(2, 'What is the capital of Germany?', 'Berlin', 'Munich', 'Frankfurt', 'Hamburg'),
(2, 'What is the capital of Spain?', 'Madrid', 'Barcelona', 'Valencia', 'Seville'),
(2, 'What is the capital of Belgium?', 'Brussels', 'Antwerp', 'Ghent', 'Bruges'),
(2, 'What is the capital of the united states?', 'Washington, D.C.', 'New York', 'Los Angeles', 'Chicago'),
(2, 'What is the capital of the united kingdom?', 'London', 'Manchester', 'Birmingham', 'Liverpool'),
(2, 'What is the capital of Denmark?', 'Copenhagen', 'Aarhus', 'Odense', 'Aalborg'),
(2, 'What is the capital of China?', 'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'),
(2, 'What is the capital of Syria?', 'Damascus', 'Aleppo', 'Homs', 'Latakia');

-- Scores
INSERT INTO scores (user_id, quiz_id, best_score) VALUES
(1, 1, 70),
(2, 1, 50),
(3, 1, 80),
(4, 1, 60),
(5, 1, 40),
(6, 1, 100),
(7, 1, 30),
(8, 1, 90),
(9, 1, 10),
(10, 1, 0);