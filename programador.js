const  EventEmitter  = require('./events');
const later = require("later");

class Programador extends EventEmitter {
  // Clase Programador. Se usa para configurar la temperatura ideal deseada

  constructor(config) {
    super();

    later.date.localTime();

    config.forEach(({ hora, temperatura }) => {
      console.log(`Programador: ${hora} configurar ${temperatura}ºC.`);

      const sched = later.parse.text(`at ${hora}`);

      const nextDate = later.schedule(sched).next(5)[0];
      const interval = nextDate.getTime() - Date.now();

     console.log(`Intervalo: ${interval}ms`);

      setInterval(() => {
        console.log(
          `Programador: Ajustando temperatura ideal a ${temperatura}`
        );
        this.emit("ideal", temperatura);
      }, interval);
    });
  }
}

module.exports = Programador;
