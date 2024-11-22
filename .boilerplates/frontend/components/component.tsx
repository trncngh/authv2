type T{{fileName}}Props = {
    
}


const {{fileName}} = ({className = ''}: T{{fileName}}Props & {className?: string}) => {
    return (
        <div className={`${className}`}>{{fileName}}</div>
    )
}


export default {{fileName}};