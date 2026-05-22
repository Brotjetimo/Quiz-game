CREATE DATABASE IF NOT EXISTS quiz;

USE quiz;

CREATE TABLE IF NOT EXISTS quizes (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_title VARCHAR(255) NOT NULL,
    quiz_timer_amount INT NOT NULL,
    quiz_score_x_amount INT,
    version enum('draft', 'published') NOT NULL DEFAULT 'draft'
);

CREATE TABLE IF NOT EXISTS questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    FOREIGN KEY (quiz_id) REFERENCES quizes(quiz_id) ON DELETE CASCADE,
    question VARCHAR(255),
    answer VARCHAR(24) NOT NULL,
    fake_answer_1 VARCHAR(24) NOT NULL,
    fake_answer_2 VARCHAR(24) NOT NULL,
    fake_answer_3 VARCHAR(24) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(12) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS scores (
    score_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    quiz_id INT,
    best_score INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizes(quiz_id) ON DELETE CASCADE
);