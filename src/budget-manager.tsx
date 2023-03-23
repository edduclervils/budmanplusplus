import { useReducer } from "react"
import { AddBudget } from "./add-budget";
import { BudgetAction, BudgetManagerState, budgetReducer } from "./budget-reducer"
import { PaidExpensesList } from "./paid-expenses-list";
import { SettingExpenses } from "./set-expense"
import { UnpaidExpensesList } from "./unpaid-expenses-list";


const initialState: BudgetManagerState ={
    nameInput: "",
    costInput: 0,
    isEssentialInput: false,


    unpaidExpenses: [],
    paidExpenses: [],
    totalPaidExpense: 0,
    totalUnpaidExpense: 0,
    isPaid: false,

    totalCost: 0,
    budgetSet: 0,
    budgetAdd: 0
}

export function BudgetManager(){

    const[trackerState, dispatch] = useReducer(budgetReducer, initialState);



    function handleSetBudget(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_BUDGET", payload: Number(event.target.value)});
    }

    function handleAddBudget(){
        dispatch({type:"ADD_BUDGET", payload:trackerState.budgetSet})
    }

    function handleSetExpenseName(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_EXPENSE_NAME", payload: event.target.value});
    }

    function handleSetExpenseCost(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type:"SET_EXPENSE_COST", payload:Number(event.target.value)});
    }

    function handleSetEssentialTag(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type:"SET_ESSENTIAL_TAG", payload:Boolean(event.target.checked)});
    }


    function handleEditExpense(){
        console.log("hey There");
        <SettingExpenses unpaidExpenses={trackerState.unpaidExpenses} Dispatch={dispatch}/>
        console.log("Hello");

    }


    return <>
        <h1>Budget Manager</h1>
        <h2>Plus <em>Plus</em></h2>

        <label htmlFor="budget"></label>
        <input id="budget" type="number" placeholder="0" onInput={handleSetBudget}/>
        <button onClick={handleAddBudget}>Add Budget</button>
        <br />

        <label htmlFor="expense"></label>
        <input type="text"  placeholder="Expense Name" onInput={handleSetExpenseName}/>
        <input type="number" placeholder="Expense Price" onInput={handleSetExpenseCost}/>
        <input type="checkbox" id="essential" onChange={handleSetEssentialTag}/><label htmlFor="essential">Essential </label>
        <button onClick={()=> dispatch({type:"ADD_EXPENSE"})}>Add Expense</button>

        <br /><br /><br />

        <AddBudget addBudget={trackerState.budgetAdd}></AddBudget>
        <div><b>Expense: </b></div>
        <div><b>Balance: </b></div>


        <h3>Unpaid Expenses</h3>
        <UnpaidExpensesList unpaidExpenses={trackerState.unpaidExpenses} Dispatch={dispatch}/>
        <div><b>Total Unpaid Expense: {trackerState.totalUnpaidExpense}</b></div>
        

        <h3>Paid Expenses</h3>
        <PaidExpensesList paidExpenses={trackerState.paidExpenses} Dispatch={dispatch}/>
        <div><b>Total Paid Expense: {trackerState.totalPaidExpense}</b></div>

    </>
}