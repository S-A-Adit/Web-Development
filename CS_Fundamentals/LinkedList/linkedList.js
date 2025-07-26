import Node from "./node.js";

export default class LinkedList {
    constructor(){
       this.listHead = null;
    }
    prepend(value){
        let tmp = value;
        if(this.listHead === null) tmp = this.listHead;
        this.listHead = new Node();
        this.listHead.nextNode = tmp;
    }
    append(value){
        if(this.listHead === null) this.prepend(value)
        let tmp = this.listHead;
        while(tmp.nextNode != null) tmp = tmp.nextNode
        tmp.nextNode = new Node(value);    
    }

    size(){
        let tmp = this.listHead
        let counter = 0;
        while(tmp!=null){
            counter++
            tmp = tmp.nextNode;
        }
        return counter;
    }
    head(){
        return this.listHead
    }
    tail(){
      tmp = this.listHead;
      while(tmp.nextNode!= null) tmp = tmp.nextNode
      return tmp;
    }

    at(index){
      let tmp = this.listHead;
      
      for(i=0; i<index; i++){
        tmp = tmp.nextNode
        if(tmp === null) "There is no value at this item"
      }
       return tmp;
    }

    pop(){
      let curr = this.listHead;
      let prev = null;
     while(curr.nextNode != null){
        prev = curr;
        curr = curr.nextNode;
     }
     prev.nextNode = null;

    }
    contains(value){
        let tmp = this.listHead;
    while(tmp!= null){
        if(tmp === value) return true
        tmp = tmp.nextNode;
     }
     return false;
    }
    find(value){
     let tmp = this.listHead;
     let index = 0;

     while(tmp!= null){
      if(tmp === value) return index
       tmp = tmp.nextNode;

     }
     return null
    }
    toString() {
      let tmp = this.listHead;
      let stringList = '';
      while(tmp!= null){
        stringList = `(${tmp.value}) -> `;
        temp = temp.nextNode;  
      } 
      return (stringList += "null");
    }

    insertAt(value, index){
      if (this.listHead === null) this.prepend(value);
       else{
          let curr = this.listHead;
          let prev = null;
          for(i=0; i<index; i++){
            prev = curr;
            curr = curr.nextNode;
            if (cur === null) break; // if index is bigger than end of list, add node at end of list
          }
         const tmp = new Node(value);
         prev.nextNode = temp;
         tmp.nextNode = curr
    }
   }
    removeAt(index){
      if(this.listHead === null ) return "List is already empty"
      let cur = this.listHead;
      let prev = null;
      for(let i = 0; i< index; i++){
        prev = curr;
        curr = curr.nextNode;
        if(curr === null) return "There is no item for this index";
      } 
      prev.nextNode = curr.nextNode;
    }
}
