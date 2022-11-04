import { useState, useEffect } from 'react'
import './myHeader.css'

export default () => {
    let [idx, setIdx] = useState(0)    
    let arrTitles = ['ARGENTINA IN SPORTS', 'JUST DRAG N DROP']

    useEffect(() => {
        if (idx === 0) {
            setTimeout(setIdx.bind(null, 1), 3000)
        }
        else {
            setTimeout(setIdx.bind(null, 0), 8000)
        }
    }, [idx])


    return (
        <header>
           <div className="headercont">
            <div className="top-separator"></div>
            <div className="top-presentation">
                <div>
                    <img src="./img/home/argentina-flag.jpg"></img>
                </div>
                <div className="mov-title">
                    {arrTitles[idx]}
                </div>
                <div>
                    <img src="./img/home/argentina-flag.jpg"></img>
                </div>
            </div>
            <div className="top-separator"></div>
           </div>
        </header>
    )
}