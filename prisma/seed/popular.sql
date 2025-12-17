INSERT INTO shopping (id, name, observation, zip_code, zip_number) VALUES
(null, 'Shopping Central', 'Shopping principal da região', 30140000, 100),
(null, 'Shopping Norte Mall', 'Área comercial em expansão', 30220200, 245),
(null, 'Plaza Sul Center', 'Shopping tradicional', 30310150, 78),
(null, 'Estação Shopping', 'Conectado ao terminal', 30490500, 12),
(null, 'Shopping Premium Park', 'Shopping de alto padrão', 30570880, 410);

INSERT INTO store (id, name, classification_id, segment_id, activity_id) VALUES
(1, 'Mauro Moda', 4, 57, 1),
(2, 'Super Tech Eletrônicos', 1, 5, null),
(3, 'Fit Academia', 1, 13, null),
(4, 'Pet House', 1, 12, null),
(5, 'Livraria Central', 2, 29, null),
(6, 'Mega Games Arena', 6, 98, 44),
(7, 'Lanches Express', 4, 65, 35),
(8, 'Óticas Prime', 4, 62, 49),
(9, 'Brinquedos Mania', 1, 8, null),
(10, 'DecorLar', 1, 4, null);

INSERT INTO shopping_store (id, store_id, shopping_id, store_id_right, store_id_left, status) VALUES
(null, 1, 1, NULL, NULL, 'active'),
(null, 2, 1, NULL, NULL, 'active'),
(null, 3, 2, NULL, NULL, 'active'),
(null, 4, 2, NULL, NULL, 'active'),
(null, 5, 3, NULL, NULL, 'active'),
(null, 6, 3, NULL, NULL, 'active'),
(null, 7, 3, NULL, NULL, 'active'),
(null, 8, 4, NULL, NULL, 'active'),
(null, 9, 4, NULL, NULL, 'active'),
(null, 10, 5, NULL, NULL, 'active'),
(null, 1, 5, NULL, NULL, 'active'),
(null, 4, 1, NULL, NULL, 'active'),
(null, 7, 2, NULL, NULL, 'active'),
(null, 9, 5, NULL, NULL, 'active'),
(null, 3, 4, NULL, NULL, 'active');

INSERT INTO visit (id, date, observation, user_id, shopping_id) VALUES
(null, '2025-02-01', 'Primeira visita', 1, 1),
(null, '2025-02-02', 'Visita de inspeção', 1, 2),
(null, '2025-02-05', 'Reunião com gestor', 1, 3);