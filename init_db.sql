create extension if not exists "uuid-ossp";

create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer
)

--drop table products

create table stocks (
	id uuid primary key default uuid_generate_v4(),
	product_id uuid,
	count integer,
	foreign key ("product_id") references "products" ("id") ON DELETE CASCADE
)

-- ALTER table stocks 
--     DROP CONSTRAINT stocks_product_id_fkey,
--     ADD CONSTRAINT stocks_product_id_fkey 
--     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

--drop table stocks

insert into products (title, description, price) values
	('Product 1', 'Description product 1', 100),
	('Product 2', 'Description product 2', 200),
	('Product 3', 'Description product 3', 300),
	('Product 4', 'Description product 4', 400),
	('Product 5', 'Description product 5', 500),
	('Product 6', 'Description product 6', 600),
	('Product 7', 'Description product 7', 700),
	('Product 8', 'Description product 8', 800)
	
insert into stocks (product_id, count) values
	('4a3d3f7d-1b7d-4d65-a93f-7bae80b4bbdf', 10),
	('3073616e-1347-4446-b85e-27f3d5336c01', 20),
	('d7ab24ad-67da-4c71-9f84-7ff5195c72d7', 30),
	('04692109-98a0-4747-98e4-63aa09b5b823', 40),
	('d9279906-61c6-4417-a29c-7f092a2c8733', 50),
	('9588cd5d-b24a-4240-8216-5abfe2751d70', 60),
	('f76809b5-d5cf-4698-b8c8-938cf7c329a5', 70),
	('8ae44f6f-c534-4270-9a1b-17499d571eb2', 80)


