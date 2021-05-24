###### Comandos heroku
- Verificar si heroku CLI está instalado
    - heroku --version

- Para despliegue usar heroku CLI
    - heroku git:remote -a testapp-node-leo

* tener en cuenta el default branch del repositorio git si es master o main

- Setear variables de entorno para ejecutar proyecto en heroku
    - heroku config:set MONGODB_CONN="mongodb+srv://user:passwd@cluster.mongodb.net/db"

* tener en cuenta para desarrollo local usar un .env creado localmente que reemplaza las variables de entorno de prod

- Borrar variable en heroku
    - heroku config:unset MONGODB_CONN

- Revisar los logs (de manera local dentro de proyecto)
    - heroku logs -n 1000 --tail