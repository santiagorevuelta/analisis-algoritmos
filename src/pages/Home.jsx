import React, {useState} from 'react';
import FixedPointComponent from "../components/FixedPointComponent";
import data from '../data'
import NewtonRaphsonComponent from "../components/NewtonRaphsonComponent";
import BisectionComponent from "../components/BisectionComponent";

const config = {
    loader: {load: ["input/asciimath"]}
}

function Home() {

    const [datos, setDatos] = useState(null);
    const selectFn = (item) => {
        setDatos(item)
    }

    return (<div className={'container'}>
        <div className={'fns'}>
            {data.map(items => (<div className={'card'} onClick={() => {
                selectFn(items.fn==='Limpiar'?null:items)
            }}>
                <span>{items.fn}</span>
            </div>))}
        </div>
        {datos !== null && (<div className={'tablas'}>
            <div className={'punto'}>
                <FixedPointComponent {...{...datos}} />
            </div>
             <div className={'nr'}>
                <NewtonRaphsonComponent {...{...datos}} />
            </div>
            <div className={'biss'}>
                <BisectionComponent {...{...datos}} />
            </div>
        </div>)}
    </div>);
}

export default Home;
