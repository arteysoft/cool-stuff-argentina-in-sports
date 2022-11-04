import "./root.css"
import MyHeader from "./MyHeader"
import Game from "./gamecomponents/Game"
import Config from './Config'
import { useEffect, useState, useContext } from  'react'
import MyContext from './context/MyContext'


function Title() {
    let {currentPage} = useContext(MyContext)

    let arrTitles = ['Juan Manuel Fangio, among of the greatests Formula 1 drivers. '
                       + 'witch constructor team did he NOT win with ?'
                    , 'Gabriela Sabatinni, one of the greatest tennis players of all times. ' +
                        'What grand slam did she won ?'
                    ,
                        'Manu Ginobili, world wide recognized player of what team ?'
                    ,
                        'He doest\'n  need presentation, where did he never play ?'
                    ]

    return (
        <div className="game-title">
            {arrTitles[currentPage]}
        </div>
    )
}

export default () => {
    let [currentPage, setCurrentPage] = useState(0)
    let [currentTargetList, setCurrentTargetList] = useState([])

    let imgArr = [
        "./img/src/characters/fangio.jpg", 
        "./img/src/characters/gabriela-sabatini.jpg", 
        "./img/src/characters/ginobili.jpg", 
        "./img/src/characters/maradona.jpg"
    ]

    return (
        <>
        <MyContext.Provider value={{currentPage, setCurrentPage, imgArr, currentTargetList, setCurrentTargetList}}>
        <Config />
        <MyHeader />
        
        <main>
            <div className="maincont">
                <Title />
                <Game />
            </div>
            
        </main>
        <footer></footer>
        </MyContext.Provider>
        </>
    )
}