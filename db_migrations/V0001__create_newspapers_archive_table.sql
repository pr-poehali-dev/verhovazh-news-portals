CREATE TABLE IF NOT EXISTS newspapers (
    id SERIAL PRIMARY KEY,
    issue_number VARCHAR(50) NOT NULL,
    publication_date DATE NOT NULL,
    year INTEGER NOT NULL,
    cover_image_url TEXT NOT NULL,
    pdf_url TEXT NOT NULL,
    page_count INTEGER NOT NULL DEFAULT 8,
    file_size_mb DECIMAL(4,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newspapers_year ON newspapers(year);
CREATE INDEX idx_newspapers_date ON newspapers(publication_date DESC);

INSERT INTO newspapers (issue_number, publication_date, year, cover_image_url, pdf_url, page_count, file_size_mb) VALUES
('№ 43 (1234)', '2025-10-25', 2025, 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/9cd1ccb7-c88f-4bbe-a370-3e48d7b45f90.jpg', '#', 8, 4.2),
('№ 42 (1233)', '2025-10-18', 2025, 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/02bf1d4b-b4f9-4a4f-ad34-850c6f96b84f.jpg', '#', 8, 3.8),
('№ 41 (1232)', '2025-10-11', 2025, 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/9cd1ccb7-c88f-4bbe-a370-3e48d7b45f90.jpg', '#', 8, 4.5),
('№ 40 (1231)', '2025-10-04', 2025, 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/02bf1d4b-b4f9-4a4f-ad34-850c6f96b84f.jpg', '#', 8, 4.0),
('№ 39 (1230)', '2025-09-27', 2025, 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/9cd1ccb7-c88f-4bbe-a370-3e48d7b45f90.jpg', '#', 8, 3.9),
('№ 38 (1229)', '2025-09-20', 2025, 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/02bf1d4b-b4f9-4a4f-ad34-850c6f96b84f.jpg', '#', 8, 4.1),
('№ 52 (1190)', '2024-12-28', 2024, 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/9cd1ccb7-c88f-4bbe-a370-3e48d7b45f90.jpg', '#', 12, 5.2),
('№ 51 (1189)', '2024-12-21', 2024, 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/02bf1d4b-b4f9-4a4f-ad34-850c6f96b84f.jpg', '#', 8, 3.7);