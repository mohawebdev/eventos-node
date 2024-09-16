const Habitacion = require("./habitacion.js");
const Climatizador = require("./climatizador.js");
const Termostato = require("./termostato.js");
const Programador = require("./programador.js");


const config=[
    { hora: "07:00",
        temperatura: 22
       },
       { hora: "08:30",
        temperatura: 18
       },
       { hora: "18:00",
         temperatura: 22
       },
      { hora: "23:00",
        temperatura: 20
     }
]

// Creamos una habitacion:
const dormitorio = new Habitacion();
dormitorio.temperatura = 22;

// Creamos un climatizador para la habitacion:
const climatizador = new Climatizador(dormitorio);

// Creamos un Termostato que mira la temperatura de la habitacion:
const termostato = new Termostato(dormitorio);

// Creamos un Programador:
const programador = new Programador(config);

// Configuramos el Programador:
programador.on("ideal", (temperatura) => {
    termostato.indicarTemperaturaIdeal(temperatura);
});

// Configuramos el termostato para controlar la temperatura:
termostato.on("muchofrio", () => climatizador.calentar());
termostato.on("muchocalor", () => climatizador.enfriar());

// Mostar la temperatura periodicamente:
termostato.on("tic", (temperatura) => console.log(`${temperatura.toFixed(1)}ºC`));

// Configurar la temp ideal a 20 grados:
//termostato.indicarTemperaturaIdeal(20);

  
// Encender el termostato:
termostato.encender();