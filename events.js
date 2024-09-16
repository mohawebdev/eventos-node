class EventEmitter {
    constructor() {
      this.listeners = {};
    }
  
    on(eventName, listener) {
      if (typeof listener !== 'function') {
        throw new Error('El escuchador debe ser una función');
      }
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(listener);
    }
  
    off(eventName, listener) {
      if (this.listeners[eventName]) {
        const index = this.listeners[eventName].indexOf(listener);
        if (index !== -1) {
          this.listeners[eventName].splice(index, 1);
        }
      }
    }
  
    once(eventName, listener) {
      const wrapper = (...args) => {
        listener(...args);
        this.off(eventName, wrapper);
      };
      this.on(eventName, wrapper);
    }
  
    emit(eventName, ...args) {
      if (this.listeners[eventName]) {
        this.listeners[eventName].forEach((listener) => {
          listener(...args);
        });
      }
    }
  }
  
  module.exports = EventEmitter;