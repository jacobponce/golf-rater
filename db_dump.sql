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
10	1	This course was fyeeeeee	5	2024-08-03 12:11:05.988452	3
11	1	Had a great time in a great course with mcditty times	5	2024-08-03 12:22:29.292583	3
12	1	Im himothy, course was too lite	1	2024-08-03 15:42:21.527128	8
13	5	joe mama	1	2024-08-03 19:14:42.242129	10
14	1	Easy course to play	5	2024-08-03 19:17:13.515577	11
24	4		5	2024-08-15 20:29:16.561889	4
25	1	Challenging course in great condition! Enjoyed seeing some goats.	5	2024-08-15 21:04:26.544188	14
28	6	Never played here but looks chill	1	2024-08-18 21:30:16.286953	4
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.users (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
1	jacob	abruhim@me.com	$2b$10$oo5B84y07IYW98IHKCpTSOunIHZRep7xcJ3EQyymGpMtUxiKaz5HW	2024-07-24 22:23:52.211-07	2024-07-24 22:23:52.211-07
2	bruh	bruh@bruh.com	$2b$10$ziL/B6pVxLV/lDv1QTv9P.AJTeM3KuXl8ys2Nh.8nc.4/mEaRO4.6	2024-07-24 22:28:08.659-07	2024-07-24 22:28:08.659-07
3	second	jpunc@bruh.com	$2b$10$DTTxze5vtyPDBTo6SDuQ.OFH7JZM.RpmrpqJXct1jqKFVf49rVwqe	2024-07-27 02:06:48.544-07	2024-07-27 02:06:48.544-07
4	me	jp@me.com	$2b$10$fxRyhKpiL1NUnH0IVKndjeYv/TifGWyuIvRA6ScL8PWg.TaqT/WpK	2024-07-27 02:28:59.937-07	2024-07-27 02:28:59.937-07
5	mah long	mahlong@pingpong.com	$2b$10$obal1tlxGOS5VaqUJI797.WURP7EQOHoXJphCe1NIb24rK52AVbIC	2024-07-27 22:50:23.608-07	2024-07-27 22:50:23.608-07
6	jacobbruh	me@me.com	$2b$10$h3zp2yM5wZB3wGF9tT1GU.ioKnfadYZDWqRI3VRwKPYrFCjo2o7Qq	2024-08-03 12:24:34.46-07	2024-08-03 12:24:34.46-07
7	jacob1	bruh	$2b$10$HVaZNnNIYPs/k/6FMaPVE.SqKdwSzcbqDpcTzm/kuNSXiM4uWhb.2	2024-08-03 15:35:15.037-07	2024-08-03 15:35:15.037-07
8	himothy	him@him.com	$2b$10$de96b8b.HxFjfn0/oUnln.Ozn.PwKSbDjhu4X763ivM91Rlbvx2LS	2024-08-03 15:41:42.416-07	2024-08-03 15:41:42.416-07
9	jacob3	bruhme@bruh	$2b$10$ya2WxaXIlnAS/h2fjKGJs.cxWQ2y.ZvN42BZCYAKQuOMTEyqX94ee	2024-08-03 16:04:39.006-07	2024-08-03 16:04:39.006-07
10	joemama	lpjunkmail07@gmail.com	$2b$10$Vkgyezpq4dakF0wTlyWqCOaJWx4mjfYScN/NCWudDyKOFXZojga2O	2024-08-03 19:14:02.833-07	2024-08-03 19:14:02.833-07
11	bpunc	bytp@hotmail.com	$2b$10$GUm20Kk4lwZ/sv3PeMRX..T4behhRJK97wYBmKCpBueJ57HK3gFuW	2024-08-03 19:16:13.658-07	2024-08-03 19:16:13.658-07
12	testform	jecnopj@yahoo.com	$2b$10$QwpQ3.cpSoCAUzKwJp4dPOaItFUi81oIRHoIQK1EHNkFu3IHmeJzO	2024-08-09 01:34:28.347-07	2024-08-09 01:34:28.347-07
13	smiski	smiski@smiski.com	$2b$10$Gy8kC7S3A5ikFVfNbJfX/.uStVJ/dZe.uAjI5AzFO807BRbOcYALC	2024-08-09 01:48:22.996-07	2024-08-09 01:48:22.996-07
14	GolfGuy	jpunc@me.com	$2b$10$NgKo.GALugtpdwT/nVIKsO1ZlSrH5Pj7Li/w7kOqabvupg.FSNoGO	2024-08-15 21:03:50.925-07	2024-08-15 21:03:50.925-07
15	me2	lol@lols	$2b$10$Q2sPZSDmQ.hYRStfwJM5HuQxX2ek3XB7G5VzH2Ep4fCcKQcsYcfPG	2024-08-18 17:47:39.908-07	2024-08-18 17:47:39.908-07
16	yarmesto	yasmine.armesto@gmail.com	$2b$10$B61G7U2lPaQebf95Y/eWieMjvYflnh3G2uHKFM.dz/qCmQslt3M/S	2024-08-19 21:06:15.152-07	2024-08-19 21:06:15.152-07
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

