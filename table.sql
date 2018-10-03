DROP table if exists towns,registration_numbers;

create table towns(
    id serial not null primary key,
    town_name varchar(100)not null,
    initials varchar(5)not null
);

create table registration_numbers(
    id serial not null primary key,
    reg varchar(15)not null,
    town_id int,
    foreign key (town_id) references towns(id) 
);

insert into towns (town_name,initials)values ('Cape Town','CA');
insert into towns (town_name,initials)values ('George','CY');
insert into towns (town_name,initials)values ('Paarl','CAW');
insert into towns (town_name,initials)values ('Stellenbosch','CJ');
