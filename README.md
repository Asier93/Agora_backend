# Intrucciones

Clonar repo

npm install

modificiar el .env

# Esquema

https://drawsql.app/teams/asier-1/diagrams/agora

# Algoritmo

## 1. Registro usuario y login: POST

Controlador que cree user y devuelva token. 

```
http://localhost:8080/auth/

{
"uname": "presentacion",
"email": "presentacion_prueba@gmail.com",
"password": "12345678"
}

http://localhost:8080/auth/login

{
"identifier": "presentacion_prueba@gmail.com",
"password": "12345678"
}

devuelve token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUwODJhODdjNmZlOTE4NGE1NGNkYTEiLCJ1c2VybmFtZSI6InByZXNlbnRhY2lvbiIsImVtYWlsIjoicHJlc2VudGFjaW9uX3BydWViYUBnbWFpbC5jb20iLCJpYXQiOjE3MTY1NTI0NTB9.EmQlngYV2Y1iIPfK9jcAVkfBYeUvthRsIDrI4BiuN1g
```

##  2. Nueva partida: POST 

http://localhost:8080/newgame

Recibe token de user y crea nueva partida relacionando partida a usuario. 

auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUwODJhODdjNmZlOTE4NGE1NGNkYTEiLCJ1c2VybmFtZSI6InByZXNlbnRhY2lvbiIsImVtYWlsIjoicHJlc2VudGFjaW9uX3BydWViYUBnbWFpbC5jb20iLCJpYXQiOjE3MTY1NTI0NTB9.EmQlngYV2Y1iIPfK9jcAVkfBYeUvthRsIDrI4BiuN1g

Devuelve un id de partida: 6650834e7c6fe9184a54cda4

``` 

## 3. ¿Qué nivel?  ¿Qué bloque? ¿Qué opciones?  GET

http://localhost:8080/info/:game

http://localhost:8080/info/6650834e7c6fe9184a54cda4

Recibe token de user + id de la partida. 

```
auth-token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUwODJhODdjNmZlOTE4NGE1NGNkYTEiLCJ1c2VybmFtZSI6InByZXNlbnRhY2lvbiIsImVtYWlsIjoicHJlc2VudGFjaW9uX3BydWViYUBnbWFpbC5jb20iLCJpYXQiOjE3MTY1NTI0NTB9.EmQlngYV2Y1iIPfK9jcAVkfBYeUvthRsIDrI4BiuN1g

id de partida: 6650834e7c6fe9184a54cda4

Devuelve nombre e id del nivel, un nombre e id de bloque y nombres, ids y descripciones de opciones disponibles:

"El Despertar en el Metaverso: 663d29201462f59fb540423c  | Bloque 1 del nivel El Despertar en el Metaverso: 663d2d6a768869f64f9cfdb2  | Categoría 1: Entusiasta , Apacible, Rapido, Logico: 663dfc3cfc567fca9153cc37, 663dfc3cfc567fca9153cc3a, 663dfc3cfc567fca9153cc38, 663dfc3cfc567fca9153cc39, Bailas con entusiasmo cuando Hermes reproduce música mágica para celebrar el encuentro., Escuchas atentamente las historias y preocupaciones de Hermes sin interrumpir., Tomas la ruta más corta para encontrar el objeto mágico, sin dudarlo., Coges un mapa antiguo para deducir donde está el objeto mágico, basándote en leyendas y símbolos mitológicos. "

(Info: 7 niveles. 4 bloques por nivel. 12 opciones con sus descripciones por bloque (total 336). Son 4 adjetivos que se repiten 3 veces por cada bloque. Estos 4 adjetivos están agrupados en 3 categorías (name: 1,2,3). Va mostrando las opciones en función de las opciones que se van seleccionando).

```

## 4. Puntuación POST

Recibe token de user, partida, y opción seleccionada (ENTUSIASTA, primera elección)

```
http://localhost:8080/point/:game/:option

http://localhost:8080/point/6650834e7c6fe9184a54cda4/663dfc3cfc567fca9153cc37 

auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUwODJhODdjNmZlOTE4NGE1NGNkYTEiLCJ1c2VybmFtZSI6InByZXNlbnRhY2lvbiIsImVtYWlsIjoicHJlc2VudGFjaW9uX3BydWViYUBnbWFpbC5jb20iLCJpYXQiOjE3MTY1NTI0NTB9.EmQlngYV2Y1iIPfK9jcAVkfBYeUvthRsIDrI4BiuN1g
```

Busca de esa opción cuántos puntos hay guardados de su bloque y puntúa en función de lo guardado

## 5. Resultados GET

http://localhost:8080/score/6:game 

http://localhost:8080/score/6650834e7c6fe9184a54cda4

auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUwODJhODdjNmZlOTE4NGE1NGNkYTEiLCJ1c2VybmFtZSI6InByZXNlbnRhY2lvbiIsImVtYWlsIjoicHJlc2VudGFjaW9uX3BydWViYUBnbWFpbC5jb20iLCJpYXQiOjE3MTY1NTI0NTB9.EmQlngYV2Y1iIPfK9jcAVkfBYeUvthRsIDrI4BiuN1g

```

Recopila los adjetivos puntuados con +1 asociados a una partida (id), asociada a un user. 

Con la lista de adjetivos, la IA los relaciona con un personaje mitológico.

```

Devuelve:

{
    "adjectives": [
        "Entusiasta"
    ],
    "serverResponse": "Me gustaría relacionarte con el dios griego Dionisio, también conocido como Baco en la mitología romana. Dionisio era el dios del vino, la diversión, el teatro y la fertilidad, y se caracterizaba por ser extremadamente entusiasta y apasionado en todo lo que hacía. Así como él, tú transmites entusiasmo en todo lo que emprendes y contagias esa energía positiva a los que te rodean. Además, al igual que Dionisio, disfrutas de la vida y encuentras alegría en las cosas simples y hermosas del mundo. ¡Que tu entusiasmo te lleve a conquistar grandes logros como lo hizo Dionisio en el Olimpo!"
}

## TODO

Mejorar la seguridad de la carga de puntos (que coincida el token del usuario con la partida)

Pasar la info del POST por el body en lugar de la url

Validar la entrada de datos, que nos falte información en ningún punto

Sistema de recompensas

Establecer roles: admin dashboard 

Desplegar, docker





	
