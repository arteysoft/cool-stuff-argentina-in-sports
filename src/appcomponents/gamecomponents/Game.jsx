import './game.css'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
import MyContext from '../context/MyContext'

function SourceLst() {

    const dragItem = useRef();
    const dragOverItem = useRef();

    let {imgArr} = useContext(MyContext)
    let {currentPage} = useContext(MyContext)
    
    let img = imgArr[currentPage]

    let dragStarted = e => {
        dragItem.current = 0
        console.log(e.target);
    }
    const dragEnter = (e) => {
        dragOverItem.current = 0;
        console.log(e.target);
    }

    return (
        <>
            <img className="playImage" draggable 
                    onDragStart={dragStarted} 
                    onDragEnter={dragEnter}
                    src={img} />
        </>
    )
}

function ReferenceList(props) {
    let winners = [0, 3, 2, 2]
    let source = [[
            "./img/src/formula1/williams.jpg", 
            "./img/src/formula1/mercedes.jpg", 
            "./img/src/formula1/ferrari.jpg", 
            "./img/src/formula1/alfaromeo.jpg"
        ], [
            "./img/src/tennis/australia.jpg", 
            "./img/src/tennis/paris.jpg", 
            "./img/src/tennis/wimbledon.jpg", 
            "./img/src/tennis/us-open.jpg"
        ], [
            "./img/src/basketball/newyork.jpg", 
            "./img/src/basketball/chicago.jpg", 
            "./img/src/basketball/sanantonio.jpg", 
            "./img/src/basketball/miami.jpg"
        ], [
            "./img/src/football/barcelona.jpg", 
            "./img/src/football/boca.jpg",
            "./img/src/football/real.jpg",
            "./img/src/football/napoli.jpg"
        ]
    ]

    let imgRefs = source[props.currentPage]

    return (
        <>
            {imgRefs.map((z, i) => (<img className="playImage" key={i.toString()} src={z} />))}
        </>
    )
}

function Next(props) {
    let img = "./img/src/arrow.png"

    let {currentPage, setCurrentPage} = useContext(MyContext)

    let triggerNext = () => {
        if (currentPage === 3) {
            setCurrentPage(0)
            return
        }
        setCurrentPage(currentPage + 1)
    }

    return (
        <>
            <img className="imgNext" onClick={triggerNext} src={img} alt="next"></img>
        </>
    )
}

let DropBox = props => (
    <div className="drop-here-space" 
                            key={props.idx} onDrop={e => props.dropHandler(props.idx)}>
                                DROP IMAGE HERE
                            </div>
)

function TargetList() {
    let [arr, setArr] = useState(
        new Array(4).fill(0).map((z, i) => <DropBox dropHandler={dropCapture} key={i} idx={i}></DropBox>)
    )
    let [keyAffected, setKeyAffected] = useState(-1)

    let {imgArr} = useContext(MyContext)
    let {currentPage, setCurrentPage} = useContext(MyContext)

    useEffect(() => {
        console.log('ESTE SE ACTIVA SOLO SI CAMBIA EL CURRENT PAGE')
        setArr(new Array(4).fill(0).map((z, i) => <DropBox dropHandler={setKeyAffected} key={i} idx={i}></DropBox>))
    }, [currentPage])

    useEffect(() => {
        if (keyAffected === -1) {
            return;
        }
        console.log('Key affected')
        console.log(keyAffected)
        console.log(arr)

        let Insert = () => (<img className="playImage" draggable="false" src={imgArr[currentPage]} />)

        console.log('DROP')
        console.log(keyAffected)
        console.log(arr)
        let newArr = [...arr]
        newArr.splice(keyAffected, 1)
        newArr.splice(keyAffected, 0, <Insert key={Date.now()}></Insert>)
        setArr(newArr)
        console.log(newArr)
        setKeyAffected(-1)        
        setTimeout(() => {
            if (currentPage === 3) {
                setCurrentPage(0)
                return
            }
            setCurrentPage(currentPage + 1)
        }, 200)
    }, [keyAffected])


    function dropCapture(i) {        
        let Insert = () => (<img className="playImage" src={imgArr[currentPage]} />)

        console.log('DROP')
        console.log(i)
        let newArr = [...arr]
        newArr.splice(i, 1)
        newArr.splice(i, 0, <Insert key={Date.now()}></Insert>)
        setArr(newArr)
    }

    return (
        <>
            {arr}
        </>
    )
}

function Game() {
    let {currentPage, setCurrentPage} = useContext(MyContext)
    let {currentTargetList, setCurrentTargetList} = useContext(MyContext)

    let setCurrentPageWrapper = () => {
        let cp = currentPage;
        if (cp < 3) {
            setCurrentPage(cp + 1)
        }
        else {
            setCurrentPage(0)
        }
    }

    let dragOverCapture = e => {
        e.preventDefault()
    }

    let dragEnterCapture = e => {
        e.preventDefault()
    }

    return (
        <div className="game">
            <div className="image-source-list">
                <SourceLst />
            </div>
            <div className="image-drop-list" 
                                onDragOver={dragOverCapture} 
                                onDragEnter={dragEnterCapture}
                                >
                <TargetList />
            </div>
            <div className="image-reference-list">
                <ReferenceList currentPage={currentPage} />
            </div>
        </div>
    )
}

export default Game
