import { json } from "stream/consumers"
import { AddBudget } from "./add-budget"


export type Expense ={
    id: number
    name: string 
    cost: number
    isEssential: boolean
    essentialString: string
}


export type BudgetManagerState = {
    nameInput: string
    costInput: number
    isEssentialInput: boolean


    unpaidExpenses: Expense[]
    paidExpenses: Expense[]
    totalPaidExpense: number
    totalUnpaidExpense: number
    isPaid: boolean

    totalCost: number
    budgetSet: number
    budgetAdd: number
}

export type setBudgetAction = {type: "SET_BUDGET", payload: number};
export type addBudgetAction = {type: "ADD_BUDGET",payload: number};
export type setExpenseNameAction = {type: "SET_EXPENSE_NAME", payload: string};
export type setExpenseCostAction = {type: "SET_EXPENSE_COST", payload: number};
export type setEssentialAction = {type: "SET_ESSENTIAL_TAG", payload: boolean};
export type addExpenseAction = {type: "ADD_EXPENSE"};
export type editExpenseAction = {type: "EDIT_EXPENSE", payload: number};
export type deleteExpenseAction = {type: "DELETE_EXPENSE", payload: number, paidStatus: boolean};
export type changePaidStatusAction = {type: "CHANGE_PAID_STATUS", payload: number, paidStatus: boolean};
export type BudgetAction = setBudgetAction | addBudgetAction | setExpenseNameAction | setExpenseCostAction | setEssentialAction | addExpenseAction | editExpenseAction | deleteExpenseAction | changePaidStatusAction


export function budgetReducer(state: BudgetManagerState, action: BudgetAction): BudgetManagerState{

    const newState: BudgetManagerState = JSON.parse(JSON.stringify(state));

    function CalcExpenseTotal(calcState: BudgetManagerState ){
        let totalExpenses = 0;
        for (const expense of calcState.paidExpenses){
            totalExpenses+=expense.cost;
        }
        calcState.totalPaidExpense = totalExpenses;
        totalExpenses = 0;
        for (const expense of calcState.unpaidExpenses){
            totalExpenses+=expense.cost;
        }
        calcState.totalUnpaidExpense = totalExpenses;
    }


    switch (action.type){
        case "SET_BUDGET":{
            newState.budgetSet = action.payload;
            return newState;
        }
        case "ADD_BUDGET":{
            newState.budgetAdd = action.payload;
            return newState;
        }
        case "SET_EXPENSE_NAME":{
            newState.nameInput = action.payload;
            return newState;
        }
        case "SET_EXPENSE_COST":{
            newState.costInput = action.payload;
            return newState;
        }
        case "SET_ESSENTIAL_TAG":{
            newState.isEssentialInput = action.payload;
            return newState;
        }
        case "ADD_EXPENSE":{
            let esStr = "Yes";
            if(newState.isEssentialInput){esStr = "Yes";} else{esStr = "No";}
            const expense: Expense = {id:Math.random(), name:newState.nameInput, cost:newState.costInput, isEssential:newState.isEssentialInput, essentialString: esStr }
            newState.unpaidExpenses.push(expense);
            CalcExpenseTotal(newState);
            return newState;
        }
        case "EDIT_EXPENSE":{
            console.log(newState);
            return newState;}
        case "DELETE_EXPENSE":{
            if(action.paidStatus === true){
                newState.paidExpenses = newState.paidExpenses.filter(expense => expense.id !== action.payload);
                CalcExpenseTotal(newState);
                return newState;
            }
            else{
                newState.unpaidExpenses = newState.unpaidExpenses.filter(expense => expense.id !== action.payload);
                CalcExpenseTotal(newState);
                return newState;
            }
        }
        case "CHANGE_PAID_STATUS":{
            if(action.paidStatus === true){
                const expense: Expense |undefined = newState.paidExpenses.find(expense => expense.id === action.payload);
                if(expense === undefined){
                    return newState;
                }
                newState.paidExpenses = newState.paidExpenses.filter(expense => expense.id !== action.payload);
                newState.unpaidExpenses.push(expense);
                CalcExpenseTotal(newState);
                return newState;
            }
            else{
                const expense: Expense |undefined = newState.unpaidExpenses.find(expense => expense.id === action.payload);
                if(expense === undefined){
                    return newState;
                }
                newState.unpaidExpenses = newState.unpaidExpenses.filter(expense => expense.id !== action.payload);
                newState.paidExpenses.push(expense);
                CalcExpenseTotal(newState);
                return newState;
            }
        }
    }

};