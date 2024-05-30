import {Children} from 'react'
import sortObjectByKeys from "../utils";

const EachElements = ({render, of}) => Children.toArray(!Array.isArray(of)?[]:Object.keys(sortObjectByKeys(of)).map((item,index)=>render(item,index)))
export default EachElements
