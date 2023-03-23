import { Expense,BudgetAction } from "./budget-reducer"

type paidExpensesProps = {
    paidExpenses: Expense[]
    Dispatch: React.Dispatch<BudgetAction>
}

export function PaidExpensesList(props: paidExpensesProps){

    return <table>
    <thead>
        <tr>
            <th>Expense Name</th><th>Expense Cost</th><th>Essential</th><th>Delete</th><th>Not Paid</th>
        </tr>
    </thead>
    <tbody>
    {props.paidExpenses.map(p => <tr key={p.id}><td>{p.name}</td><td>{p.cost}</td><td>{p.essentialString}</td><button onClick={()=> props.Dispatch({type:"DELETE_EXPENSE", payload: p.id, paidStatus:true})}>Delete</button><td><button onClick={()=> props.Dispatch({type:"CHANGE_PAID_STATUS", payload: p.id, paidStatus:true})}>Not Paid</button></td></tr> )}
    </tbody>
    </table>
}

