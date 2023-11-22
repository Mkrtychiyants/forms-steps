
import React, { useState } from 'react';


export interface IForm {
    stepsDate: string,
    stepsDistance: number,
    tracks: Array<{
        stepsDate: string,
        stepsDistance: number,
        id : string
    }>,
}

export const StepsCounter = () => {
    const [form, setForm] = useState<IForm>(
        { stepsDate: "", stepsDistance: 0, tracks: [] },
    )

    let { stepsDate, stepsDistance, tracks } = form;
    function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let numStepsDistance = Number(stepsDistance)
        const dateExist = (element: {
            stepsDate: string,
            stepsDistance: number,
        }) => element.stepsDate === stepsDate;
        const dateNew = (a: {
            stepsDate: string,
            stepsDistance: number,
        }, b: {
            stepsDate: string,
            stepsDistance: number,
        }) => {
            let dateA = new Date(a.stepsDate);
            let dateB = new Date(b.stepsDate);

            return Number(dateB) - Number(dateA);
        }

        if (tracks.some(dateExist)) {

            let changedTrack = tracks.find(dateExist);
            let numChangedDistance = Number(changedTrack?.stepsDistance)
            let sumTrack = numChangedDistance + numStepsDistance;
            if (changedTrack) {
                let newTrack = { stepsDate, stepsDistance: sumTrack,  id: changedTrack.id }
                tracks.splice(tracks.findIndex(dateExist), 1, newTrack)
            }

        } else {
            tracks.unshift({ stepsDate, stepsDistance: numStepsDistance, id: (Math.floor(Math.random() * 100)).toString()})
            tracks.sort(dateNew);

        }
        setForm((prev) => (
            {
                ...prev,
            }
        ))


    }
    function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }
    function deleteHandler(e: React.MouseEvent<HTMLLIElement>) {
        tracks = tracks.filter(elem => elem.id != (e.currentTarget.id))
        setForm((prev) => (
            {
                ...prev,
                tracks : tracks
            }
        ))
    }

    return (
        <form className='stepsForm' autoComplete='off' onSubmit={formSubmit} >
            <div className="formInput">
                <div className="dateContainer">
                    <label htmlFor="stepsDateInput" id="stepsDate"  >Дата (ДД.ММ.ГГ)</label>
                    <input type='date' name="stepsDate" id="stepsDate" value={stepsDate} onChange={inputChange} />
                </div>
                <div className="distanceContainer">
                    <label htmlFor="stepsDistanceInput" id="stepsDistance">Пройдено км</label>
                    <input type="text" name="stepsDistance" id="stepsDistance" onChange={inputChange} />
                </div>
                <button type='submit' className='stepsFormInput'>OK</button>
            </div>
            <div className="formTable">
                <div className="fromTableTitle">
                    <div className="dateLabel">Дата (ДД.ММ.ГГ)</div>
                    <div className="distanceLabel">Пройдено км</div>
                    <div className="actionsLabel">Действия</div>
                </div>
                <ul className="formTableData">
                    {tracks.map((account) => (
                        <li className="dataRow" key={Math.floor(Math.random() * 100)} id= {account.id} onClick={deleteHandler}>
                            <div className="dateRow">{account.stepsDate}</div>
                            <div className="distanceRow">{account.stepsDistance}</div>
                            <div className="actionsRow">
                                <button className='dataRowBtn edit'><span className="material-icons">
                                    edit_note
                                </span></button>
                                <button className='dataRowBtn delete'  >
                                    <span className="material-icons">
                                        disabled_by_default
                                    </span>
                                </button>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </form>
    )
}
