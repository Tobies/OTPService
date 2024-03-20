




export default function KeyPadButton(props) {
    return <div onClick={props.click} id={"keypad-" + props.actionid} actionid={props.actionid} className="w-32 h-24 flex items-center justify-center text-button text-3xl font-normal transition ease-out active:scale-95 rounded-lg m-1 select-none cursor-pointer hover:bg-input">{props.icon}</div>
}

