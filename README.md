# google-drive-demo
Integration with google drive

## Local Development
- Install Docker https://docs.docker.com/desktop/
- clone the master branch on this repo
- Navigate into the root folder of the cloned repo
- Create the .env file using the instructions mentioned below
  - Generate a secret key using the command: `openssl rand -base64 32`
  - Create a project, configure the consent screen and setup Oauth credentials as mentioned in https://developers.google.com/identity/sign-in/web/sign-in. You would need the Oauth client id and client secret for this project, not the API key as we would be accessing the user's drive resources on behalf of the user.
  - Enable the drive API from here https://console.cloud.google.com/apis/library
  - Add `local.drive-demo.com:3050` to the authorized domain
  - Add `http://local.drive-demo.com:3050/after-login` to the allowed redirect url
  - Make a copy of the server/.env.example file and place it under server/.env file
  - Substitute the actual Oauth credentials and the secret key in the server/.env file
- Run `docker-compose build`
- Run `docker-compose up`
- Add the host mapping `127.0.0.1 local.drive-demo.com` to you /etc/hosts
- Open `local.drive-demo.com:3050` in your browser
