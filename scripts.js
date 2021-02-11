const Modal = {
    open() {
        //abrir modal
        //adicionar class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close() {
        //fechar modal
        //remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')

    }
}


// const transactions = [
//     {
//         id: 1,
//         description: 'Energia',
//         amount: -500010,
//         date: '23/01/2021',
//     },
//     {
//         id: 2,
//         description: 'Site',
//         amount: 3500020,
//         date: '23/01/2021',
//     },
//     {
//         id: 3,
//         description: 'Internet',
//         amount: -200300,
//         date: '23/01/2021',
//     },
//     {
//         id: 4,
//         description: 'App',
//         amount: 2500040,
//         date: '09/02/2021',
//     },
// ]

const Transaction = {
    all: [
            {
                id: 1,
                description: 'Energia',
                amount: -500010,
                date: '23/01/2021',
            },
            {
                id: 2,
                description: 'Site',
                amount: 3500020,
                date: '23/01/2021',
            },
            {
                id: 3,
                description: 'Internet',
                amount: -200300,
                date: '23/01/2021',
            },
            {
                id: 4,
                description: 'App',
                amount: 2500040,
                date: '09/02/2021',
            },
        ],


    add(transaction){
        Transaction.all.push(transaction)

        // console.log(transaction.all)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1) // remove pelo index do array ; deleta 1 registro.

        App.reload()
    },  

    incomes() {
           //somar as entradas
           let income = 0;
           //Pegar todas as transactions
           //para cada transaction
        //    transactions.forEach(transaction => {
            Transaction.all.forEach(transaction => {
               //se ela forma maior que zero
               if (transaction.amount > 0) {
                   //somar a uma variável e retornar a variável a
                   // income = income + transaction.amount;
                    income += transaction.amount;

               }
           })
        return income; //"Entrada"
     


    },

    expenses() {
        //somar as saídas
        let expense = 0;
        //Pegar todas as transactions
        //para cada transaction
       // transactions.forEach(transaction => {
           Transaction.all.forEach(transaction => {
            //se ela forma MENOR que zero
            if (transaction.amount < 0) {
                //somar a uma variável e retornar a variável a
                // income = income + transaction.amount;
                 expense += transaction.amount;

            }
        })
     return expense; //"Entrada"


    },

    total() {
        //total = entradas - saídas
        return Transaction.incomes() + Transaction.expenses()
    }

}

const DOM ={
    transactionsContainer: document.querySelector('#data-table tbody'),


    addTransaction(transaction, index) {
        // console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

       // console.log(tr.innerHTML) // testando no console do navegador 


       DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        //colocando a classe correta Entrada || Saida
        const CSSClass = transaction.amount > 0 ? "income" : "expense"

        //formato de Moeda
        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
        
                   
                            <td class="description">${transaction.description}</td>
                            <td class="${CSSClass}">${amount}</td>
                            <td class="date">${transaction.date}</td>
                            <td>
                                 <img src="assets/minus.svg" alt="Botão de Remover lançamento" />
                            </td>
                    
        
        `
        return html
    },

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses() )//"Soma das Entradas"
        document
            .getElementById('totalDisplay')
            .innerHTML =Utils.formatCurrency(Transaction.total()) // "Soma das Entradas"
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML =""
    }
}

const Utils = {
    formatCurrency(value) {
        // console.log(value)


        const signal = Number(value) < 0 ? "-" : "";
        // console.log(signal)

        // convertendo para string para ativar REGEX
        value = String(value).replace(/\D/g,"")

        value = Number(value)/ 100

        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
        })

        // console.log(value)
        return signal + value
    }
}

const Form ={

}

const App = {
    init() {

        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })


        DOM.updateBalance()



    },
    reload() {
     DOM.clearTransactions()
      App.init()
    },
}

App.init()

// Teste de add e clearTransactions
// Transaction.add({
//         id: 5,
//         description: 'Cadeira Presidencial',
//         amount: 200,
//         date: '11/02/2021',
//     })

// Teste remove
// Transaction.remove(0)
