USE `tavernn`;

CREATE TABLE IF NOT EXISTS games
(
    id   VARCHAR(36) PRIMARY KEY,
    name VARCHAR(36) NOT NULL UNIQUE,
    image VARCHAR(255),
    team_max_nr INT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registration_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    discord VARCHAR(100),
    logo VARCHAR(255),
    open_at_invite BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS user_games (
    user_id    VARCHAR(36) NOT NULL,
    game_id    VARCHAR(36) NOT NULL,
    game_level ENUM('beginner', 'intermediate', 'advanced', 'professional'),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS clubs (
    id               VARCHAR(36) PRIMARY KEY,
    name             VARCHAR(255) NOT NULL UNIQUE,
    description      TEXT,
    creation_date    DATE NOT NULL DEFAULT (CURRENT_DATE),
    logo             VARCHAR(255),
    club_type ENUM('open', 'closed', 'invite_only') NOT NULL DEFAULT 'open',
    nr_members INT NOT NULL DEFAULT 0,
    max_members INT NOT NULL
);

CREATE TABLE IF NOT EXISTS club_members (
    club_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    is_owner BOOLEAN NOT NULL DEFAULT FALSE,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (club_id) REFERENCES clubs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS teams (
    id          VARCHAR(36) PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    club_id     VARCHAR(36) NOT NULL,
    game_id     VARCHAR(36) NOT NULL,
    nr_members  INT NOT NULL DEFAULT 0,
    FOREIGN KEY (club_id) REFERENCES clubs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS team_members (
    team_id    VARCHAR(36) NOT NULL,
    user_id    VARCHAR(36) NOT NULL,
    is_captain BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (team_id) REFERENCES teams(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS club_join_requests (
    id VARCHAR(36) PRIMARY KEY,
    message TEXT,
    user_id VARCHAR(36) NOT NULL,
    club_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS team_join_requests (
    id VARCHAR(36) PRIMARY KEY,
    message TEXT,
    user_id VARCHAR(36) NOT NULL,
    team_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS user_notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    date DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS club_post (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    club_id VARCHAR(36) NOT NULL,
    message TEXT NOT NULL,
    private BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS team_post (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    team_id VARCHAR(36) NOT NULL,
    message TEXT NOT NULL,
    private BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS trainings (
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