-- Migration number: 0001 	 2025-03-14T22:33:03.318Z
create table responses (
    id text primary key,
    fullname text not null,
    email text not null,
    district text not null,
    testimonial text not null,
    collected_date int not null
);
