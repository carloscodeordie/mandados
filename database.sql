CREATE DATABASE mandados
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE SCHEMA mandados
    AUTHORIZATION postgres;

CREATE TABLE mandados.onboarding
(
    id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image_url text NOT NULL,
    sequence integer NOT NULL,
    PRIMARY KEY (id)
);