import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({

  // banco de dados interno do miragejs
  // sempre irá começar vazio
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      // nome da tabela, mas sempre no plural
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-04-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-03-10 11:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })


    this.post('/transactions', (schema, request) => {
      
      const data = JSON.parse(request.requestBody)

      // esse schema é meu banco de dados
      return schema.create('transaction', data)
    } )

  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


