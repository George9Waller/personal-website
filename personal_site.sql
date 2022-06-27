--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7 (Ubuntu 13.7-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.1

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
-- Name: auth_group; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.auth_user_groups (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.auth_user_user_permissions (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: bibliography_bibliographyauthor; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.bibliography_bibliographyauthor (
    id uuid NOT NULL,
    type character varying(50) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    organisation_name character varying(50) NOT NULL,
    source_id uuid NOT NULL
);


ALTER TABLE public.bibliography_bibliographyauthor OWNER TO vobcsljzmnwyjq;

--
-- Name: bibliography_bibliographyeditor; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.bibliography_bibliographyeditor (
    id uuid NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    source_id uuid NOT NULL
);


ALTER TABLE public.bibliography_bibliographyeditor OWNER TO vobcsljzmnwyjq;

--
-- Name: bibliography_bibliographylabel; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.bibliography_bibliographylabel (
    id uuid NOT NULL,
    name character varying(50) NOT NULL,
    colour character varying(10) NOT NULL,
    user_id integer
);


ALTER TABLE public.bibliography_bibliographylabel OWNER TO vobcsljzmnwyjq;

--
-- Name: bibliography_bibliographylist; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.bibliography_bibliographylist (
    id uuid NOT NULL,
    name character varying(50) NOT NULL,
    style character varying(50) NOT NULL,
    user_id integer
);


ALTER TABLE public.bibliography_bibliographylist OWNER TO vobcsljzmnwyjq;

--
-- Name: bibliography_bibliographylist_labels; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.bibliography_bibliographylist_labels (
    id bigint NOT NULL,
    bibliographylist_id uuid NOT NULL,
    bibliographylabel_id uuid NOT NULL
);


ALTER TABLE public.bibliography_bibliographylist_labels OWNER TO vobcsljzmnwyjq;

--
-- Name: bibliography_bibliographylist_labels_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.bibliography_bibliographylist_labels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bibliography_bibliographylist_labels_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: bibliography_bibliographylist_labels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.bibliography_bibliographylist_labels_id_seq OWNED BY public.bibliography_bibliographylist_labels.id;


--
-- Name: bibliography_bibliographysource; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.bibliography_bibliographysource (
    id uuid NOT NULL,
    title character varying(100) NOT NULL,
    date_published date NOT NULL,
    edition character varying(30) NOT NULL,
    volumne_number character varying(30) NOT NULL,
    issue_number character varying(30) NOT NULL,
    publisher character varying(30) NOT NULL,
    publisher_place character varying(30) NOT NULL,
    page_range character varying(30) NOT NULL,
    doi character varying(50) NOT NULL,
    url character varying(200) NOT NULL,
    date_accessed date NOT NULL,
    journal_name character varying(50) NOT NULL,
    website_name character varying(50) NOT NULL,
    database_name character varying(30) NOT NULL,
    notes text NOT NULL,
    bibliography_list_id uuid NOT NULL
);


ALTER TABLE public.bibliography_bibliographysource OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogcategory; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.blog_blogcategory (
    id bigint NOT NULL,
    title character varying(30) NOT NULL,
    color_hex character varying(7) NOT NULL,
    ranking integer NOT NULL,
    cv_category boolean NOT NULL
);


ALTER TABLE public.blog_blogcategory OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogcategory_blog; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.blog_blogcategory_blog (
    id bigint NOT NULL,
    blogcategory_id bigint NOT NULL,
    blogentry_id bigint NOT NULL
);


ALTER TABLE public.blog_blogcategory_blog OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogcategory_blog_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.blog_blogcategory_blog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_blogcategory_blog_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogcategory_blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.blog_blogcategory_blog_id_seq OWNED BY public.blog_blogcategory_blog.id;


--
-- Name: blog_blogcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.blog_blogcategory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_blogcategory_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogcategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.blog_blogcategory_id_seq OWNED BY public.blog_blogcategory.id;


--
-- Name: blog_blogentry; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.blog_blogentry (
    id bigint NOT NULL,
    date date NOT NULL,
    title character varying(255) NOT NULL,
    short_description character varying(512) NOT NULL,
    cover_image character varying(100) NOT NULL,
    content text NOT NULL,
    draft boolean NOT NULL
);


ALTER TABLE public.blog_blogentry OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogentry_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.blog_blogentry_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_blogentry_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogentry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.blog_blogentry_id_seq OWNED BY public.blog_blogentry.id;


--
-- Name: blog_blogimage; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.blog_blogimage (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,
    image character varying(100) NOT NULL
);


ALTER TABLE public.blog_blogimage OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogimage_blog; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.blog_blogimage_blog (
    id bigint NOT NULL,
    blogimage_id bigint NOT NULL,
    blogentry_id bigint NOT NULL
);


ALTER TABLE public.blog_blogimage_blog OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogimage_blog_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.blog_blogimage_blog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_blogimage_blog_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogimage_blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.blog_blogimage_blog_id_seq OWNED BY public.blog_blogimage_blog.id;


--
-- Name: blog_blogimage_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.blog_blogimage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_blogimage_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: blog_blogimage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.blog_blogimage_id_seq OWNED BY public.blog_blogimage.id;


--
-- Name: cv_contactitem; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.cv_contactitem (
    listitem_ptr_id bigint NOT NULL,
    cv_id bigint NOT NULL
);


ALTER TABLE public.cv_contactitem OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_cv; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.cv_cv (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    about text NOT NULL,
    profile_picture character varying(100)
);


ALTER TABLE public.cv_cv OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_cv_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.cv_cv_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cv_cv_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_cv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.cv_cv_id_seq OWNED BY public.cv_cv.id;


--
-- Name: cv_eventitem; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.cv_eventitem (
    listitem_ptr_id bigint NOT NULL,
    location character varying(255) NOT NULL,
    subtitle character varying(512),
    start_date date,
    end_date date,
    cv_id bigint
);


ALTER TABLE public.cv_eventitem OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_interest; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.cv_interest (
    listitem_ptr_id bigint NOT NULL,
    cv_id bigint NOT NULL
);


ALTER TABLE public.cv_interest OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_language; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.cv_language (
    listitem_ptr_id bigint NOT NULL,
    cv_id bigint NOT NULL
);


ALTER TABLE public.cv_language OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_listitem; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.cv_listitem (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    link character varying(255),
    icon_html character varying(1024),
    ranking integer NOT NULL,
    skill_level_id bigint
);


ALTER TABLE public.cv_listitem OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_listitem_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.cv_listitem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cv_listitem_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_listitem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.cv_listitem_id_seq OWNED BY public.cv_listitem.id;


--
-- Name: cv_personality; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.cv_personality (
    listitem_ptr_id bigint NOT NULL,
    cv_id bigint NOT NULL
);


ALTER TABLE public.cv_personality OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_skillslevel; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.cv_skillslevel (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    cv_id bigint NOT NULL,
    ranking integer NOT NULL
);


ALTER TABLE public.cv_skillslevel OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_skillslevel_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.cv_skillslevel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cv_skillslevel_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: cv_skillslevel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.cv_skillslevel_id_seq OWNED BY public.cv_skillslevel.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO vobcsljzmnwyjq;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO vobcsljzmnwyjq;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO vobcsljzmnwyjq;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO vobcsljzmnwyjq;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO vobcsljzmnwyjq;

--
-- Name: portal_bibliographysubscription; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.portal_bibliographysubscription (
    subscription_ptr_id uuid NOT NULL,
    num_lists integer NOT NULL,
    num_sources_per_list integer NOT NULL,
    num_labels integer NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE public.portal_bibliographysubscription OWNER TO vobcsljzmnwyjq;

--
-- Name: portal_permissions; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.portal_permissions (
    id uuid NOT NULL,
    has_bibliography boolean NOT NULL,
    has_password_manager boolean NOT NULL,
    has_tasks boolean NOT NULL,
    has_vpn boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.portal_permissions OWNER TO vobcsljzmnwyjq;

--
-- Name: portal_subscription; Type: TABLE; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE TABLE public.portal_subscription (
    id uuid NOT NULL,
    ends date
);


ALTER TABLE public.portal_subscription OWNER TO vobcsljzmnwyjq;

--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: bibliography_bibliographylist_labels id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylist_labels ALTER COLUMN id SET DEFAULT nextval('public.bibliography_bibliographylist_labels_id_seq'::regclass);


--
-- Name: blog_blogcategory id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogcategory ALTER COLUMN id SET DEFAULT nextval('public.blog_blogcategory_id_seq'::regclass);


--
-- Name: blog_blogcategory_blog id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogcategory_blog ALTER COLUMN id SET DEFAULT nextval('public.blog_blogcategory_blog_id_seq'::regclass);


--
-- Name: blog_blogentry id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogentry ALTER COLUMN id SET DEFAULT nextval('public.blog_blogentry_id_seq'::regclass);


--
-- Name: blog_blogimage id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogimage ALTER COLUMN id SET DEFAULT nextval('public.blog_blogimage_id_seq'::regclass);


--
-- Name: blog_blogimage_blog id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogimage_blog ALTER COLUMN id SET DEFAULT nextval('public.blog_blogimage_blog_id_seq'::regclass);


--
-- Name: cv_cv id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_cv ALTER COLUMN id SET DEFAULT nextval('public.cv_cv_id_seq'::regclass);


--
-- Name: cv_listitem id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_listitem ALTER COLUMN id SET DEFAULT nextval('public.cv_listitem_id_seq'::regclass);


--
-- Name: cv_skillslevel id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_skillslevel ALTER COLUMN id SET DEFAULT nextval('public.cv_skillslevel_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add list item	1	add_listitem
2	Can change list item	1	change_listitem
3	Can delete list item	1	delete_listitem
4	Can view list item	1	view_listitem
5	Can add event item	2	add_eventitem
6	Can change event item	2	change_eventitem
7	Can delete event item	2	delete_eventitem
8	Can view event item	2	view_eventitem
9	Can add skills level	3	add_skillslevel
10	Can change skills level	3	change_skillslevel
11	Can delete skills level	3	delete_skillslevel
12	Can view skills level	3	view_skillslevel
13	Can add cv	4	add_cv
14	Can change cv	4	change_cv
15	Can delete cv	4	delete_cv
16	Can view cv	4	view_cv
17	Can add personality	5	add_personality
18	Can change personality	5	change_personality
19	Can delete personality	5	delete_personality
20	Can view personality	5	view_personality
21	Can add language	6	add_language
22	Can change language	6	change_language
23	Can delete language	6	delete_language
24	Can view language	6	view_language
25	Can add interest	7	add_interest
26	Can change interest	7	change_interest
27	Can delete interest	7	delete_interest
28	Can view interest	7	view_interest
29	Can add log entry	8	add_logentry
30	Can change log entry	8	change_logentry
31	Can delete log entry	8	delete_logentry
32	Can view log entry	8	view_logentry
33	Can add permission	9	add_permission
34	Can change permission	9	change_permission
35	Can delete permission	9	delete_permission
36	Can view permission	9	view_permission
37	Can add group	10	add_group
38	Can change group	10	change_group
39	Can delete group	10	delete_group
40	Can view group	10	view_group
41	Can add user	11	add_user
42	Can change user	11	change_user
43	Can delete user	11	delete_user
44	Can view user	11	view_user
45	Can add content type	12	add_contenttype
46	Can change content type	12	change_contenttype
47	Can delete content type	12	delete_contenttype
48	Can view content type	12	view_contenttype
49	Can add session	13	add_session
50	Can change session	13	change_session
51	Can delete session	13	delete_session
52	Can view session	13	view_session
67	Can add contact item	34	add_contactitem
68	Can change contact item	34	change_contactitem
69	Can delete contact item	34	delete_contactitem
70	Can view contact item	34	view_contactitem
71	Can add blog entry	35	add_blogentry
72	Can change blog entry	35	change_blogentry
73	Can delete blog entry	35	delete_blogentry
74	Can view blog entry	35	view_blogentry
75	Can add blog category	36	add_blogcategory
76	Can change blog category	36	change_blogcategory
77	Can delete blog category	36	delete_blogcategory
78	Can view blog category	36	view_blogcategory
79	Can add blog image	37	add_blogimage
80	Can change blog image	37	change_blogimage
81	Can delete blog image	37	delete_blogimage
82	Can view blog image	37	view_blogimage
83	Can add permissions	38	add_permissions
84	Can change permissions	38	change_permissions
85	Can delete permissions	38	delete_permissions
86	Can view permissions	38	view_permissions
87	Can add subscription	39	add_subscription
88	Can change subscription	39	change_subscription
89	Can delete subscription	39	delete_subscription
90	Can view subscription	39	view_subscription
91	Can add bibliography subscription	40	add_bibliographysubscription
92	Can change bibliography subscription	40	change_bibliographysubscription
93	Can delete bibliography subscription	40	delete_bibliographysubscription
94	Can view bibliography subscription	40	view_bibliographysubscription
95	Can add bibliography source	41	add_bibliographysource
96	Can change bibliography source	41	change_bibliographysource
97	Can delete bibliography source	41	delete_bibliographysource
98	Can view bibliography source	41	view_bibliographysource
99	Can add bibliography author	42	add_bibliographyauthor
100	Can change bibliography author	42	change_bibliographyauthor
101	Can delete bibliography author	42	delete_bibliographyauthor
102	Can view bibliography author	42	view_bibliographyauthor
103	Can add bibliography list	43	add_bibliographylist
104	Can change bibliography list	43	change_bibliographylist
105	Can delete bibliography list	43	delete_bibliographylist
106	Can view bibliography list	43	view_bibliographylist
107	Can add bibliography label	44	add_bibliographylabel
108	Can change bibliography label	44	change_bibliographylabel
109	Can delete bibliography label	44	delete_bibliographylabel
110	Can view bibliography label	44	view_bibliographylabel
111	Can add bibliography editor	45	add_bibliographyeditor
112	Can change bibliography editor	45	change_bibliographyeditor
113	Can delete bibliography editor	45	delete_bibliographyeditor
114	Can view bibliography editor	45	view_bibliographyeditor
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$260000$WMtCSBsDCdFIziyTMzBcQC$BMmiqRnPD9yEucpDH2iP+B1i3DarLjpXrgAOI0wMWEE=	2022-06-25 11:54:32.176304+00	t	georgewaller	George	Waller	george.waller3@gmail.com	t	t	2021-10-13 10:50:27+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: bibliography_bibliographyauthor; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.bibliography_bibliographyauthor (id, type, first_name, last_name, organisation_name, source_id) FROM stdin;
\.


--
-- Data for Name: bibliography_bibliographyeditor; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.bibliography_bibliographyeditor (id, first_name, last_name, source_id) FROM stdin;
\.


--
-- Data for Name: bibliography_bibliographylabel; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.bibliography_bibliographylabel (id, name, colour, user_id) FROM stdin;
3958bf73-fde8-4af3-b0b6-12c74597dc0f	BML106	#ff0000	1
9cb1ec7f-ee56-4796-a657-79015d398107	BML106	#ff0000	1
c9963257-4796-431e-bfdd-4f86ecfdfb3b	DAP404	#00ff00	1
\.


--
-- Data for Name: bibliography_bibliographylist; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.bibliography_bibliographylist (id, name, style, user_id) FROM stdin;
d3cbc51e-9767-4f49-9cc6-11190f56f7b9	New Bibliography	HARVARD	1
6a4ed84d-da12-4449-b626-e38580290b35	Other bibliography	HARVARD	1
\.


--
-- Data for Name: bibliography_bibliographylist_labels; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.bibliography_bibliographylist_labels (id, bibliographylist_id, bibliographylabel_id) FROM stdin;
\.


--
-- Data for Name: bibliography_bibliographysource; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.bibliography_bibliographysource (id, title, date_published, edition, volumne_number, issue_number, publisher, publisher_place, page_range, doi, url, date_accessed, journal_name, website_name, database_name, notes, bibliography_list_id) FROM stdin;
\.


--
-- Data for Name: blog_blogcategory; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.blog_blogcategory (id, title, color_hex, ranking, cv_category) FROM stdin;
1	Coding	#374c80	1	t
2	Photography	#ff764a	2	f
\.


--
-- Data for Name: blog_blogcategory_blog; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.blog_blogcategory_blog (id, blogcategory_id, blogentry_id) FROM stdin;
1	1	1
2	1	2
3	2	3
4	2	4
5	2	5
6	2	6
7	2	7
8	2	8
9	2	9
\.


--
-- Data for Name: blog_blogentry; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.blog_blogentry (id, date, title, short_description, cover_image, content, draft) FROM stdin;
2	2021-01-18	To-do Tracker	A react web app to keep track of todos, the weather and a password manager	Screenshot_2021-10-18_at_11.32.23.webp	# About\r\nTo widen my skills I learnt the basics of React to make a site where I could track the things I needed to do. I chose React as I wanted to make a site which felt more responsive to use rather than sending requests through re-loading the page every time something was updated.\r\n\r\nI then later developed the site to get the latest weather from an API and have an encrypted password manager for myself which I use nearly every day. I chose Firebase for the backend as it handled all the database and hosting for me so I could focus on learning React and not have to simultaneously develop a backend for it.\r\n\r\n## Key Features\r\n- I used iterative development to improve the solution over time\r\n- Firebase is used for the hosting, database and authentication\r\n- Simple and clean design using the MaterialUI library\r\n\r\n### Links\r\n[Code on GitHub]('https://github.com/George9Waller/React_Todo_Web_App')\r\n[Live project]('https://todoapp-ccff9.web.app') (Login with Google required)	f
1	2020-11-15	Aldrich 75	A website to track the challenges undertaken by people and donations towards them as a group.	Screenshot_2021-10-16_at_14.28.55.webp	I built a website to track charity donations towards a campaign run at my college based on the challenges people uploaded.\r\n\r\n- I built the initial Flask backend in two nights to make a proof of concept\r\n- I worked with the organisers to develop the site for their needs\r\n- I re-styled the design more recently to improve the user experience\r\n\r\nLinks:\r\n[Code on GitHub]('https://github.com/George9Waller/Aldrich75')\r\n[Live site]('https://www.aldrich75.co.uk/') (SSL has expired)	f
6	2022-02-04	3: Brighton Coastline	A series of images taken across the Brighton coast during sunset	3_C_3.jpeg	These images were taken by Brighton Marina, Maderia Drive and the West Pier. They were all captured in a short space of time during sunset but despite being within 3h show a remarkable shift in colours and lighting.\r\n\r\nAt this time of day there is a golden glow to the light as shadows are cast by the low angle of the sun. And as it fades it leaves soft dark blue hues.\r\n\r\nAlthough Brighton is an urban environment these areas right on the coastal edge demonstrate how we have built our existence into the landscape to develop the places we live and work in. The natural features pre-date our urbanisation and as we continue to expand our human fingerprint there should be careful considerations to the what and how of our actions.	f
3	2021-10-21	Punk Gig: Young Francis Hi Fi, Mules & SKiNNY MiLK	I was the gig photographer for the Lewes Con Club's first punk night.	LewesConClub_JPEG.webp	I was asked to be the gig photographer at the [Lewes Con Club](https://www.lewesconclub.com/) for their first punk night featuring a few local punk bands. I thoroughly enjoyed this opportunity as it helped my extend my photography skills further into an area I have not had much experience in.\r\n\r\nBelow are the bands who I photographed and my main images from the night.\r\n- [Mules](https://mulesband.com/)\r\n- [Young Francis Hi Fi](https://www.facebook.com/yyoungfrancis/)\r\n- [SKiNNY MiLK](https://skinny-milk.bandcamp.com/)	f
4	2021-11-29	2: Winter	Series 2: Iceland Winter	2_A_2.jpeg	This is the second part to my photographic series exploring the different landscapes and climates through landscape and aerial photography.\r\n\r\nAll photos are available as prints on request from george@georgewaller.com	f
5	2020-08-31	1: Infrastructure	Series 1: Aerial Infrastructure	1_B_2.jpeg	The first part in my series looking at the different landscapes around us through photography. \r\n\r\nA journey through infrastructure is one which highlights those elements arguably critical to a society we embrace today. Looking to objectively explore the decisions we have made and are still making about how we path our journey, this collection invites the viewer to take a break and dwell on these ideas and the impacts they indirectly exert on our surroundings.\r\n\r\nAll photos are available for prints, please email george@georgewaller.com	f
7	2022-04-19	5: Southern Norway	A collection of images taken in the South of Norway	5_A_9.jpg	In Easter 2022 I drove around the southern part of Norway experiencing both the high up snowy areas and fjords.\r\n\r\nThese images look at the textures and feelings found in the landscape and the activities going on around us in remote areas.\r\n\r\nFor more information and prints please contact me via email: george@georgewaller.com	f
8	2022-02-26	4: Maldon	A selection of images taken over Maldon on the Blackwater Estuary	4_A_6.jpg	These images look at the coastal activity on the estuary.\r\n\r\nFor more information or prints contact george@georgewaller.com	f
9	2022-06-06	6: Maritime Industry	A collection of images focusing on industry in Croatia	6_A_1.jpeg	A collection of images focusing on industrial activities in Croatia.\r\n\r\nFor more information or prints please contact george@georgewaller.com	f
\.


--
-- Data for Name: blog_blogimage; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.blog_blogimage (id, title, image) FROM stdin;
67	2_E_6	2_E_6.jpeg
10	HiFi_10	HiFi_10_JPEG_GeorgeWaller.webp
11	HiFi_11	HiFi_11_JPEG_GeorgeWaller.webp
12	HiFi_12	HiFi_12_JPEG_GeorgeWaller.webp
13	HiFi_13	HiFi_13_JPEG_GeorgeWaller.webp
23	Mules_10	Mules_10_JPEG_GeorgeWaller.webp
34	SKiNNY_MiLK_10	SKiNNYMiLK_10_JPEG_GeorgeWaller.webp
35	SKiNNY_MiLK_11	SKiNNYMiLK_11_JPEG_GeorgeWaller.webp
36	SKiNNY_MiLK_12	SKiNNYMiLK_12_JPEG_GeorgeWaller.webp
68	1_A_1	1_A_1.jpeg
33	SKiNNY_MiLK_09	SKiNNYMiLK_9_JPEG_GeorgeWaller.webp
32	SKiNNY_MiLK_08	SKiNNYMiLK_8_JPEG_GeorgeWaller.webp
31	SKiNNY_MiLK_07	SKiNNYMiLK_7_JPEG_GeorgeWaller.webp
69	1_A_2	1_A_2.jpeg
30	SKiNNY_MiLK_06	SKiNNYMiLK_6_JPEG_GeorgeWaller.webp
29	SKiNNY_MiLK_05	SKiNNYMiLK_5_JPEG_GeorgeWaller.webp
28	SKiNNY_MiLK_04	SKiNNYMiLK_4_JPEG_GeorgeWaller.webp
70	1_B_1	1_B_1.jpeg
27	SKiNNY_MiLK_03	SKiNNYMiLK_3_JPEG_GeorgeWaller.webp
26	SKiNNY_MiLK_02	SKiNNYMiLK_2_JPEG_GeorgeWaller.webp
25	SKiNNY_MiLK_01	SKiNNYMiLK_1_JPEG_GeorgeWaller.webp
24	Mules_11	Mules_11_JPEG_GeorgeWaller.webp
22	Mules_09	Mules_9_JPEG_GeorgeWaller.webp
21	Mules_08	Mules_8_JPEG_GeorgeWaller.webp
20	Mules_07	Mules_7_JPEG_GeorgeWaller.webp
19	Mules_06	Mules_6_JPEG_GeorgeWaller.webp
18	Mules_05	Mules_5_JPEG_GeorgeWaller.webp
17	Mules_04	Mules_4_JPEG_GeorgeWaller.webp
16	Mules_03	Mules_3_JPEG_GeorgeWaller.webp
15	Mules_02	Mules_2_JPEG_GeorgeWaller.webp
14	Mules_01	Mules_1_JPEG_GeorgeWaller.webp
9	HiFi_09	HiFi_9_JPEG_GeorgeWaller.webp
8	HiFi_08	HiFi_8_JPEG_GeorgeWaller.webp
7	HiFi_07	HiFi_7_JPEG_GeorgeWaller.webp
6	HiFi_06	HiFi_6_JPEG_GeorgeWaller.webp
5	HiFi_05	HiFi_5_JPEG_GeorgeWaller.webp
4	HiFi_04	HiFi_4_JPEG_GeorgeWaller.webp
3	HiFi_03	HiFi_3_JPEG_GeorgeWaller.webp
2	HiFi_02	HiFi_2_JPEG_GeorgeWaller.webp
1	HiFi_01	HiFi_1_JPEG_GeorgeWaller.webp
37	2_A_1	2_A_1.jpeg
38	2_A_2	2_A_2_ow4jxhB.jpeg
39	2_A_3	2_A_3.jpeg
40	2_A_4	2_A_4.jpeg
41	2_A_5	2_A_5.jpeg
42	2_A_6	2_A_6.jpeg
43	2_A_7	2_A_7.jpeg
44	2_A_8	2_A_8.jpeg
45	2_B_1	2_B_1.jpeg
46	2_B_2	2_B_2.jpeg
47	2_B_3	2_B_3.jpeg
48	2_B_4	2_B_4.jpeg
49	2_B_5	2_B_5.jpeg
50	2_B_6	2_B_6.jpeg
51	2_C_1	2_C_1.jpeg
52	2_C_2	2_C_2.jpeg
53	2_C_3	2_C_3.jpeg
54	2_C_4	2_C_4.jpeg
55	2_C_5	2_C_5.jpeg
56	2_C_6	2_C_6.jpeg
57	2_C_7	2_C_7.jpeg
58	2_C_8	2_C_8.jpeg
59	2_D_1	2_D_1.jpeg
60	2_D_2	2_D_2.jpeg
61	2_D_3	2_D_3.jpeg
62	2_E_1	2_E_1.jpeg
63	2_E_2	2_E_2.jpeg
64	2_E_3	2_E_3.jpeg
65	2_E_4	2_E_4.jpeg
66	2_E_5	2_E_5.jpeg
71	1_B_2	1_B_2_3xbJUEc.jpeg
72	1_B_3	1_B_3.jpeg
73	1_B_4	1_B_4.jpeg
74	1_C_1	1_C_1.jpeg
75	1_C_2	1_C_2.jpeg
76	1_C_3	1_C_3.jpeg
77	1_C_4	1_C_4.jpeg
78	1_C_5	1_C_5.jpeg
79	1_C_6	1_C_6.jpeg
80	1_C_7	1_C_7.jpeg
81	1_D_1	1_D_1.jpeg
82	1_D_2	1_D_2.jpeg
83	1_D_3	1_D_3.jpeg
84	1_D_4	1_D_4.jpeg
85	3_A_1	3_A_1.jpeg
86	3_A_2	3_A_2.jpeg
87	3_A_3	3_A_3.jpeg
88	3_A_4	3_A_4.jpeg
89	3_B_1	3_B_1.jpeg
90	3_B_2	3_B_2.jpeg
91	3_B_3	3_B_3.jpeg
92	3_B_4	3_B_4.jpeg
93	3_C_1	3_C_1.jpeg
94	3_C_2	3_C_2.jpeg
95	3_C_3	3_C_3_jyUQqbu.jpeg
96	3_C_4	3_C_4.jpeg
97	3_C_5	3_C_5.jpeg
98	3_C_6	3_C_6.jpeg
99	5_A_1	5_A_1.jpg
100	5_A_2	5_A_2.jpg
101	5_A_3	5_A_3.jpg
102	5_A_4	5_A_4.jpg
103	5_A_5	5_A_5.jpg
104	5_A_6	5_A_6.jpg
105	5_A_7	5_A_7.jpg
106	5_A_8	5_A_8.jpg
107	5_A_9	5_A_9_ufgkiO6.jpg
108	5_B_1	5_B_1.jpg
109	5_B_2	5_B_2.jpg
110	5_B_3	5_B_3.jpg
111	5_B_4	5_B_4.jpg
112	5_B_5	5_B_5.jpg
113	5_B_6	5_B_6.jpg
114	5_B_7	5_B_7.jpg
115	5_B_8	5_B_8.jpg
116	5_C_1	5_C_1.jpg
117	5_C_2	5_C_2.jpg
118	5_C_3	5_C_3.jpg
119	5_C_4	5_C_4.jpg
120	5_C_5	5_C_5.jpg
121	5_C_6	5_C_6.jpg
122	5_C_7	5_C_7.jpg
123	5_C_8	5_C_8.jpg
124	5_C_9	5_C_9.jpg
125	5_D_1	5_D_1.jpg
126	5_D_2	5_D_2.jpg
127	5_D_3	5_D_3.jpg
128	5_D_4	5_D_4.jpg
129	5_D_5	5_D_5.jpg
132	5_D_8	5_D_8.jpg
133	5_D_9	5_D_9.jpg
135	5_E_2	5_E_2.jpg
138	5_E_5	5_E_5.jpg
141	5_F_1	5_F_1.jpg
146	5_F_6	5_F_6.jpg
147	5_F_7	5_F_7.jpg
130	5_D_6	5_D_6.jpg
131	5_D_7	5_D_7.jpg
134	5_E_1	5_E_1.jpg
136	5_E_3	5_E_3.jpg
137	5_E_4	5_E_4.jpg
139	5_E_6	5_E_6.jpg
140	5_E_7	5_E_7.jpg
142	5_F_2	5_F_2.jpg
143	5_F_3	5_F_3.jpg
144	5_F_4	5_F_4.jpg
145	5_F_5	5_F_5.jpg
148	5_F_8	5_F_8.jpg
149	4_A_1	4_A_1.jpg
150	4_A_2	4_A_2.jpg
151	4_A_3	4_A_3.jpg
152	4_A_4	4_A_4.jpg
153	4_A_5	4_A_5.jpg
154	4_A_6	4_A_6_NrWgG6Q.jpg
155	4_A_7	4_A_7.jpg
156	6_A_1	6_A_1_n3ynxHr.jpeg
157	6_A_2	6_A_2.jpeg
158	6_A_3	6_A_3.jpeg
159	6_A_4	6_A_4.jpeg
160	6_A_5	6_A_5.jpeg
161	6_A_6	6_A_6.jpeg
162	6_A_7	6_A_7.jpeg
163	6_A_8	6_A_8.jpeg
164	6_A_9	6_A_9.jpeg
165	6_B_1	6_B_1.jpeg
166	6_B_2	6_B_2.jpeg
167	6_B_3	6_B_3.jpeg
168	6_B_4	6_B_4.jpeg
169	6_C_1	6_C_1.jpeg
170	6_C_2	6_C_2.jpeg
171	6_C_3	6_C_3.jpeg
172	6_C_4	6_C_4.jpeg
173	6_C_5	6_C_5.jpeg
174	6_C_6	6_C_6.jpeg
175	6_C_7	6_C_7.jpeg
176	6_C_8	6_C_8.jpeg
177	6_D_1	6_D_1.jpeg
178	6_D_2	6_D_2.jpeg
179	6_D_3	6_D_3.jpeg
180	6_D_4	6_D_4.jpeg
181	6_D_5	6_D_5.jpeg
182	6_D_6	6_D_6.jpeg
183	6_D_7	6_D_7.jpeg
184	6_D_8	6_D_8.jpeg
185	6_D_9	6_D_9.jpeg
\.


--
-- Data for Name: blog_blogimage_blog; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.blog_blogimage_blog (id, blogimage_id, blogentry_id) FROM stdin;
1	1	3
2	2	3
3	3	3
4	4	3
5	5	3
6	6	3
7	7	3
8	8	3
9	9	3
10	10	3
11	11	3
12	12	3
13	13	3
14	14	3
15	15	3
16	16	3
17	17	3
18	18	3
19	19	3
20	20	3
21	21	3
22	22	3
23	23	3
24	24	3
25	25	3
26	26	3
27	27	3
28	28	3
29	29	3
30	30	3
31	31	3
32	32	3
33	33	3
34	34	3
35	35	3
36	36	3
37	37	4
38	38	4
39	39	4
40	40	4
41	41	4
42	42	4
43	43	4
44	44	4
45	45	4
46	46	4
47	47	4
48	48	4
49	49	4
50	50	4
51	51	4
52	52	4
53	53	4
54	54	4
55	55	4
56	56	4
57	57	4
58	58	4
59	59	4
60	60	4
61	61	4
62	62	4
63	63	4
64	64	4
65	65	4
66	66	4
67	67	4
68	68	5
69	69	5
70	70	5
71	71	5
72	72	5
73	73	5
74	74	5
75	75	5
76	76	5
77	77	5
78	78	5
79	79	5
80	80	5
81	81	5
82	82	5
83	83	5
84	84	5
85	85	6
86	86	6
87	87	6
88	88	6
89	89	6
90	90	6
91	91	6
92	92	6
93	93	6
94	94	6
95	95	6
96	96	6
97	97	6
98	98	6
99	99	7
100	100	7
101	101	7
102	102	7
103	103	7
104	104	7
105	105	7
106	106	7
107	107	7
108	108	7
109	109	7
110	110	7
111	111	7
112	112	7
113	113	7
114	114	7
115	115	7
116	116	7
117	117	7
118	118	7
119	119	7
120	120	7
121	121	7
122	122	7
123	123	7
124	124	7
125	125	7
126	126	7
127	127	7
128	128	7
129	129	7
130	130	7
131	131	7
132	132	7
133	133	7
134	134	7
135	135	7
136	136	7
137	137	7
138	138	7
139	139	7
140	140	7
141	141	7
142	142	7
143	143	7
144	144	7
145	145	7
146	146	7
147	147	7
148	148	7
149	149	8
150	150	8
151	151	8
152	152	8
153	153	8
154	154	8
155	155	8
156	156	9
157	157	9
158	158	9
159	159	9
162	162	9
163	163	9
164	164	9
167	167	9
169	169	9
170	170	9
173	173	9
175	175	9
177	177	9
178	178	9
160	160	9
161	161	9
165	165	9
166	166	9
168	168	9
171	171	9
172	172	9
174	174	9
176	176	9
179	179	9
180	180	9
181	181	9
182	182	9
183	183	9
184	184	9
185	185	9
\.


--
-- Data for Name: cv_contactitem; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.cv_contactitem (listitem_ptr_id, cv_id) FROM stdin;
50	1
51	1
52	1
53	1
54	1
\.


--
-- Data for Name: cv_cv; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.cv_cv (id, name, role, about, profile_picture) FROM stdin;
1	George Waller	Web Developer	<p><span style="font-weight: 400;">I am a python web developer and a computer science enthusiast with skills in full stack python web development. During the lockdown I developed my skills in coding due to my extra time and would consider myself to be able to code at a professional standard and I am now employed as a web developer. I regard myself as language ambivalent and I love to learn new tech stacks.<br /></span></p>	IMG_20211008_000309_08611.jpg
\.


--
-- Data for Name: cv_eventitem; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.cv_eventitem (listitem_ptr_id, location, subtitle, start_date, end_date, cv_id) FROM stdin;
48	University of Chichester	\N	2021-09-14	2026-07-01	1
47	Brighton College	\N	2019-09-01	2021-06-01	1
46	Brighton College	\N	2016-09-01	2019-06-01	1
49	Dabapps	\N	2021-07-05	\N	1
\.


--
-- Data for Name: cv_interest; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.cv_interest (listitem_ptr_id, cv_id) FROM stdin;
7	1
\.


--
-- Data for Name: cv_language; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.cv_language (listitem_ptr_id, cv_id) FROM stdin;
2	1
1	1
\.


--
-- Data for Name: cv_listitem; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.cv_listitem (id, title, description, link, icon_html, ranking, skill_level_id) FROM stdin;
7	Photography	<p><span style="font-weight: 400;">I like to use photography to explore different perspectives on our surroundings. I particularly focus on aerial, urban, wildlife and landscapes, and I am open to trying out all kinds of work. I post some of my work on the projects page on this site and am open to inquires.<br /></span></p>	https://www.georgewaller.com/projects/?category=Photography	<i class="fas fa-camera"></i>	1	\N
2	French	<p>Conversational</p>	\N	🇫🇷	2	\N
1	English	<p>Native</p>	\N	🏴󠁧󠁢󠁥󠁮󠁧󠁿	1	\N
3	Self Motivated	<p><span style="font-weight: 400;">I work hard to achieve the best results for myself and my client.</span></p>	\N	\N	1	\N
4	Focused	<p><span style="font-weight: 400;">I make sure everything works and looks exactly as intended everytime.</span></p>	\N	\N	2	\N
5	Multitasking	<p><span style="font-weight: 400;">I can dip between different tasks when needed to prioritise my work.</span></p>	\N	\N	3	\N
6	Problem Solving	<p><span style="font-weight: 400;">I strive to innovate and achieve a solution by whatever means it takes.</span></p>	\N	\N	4	\N
41	Responsive Design		\N	\N	1	34
42	Firebase		\N	\N	2	34
43	C#		\N	\N	3	34
44	SEO		\N	\N	2	34
8	Python		\N	<i class="fab fa-python fa-lg"></i>	1	1
10	HTML		\N	<i class="fab fa-html5 fa-lg"></i>	3	1
9	JavaScript		\N	<i class="fab fa-js fa-lg"></i>	2	1
45	Heroku		\N	\N	4	1
48	Degree Apprenticeship	<p>I am currently studying part-time for a degree apprenticeship in Digital &amp; Technology Solutions (Software Engineering).</p>	https://www.chi.ac.uk/search/course-search/degree-apprenticeships/our-degree-apprenticeships/digital-and-technology-solutions-professional-software-engineer-degree-apprenticeship	<i class="fas fa-graduation-cap"></i>	1	\N
47	A-Levels	<p>I studied 3 A-Levels in Computer Science, Photography and Theatre Studies achieving A*A*A*&nbsp; at the UK&rsquo;s independent school of the decade.</p>	\N	<i class="fas fa-graduation-cap"></i>	1	\N
46	GCSEs	<p>4x9s, 2x8s, 1xA*, 1xA, 2x6s in French, Chemistry, Physics, Maths, Biology, Spanish, Computer Science, Further Maths, English Language, English Literature.</p>	\N	<i class="fas fa-graduation-cap"></i>	1	\N
50	Brighton, UK		\N	<i class="fas fa-map-marker-alt"></i>	10	\N
51	+44 7894 846744		tel:+447894846744	<i class="fas fa-phone"></i>	20	\N
52	george.waller3@gmail.com		mailto:george.waller3@gmail.com	<i class="fas fa-at"></i>	30	\N
53	George9Waller		https://github.com/George9Waller	<i class="fab fa-github"></i>	40	\N
54	George Waller		https://www.linkedin.com/in/georgewaller/	<i class="fab fa-linkedin"></i>	50	\N
49	Apprentice Software Engineer	<p>I am a web developer working on Django backend and React frontend web apps using an agile dev method.</p>	https://www.dabapps.com/	<i class="fas fa-briefcase"></i>	1	\N
\.


--
-- Data for Name: cv_personality; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.cv_personality (listitem_ptr_id, cv_id) FROM stdin;
3	1
4	1
5	1
6	1
\.


--
-- Data for Name: cv_skillslevel; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.cv_skillslevel (id, title, cv_id, ranking) FROM stdin;
34	Familiar	1	2
1	Confident	1	1
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2021-10-13 11:21:39.027585+00	1	George Waller	1	[{"added": {}}, {"added": {"name": "language", "object": "English"}}]	4	1
2	2021-10-13 14:37:14.074838+00	1	George Waller	2	[{"changed": {"fields": ["About"]}}]	4	1
3	2021-10-13 14:57:35.483193+00	1	English	2	[{"changed": {"fields": ["Icon html"]}}]	6	1
4	2021-10-13 14:58:13.762795+00	2	French	1	[{"added": {}}]	6	1
5	2021-10-13 15:25:02.686094+00	1	English	2	[]	6	1
6	2021-10-13 16:03:59.276773+00	3	Self Motivated	1	[{"added": {}}]	5	1
7	2021-10-13 16:04:33.477451+00	4	Focused	1	[{"added": {}}]	5	1
8	2021-10-13 16:04:46.283574+00	5	Multitasking	1	[{"added": {}}]	5	1
9	2021-10-13 16:05:04.447098+00	6	Problem Solving	1	[{"added": {}}]	5	1
10	2021-10-13 16:24:12.256361+00	7	Photography	1	[{"added": {}}]	7	1
11	2021-10-13 16:24:32.825695+00	7	Photography	2	[{"changed": {"fields": ["Icon html"]}}]	7	1
12	2021-10-13 16:54:59.977998+00	1	Confident	1	[{"added": {}}, {"added": {"name": "list item", "object": "Python"}}, {"added": {"name": "list item", "object": "JavaScript"}}, {"added": {"name": "list item", "object": "HTML"}}]	3	1
45	2021-10-15 09:54:20.344982+00	34	Familiar	1	[{"added": {}}, {"added": {"name": "list item", "object": "Responsive Design"}}, {"added": {"name": "list item", "object": "Firebase"}}, {"added": {"name": "list item", "object": "C#"}}, {"added": {"name": "list item", "object": "SEO"}}]	3	1
46	2021-10-15 10:42:10.388048+00	10	HTML	2	[{"changed": {"fields": ["Icon html"]}}]	1	1
47	2021-10-15 10:44:56.789723+00	9	JavaScript	2	[{"changed": {"fields": ["Icon html"]}}]	1	1
48	2021-10-15 10:45:30.713934+00	8	Python	2	[{"changed": {"fields": ["Icon html"]}}]	1	1
49	2021-10-15 10:46:21.599051+00	10	HTML	2	[{"changed": {"fields": ["Icon html"]}}]	1	1
50	2021-10-15 11:36:17.542589+00	1	Confident	2	[{"added": {"name": "list item", "object": "Heroku"}}, {"changed": {"name": "list item", "object": "HTML", "fields": ["Ranking"]}}, {"changed": {"name": "list item", "object": "JavaScript", "fields": ["Ranking"]}}]	3	1
51	2021-10-15 14:18:34.823214+00	1	George Waller	2	[{"changed": {"fields": ["Profile picture", "Phone number no spaces", "Github display text", "Linked in display text"]}}]	4	1
52	2021-10-15 14:59:51.770385+00	46	GCSEs	1	[{"added": {}}]	2	1
53	2021-10-15 15:01:46.287083+00	46	GCSEs	2	[{"changed": {"fields": ["Cv"]}}]	2	1
54	2021-10-15 15:03:21.240637+00	47	A-Levels	1	[{"added": {}}]	2	1
55	2021-10-15 15:14:46.879794+00	47	A-Levels	2	[{"changed": {"fields": ["Icon html"]}}]	2	1
56	2021-10-15 15:15:00.073058+00	46	GCSEs	2	[{"changed": {"fields": ["Icon html"]}}]	2	1
57	2021-10-15 15:43:19.131261+00	48	Degree Apprenticeship	1	[{"added": {}}]	2	1
58	2021-10-15 15:47:11.66657+00	49	Apprentice Software Engineer	1	[{"added": {}}]	2	1
59	2021-10-15 16:06:50.22198+00	49	Apprentice Software Engineer	2	[{"changed": {"fields": ["Description"]}}]	2	1
60	2021-10-15 16:11:12.862616+00	47	A-Levels	2	[{"changed": {"fields": ["Description", "Start date"]}}]	2	1
61	2021-10-15 16:11:27.88999+00	46	GCSEs	2	[{"changed": {"fields": ["Description"]}}]	2	1
62	2021-10-15 18:13:41.496835+00	1	George Waller	2	[{"added": {"name": "contact item", "object": "Brighton, UK"}}, {"added": {"name": "contact item", "object": "+44 7894 846744"}}, {"added": {"name": "contact item", "object": "george.waller3@gmail.com"}}, {"added": {"name": "contact item", "object": "George9Waller"}}, {"added": {"name": "contact item", "object": "George Waller"}}]	4	1
63	2021-10-15 18:56:20.098826+00	1	George Waller	2	[{"changed": {"fields": ["Role"]}}]	4	1
64	2021-10-15 19:00:46.183828+00	49	Apprentice Software Engineer	2	[{"changed": {"fields": ["Description"]}}]	2	1
65	2021-10-16 13:44:35.037966+00	1	BlogEntry object (1)	1	[{"added": {}}, {"added": {"name": "blog category", "object": "BlogCategory object (1)"}}]	35	1
66	2021-10-16 13:56:46.965386+00	1	Coding	2	[{"changed": {"fields": ["Cv cateogry"]}}]	36	1
67	2021-10-16 16:02:03.514077+00	1	Coding	2	[{"changed": {"fields": ["Color hex"]}}]	36	1
68	2021-10-18 10:41:47.138651+00	2	BlogEntry object (2)	1	[{"added": {}}]	35	1
69	2021-10-18 11:33:11.010836+00	1	Coding	2	[{"changed": {"fields": ["Blog"]}}]	36	1
70	2021-10-24 21:36:24.221863+00	1	George Waller	2	[{"changed": {"fields": ["About"]}}, {"changed": {"name": "interest", "object": "Photography", "fields": ["Description", "Link"]}}]	4	1
71	2021-10-25 11:35:28.103257+00	2	To-do Tracker [2021-01-18] | A react web app to keep track of todos, the weather and a password manager	2	[{"changed": {"fields": ["Cover image"]}}]	35	1
72	2021-10-25 11:35:56.771694+00	1	Aldrich 75 [2020-11-15] | A website to track the challenges undertaken by people and donations towards them as a group.	2	[{"changed": {"fields": ["Cover image"]}}]	35	1
73	2021-10-25 14:46:59.488094+00	7	Photography	2	[{"changed": {"fields": ["Icon html"]}}]	7	1
74	2021-10-25 17:29:49.814796+00	3	Punk Gig: Young Francis Hi Fi, Mules & SKiNNY MiLK [2021-10-21] | I was the gig photographer for the Lewes Con Club's first punk night.	1	[{"added": {}}]	35	1
75	2021-10-25 17:30:56.784375+00	3	Punk Gig: Young Francis Hi Fi, Mules & SKiNNY MiLK [2021-10-21] | I was the gig photographer for the Lewes Con Club's first punk night.	2	[{"changed": {"fields": ["Draft"]}}]	35	1
76	2021-10-25 17:31:36.175466+00	2	Photography | #ff764a	1	[{"added": {}}]	36	1
77	2021-10-25 17:34:29.296383+00	1	HiFi_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
78	2021-10-25 17:34:37.689483+00	1	HiFi_1 | blog.BlogEntry.None	2	[]	37	1
79	2021-10-25 17:35:53.574731+00	2	HiFi_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
80	2021-10-25 17:39:41.646004+00	3	Punk Gig: Young Francis Hi Fi, Mules & SKiNNY MiLK [2021-10-21] | I was the gig photographer for the Lewes Con Club's first punk night.	2	[{"changed": {"fields": ["Draft"]}}]	35	1
81	2021-10-25 18:19:35.361301+00	3	HiFi_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
82	2021-10-25 18:19:48.363559+00	4	HiFi_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
83	2021-10-25 18:20:00.564681+00	5	HiFi_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
84	2021-10-25 18:20:11.153606+00	6	HiFi_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
85	2021-10-25 18:20:20.920686+00	7	HiFi_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
86	2021-10-25 18:20:32.631364+00	8	HiFi_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
87	2021-10-25 18:20:46.028644+00	9	HiFi_9 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
88	2021-10-25 18:20:55.860606+00	10	HiFi_10 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
89	2021-10-25 18:21:05.433116+00	11	HiFi_11 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
90	2021-10-25 18:21:14.803718+00	12	HiFi_12 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
91	2021-10-25 18:21:24.402018+00	13	HiFi_13 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
92	2021-10-25 18:22:39.473685+00	14	Mules_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
93	2021-10-25 18:22:49.750438+00	15	Mules_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
94	2021-10-25 18:22:58.60068+00	16	Mules_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
95	2021-10-25 18:23:07.891058+00	17	Mules_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
98	2021-10-25 18:23:44.975036+00	20	Mules_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
99	2021-10-25 18:23:54.219876+00	21	Mules_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
100	2021-10-25 18:24:05.83734+00	22	Mules_9 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
103	2021-10-25 18:24:44.077263+00	25	SKiNNY_MiLK_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
104	2021-10-25 18:24:52.164332+00	26	SKiNNY_MiLK_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
107	2021-10-25 18:25:16.711+00	29	SKiNNY_MiLK_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
112	2021-10-25 18:25:58.979841+00	34	SKiNNY_MiLK_10 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
114	2021-10-25 18:26:14.665298+00	36	SKiNNY_MiLK_12 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
96	2021-10-25 18:23:17.207096+00	18	Mules_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
97	2021-10-25 18:23:36.270621+00	19	Mules_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
101	2021-10-25 18:24:14.477169+00	23	Mules_10 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
102	2021-10-25 18:24:22.425405+00	24	Mules_11 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
105	2021-10-25 18:24:59.300784+00	27	SKiNNY_MiLK_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
106	2021-10-25 18:25:06.905461+00	28	SKiNNY_MiLK_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
108	2021-10-25 18:25:25.705243+00	30	SKiNNY_MiLK_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
109	2021-10-25 18:25:33.46955+00	31	SKiNNY_MiLK_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
110	2021-10-25 18:25:41.89354+00	32	SKiNNY_MiLK_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
111	2021-10-25 18:25:50.975499+00	33	SKiNNY_MiLK_9 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
113	2021-10-25 18:26:06.408039+00	35	SKiNNY_MiLK_11 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
115	2021-10-25 18:33:27.678929+00	33	SKiNNY_MiLK_9 | blog.BlogEntry.None	2	[]	37	1
116	2021-10-25 18:33:33.616317+00	33	SKiNNY_MiLK_09 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
117	2021-10-25 18:33:37.080676+00	32	SKiNNY_MiLK_08 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
118	2021-10-25 18:33:40.316254+00	31	SKiNNY_MiLK_07 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
119	2021-10-25 18:33:43.518844+00	30	SKiNNY_MiLK_06 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
120	2021-10-25 18:33:48.064714+00	30	SKiNNY_MiLK_06 | blog.BlogEntry.None	2	[]	37	1
121	2021-10-25 18:33:52.088216+00	29	SKiNNY_MiLK_05 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
122	2021-10-25 18:33:55.171356+00	28	SKiNNY_MiLK_04 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
123	2021-10-25 18:33:58.179597+00	27	SKiNNY_MiLK_03 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
124	2021-10-25 18:34:02.383696+00	27	SKiNNY_MiLK_03 | blog.BlogEntry.None	2	[]	37	1
125	2021-10-25 18:34:06.361484+00	26	SKiNNY_MiLK_02 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
126	2021-10-25 18:34:10.095978+00	25	SKiNNY_MiLK_01 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
127	2021-10-25 18:34:13.817169+00	24	Mules_11 | blog.BlogEntry.None	2	[]	37	1
128	2021-10-25 18:34:19.649893+00	22	Mules_09 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
129	2021-10-25 18:34:23.517503+00	21	Mules_08 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
130	2021-10-25 18:34:28.652365+00	20	Mules_07 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
131	2021-10-25 18:34:32.387183+00	19	Mules_06 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
132	2021-10-25 18:34:36.973964+00	18	Mules_05 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
133	2021-10-25 18:34:40.792289+00	17	Mules_04 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
134	2021-10-25 18:34:44.586048+00	16	Mules_03 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
135	2021-10-25 18:34:49.608706+00	15	Mules_02 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
136	2021-10-25 18:34:54.031007+00	14	Mules_01 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
137	2021-10-25 18:34:58.192161+00	9	HiFi_09 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
138	2021-10-25 18:35:04.596345+00	8	HiFi_08 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
139	2021-10-25 18:35:08.644936+00	7	HiFi_07 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
140	2021-10-25 18:35:12.639514+00	6	HiFi_06 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
141	2021-10-25 18:35:16.112684+00	5	HiFi_05 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
142	2021-10-25 18:35:19.751914+00	4	HiFi_04 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
143	2021-10-25 18:35:23.549454+00	3	HiFi_03 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
144	2021-10-25 18:35:28.007996+00	2	HiFi_02 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
145	2021-10-25 18:35:31.475935+00	1	HiFi_01 | blog.BlogEntry.None	2	[{"changed": {"fields": ["Title"]}}]	37	1
146	2021-12-14 14:35:09.272784+00	4	2 [2021-11-29] | Series 2: Iceland Winter	1	[{"added": {}}]	35	1
147	2021-12-14 14:35:27.297845+00	2	Photography | #ff764a	2	[{"changed": {"fields": ["Blog"]}}]	36	1
148	2021-12-14 14:35:50.876846+00	37	2_A_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
149	2021-12-14 14:36:04.200787+00	38	2_A_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
150	2021-12-14 14:36:13.523803+00	39	2_A_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
151	2021-12-14 14:36:29.470877+00	40	2_A_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
152	2021-12-14 14:36:41.417806+00	41	2_A_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
153	2021-12-14 14:36:50.071626+00	42	2_A_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
154	2021-12-14 14:36:59.611734+00	43	2_A_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
155	2021-12-14 14:37:07.918036+00	44	2_A_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
156	2021-12-14 14:37:25.489191+00	45	2_B_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
157	2021-12-14 14:37:33.928229+00	46	2_B_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
158	2021-12-14 14:37:43.388061+00	47	2_B_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
159	2021-12-14 14:37:55.036518+00	48	2_B_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
160	2021-12-14 14:38:03.604562+00	49	2_B_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
161	2021-12-14 14:38:12.968207+00	50	2_B_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
162	2021-12-14 14:38:21.754799+00	51	2_C_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
163	2021-12-14 14:38:30.937156+00	52	2_C_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
164	2021-12-14 14:38:39.130335+00	53	2_C_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
165	2021-12-14 14:38:47.934799+00	54	2_C_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
166	2021-12-14 14:38:57.055545+00	55	2_C_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
167	2021-12-14 14:39:06.611751+00	56	2_C_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
168	2021-12-14 14:39:16.266648+00	57	2_C_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
169	2021-12-14 14:39:25.002035+00	58	2_C_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
170	2021-12-14 14:39:33.179593+00	59	2_D_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
171	2021-12-14 14:39:42.030952+00	60	2_D_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
172	2021-12-14 14:39:50.516963+00	61	2_D_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
173	2021-12-14 14:40:06.830473+00	62	2_E_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
174	2021-12-14 14:40:15.716015+00	63	2_E_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
176	2021-12-14 14:40:31.48612+00	65	2_E_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
178	2021-12-14 14:40:51.508503+00	67	2_E_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
175	2021-12-14 14:40:23.985273+00	64	2_E_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
177	2021-12-14 14:40:40.192642+00	66	2_E_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
179	2021-12-14 14:48:28.319569+00	4	2: Winter [2021-11-29] | Series 2: Iceland Winter	2	[{"changed": {"fields": ["Title", "content"]}}]	35	1
180	2021-12-14 15:06:20.32484+00	5	1: Infrastructure [2020-08-31] | Series 1: Aerial Infrastructure	1	[{"added": {}}]	35	1
181	2021-12-14 15:06:30.484787+00	2	Photography | #ff764a	2	[{"changed": {"fields": ["Blog"]}}]	36	1
182	2021-12-14 15:07:02.434005+00	68	1_A_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
183	2021-12-14 15:07:18.480491+00	69	1_A_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
184	2021-12-14 15:07:29.353396+00	70	1_B_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
185	2021-12-14 15:07:41.39119+00	71	1_B_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
186	2021-12-14 15:07:51.093274+00	72	1_B_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
187	2021-12-14 15:08:00.157402+00	73	1_B_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
188	2021-12-14 15:08:10.022978+00	74	1_C_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
189	2021-12-14 15:08:18.953243+00	75	1_C_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
190	2021-12-14 15:08:28.679171+00	76	1_C_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
191	2021-12-14 15:08:38.750006+00	77	1_C_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
192	2021-12-14 15:08:47.930995+00	78	1_C_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
193	2021-12-14 15:08:56.98004+00	79	1_C_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
194	2021-12-14 15:09:06.050469+00	80	1_C_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
195	2021-12-14 15:09:15.61529+00	81	1_D_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
196	2021-12-14 15:09:24.770933+00	82	1_D_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
197	2021-12-14 15:09:32.185042+00	83	1_D_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
198	2021-12-14 15:09:47.731809+00	84	1_D_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
199	2021-12-30 10:45:50.284927+00	1	georgewaller	2	[{"changed": {"fields": ["First name", "Last name"]}}]	11	1
232	2021-12-31 12:46:58.196076+00	3958bf73-fde8-4af3-b0b6-12c74597dc0f	BibliographyLabel object (3958bf73-fde8-4af3-b0b6-12c74597dc0f)	1	[{"added": {}}]	44	1
233	2021-12-31 12:47:27.252802+00	9cb1ec7f-ee56-4796-a657-79015d398107	BibliographyLabel object (9cb1ec7f-ee56-4796-a657-79015d398107)	1	[{"added": {}}]	44	1
234	2021-12-31 12:47:39.967641+00	c9963257-4796-431e-bfdd-4f86ecfdfb3b	BibliographyLabel object (c9963257-4796-431e-bfdd-4f86ecfdfb3b)	1	[{"added": {}}]	44	1
235	2022-02-07 23:31:22.986118+00	6	3. Brighton Coastline [2022-02-04] | A series of images taken across the Brighton coast during sunset	1	[{"added": {}}]	35	1
236	2022-02-07 23:31:33.901863+00	6	3: Brighton Coastline [2022-02-04] | A series of images taken across the Brighton coast during sunset	2	[{"changed": {"fields": ["Title"]}}]	35	1
237	2022-02-07 23:31:54.603482+00	85	3_A_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
238	2022-02-07 23:32:08.416479+00	86	3_A_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
239	2022-02-07 23:32:18.889364+00	87	3_A_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
240	2022-02-07 23:32:28.590729+00	88	3_A_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
241	2022-02-07 23:32:38.183666+00	89	3_B_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
242	2022-02-07 23:32:47.282011+00	90	3_B_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
243	2022-02-07 23:32:55.932237+00	91	3_B_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
244	2022-02-07 23:33:05.715574+00	92	3_B_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
245	2022-02-07 23:33:14.829275+00	93	3_C_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
246	2022-02-07 23:33:24.670912+00	94	3_C_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
247	2022-02-07 23:33:33.337212+00	95	3_C_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
248	2022-02-07 23:33:41.014854+00	96	3_C_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
249	2022-02-07 23:33:50.068661+00	97	3_C_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
250	2022-02-07 23:34:03.281832+00	98	3_C_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
251	2022-02-07 23:34:30.51628+00	2	Photography | #ff764a	2	[{"changed": {"fields": ["Blog"]}}]	36	1
252	2022-05-07 23:26:47.271999+00	7	5: Southern Norway [2022-04-19] | A collection of images taken in the South of Norway	1	[{"added": {}}]	35	1
253	2022-05-07 23:27:15.294802+00	99	5_A_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
254	2022-05-07 23:27:26.240623+00	100	5_A_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
255	2022-05-07 23:27:35.575483+00	101	5_A_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
256	2022-05-07 23:27:44.778793+00	102	5_A_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
257	2022-05-07 23:27:54.865819+00	103	5_A_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
258	2022-05-07 23:28:06.540079+00	104	5_A_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
259	2022-05-07 23:28:15.88612+00	105	5_A_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
260	2022-05-07 23:28:25.018983+00	106	5_A_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
261	2022-05-07 23:28:34.86179+00	107	5_A_9 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
262	2022-05-07 23:28:44.705235+00	108	5_B_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
263	2022-05-07 23:28:54.908304+00	109	5_B_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
264	2022-05-07 23:29:05.053341+00	110	5_B_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
265	2022-05-07 23:29:14.475688+00	111	5_B_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
266	2022-05-07 23:29:25.477108+00	112	5_B_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
267	2022-05-07 23:29:35.354172+00	113	5_B_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
268	2022-05-07 23:29:45.013367+00	114	5_B_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
269	2022-05-07 23:30:06.200113+00	115	5_B_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
270	2022-05-07 23:30:14.756221+00	116	5_C_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
271	2022-05-07 23:30:27.973094+00	117	5_C_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
272	2022-05-07 23:30:38.270853+00	118	5_C_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
273	2022-05-07 23:36:38.6422+00	119	5_C_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
274	2022-05-07 23:36:49.84944+00	120	5_C_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
275	2022-05-07 23:39:41.17646+00	121	5_C_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
276	2022-05-07 23:39:55.246129+00	122	5_C_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
277	2022-05-07 23:40:06.67235+00	123	5_C_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
278	2022-05-07 23:40:16.094922+00	124	5_C_9 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
279	2022-05-07 23:40:27.592442+00	125	5_D_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
280	2022-05-07 23:40:36.958372+00	126	5_D_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
281	2022-05-07 23:40:46.415473+00	127	5_D_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
282	2022-05-07 23:40:55.378624+00	128	5_D_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
283	2022-05-07 23:41:04.839288+00	129	5_D_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
286	2022-05-07 23:41:34.088119+00	132	5_D_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
287	2022-05-07 23:41:42.638401+00	133	5_D_9 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
289	2022-05-07 23:42:06.763977+00	135	5_E_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
292	2022-05-07 23:42:39.180783+00	138	5_E_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
295	2022-05-07 23:43:06.615426+00	141	5_F_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
300	2022-05-07 23:43:54.311683+00	146	5_F_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
301	2022-05-07 23:44:04.768068+00	147	5_F_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
303	2022-05-07 23:44:25.936279+00	7	5: Southern Norway [2022-04-19] | A collection of images taken in the South of Norway	2	[{"changed": {"fields": ["Draft"]}}]	35	1
304	2022-05-07 23:44:48.974035+00	2	Photography | #ff764a	2	[{"changed": {"fields": ["Blog"]}}]	36	1
284	2022-05-07 23:41:15.930318+00	130	5_D_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
285	2022-05-07 23:41:25.312025+00	131	5_D_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
288	2022-05-07 23:41:55.672485+00	134	5_E_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
290	2022-05-07 23:42:15.677764+00	136	5_E_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
291	2022-05-07 23:42:27.395177+00	137	5_E_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
293	2022-05-07 23:42:48.097467+00	139	5_E_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
294	2022-05-07 23:42:57.823049+00	140	5_E_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
296	2022-05-07 23:43:16.303722+00	142	5_F_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
297	2022-05-07 23:43:25.737947+00	143	5_F_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
298	2022-05-07 23:43:36.895201+00	144	5_F_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
299	2022-05-07 23:43:45.880171+00	145	5_F_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
302	2022-05-07 23:44:13.939045+00	148	5_F_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
305	2022-05-14 11:03:43.265225+00	8	4: Maldon [2022-02-26] | A selection of images taken over Maldon on the Blackwater Estuary	1	[{"added": {}}]	35	1
306	2022-05-14 11:03:53.308508+00	2	Photography | #ff764a	2	[{"changed": {"fields": ["Blog"]}}]	36	1
307	2022-05-14 11:04:06.243432+00	149	4_A_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
308	2022-05-14 11:04:14.07543+00	150	4_A_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
309	2022-05-14 11:04:22.779667+00	151	4_A_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
310	2022-05-14 11:04:33.940301+00	152	4_A_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
311	2022-05-14 11:04:44.974083+00	153	4_A_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
312	2022-05-14 11:04:53.609145+00	154	4_A_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
313	2022-05-14 11:05:01.602214+00	155	4_A_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
314	2022-06-25 11:59:52.215861+00	9	6: Maritime Industry [2022-06-06] | A collection of images focusing on industry in Croatia	1	[{"added": {}}]	35	1
315	2022-06-25 12:00:02.403915+00	2	Photography | #ff764a	2	[{"changed": {"fields": ["Blog"]}}]	36	1
316	2022-06-25 12:00:21.405979+00	156	6_A_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
317	2022-06-25 12:00:31.466689+00	157	6_A_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
318	2022-06-25 12:00:40.995996+00	158	6_A_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
319	2022-06-25 12:00:49.14017+00	159	6_A_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
320	2022-06-25 12:01:00.379933+00	160	6_A_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
321	2022-06-25 12:01:09.043627+00	161	6_A_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
322	2022-06-25 12:01:19.314101+00	162	6_A_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
323	2022-06-25 12:01:28.215859+00	163	6_A_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
324	2022-06-25 12:01:39.407859+00	164	6_A_9 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
325	2022-06-25 12:01:48.859131+00	165	6_B_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
326	2022-06-25 12:01:58.479885+00	166	6_B_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
327	2022-06-25 12:02:07.134129+00	167	6_B_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
328	2022-06-25 12:02:17.314354+00	168	6_B_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
329	2022-06-25 12:02:26.073035+00	169	6_C_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
330	2022-06-25 12:02:36.039424+00	170	6_C_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
331	2022-06-25 12:02:44.771196+00	171	6_C_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
332	2022-06-25 12:02:53.130966+00	172	6_C_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
333	2022-06-25 12:03:06.364051+00	173	6_C_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
334	2022-06-25 12:03:16.741363+00	174	6_C_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
335	2022-06-25 12:03:26.998888+00	175	6_C_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
336	2022-06-25 12:03:37.386284+00	176	6_C_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
337	2022-06-25 12:03:46.975447+00	177	6_D_1 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
338	2022-06-25 12:03:56.369537+00	178	6_D_2 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
339	2022-06-25 12:04:04.569849+00	179	6_D_3 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
340	2022-06-25 12:04:12.265994+00	180	6_D_4 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
341	2022-06-25 12:04:19.752237+00	181	6_D_5 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
342	2022-06-25 12:04:27.339454+00	182	6_D_6 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
343	2022-06-25 12:04:39.714375+00	183	6_D_7 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
344	2022-06-25 12:04:49.237686+00	184	6_D_8 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
345	2022-06-25 12:04:58.287001+00	185	6_D_9 | blog.BlogEntry.None	1	[{"added": {}}]	37	1
346	2022-06-25 12:05:07.258226+00	9	6: Maritime Industry [2022-06-06] | A collection of images focusing on industry in Croatia	2	[{"changed": {"fields": ["Draft"]}}]	35	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	cv	listitem
2	cv	eventitem
3	cv	skillslevel
4	cv	cv
5	cv	personality
6	cv	language
7	cv	interest
8	admin	logentry
9	auth	permission
10	auth	group
11	auth	user
12	contenttypes	contenttype
13	sessions	session
34	cv	contactitem
35	blog	blogentry
36	blog	blogcategory
37	blog	blogimage
38	portal	permissions
39	portal	subscription
40	portal	bibliographysubscription
41	bibliography	bibliographysource
42	bibliography	bibliographyauthor
43	bibliography	bibliographylist
44	bibliography	bibliographylabel
45	bibliography	bibliographyeditor
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-10-13 10:49:42.062737+00
2	auth	0001_initial	2021-10-13 10:49:43.180882+00
3	admin	0001_initial	2021-10-13 10:49:43.508965+00
4	admin	0002_logentry_remove_auto_add	2021-10-13 10:49:43.611085+00
5	admin	0003_logentry_add_action_flag_choices	2021-10-13 10:49:43.767024+00
6	contenttypes	0002_remove_content_type_name	2021-10-13 10:49:44.002866+00
7	auth	0002_alter_permission_name_max_length	2021-10-13 10:49:44.179723+00
8	auth	0003_alter_user_email_max_length	2021-10-13 10:49:44.362923+00
9	auth	0004_alter_user_username_opts	2021-10-13 10:49:44.50966+00
10	auth	0005_alter_user_last_login_null	2021-10-13 10:49:44.684416+00
11	auth	0006_require_contenttypes_0002	2021-10-13 10:49:44.814599+00
12	auth	0007_alter_validators_add_error_messages	2021-10-13 10:49:44.960884+00
13	auth	0008_alter_user_username_max_length	2021-10-13 10:49:45.152333+00
14	auth	0009_alter_user_last_name_max_length	2021-10-13 10:49:45.330135+00
15	auth	0010_alter_group_name_max_length	2021-10-13 10:49:45.500392+00
16	auth	0011_update_proxy_permissions	2021-10-13 10:49:45.651379+00
17	auth	0012_alter_user_first_name_max_length	2021-10-13 10:49:45.821868+00
18	cv	0001_initial	2021-10-13 10:49:46.550621+00
19	cv	0002_auto_20211013_1033	2021-10-13 10:49:47.388604+00
20	cv	0003_auto_20211013_1045	2021-10-13 10:49:48.663464+00
21	sessions	0001_initial	2021-10-13 10:49:48.925888+00
22	cv	0004_listitem_ranking	2021-10-13 11:18:41.430143+00
23	cv	0005_alter_listitem_options	2021-10-13 11:20:29.129198+00
24	cv	0006_auto_20211013_1653	2021-10-13 16:53:13.979371+00
25	cv	0007_auto_20211013_1654	2021-10-13 16:54:56.033068+00
58	cv	0008_auto_20211015_1333	2021-10-15 13:33:45.815457+00
59	cv	0009_cv_profile_picture	2021-10-15 14:03:21.596395+00
60	cv	0010_cv_phone_number_no_spaces	2021-10-15 14:05:03.623033+00
61	cv	0011_alter_listitem_skill_level	2021-10-15 14:17:10.646317+00
62	cv	0012_alter_eventitem_subtitle	2021-10-15 14:59:06.71127+00
63	cv	0013_eventitem_cv	2021-10-15 15:01:31.003661+00
64	cv	0014_auto_20211015_1806	2021-10-15 18:06:17.838792+00
65	blog	0001_initial	2021-10-16 11:52:12.250648+00
66	blog	0002_blogcategory	2021-10-16 13:34:44.771071+00
67	blog	0003_auto_20211016_1346	2021-10-16 13:47:01.517049+00
68	blog	0004_blogcategory_cv_cateogry	2021-10-16 13:56:02.940214+00
69	blog	0005_rename_cv_cateogry_blogcategory_cv_category	2021-10-16 13:59:16.079967+00
70	blog	0006_auto_20211018_1131	2021-10-18 11:31:28.456981+00
71	blog	0007_blogimage	2021-10-25 17:01:34.851825+00
72	blog	0008_blogcategory_draft	2021-10-25 17:06:15.001076+00
73	blog	0009_auto_20211025_1730	2021-10-25 17:30:46.605934+00
74	blog	0010_alter_blogimage_options	2021-10-25 18:19:00.357847+00
75	portal	0001_initial	2021-12-30 16:58:23.361366+00
76	bibliography	0001_initial	2021-12-30 17:18:57.299251+00
77	bibliography	0002_auto_20211230_1748	2021-12-30 17:48:48.205426+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
bm88ddmpc8fwcbrnbbx2vl5xzhnica1v	.eJxVjEsOwjAMBe-SNYrcxHERS_acIbIdlxZQKvWzqrg7VOoCtm9m3uYyr0uf19mmPBR3cY07_W7C-rS6g_Lgeh-9jnWZBvG74g86-9tY7HU93L-Dnuf-W0dUaqkDK4zduZUEEhKRgnQQgwAGsqJoxgqNEAtEZgJUwyamqO79Aex7ODE:1mabqF:_lwSRg_6pAXz0VkljiAV0JdR85O-B1j-tYh2SOa6raY	2021-10-27 10:50:35.250576+00
rcia599acgabmlrnvqzghq20umivfrj4	.eJxVjEsOwiAUAO_C2hBeKC24dO8ZyPuAVA1NSrtqvLsh6UK3M5M5VMR9K3FvaY2zqKsCdfllhPxKtQt5Yn0smpe6rTPpnujTNn1fJL1vZ_s3KNhK36JNkjl4NuwBrFgyxORGDN6BIwMEA_NIEMCLOJMyTy7nbCfvHQ7q8wX4tThY:1mekzu:uc9Z-scTqUmr4cKljnk1Yrfo1KyFB1B_hAFO_Brt8Qs	2021-11-07 21:25:42.734903+00
a8b2zw0be5yx8h4xpixrnpald8ck0ysd	.eJxVjEsOwiAUAO_C2hBeKC24dO8ZyPuAVA1NSrtqvLsh6UK3M5M5VMR9K3FvaY2zqKsCdfllhPxKtQt5Yn0smpe6rTPpnujTNn1fJL1vZ_s3KNhK36JNkjl4NuwBrFgyxORGDN6BIwMEA_NIEMCLOJMyTy7nbCfvHQ7q8wX4tThY:1meyEp:fSaiiLYdTX7DpqIAXYppRurdUuhgcQKdpM0h25MMU24	2021-11-08 11:33:59.139682+00
76hioz9djva6tjkk2jq9ewll5miekhg5	.eJxVjEsOwiAUAO_C2hBeKC24dO8ZyPuAVA1NSrtqvLsh6UK3M5M5VMR9K3FvaY2zqKsCdfllhPxKtQt5Yn0smpe6rTPpnujTNn1fJL1vZ_s3KNhK36JNkjl4NuwBrFgyxORGDN6BIwMEA_NIEMCLOJMyTy7nbCfvHQ7q8wX4tThY:1mf2pc:7_91FWKmGhNs-BwrwO8TQUwWcG4wdOA8PDBZwaqUGKs	2021-11-08 16:28:16.633499+00
3iyebkl2mpzh43640mmwjng6vkndrh1k	.eJxVjEsOwiAUAO_C2hBeKC24dO8ZyPuAVA1NSrtqvLsh6UK3M5M5VMR9K3FvaY2zqKsCdfllhPxKtQt5Yn0smpe6rTPpnujTNn1fJL1vZ_s3KNhK36JNkjl4NuwBrFgyxORGDN6BIwMEA_NIEMCLOJMyTy7nbCfvHQ7q8wX4tThY:1mj0Kd:49abkQAoWVj-r7OcSQZtyfd-NEhuFNp3o7DyxEORD2A	2021-11-19 14:36:39.246762+00
enyj0oevumlsgwk6mjns3cvhlnyohohs	.eJxVjEsOwiAUAO_C2hBeKC24dO8ZyPuAVA1NSrtqvLsh6UK3M5M5VMR9K3FvaY2zqKsCdfllhPxKtQt5Yn0smpe6rTPpnujTNn1fJL1vZ_s3KNhK36JNkjl4NuwBrFgyxORGDN6BIwMEA_NIEMCLOJMyTy7nbCfvHQ7q8wX4tThY:1mx8rC:-kh9hyPOxuWGRrZtzfjwM56dJBalGRkuxC55ue304uE	2021-12-28 14:32:42.071853+00
42861898h17ntzdlb2j9c3n71nwgbdaf	.eJxVjEEOwiAQRe_C2hBamA516d4zNMwwSNVAUtqV8e7apAvd_vfef6kpbGuetibLNEd1Vp06_W4U-CFlB_Eeyq1qrmVdZtK7og_a9LVGeV4O9-8gh5a_NUMPaJlMoj55kcHZNBhHTgzR2NnA5Dy7EQCFAyJBZOQUnSdMgKTeH_k_OMs:1n2xug:OgeSBuzeARHqHf7MEjP_iJs2DPFte8i_OYhQuctT_Mg	2022-01-13 16:04:22.418127+00
u41sapbhi6vx81s19mqq4mw56srbz956	.eJxVjEEOwiAQAP_C2ZAF6lI8evcNzbJLpWogKe3J-HdD0oNeZybzVhPtW572ltZpEXVRRp1-WSR-ptKFPKjcq-ZatnWJuif6sE3fqqTX9Wj_Bpla7lvEmT04PyIZEGsQyBKO1llP5uws8-CM82FAjMI2QGDHfpYEBoKA-nwBqds2mA:1nHDIl:zIIIhBpodSyvCptORjshWVCCJEVs84XZNonsWsqNtY8	2022-02-21 23:20:07.121064+00
rvtyequbfkoh2debwf0v82hfos79h1la	.eJxVjEEOwiAQAP_C2ZAF6lI8evcNzbJLpWogKe3J-HdD0oNeZybzVhPtW572ltZpEXVRRp1-WSR-ptKFPKjcq-ZatnWJuif6sE3fqqTX9Wj_Bpla7lvEmT04PyIZEGsQyBKO1llP5uws8-CM82FAjMI2QGDHfpYEBoKA-nwBqds2mA:1nnTPr:rvTAiF3M4MbAi4vIQk5sjm9eFxk5y6ZT-fMmUzciys8	2022-05-21 23:00:47.69695+00
musnkm92fbv2v6i5wn9up0kcyqq0wrse	.eJxVjEEOwiAQAP_C2ZAF6lI8evcNzbJLpWogKe3J-HdD0oNeZybzVhPtW572ltZpEXVRRp1-WSR-ptKFPKjcq-ZatnWJuif6sE3fqqTX9Wj_Bpla7lvEmT04PyIZEGsQyBKO1llP5uws8-CM82FAjMI2QGDHfpYEBoKA-nwBqds2mA:1o54My:VR7_BbZVS60atzFpHocieP3A2AG_NikvjGvod2Yz5oA	2022-07-09 11:54:32.184337+00
\.


--
-- Data for Name: portal_bibliographysubscription; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.portal_bibliographysubscription (subscription_ptr_id, num_lists, num_sources_per_list, num_labels, permission_id) FROM stdin;
\.


--
-- Data for Name: portal_permissions; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.portal_permissions (id, has_bibliography, has_password_manager, has_tasks, has_vpn, user_id) FROM stdin;
\.


--
-- Data for Name: portal_subscription; Type: TABLE DATA; Schema: public; Owner: vobcsljzmnwyjq
--

COPY public.portal_subscription (id, ends) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 114, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 33, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: bibliography_bibliographylist_labels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.bibliography_bibliographylist_labels_id_seq', 1, false);


--
-- Name: blog_blogcategory_blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.blog_blogcategory_blog_id_seq', 9, true);


--
-- Name: blog_blogcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.blog_blogcategory_id_seq', 2, true);


--
-- Name: blog_blogentry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.blog_blogentry_id_seq', 9, true);


--
-- Name: blog_blogimage_blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.blog_blogimage_blog_id_seq', 185, true);


--
-- Name: blog_blogimage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.blog_blogimage_id_seq', 185, true);


--
-- Name: cv_cv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.cv_cv_id_seq', 33, true);


--
-- Name: cv_listitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.cv_listitem_id_seq', 54, true);


--
-- Name: cv_skillslevel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.cv_skillslevel_id_seq', 34, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 346, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 45, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vobcsljzmnwyjq
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 77, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: bibliography_bibliographylist_labels bibliography_bibliograph_bibliographylist_id_bibl_214407a2_uniq; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylist_labels
    ADD CONSTRAINT bibliography_bibliograph_bibliographylist_id_bibl_214407a2_uniq UNIQUE (bibliographylist_id, bibliographylabel_id);


--
-- Name: bibliography_bibliographyauthor bibliography_bibliographyauthor_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographyauthor
    ADD CONSTRAINT bibliography_bibliographyauthor_pkey PRIMARY KEY (id);


--
-- Name: bibliography_bibliographyeditor bibliography_bibliographyeditor_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographyeditor
    ADD CONSTRAINT bibliography_bibliographyeditor_pkey PRIMARY KEY (id);


--
-- Name: bibliography_bibliographylabel bibliography_bibliographylabel_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylabel
    ADD CONSTRAINT bibliography_bibliographylabel_pkey PRIMARY KEY (id);


--
-- Name: bibliography_bibliographylist_labels bibliography_bibliographylist_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylist_labels
    ADD CONSTRAINT bibliography_bibliographylist_labels_pkey PRIMARY KEY (id);


--
-- Name: bibliography_bibliographylist bibliography_bibliographylist_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylist
    ADD CONSTRAINT bibliography_bibliographylist_pkey PRIMARY KEY (id);


--
-- Name: bibliography_bibliographysource bibliography_bibliographysource_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographysource
    ADD CONSTRAINT bibliography_bibliographysource_pkey PRIMARY KEY (id);


--
-- Name: blog_blogcategory_blog blog_blogcategory_blog_blogcategory_id_blogentr_c667c0bd_uniq; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogcategory_blog
    ADD CONSTRAINT blog_blogcategory_blog_blogcategory_id_blogentr_c667c0bd_uniq UNIQUE (blogcategory_id, blogentry_id);


--
-- Name: blog_blogcategory_blog blog_blogcategory_blog_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogcategory_blog
    ADD CONSTRAINT blog_blogcategory_blog_pkey PRIMARY KEY (id);


--
-- Name: blog_blogcategory blog_blogcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogcategory
    ADD CONSTRAINT blog_blogcategory_pkey PRIMARY KEY (id);


--
-- Name: blog_blogentry blog_blogentry_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogentry
    ADD CONSTRAINT blog_blogentry_pkey PRIMARY KEY (id);


--
-- Name: blog_blogimage_blog blog_blogimage_blog_blogimage_id_blogentry_id_7b308f29_uniq; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogimage_blog
    ADD CONSTRAINT blog_blogimage_blog_blogimage_id_blogentry_id_7b308f29_uniq UNIQUE (blogimage_id, blogentry_id);


--
-- Name: blog_blogimage_blog blog_blogimage_blog_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogimage_blog
    ADD CONSTRAINT blog_blogimage_blog_pkey PRIMARY KEY (id);


--
-- Name: blog_blogimage blog_blogimage_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogimage
    ADD CONSTRAINT blog_blogimage_pkey PRIMARY KEY (id);


--
-- Name: cv_contactitem cv_contactitem_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_contactitem
    ADD CONSTRAINT cv_contactitem_pkey PRIMARY KEY (listitem_ptr_id);


--
-- Name: cv_cv cv_cv_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_cv
    ADD CONSTRAINT cv_cv_pkey PRIMARY KEY (id);


--
-- Name: cv_eventitem cv_eventitem_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_eventitem
    ADD CONSTRAINT cv_eventitem_pkey PRIMARY KEY (listitem_ptr_id);


--
-- Name: cv_interest cv_interest_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_interest
    ADD CONSTRAINT cv_interest_pkey PRIMARY KEY (listitem_ptr_id);


--
-- Name: cv_language cv_language_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_language
    ADD CONSTRAINT cv_language_pkey PRIMARY KEY (listitem_ptr_id);


--
-- Name: cv_listitem cv_listitem_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_listitem
    ADD CONSTRAINT cv_listitem_pkey PRIMARY KEY (id);


--
-- Name: cv_personality cv_personality_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_personality
    ADD CONSTRAINT cv_personality_pkey PRIMARY KEY (listitem_ptr_id);


--
-- Name: cv_skillslevel cv_skillslevel_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_skillslevel
    ADD CONSTRAINT cv_skillslevel_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: portal_bibliographysubscription portal_bibliographysubscription_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.portal_bibliographysubscription
    ADD CONSTRAINT portal_bibliographysubscription_pkey PRIMARY KEY (subscription_ptr_id);


--
-- Name: portal_permissions portal_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.portal_permissions
    ADD CONSTRAINT portal_permissions_pkey PRIMARY KEY (id);


--
-- Name: portal_permissions portal_permissions_user_id_key; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.portal_permissions
    ADD CONSTRAINT portal_permissions_user_id_key UNIQUE (user_id);


--
-- Name: portal_subscription portal_subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.portal_subscription
    ADD CONSTRAINT portal_subscription_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: bibliography_bibliographyauthor_source_id_66687421; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX bibliography_bibliographyauthor_source_id_66687421 ON public.bibliography_bibliographyauthor USING btree (source_id);


--
-- Name: bibliography_bibliographyeditor_source_id_1df6cc59; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX bibliography_bibliographyeditor_source_id_1df6cc59 ON public.bibliography_bibliographyeditor USING btree (source_id);


--
-- Name: bibliography_bibliographyl_bibliographylabel_id_5047ab03; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX bibliography_bibliographyl_bibliographylabel_id_5047ab03 ON public.bibliography_bibliographylist_labels USING btree (bibliographylabel_id);


--
-- Name: bibliography_bibliographyl_bibliographylist_id_d04eef22; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX bibliography_bibliographyl_bibliographylist_id_d04eef22 ON public.bibliography_bibliographylist_labels USING btree (bibliographylist_id);


--
-- Name: bibliography_bibliographylabel_user_id_c21e7666; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX bibliography_bibliographylabel_user_id_c21e7666 ON public.bibliography_bibliographylabel USING btree (user_id);


--
-- Name: bibliography_bibliographylist_user_id_56d90979; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX bibliography_bibliographylist_user_id_56d90979 ON public.bibliography_bibliographylist USING btree (user_id);


--
-- Name: bibliography_bibliographysource_bibliography_list_id_92fc39f7; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX bibliography_bibliographysource_bibliography_list_id_92fc39f7 ON public.bibliography_bibliographysource USING btree (bibliography_list_id);


--
-- Name: blog_blogcategory_blog_blogcategory_id_935b266b; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX blog_blogcategory_blog_blogcategory_id_935b266b ON public.blog_blogcategory_blog USING btree (blogcategory_id);


--
-- Name: blog_blogcategory_blog_blogentry_id_33654843; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX blog_blogcategory_blog_blogentry_id_33654843 ON public.blog_blogcategory_blog USING btree (blogentry_id);


--
-- Name: blog_blogimage_blog_blogentry_id_cd822fdb; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX blog_blogimage_blog_blogentry_id_cd822fdb ON public.blog_blogimage_blog USING btree (blogentry_id);


--
-- Name: blog_blogimage_blog_blogimage_id_37a4aab1; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX blog_blogimage_blog_blogimage_id_37a4aab1 ON public.blog_blogimage_blog USING btree (blogimage_id);


--
-- Name: cv_contactitem_cv_id_dd2f1db0; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX cv_contactitem_cv_id_dd2f1db0 ON public.cv_contactitem USING btree (cv_id);


--
-- Name: cv_eventitem_cv_id_8f0559ef; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX cv_eventitem_cv_id_8f0559ef ON public.cv_eventitem USING btree (cv_id);


--
-- Name: cv_interest_cv_id_a0bf752d; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX cv_interest_cv_id_a0bf752d ON public.cv_interest USING btree (cv_id);


--
-- Name: cv_language_cv_id_d77132a4; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX cv_language_cv_id_d77132a4 ON public.cv_language USING btree (cv_id);


--
-- Name: cv_listitem_skill_level_id_9ea343c4; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX cv_listitem_skill_level_id_9ea343c4 ON public.cv_listitem USING btree (skill_level_id);


--
-- Name: cv_personality_cv_id_83627e96; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX cv_personality_cv_id_83627e96 ON public.cv_personality USING btree (cv_id);


--
-- Name: cv_skillslevel_cv_id_e3c39cf6; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX cv_skillslevel_cv_id_e3c39cf6 ON public.cv_skillslevel USING btree (cv_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: portal_bibliographysubscription_permission_id_a524e705; Type: INDEX; Schema: public; Owner: vobcsljzmnwyjq
--

CREATE INDEX portal_bibliographysubscription_permission_id_a524e705 ON public.portal_bibliographysubscription USING btree (permission_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bibliography_bibliographysource bibliography_bibliog_bibliography_list_id_92fc39f7_fk_bibliogra; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographysource
    ADD CONSTRAINT bibliography_bibliog_bibliography_list_id_92fc39f7_fk_bibliogra FOREIGN KEY (bibliography_list_id) REFERENCES public.bibliography_bibliographylist(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bibliography_bibliographylist_labels bibliography_bibliog_bibliographylabel_id_5047ab03_fk_bibliogra; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylist_labels
    ADD CONSTRAINT bibliography_bibliog_bibliographylabel_id_5047ab03_fk_bibliogra FOREIGN KEY (bibliographylabel_id) REFERENCES public.bibliography_bibliographylabel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bibliography_bibliographylist_labels bibliography_bibliog_bibliographylist_id_d04eef22_fk_bibliogra; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylist_labels
    ADD CONSTRAINT bibliography_bibliog_bibliographylist_id_d04eef22_fk_bibliogra FOREIGN KEY (bibliographylist_id) REFERENCES public.bibliography_bibliographylist(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bibliography_bibliographyeditor bibliography_bibliog_source_id_1df6cc59_fk_bibliogra; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographyeditor
    ADD CONSTRAINT bibliography_bibliog_source_id_1df6cc59_fk_bibliogra FOREIGN KEY (source_id) REFERENCES public.bibliography_bibliographysource(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bibliography_bibliographyauthor bibliography_bibliog_source_id_66687421_fk_bibliogra; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographyauthor
    ADD CONSTRAINT bibliography_bibliog_source_id_66687421_fk_bibliogra FOREIGN KEY (source_id) REFERENCES public.bibliography_bibliographysource(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bibliography_bibliographylabel bibliography_bibliographylabel_user_id_c21e7666_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylabel
    ADD CONSTRAINT bibliography_bibliographylabel_user_id_c21e7666_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bibliography_bibliographylist bibliography_bibliographylist_user_id_56d90979_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.bibliography_bibliographylist
    ADD CONSTRAINT bibliography_bibliographylist_user_id_56d90979_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: blog_blogcategory_blog blog_blogcategory_bl_blogcategory_id_935b266b_fk_blog_blog; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogcategory_blog
    ADD CONSTRAINT blog_blogcategory_bl_blogcategory_id_935b266b_fk_blog_blog FOREIGN KEY (blogcategory_id) REFERENCES public.blog_blogcategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: blog_blogcategory_blog blog_blogcategory_bl_blogentry_id_33654843_fk_blog_blog; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogcategory_blog
    ADD CONSTRAINT blog_blogcategory_bl_blogentry_id_33654843_fk_blog_blog FOREIGN KEY (blogentry_id) REFERENCES public.blog_blogentry(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: blog_blogimage_blog blog_blogimage_blog_blogentry_id_cd822fdb_fk_blog_blogentry_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogimage_blog
    ADD CONSTRAINT blog_blogimage_blog_blogentry_id_cd822fdb_fk_blog_blogentry_id FOREIGN KEY (blogentry_id) REFERENCES public.blog_blogentry(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: blog_blogimage_blog blog_blogimage_blog_blogimage_id_37a4aab1_fk_blog_blogimage_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.blog_blogimage_blog
    ADD CONSTRAINT blog_blogimage_blog_blogimage_id_37a4aab1_fk_blog_blogimage_id FOREIGN KEY (blogimage_id) REFERENCES public.blog_blogimage(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_contactitem cv_contactitem_cv_id_dd2f1db0_fk_cv_cv_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_contactitem
    ADD CONSTRAINT cv_contactitem_cv_id_dd2f1db0_fk_cv_cv_id FOREIGN KEY (cv_id) REFERENCES public.cv_cv(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_contactitem cv_contactitem_listitem_ptr_id_bfd65603_fk_cv_listitem_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_contactitem
    ADD CONSTRAINT cv_contactitem_listitem_ptr_id_bfd65603_fk_cv_listitem_id FOREIGN KEY (listitem_ptr_id) REFERENCES public.cv_listitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_eventitem cv_eventitem_cv_id_8f0559ef_fk_cv_cv_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_eventitem
    ADD CONSTRAINT cv_eventitem_cv_id_8f0559ef_fk_cv_cv_id FOREIGN KEY (cv_id) REFERENCES public.cv_cv(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_eventitem cv_eventitem_listitem_ptr_id_e441c32d_fk_cv_listitem_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_eventitem
    ADD CONSTRAINT cv_eventitem_listitem_ptr_id_e441c32d_fk_cv_listitem_id FOREIGN KEY (listitem_ptr_id) REFERENCES public.cv_listitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_interest cv_interest_cv_id_a0bf752d_fk_cv_cv_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_interest
    ADD CONSTRAINT cv_interest_cv_id_a0bf752d_fk_cv_cv_id FOREIGN KEY (cv_id) REFERENCES public.cv_cv(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_interest cv_interest_listitem_ptr_id_5b211fc5_fk_cv_listitem_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_interest
    ADD CONSTRAINT cv_interest_listitem_ptr_id_5b211fc5_fk_cv_listitem_id FOREIGN KEY (listitem_ptr_id) REFERENCES public.cv_listitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_language cv_language_cv_id_d77132a4_fk_cv_cv_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_language
    ADD CONSTRAINT cv_language_cv_id_d77132a4_fk_cv_cv_id FOREIGN KEY (cv_id) REFERENCES public.cv_cv(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_language cv_language_listitem_ptr_id_39af5039_fk_cv_listitem_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_language
    ADD CONSTRAINT cv_language_listitem_ptr_id_39af5039_fk_cv_listitem_id FOREIGN KEY (listitem_ptr_id) REFERENCES public.cv_listitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_listitem cv_listitem_skill_level_id_9ea343c4_fk_cv_skillslevel_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_listitem
    ADD CONSTRAINT cv_listitem_skill_level_id_9ea343c4_fk_cv_skillslevel_id FOREIGN KEY (skill_level_id) REFERENCES public.cv_skillslevel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_personality cv_personality_cv_id_83627e96_fk_cv_cv_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_personality
    ADD CONSTRAINT cv_personality_cv_id_83627e96_fk_cv_cv_id FOREIGN KEY (cv_id) REFERENCES public.cv_cv(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_personality cv_personality_listitem_ptr_id_dc06d9f6_fk_cv_listitem_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_personality
    ADD CONSTRAINT cv_personality_listitem_ptr_id_dc06d9f6_fk_cv_listitem_id FOREIGN KEY (listitem_ptr_id) REFERENCES public.cv_listitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cv_skillslevel cv_skillslevel_cv_id_e3c39cf6_fk_cv_cv_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.cv_skillslevel
    ADD CONSTRAINT cv_skillslevel_cv_id_e3c39cf6_fk_cv_cv_id FOREIGN KEY (cv_id) REFERENCES public.cv_cv(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: portal_bibliographysubscription portal_bibliographys_permission_id_a524e705_fk_portal_pe; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.portal_bibliographysubscription
    ADD CONSTRAINT portal_bibliographys_permission_id_a524e705_fk_portal_pe FOREIGN KEY (permission_id) REFERENCES public.portal_permissions(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: portal_bibliographysubscription portal_bibliographys_subscription_ptr_id_2886ac18_fk_portal_su; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.portal_bibliographysubscription
    ADD CONSTRAINT portal_bibliographys_subscription_ptr_id_2886ac18_fk_portal_su FOREIGN KEY (subscription_ptr_id) REFERENCES public.portal_subscription(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: portal_permissions portal_permissions_user_id_91a54cdf_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: vobcsljzmnwyjq
--

ALTER TABLE ONLY public.portal_permissions
    ADD CONSTRAINT portal_permissions_user_id_91a54cdf_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO vobcsljzmnwyjq;


--
-- PostgreSQL database dump complete
--

