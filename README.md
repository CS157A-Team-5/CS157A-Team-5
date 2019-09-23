# PetBook

### Team 5

### Elana Olson, Julio Mercado Soto, Lovejit Kharod

---

## Project Overview 
PetBook is an application for pets and pet owners to connect and find friends relative to their location, helping pets find companions to play and socialize with, while helping pet owners meet other pet owners and pets. Owners can search for nearby pet-friendly locations such as parks, common walking routes, and pet play areas. Likewise, one can search for similar species, breeds, size of pet, beloved activities, favorite treats, and other specifications to find the perfect pet companion. Furthermore, nearby pets can be displayed sorted as the best match, weighted appropriately by species, location, and activities.

The stakeholders of our project will be both pets and pet owners.  Owners will be able to arrange meetup appointments with other pet owners in public places to allow their pets to interact and get their much-needed exercise.  PetBook gives owners the ability to meet owners who share a common love for the same species of pet, or even one completely different if they so choose.


## Functional Requirements
Users of PetBook are pet owners looking for companions and play dates for their pets. Pet owners can connect to other owners in nearby locations to find people that go to the same parks, allowing their pets to socialize and meet new friends. Users can go online to our user-friendly website to search for nearby pets, find pets that connect well with their pet, and befriend other pet owners to arrange activities together.

| Essential          | Desired            | Optional          |
| :----------------- | :----------------- | :----------------- |
| Pet owners onboard and login to register their pet. | Use Google sign in to authenticate users | Allow multiple pets per profile |
| Provide recommendations to pet owners aligning with their pet specifications. | Suggest meeting pets with similar specifications
Prioritize based on: Location, Walking route, Parks, Species, Favorite Activity | Allow owners to decide which criteria are important |
| Pet owners can friend request other pet owners to connect their pets | New friend requests send an email to the owner | Notify owners of changes to friends’ profiles |


## Nonfunctional Requirements

To ensure all pet and pet owner data is kept secure, we will use Google sign on to keep their username and password secure and confidential. All pet profile information will be kept confidential in our database unless the owner specifies it to be shown on their profile. We will prevent against SQL injection and other forms of attack on SQL databases and have duplicated databases for backup. Database queries will go through a middleware that securely interacts with the database and prevent client-side database interaction.
