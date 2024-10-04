--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2024-10-03 11:48:42

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
-- TOC entry 215 (class 1259 OID 24737)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    title character(100)
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24736)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

--
-- TOC entry 3325 (class 0 OID 0)
-- Dependencies: 214
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- TOC entry 3173 (class 2604 OID 24740)
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- TOC entry 3319 (class 0 OID 24737)
-- Dependencies: 215
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, title) FROM stdin;
2	Update my resume on my portfolio                                                                    
5	Complete the edu section                                                                            
4	Update my work experience section.                                                                  
6	Update my project section.                                                                          
7	Update my testimonial section.                                                                      
8	  Check from the home page to the contact to observe any irresponsiveness or mistakes.              
10	Deploy my portfolio to the vercel                                                                   
11	Send to a senior dev to check what needs to be corrected or implement.                              
12	Continuous update of codes knowledge                                                                
\.


--
-- TOC entry 3326 (class 0 OID 0)
-- Dependencies: 214
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 13, true);


--
-- TOC entry 3175 (class 2606 OID 24742)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


-- Completed on 2024-10-03 11:48:53

--
-- PostgreSQL database dump complete
--

