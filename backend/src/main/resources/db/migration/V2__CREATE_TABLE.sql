USE `tavernn`;

CREATE TABLE IF NOT EXISTS users
(
    id                VARCHAR(36) PRIMARY KEY,
    email             VARCHAR(255) NOT NULL,
    password          VARCHAR(255) NOT NULL,
    username          VARCHAR(100) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role              VARCHAR(50),
    discord           VARCHAR(100),
    level             VARCHAR(50),
    available_time    VARCHAR(255),
    experience        VARCHAR(255),
    looking_for_team  BOOLEAN   DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS games
(
    id          VARCHAR(36) PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    image       VARCHAR(255),
    category    VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS user_games
(
    id         VARCHAR(36) PRIMARY KEY,
    user_id    VARCHAR(36),
    game_id    VARCHAR(36),
    game_level VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (game_id) REFERENCES games (id)
);

CREATE TABLE IF NOT EXISTS clubs
(
    id               VARCHAR(36) PRIMARY KEY,
    name             VARCHAR(100) NOT NULL,
    description      TEXT,
    creation_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logo             VARCHAR(255),
    open_recruitment BOOLEAN   DEFAULT TRUE,
    level            VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS teams
(
    id          VARCHAR(36) PRIMARY KEY,
    club_id     VARCHAR(36),
    name        VARCHAR(100) NOT NULL,
    game_id     VARCHAR(36),
    level       VARCHAR(50),
    max_players INTEGER,
    objectives  TEXT,
    FOREIGN KEY (club_id) REFERENCES clubs (id),
    FOREIGN KEY (game_id) REFERENCES games (id)
);

CREATE TABLE IF NOT EXISTS team_users
(
    id         VARCHAR(36) PRIMARY KEY,
    team_id    VARCHAR(36),
    user_id    VARCHAR(36),
    role       VARCHAR(50),
    is_captain BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (team_id) REFERENCES teams (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS trainings
(
    id         VARCHAR(36) PRIMARY KEY,
    team_id    VARCHAR(36),
    start_date TIMESTAMP,
    end_date   TIMESTAMP,
    objectives TEXT,
    FOREIGN KEY (team_id) REFERENCES teams (id)
);

CREATE TABLE IF NOT EXISTS tournaments
(
    id          VARCHAR(36) PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    game_id     VARCHAR(36),
    start_date  TIMESTAMP,
    end_date    TIMESTAMP,
    format      VARCHAR(50),
    max_teams   INTEGER,
    FOREIGN KEY (game_id) REFERENCES games (id)
);

CREATE TABLE IF NOT EXISTS tournament_teams
(
    id            VARCHAR(36) PRIMARY KEY,
    tournament_id VARCHAR(36),
    team_id       VARCHAR(36),
    status        VARCHAR(50),
    FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
    FOREIGN KEY (team_id) REFERENCES teams (id)
);

CREATE TABLE IF NOT EXISTS matches
(
    id            VARCHAR(36) PRIMARY KEY,
    tournament_id VARCHAR(36),
    team1_id      VARCHAR(36),
    team2_id      VARCHAR(36),
    match_date    TIMESTAMP,
    status        VARCHAR(50),
    FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
    FOREIGN KEY (team1_id) REFERENCES teams (id),
    FOREIGN KEY (team2_id) REFERENCES teams (id)
);

CREATE TABLE IF NOT EXISTS team_match_scores
(
    id       VARCHAR(36) PRIMARY KEY,
    match_id VARCHAR(36),
    team_id  VARCHAR(36),
    score    INTEGER,
    FOREIGN KEY (match_id) REFERENCES matches (id),
    FOREIGN KEY (team_id) REFERENCES teams (id)
);

CREATE TABLE IF NOT EXISTS notifications
(
    id            VARCHAR(36) PRIMARY KEY,
    title         VARCHAR(100),
    content       TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id       VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS events
(
    id          VARCHAR(36) PRIMARY KEY,
    club_id     VARCHAR(36),
    title       VARCHAR(100),
    description TEXT,
    start_date  TIMESTAMP,
    end_date    TIMESTAMP,
    type        VARCHAR(50),
    FOREIGN KEY (club_id) REFERENCES clubs (id)
);

CREATE TABLE IF NOT EXISTS event_participants
(
    id       VARCHAR(36) PRIMARY KEY,
    event_id VARCHAR(36),
    user_id  VARCHAR(36),
    FOREIGN KEY (event_id) REFERENCES events (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS applications
(
    id      VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    club_id VARCHAR(36),
    message TEXT,
    status  VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (club_id) REFERENCES clubs (id)
);