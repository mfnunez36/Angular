create database ngdb_games;

use ngdb_games;

create table games (
    id int(11) not null auto_increment primary key,
    title varchar(180),
    description varchar(255),
    img varchar(255),
    createdAt timestamp default currrent_timestamp
);

describe game;