register new user with post request to /auth/register
![register new user with post request to /auth/register ](https://user-images.githubusercontent.com/16051859/60389586-51376b80-9a92-11e9-9e70-a013e4bba674.png)


verify user is added to mongodb database
![verify user is added to mongodb database](https://user-images.githubusercontent.com/16051859/60389587-55638900-9a92-11e9-84ca-8de45d927fc5.png)



verify user can login my making post request to /auth/login - see JWT created - add JWT to headers of this user
![verify user can login my making post request to /auth/login - see JWT created - add JWT to headers of this user](https://user-images.githubusercontent.com/16051859/60389588-598fa680-9a92-11e9-8fd8-96a945a07f73.png)



add JWT to headers of this user to give authorization to get the contacts list from the get request to /contact
![add JWT to headers of this user to give authorization to get the contacts list from the get request to /contact](https://user-images.githubusercontent.com/16051859/60389652-8ee8c400-9a93-11e9-85b1-31d5b4df6518.png)



verify user cannot login when providing an email that does not exist, by making post request to /auth/login with invalid email
![verify user cannot login when providing an email that does not exist, by making post request to /auth/login with invalid email](https://user-images.githubusercontent.com/16051859/60389591-5d232d80-9a92-11e9-89a6-c21c2a574027.png)


verify user cannot login when providing an email that does exist, but with the incorrect password by making post request to /auth/login with invalid password
![verify user cannot login when providing an email that does exist, but with the incorrect password by making post request to /auth/login with invalid password](https://user-images.githubusercontent.com/16051859/60389593-614f4b00-9a92-11e9-866c-fd6183b9d2c2.png)

