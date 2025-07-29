--
-- PostgreSQL database schema creation
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';
SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Teachers CASCADE;
DROP TABLE IF EXISTS Students CASCADE;
DROP TABLE IF EXISTS Subjects CASCADE;
DROP TABLE IF EXISTS Games CASCADE;
DROP TABLE IF EXISTS Quiz_Games CASCADE;
DROP TABLE IF EXISTS Quiz_Questions CASCADE;
DROP TABLE IF EXISTS Classes CASCADE;
DROP TABLE IF EXISTS Student_Stats CASCADE;
DROP TABLE IF EXISTS Students_To_Classes CASCADE;
DROP TABLE IF EXISTS Games_To_Classes CASCADE;

--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

--
-- Name: teachers; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

--
-- Name: students; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

--
-- Name: subjects; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

--
-- Name: games; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE Games (
    game_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    game_name VARCHAR(50) NOT NULL,
    game_type VARCHAR(50) NOT NULL,
    subject_id INT REFERENCES Subjects(subject_id) ON DELETE CASCADE
);

--
-- Name: quiz_games; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE Quiz_Games (
    game_id INT PRIMARY KEY REFERENCES Games(game_id) ON DELETE CASCADE
);

--
-- Name: quiz_questions; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE Quiz_Questions (
    question_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    game_id INT REFERENCES Quiz_Games(game_id) ON DELETE CASCADE,
    subject_id INT REFERENCES Subjects(subject_id) ON DELETE CASCADE,
    question VARCHAR(150) NOT NULL,
    options JSONB NOT NULL,
    answer VARCHAR(30) NOT NULL,
    topic VARCHAR(30) NOT NULL,
    subcategory VARCHAR(30) NOT NULL,
    question_type VARCHAR(30) NOT NULL,
    difficulty VARCHAR(30) NOT NULL
);

--
-- Name: classes; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

--
-- Name: student_stats; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

--
-- Name: students_to_classes; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE Students_To_Classes (
    student_id INT REFERENCES Students(student_id) ON DELETE CASCADE,
    class_id INT REFERENCES Classes(class_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, class_id)
);

--
-- Name: game_to_classes; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE Games_To_Classes (
    game_id INT REFERENCES Games(game_id) ON DELETE CASCADE,
    class_id INT REFERENCES Classes(class_id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, class_id)
);




--
-- PostgreSQL data dump
--

--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO subjects (subject) 
VALUES 
  ('Geography'),
  ('History'),
  ('Literature');

--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO Games (game_name, game_type, subject_id) 
VALUES
  ('Geography Quiz', 'Quiz', 1),
  ('History Quiz', 'Quiz', 2),
  ('Literature Quiz', 'Quiz', 3);

--
-- Data for Name: qui_games; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO quiz_games (game_id) 
VALUES 
  (1),
  (2),
  (3);
