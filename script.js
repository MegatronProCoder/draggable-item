const draggableItems = document.querySelectorAll('.draggable-items')
const containers = document.querySelectorAll('.container')
draggableItems.forEach(draggableItem => {
    draggableItem.addEventListener('dragstart', () => {
        draggableItem.classList.add('dragging')
    })
    draggableItem.addEventListener('dragend' , () =>{
        draggableItem.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover' , (event)=>{
        event.preventDefault()
        const draggingItem = document.querySelector('.dragging')
        const closestElement = elementBelowDraggingItem(container , event.clientY )
        if(closestElement == null) container.append(draggingItem)
        else{
            container.insertBefore(draggingItem , closestElement)
        }
    })
})

function elementBelowDraggingItem(container , y){

    return [...container.querySelectorAll('.draggable-items:not(.dragging)')]
        .reduce(( closest , item)=>{

            const element = item.getBoundingClientRect()
            const offset = y - (element.top + element.height/2)
            
            if(offset<0 && offset > closest.Offset ){
                return {offset: offset , element: item}
            }else{
                return closest;
            }
            
        } , {Offset : Number.NEGATIVE_INFINITY}).element;
    

}
