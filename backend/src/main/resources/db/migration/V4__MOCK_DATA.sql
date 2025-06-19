# INSERT MOCK DATA

# INSERT USERS
INSERT INTO users (id, email, username, password, discord, profile_picture, open_at_invite)
VALUES ('u1', 'alex.smith@example.com', 'AlexPro', 'test1234', 'alex#1234', 'alex.jpg', true),
       ('u2', 'emma.ballena@example.com', 'EmmaGG', 'test1234', 'emma#5678', 'emma.jpg', true),
       ('u3', 'lucas_jean@example.com', 'LucasGame', 'test1234', 'lucas#9012', 'lucas.jpg', false),
       ('u4', 'sarah.duabi@example.com', 'SarahPro', 'test1234', 'sarah#3456', 'sarah.jpg', true),
       ('u5', 'max.max.max@example.com', 'MaxPower', 'test1234', 'max#7890', 'max.jpg', true),
       ('u6', 'maria.garcia@example.com', 'MariaGG', 'test1234', 'maria#2222', 'maria.jpg', false),
       ('u7', 'peter.wang@example.com', 'PeterPro', 'test1234', 'peter#3333', 'peter.jpg', true),
       ('u8', 'anna.brown@example.com', 'AnnaPower', 'test1234', 'anna#4444', 'anna.jpg', true),
       ('u9', 'david.kim@example.com', 'DavidKing', 'test1234', 'david#5555', 'david.jpg', false),
       ('u10', 'sophie.lee@example.com', 'SophieGG', 'test1234', 'sophie#6666', 'sophie.jpg', true),
       ('u11', 'james.wilson@example.com', 'JamesWin', 'test1234', 'james#7777', 'james.jpg', true);

# INSERT USER GAMES
INSERT INTO user_games (user_id, game_id, game_level)
VALUES ('u1', '1', 'professional'),
       ('u1', '2', 'advanced'),
       ('u1', '3', 'intermediate'),
       ('u2', '1', 'advanced'),
       ('u2', '4', 'intermediate'),
       ('u3', '1', 'intermediate'),
       ('u3', '6', 'beginner'),
       ('u4', '2', 'professional'),
       ('u4', '6', 'advanced'),
       ('u5', '3', 'professional'),
       ('u5', '6', 'intermediate'),
       ('u6', '1', 'beginner'),
       ('u6', '3', 'intermediate'),
       ('u7', '2', 'advanced'),
       ('u7', '4', 'professional'),
       ('u8', '1', 'intermediate'),
       ('u8', '6', 'professional'),
       ('u9', '2', 'beginner'),
       ('u9', '3', 'advanced'),
       ('u10', '4', 'intermediate'),
       ('u10', '6', 'advanced'),
       ('u11', '1', 'professional'),
       ('u11', '2', 'intermediate');

# INSERT CLUBS
INSERT INTO clubs (id, name, description, logo, club_type, nr_members, max_members)
VALUES ('c1', 'Pro Gamers Elite', 'Club d''élite pour joueurs professionnels', 'pge-logo.png', 'invite_only', 3, 50),
       ('c2', 'Casual Gaming Heroes', 'Pour les joueurs détendus', 'cgh-logo.png', 'open', 2, 100),
       ('c3', 'eSports Masters', 'Club compétitif de haut niveau', 'esm-logo.png', 'closed', 2, 30);

# INSERT CLUB MEMBERS
INSERT INTO club_members (club_id, user_id, is_owner, is_admin)
VALUES ('c1', 'u1', true, true),
       ('c1', 'u2', false, true),
       ('c1', 'u3', false, false),
       ('c2', 'u4', true, true),
       ('c2', 'u5', false, true),
       ('c3', 'u1', false, true),
       ('c3', 'u5', true, true);

# INSERT TEAMS
INSERT INTO teams (id, name, description, club_id, game_id, nr_members)
VALUES ('t1', 'Alpha Squad', 'Équipe League of Legends principale', 'c1', '1', 5),
       ('t2', 'Beta Force', 'Équipe CS2 elite', 'c1', '2', 5),
       ('t3', 'Casual Rockets', 'Équipe Rocket League détendue', 'c2', '6', 3),
       ('t4', 'Valorant Masters', 'Équipe Valorant compétitive', 'c3', '3', 5);

# INSERT TEAM MEMBERS
INSERT INTO team_members (team_id, user_id, is_captain)
VALUES ('t1', 'u1', true),
       ('t1', 'u2', false),
       ('t1', 'u3', false),
       ('t2', 'u1', true),
       ('t2', 'u4', false),
       ('t3', 'u4', true),
       ('t3', 'u5', false),
       ('t4', 'u1', false),
       ('t4', 'u5', true);
