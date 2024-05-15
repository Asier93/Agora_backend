# Intrucciones

Clonar repo

npm install

moficiar el .env

# Esquema

https://drawsql.app/teams/asier-1/diagrams/copy-of-koel-mysql

# Algoritmo

## 1. Registro usuario y login: POST y GET

Controlador que cree user y devuelva token. 

```
http://localhost:8080/auth/

{
"uname": "asier",
"email": "asier@gmail.com",
"password": "12345678"
}

http://localhost:8080/auth/login

{
"identifier": "asier@gmail.com",
"password": "12345678"
}
```

##  2. Nueva partida: POST 

Recibe token de user y crea nueva partida relacionando partida a usuario. 

Devuelve un id de partida

```
http://localhost:8080/newgame

auth-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjZTZiNzEyODU2NGViYmE3NmNjYzEiLCJ1c2VybmFtZSI6ImFzaWVyIiwiZW1haWwiOiJhc2llckBnbWFpbC5jb20iLCJpYXQiOjE3MTUyNjcyOTR9.tB0u7JmQjn2oajvQA6VKl-FkM78o5WR5ayCjFq2Z5nc
```

## 3. Crear esquemas de las entidades necesarias

Crear esquemas y meter datos: Bloques, Niveles, categorías, etc.

##  4. ¿Qué nivel?  ¿Qué bloque? ¿Qué opciones?  GET

Recibe token de user, id de la partida. 

Devuelve nombre e id del nivel, un nombre e id de bloque y nombres e ids de opciones disponibles. 

Info: 7 niveles. 4 bloques por nivel. 12 opciones con su descripciones por bloque (total 336). Son 4 adjetivos que se repiten 3 veces por cada bloque. Estos 4 adjetivos están agrupados en 3 categorías (name: 1,2,3). Va mostrando las opciones en función de las opciones que se van seleccionando.

```
http://localhost:8080/info/663dcf3ec4602372cba04053

auth-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjZTZiNzEyODU2NGViYmE3NmNjYzEiLCJ1c2VybmFtZSI6ImFzaWVyIiwiZW1haWwiOiJhc2llckBnbWFpbC5jb20iLCJpYXQiOjE3MTUyNjcyOTR9.tB0u7JmQjn2oajvQA6VKl-FkM78o5WR5ayCjFq2Z5nc

"Ejemplo: El Despertar en el Metaverso: 663d29201462f59fb540423c  | Bloque 2 del nivel El Despertar en el Metaverso: 663d2d6a768869f64f9cfdb3  | Categoría 2: Cauteloso, Bondadoso, Decidido: 663dfc3cfc567fca9153cc47, 663dfc3cfc567fca9153cc4a, 663dfc3cfc567fca9153cc48"

```

## 5. Puntuación POST

Recibe token de user, partida, y opción seleccionada

```
http://localhost:8080/point/:game/:option

auth-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjZTZiNzEyODU2NGViYmE3NmNjYzEiLCJ1c2VybmFtZSI6ImFzaWVyIiwiZW1haWwiOiJhc2llckBnbWFpbC5jb20iLCJpYXQiOjE3MTUyNjcyOTR9.tB0u7JmQjn2oajvQA6VKl-FkM78o5WR5ayCjFq2Z5nc
```

Busca de esa opción cuantos puntos hay guardados de su bloque y puntua en función de lo guardado

# Más

Comentar que al final la lógica depende de los params que envía el front y las consultas que hace el controlador a la base de datos

Mejorar la seguridad de la carga de puntos (que coincida el token del usuario con la partida)

Hacer test

Pasar la info del POST por el body en lugar de la url

Crear otro controlador para resumir el resultado de la partida, profile. Evalúa el valor de los puntos: +1, 0, 0, -1

En el front hacer dos fetch para cambiar de preguntas a inmersiva

Validar la entrada de datos, que nos falte información en ningún punto





	
