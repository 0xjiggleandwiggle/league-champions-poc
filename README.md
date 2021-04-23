# League Champions 
### Containerzied web application ( Expressjs + Vuejs + Mysql ) with docker and kubernetes

![alt text](https://i.ibb.co/9r1wwmn/app-screen.png "League Champions")

this application is a POC i realised during my eningeering cursus, the applications its splitted to three parts a Database, a frontend and finally a client.

## App Features

- Add champions ( adding a champion u must enter the link of achampion from this website ex: https://leagueoflegends.fandom.com/wiki/[champions correct name ]/LoL)
- Delete a champion
- List of champions and their details

## Starting the app (Developement)

##### - Option A (Docker compose):

You can run the entire app with docker compose all containers will start immediately:


```sh
$ docker-compose up
```
> note: the app wil be started on:
    + App:  http://localhost:8081
    + API:  http://localhost:3000
    + PhpMyAdmin:  http://localhost:8080

##### - Option B (Docker commands):
+  Mysql container ( attached to a network and volume for persistance):
    1. First we create a volume using this command:
            ```sh
            $ docker volume create league-db
            ```
    2. also we need a network so all containers can communicate:
        ```sh
        $ docker network create leaguechampions-network
        ```
    3. now we need to run our mysql container:
        ```sh
        $ docker run --name leaguechampions-database --mount source=leaguechampions_database,target=/var/lib/mysql -e MYSQL_ROOT_PASSWORD=nodeapp -e MYSQL_DATABASE=leaguedb -e MYSQL_USER=nodeapp -e MYSQL_PASSWORD=nodeapp --network=leaguechampions-network -d mysql:5.7
        ```
    
        * **- -name**: name of the container
        * **- -mount**: to bind a volume to the container
            + **source**: is the name of the volume created
            + **target**: is the mount point location inside the container
        + next we have to specify some mysql variable environement to create a database and a user (before each var env you need to put "**-e**"):
            + **MYSQL_ROOT_PASSWORD**: This variable is mandatory and specifies the password that will be set for the MySQL root superuser account
            + **MYSQL_DATABASE**: This variable is optional and allows you to specify the name of a database to be created on image startup. If a user/password was supplied (see below) then that user will be granted superuser access (corresponding to GRANT ALL) to this database.
            + **MYSQL_USER, MYSQL_PASSWORD**: These variables are optional, used in conjunction to create a new user and to set that user's password. This user will be granted superuser permissions (see above) for the database specified by the MYSQL_DATABASE variable. Both variables are required for a user to be created.
        * **- - network**-: specify the network that the container will be added to in the startup

+  Backend container ( attached to a network and volume for persistance):
    1. Next step run the back end container but first we must build the image :
        ```sh
        docker build --target development -t msalekmouad/leaguechampions-backend:dev ./backend
        ```
    
        + **- - target**: Set the target build stage to build. because in my docker file i have two stages the developement and the production, in the kubernetes deployment we need an image for production not developement.
        + **-t** or **- - tag**: Name and optionally a tag in the 'name:tag' format, you can replace [msalekmouad] with your dockher hub username , because you need to push it after for kubernetes deployment
        + and finally the path of the docker file
    
    2. now we can run our backend container using this command:
        ```sh
        docker run --name leaguechampions-backend -p 3000:3000 --mount source=league-data,target=/app/backend/data --network=leaguechampions-network -e MYSQL_ROOT_PASSWORD=nodeapp -e MYSQL_DATABASE=leaguedb -e MYSQL_USER=nodeapp -e MYSQL_PASSWORD=nodeapp -e DATABASE_HOST=leaguechampions-database -d msalekmouad/leaguechampions-backend:dev
        ```
        
        + **- -name**: Container name
        + **-p** or **- - publish**: Publish a container's port(s) to the host
        + **-- mount**: same as i explained above for mounting a volume, in this backend container i want to persist a JSON files data
        + **variable environements**: all other attributes is variable environement so we can connect the mysql database container
+  Backend container ( attached to a network and volume for persistance):
    1. and finally we need to build the frontend image:
        ```sh
        docker build --target development -t msalekmouad/leaguechampions-frontend:dev ./frontend
        ```
    2. running the frontend container:
        ```sh
        docker run --name leaguechampions-frontend -p 8081:8080 --network=leaguechampions-network -d msalekmouad/leaguechampions-frontend:dev
        ```



## Kubernetes (Deployment)

You can deploy the app in kubernetes cluster , and you can use minikube for educational or testing purposes
> Note: here is the full and official documention for minikube installation: https://kubernetes.io/fr/docs/tasks/tools/install-minikube/

after minikube is installed successfully in your machine lets begin deployment work:

1. first start your minikube machine using the command:
    ```sh
    $ minikube start
    ```
2. then check minikube running:
    ```sh
    $ minikube status
    ```
    > Note: you should see the output
    host: Running
    kubelet: Running
    apiserver: Running
    kubeconfig: Configured

3. now you have to deploy 3 things in kubernetes ( database, backend and the frontend)
4.  lets begin with the database , navigate to the k8s folder and perform this command:
    ```sh
    $ cd k8s && kubectl apply -f database-stateful.yaml
    ```

    > Note: this command will create 3 replicas of mysql database for high availability using the master/slave architecture
    
5. now we deploy the phpmyadmin (this part is optional) just to manage our mysql database:
    ```sh
    & kubectl apply -f phpmyadmin-depl.yaml
    ```
    
    > Note: to check if this deployments has started use the command:
        **minikube dashboard** : will launch a visual dashboard and u can explore all status and errors
        
6. next we deploy the front end and backend:
    ```sh
        $ kubectl apply -f backend-depl.yaml
    ```
    
    > Note: when you see the backend deployments are up u need to get the url of the backend service so you can connect it with front
    use the following command: **minikube service --url backend-service**
    and copy the url in the output
    
7. finally it's the frontend deployment, first you have to past the url you copied from last step in the file **k8s/frontend_depl.yaml** in front of a varibale called **VUE_APP_API_ENDPOINT:**
    
    now you can run the command:
    ```sh
    $ kubectl apply -f frontend-depl.yaml
    ```
    
    >Note: now you good to go, if all seems good in the minikube dashboard you can access the app using the link from the following command: **minikube service --url frontend-service**


Enjoy!
    





