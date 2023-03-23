import { Expense,BudgetAction } from "./budget-reducer"

type paidExpensesProps = {
    unpaidExpenses: Expense[]
    Dispatch: React.Dispatch<BudgetAction>
}

type editExpenseProps = {
    id: number 
    name: string 
    cost: number 
    isEssential: boolean 
    essentialString: string
}

export function UnpaidExpensesList(props: paidExpensesProps){
    let editableExpense: editExpenseProps = {id:0, name: "", cost: 0, isEssential: false, essentialString: "No"}


    function handleSetExpenseNames(event:React.ChangeEvent<HTMLInputElement>){
        editableExpense.name = event.target.value;
        console.log(editableExpense.name);
    }
	
	function handleSetExpenseCosts(event:React.ChangeEvent<HTMLInputElement>){
        editableExpense.cost = Number(event.target.value);
        console.log(editableExpense.cost);
    }

    function handleSetEssentialTags(event:React.ChangeEvent<HTMLInputElement>){
		editableExpense.isEssential = Boolean(event.target.checked);
        console.log(editableExpense.essentialString);
    }

    function handleEditExpense(upid:number){
        // console.log(upid);
        console.log(editableExpense);
        props.Dispatch({type:"EDIT_EXPENSE", payload: upid});
        document.getElementById(`${upid+1}`)?.remove();
    }

    function handleEditExpenseInputs(upid:number){
        const ul = document.getElementById("listType");
        let li = document.createElement("li");
        let lab = document.createElement("label");
        let inpT = document.createElement("input");
        let inpN = document.createElement("input");
        let inpC = document.createElement("input");
        let esLab = document.createElement("label");
        let but = document.createElement("button");
        but.innerText = "Done Editing";
        esLab.innerText = "Essential ";
        li.setAttribute("id",`${upid+1}`);
        lab.setAttribute("htmlFor", "editExpense");
        inpT.setAttribute("type","text");
        inpT.setAttribute("placeholder","Expense Name");
        inpT.addEventListener("input", ()=>handleSetExpenseNames);
        inpN.setAttribute("type","number");
        inpN.setAttribute("placeholder","Expense Cost");
        inpN.addEventListener("input", ()=>handleSetExpenseCosts);
        inpC.setAttribute("type","checkbox");
        inpC.setAttribute("id","editEssential");
        inpC.addEventListener("change", ()=>handleSetEssentialTags);
        esLab.setAttribute("htmlFor","editEssential");
        but.addEventListener("click", ()=> handleEditExpense(upid))

        li.appendChild(lab);
        li.appendChild(inpT);
        li.appendChild(inpN);
        li.appendChild(inpC);
        li.appendChild(esLab);
        li.appendChild(but);

        ul?.appendChild(li);
    }

    function test(){
        console.log("test");
    }

    return <ul id="listType">
        {props.unpaidExpenses.map(up =><li key={up.id}> <b>Expense Name: </b> {up.name} <span id="tab"></span> <b>Expense Cost: </b>{up.cost} <span id="tab"></span>
        Essential: {up.essentialString} <button onClick={()=>handleEditExpenseInputs(up.id)}>Edit</button><button onClick={()=> props.Dispatch({type:"DELETE_EXPENSE", payload: up.id, paidStatus:false})}>Delete</button><button onClick={()=> props.Dispatch({type:"CHANGE_PAID_STATUS", payload: up.id, paidStatus:false})}>Paid</button></li> )}
        {/* {<li>
            <label htmlFor="expense"></label>
            <input type="text"  placeholder="Expense Name" onInput={handleSetExpenseName}/>
            <input type="number" placeholder="Expense Price" onInput={handleSetExpenseCost}/>
            <input type="checkbox" id="essential" onChange={handleSetEssentialTag}/><label htmlFor="essential">Essential </label>
            <button onClick={()=> props.Dispatch({type:"EDIT_EXPENSE"})}>Add Expense</button>
        </li>} */}
    </ul>
}

