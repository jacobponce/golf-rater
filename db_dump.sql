--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying(200),
    city character varying(100),
    state character varying(100),
    address character varying(200),
    address_link character varying,
    distance2poly double precision,
    tee_time_link character varying(2048)
);


ALTER TABLE public.courses OWNER TO me;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_id_seq OWNER TO me;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    course_id integer NOT NULL,
    review_text text NOT NULL,
    rating integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO me;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO me;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.courses (id, name, city, state, address, address_link, distance2poly, tee_time_link) FROM stdin;
1	Dairy Creek Golf Course	San Luis Obispo	California	2990 Dairy Creek Rd, San Luis Obispo, CA 93405	https://maps.app.goo.gl/fnhSQ82k9BnaJxT79	6	https://apimanager-cc19.clubcaddie.com/webapi/view/dcfdabab
2	Laguna Lake Municipal Golf Course	San Luis Obispo	California	11175 Los Osos Valley Rd, San Luis Obispo, CA 93405	https://maps.app.goo.gl/4JiF9upnZWZn6bBs8	4.9	https://www.slocity.org/government/department-directory/parks-and-recreation/laguna-lake-golf-course/course-information
4	Chalk Mountain Golf Course	Atascadero	California	10000 El Bordo Ave, Atascadero, CA 93422	https://maps.app.goo.gl/piV81qAT6aQ5zBJM9	15.7	https://apimanager-cc19.clubcaddie.com/webapi/view/bcfdabab
5	Morro Bay Golf Course	San Luis Obispo	California	201 State Park Rd, Morro Bay, CA 93442	https://maps.app.goo.gl/mYLFMKBvy9HisZhe6	13	https://apimanager-cc19.clubcaddie.com/webapi/view/fcfdabab
6	Pismo Beach Golf Course	San Luis Obispo	California	9 Le Sage Dr, Grover Beach, CA 93433	https://maps.app.goo.gl/orjBJqPB9hRVSJxc8	15.4	https://pismobeachgolf.com/golf-rates
3	Avila Beach Golf Resort	Avila Beach	California	6464 Ana Bay Rd, Avila Beach, CA 93424	https://maps.app.goo.gl/dLPt28Bde67haKvC6	12.1	https://www.avilabeachresort.com/book-a-tee-time/
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.reviews (id, course_id, review_text, rating, created_at, user_id) FROM stdin;
14	1	Easy course to play	5	2024-08-03 19:17:13.515577	11
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.users (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
4	me	jp@me.com	$2b$10$fxRyhKpiL1NUnH0IVKndjeYv/TifGWyuIvRA6ScL8PWg.TaqT/WpK	2024-07-27 02:28:59.937-07	2024-07-27 02:28:59.937-07
\.


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.courses_id_seq', 1, false);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.reviews_id_seq', 34, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

