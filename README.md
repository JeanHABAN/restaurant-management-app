# CS571-2023-05-Final-Project
# MIU-MSD-CS571-2023-5-Final-Project
## Final Project - Restaurant Management App
### Application specifications and requirements
You will create a mobile application to help restaurant owners manage their food.
  
The owners must sign up for a new account (using a unique email, phone number, full name, password, and address). Every time they login in successfully, the application will display three tabs:
1. **List of Foods**
    * List of Food
    * Owners can add/edit/delete/view foods
    * A food contains name, price, date, and image link. For example, Food = {name: 'Noodle', Origin: 'Vietnam', price: 10, date: new Date(), image: <uri>}
    * There is a live search bar to search foods by name
2. **Daily Notes**
   * List of notes (header, date)
   * Owner can add/view notes
   * A note includes a header, date, and comment. For example, note = {date: new Date(), header: 'Noodle', comment: 'Need to have more noodles next week'}
3. **Personal profile**
    * This screen shows the owner's information (email, phone number, full name, password, address)
    * Owners can change their phone number, password, full name, and address on the screen, but not email.
    -
## Hint: Suggested database design. You can have a single collection 'users' as below
{
    _id: ObjectId(),
    name, phone....
    foods:[
        ...
    ],
    notes: [
        ...
    ]
}

Your project must include the following:
* Frontend: Use Expo App with React Native components at https://reactnative.dev/docs/components-and-apis.  Persist the app state in AsyncStorage, so users don't need to log in every time they start the app. 
* Backend: Use Express/MongoDB for supportive backend REST API. All Express routes should be protected from public access by JWT (except sign-up and sign-in routes).
* Implement an Auth system using JSON Web Token (JWT).
* Password should be hashed before saving to database
* ONLY COMPRO: Implement unit tests with Jest for Frontend.
  
This project is individual; students should not work in groups, share code, or copy code from any source. Remember to respect the code honor submission policy. All written code must be original. Presenting something as one's work when it came from another source is plagiarism and is forbidden. Plagiarism is ashamed in all American academic institutions and is guarded vigilantly by every professor.    

## Submission Requirements:
Please push the final version to GitHub by 10:00 PM CST, Monday (05/22/2022).
Each person will have 15 minutes to present on Tuesday (05/23/2022). I will send an email with the schedule later.

**Good luck and happy coding!**
