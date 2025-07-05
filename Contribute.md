

Manual installation

Install nodejs locally ()
Clone the repo
Install dependencies (npm install)
Start the DB locally
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
Go to neon.tech and get yourself a new DB
Change the .env file and update your DB credentials
npx prisma migrate
npx prisma generate
npm run build
npm run start

<!-- ----------------------------------------------------- -->
Docker installation setup for easy way

docker run -d --name postgres-container -e POSTGRES_USER=myUser -e POSTGRES_PASSWORD=Mypassword -e POSTGRES_DB=mydb -p 5432:5432 postgres:15

.env setup 
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

npx prisma generate
npx prisma migrate dev  --name locally dev

<!-- ----------------------------------------------------- -->
Docker installation setup it hardbits all of things available in docker 

docker run --network user_project --name postgres --env-file .env -d -p 5432:5432 postgres

docker build --network=host -t user_project .   

docker run --network user_project --env-file .env -p 3000:3000 user_project
