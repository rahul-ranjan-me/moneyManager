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
        label: 'Salary',
        icon:'credit-card'
    },
    standingOrders:{
        label: 'Standing Orders',
        icon:'first-order'
    },
    insurance:{
        label:'Insurance',
        icon:'life-ring'
    },
    mobile:{
        label: 'Mobile or Internet',
        icon:'mobile'
    },
    atm:{
        label:'ATM Withdrawal',
        icon:'institution'
    },
    groceries: {
        label: 'Groceries',
        icon:'cutlery'
    },
    clothings:{
        label: 'Clothings',
        icon: 'cogs'
    },
    directBanking:{
        label: 'Direct Banking',
        icon:'bank'
    },
    others:{
        label: 'Others',
        icon:'money'
    }
}

export {labels, categoryCashFlow};