-- USERS
INSERT INTO users (name, email, password)
VALUES ('Wesley Matthee', 'wesleymatthee@lighthouse.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Daniel Muller', 'holytechhead@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Justin Baker', 'baked@amsterdam.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

--PROPERTIES
INSERT INTO properties ( 
    title, description,
     cover_photo_url, thumbnail_photo_url, 
     cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, 
     province, city, country, street, post_code,
     active)
    VALUES ('Sunny Bay', 'Sunny straw hut by the bay.',
      'https://images.pexels.com/photos/13695382/pexels-photo-13695382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      'https://www.pexels.com/photo/chairs-inside-living-room-2343466/', 
      128, 4,  2, 1, 
      'ON', 'Simcoe', 'Canada', '17 Maple Way', '89790',
      true
     ),

     ('Big Barn', 'Nothing like smell of a fresh barn, first thing in the morning.',
      'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      'https://images.pexels.com/photos/2132118/pexels-photo-2132118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      150, 10,  1, 1, 
      'ON', 'Port Stanley', 'Canada', '11 Dirt Road', '90750',
      true
     ),

     ('City Living', 'City life is the best life, close to bars and Airport.',
      'https://images.pexels.com/photos/13695382/pexels-photo-13695382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      'https://www.pexels.com/photo/chairs-inside-living-room-2343466/', 
      350, 1,  2, 2, 
      'ON', 'Toronto', 'Canada', '16 Brick Lane', '45521',
      true
     );


-- RESERVATIONS
INSERT INTO reservations (start_date, end_date)
VALUES ('2023-09-11', '2023-09-26'),
('2022-12-25', '2023-01-13'),
('2023-02-23', '2023-02-14');


-- PROPERTY REVIEWS
INSERT INTO property_reviews (rating, message)
VALUES (2, 'message'),
(5, 'message'),
(4, 'message');
