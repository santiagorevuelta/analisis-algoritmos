import React, {useEffect, useState} from 'react';
import FixedPointComponent from "../components/FixedPointComponent";
import data from '../data'
import NewtonRaphsonComponent from "../components/NewtonRaphsonComponent";
import BisectionComponent from "../components/BisectionComponent";
import {Button} from "react-bootstrap";
import {useAuth} from "../context/AuthProvider";

const config = {
    loader: {load: ["input/asciimath"]}
}

function Home() {
    const {funciones,reloadFns} = useAuth()
    const [datos, setDatos] = useState(null);

    useEffect(() => {
        reloadFns()
    }, []);

    return (
        <div className={'container'}>
        <div className={'fns'}>
            {funciones.map((items, index) => (
                <Button key={index}
                        className={`card ${datos?.fn === items.fn?'isActive':''}`}
                        onClick={() => {
                             setDatos(null)
                             setTimeout(()=>{
                                 setDatos(items.fn === 'Limpiar' ? null : {...items})
                             },500)
                        }}>
                        {items.fn}
                    </Button>))}
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
