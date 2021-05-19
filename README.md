###### Comandos heroku
- Verificar si heroku CLI está instalado
    - heroku --version

- Para despliegue usar heroku CLI
    - heroku git:remote -a testapp-node-leo

* tener en cuenta el default branch del repositorio git si es master o main

- Setear variables de entorno para ejecutar proyecto en heroku
    - heroku config:set MONGODB_CONN="mongodb+srv://user:passwd@cluster.h8y3l.mongodb.net/cafeDB"

- Borrar variable en heroku
    - - heroku config:unset MONGODB_CONN