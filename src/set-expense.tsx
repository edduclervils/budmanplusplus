import { BudgetAction, Expense } from "./budget-reducer"


type SetExpenseProps = {
    unpaidExpenses?: Expense[]
    Dispatch?: React.Dispatch<BudgetAction>

}

export function SettingExpenses(props: SetExpenseProps){
    console.log(props.unpaidExpenses);

    

    return <>
        <label htmlFor="EditExpense"></label>
        <input type="text"  placeholder="Expense Name"/>
        <input type="number" placeholder="Expense Price"/>
        <input type="checkbox" id="EditEssential" /><label htmlFor="EditEssential">Essential </label>
        <button>Add Expense</button>
    </>
}