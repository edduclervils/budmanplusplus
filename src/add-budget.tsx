import { BudgetManagerState } from "./budget-reducer"


type AddBudgetProps = {
    addBudget: number
}

export function AddBudget(props: AddBudgetProps){

    return <>
    <b>Budget: {props.addBudget}</b>
    </>
}