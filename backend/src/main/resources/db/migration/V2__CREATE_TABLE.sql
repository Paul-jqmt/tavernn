USE `tavernn`;

CREATE TABLE IF NOT EXISTS games (
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
    profile_picture VARCHAR(255),
    open_at_invite BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS user_games (
    user_id    VARCHAR(36) NOT NULL,
    game_id    VARCHAR(36) NOT NULL,
    game_level ENUM('beginner', 'intermediate', 'advanced', 'professional'),
    PRIMARY KEY (user_id, game_id),
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
    PRIMARY KEY (club_id, user_id),
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
    PRIMARY KEY (team_id, user_id),
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

CREATE TABLE IF NOT EXISTS club_post (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id VARCHAR(36),
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
    user_id VARCHAR(36),
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

CREATE TABLE IF NOT EXISTS tournaments (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    game_id VARCHAR(36) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    format ENUM('BO_1', 'BO_3', 'BO_5'),
    max_teams INT NOT NULL,
    registered_teams INT NOT NULL DEFAULT 0,
    FOREIGN KEY (game_id) REFERENCES games(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS tournament_teams (
    tournament_id VARCHAR(36) NOT NULL,
    team_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (tournament_id, team_id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS matches (
    id VARCHAR(36) PRIMARY KEY,
    team_1_id VARCHAR(36),
    team_2_id VARCHAR(36),
    winner_id VARCHAR(36),
    game_id VARCHAR(36) NOT NULL,
    message TEXT,
    team_1_score INT,
    team_2_score INT,
    match_date TIMESTAMP NOT NULL,
    FOREIGN KEY (team_1_id) REFERENCES teams(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (team_2_id) REFERENCES teams(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES teams(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS tournament_matches (
    match_id VARCHAR(36) NOT NULL,
    tournament_id VARCHAR(36) NOT NULL,
    match_type ENUM('final', '1/2', '1/4', '1/8', 'normal'),
    PRIMARY KEY (match_id, tournament_id),
    FOREIGN KEY (match_id) REFERENCES matches(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    seen BOOLEAN NOT NULL DEFAULT FALSE,
    creation_date TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS trainings (
    id VARCHAR(36) PRIMARY KEY,
    team_id VARCHAR(36) NOT NULL,
    date TIMESTAMP NOT NULL,
    message TEXT,
    FOREIGN KEY (team_id) REFERENCES teams(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);