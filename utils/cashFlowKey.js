const categoryCashFlow = {
    XFR:{
        is2ndLevel: true,
        'Salary': {
            category: 'salary',
            goto: 'incomeData'
        }
    },
    'S/O':{
        is2ndLevel: false,
        category: 'standingOrders',
        goto: 'expenseData'
    },
    'D/D':{
        is2ndLevel: true,
        'Direct Line Ins':{
            category: 'insurance',
            goto: 'expenseData'
        },
        '02 Mobile': {
            category: 'mobile',
            goto: 'expenseData'
        }
    },
    'C/L': {
        is2ndLevel: false,
        category: 'atm',
        goto: 'expenseData'
    },
    'POS':{
        is2ndLevel: true,
        'ASDA':{
            category: 'groceries',
            goto: 'expenseData'
        },
        'John Lewis Edinburgh GB':{
            category: 'clothings',
            goto: 'expenseData'
        },
        'Tesco': {
            category: 'groceries',
            goto: 'expenseData'
        },
        'M&S':{
            category: 'groceries',
            goto: 'expenseData'
        }
    },
    'DPC':{
        is2ndLevel: false,
        category: 'directBanking',
        goto:'expenseData'
    }
}

const labels = {
    salary:{
        label: 'Salary'
    },
    standingOrders:{
        label: 'Standing Orders'
    },
    insurance:{
        label:'Insurance'
    },
    mobile:{
        label: 'Mobile or Internet'
    },
    atm:{
        label:'ATM Withdrawal'
    },
    groceries: {
        label: 'Groceries'
    },
    clothings:{
        label: 'Clothings'
    },
    directBanking:{
        label: 'Direct Banking'
    }
}

export {labels, categoryCashFlow};