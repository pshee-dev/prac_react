import { useNavigate, useParams } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hooks/useFetch';

export default function Day() {
    const { day } = useParams();
    const words = useFetch(`http://localhost:3001/words?day=${day}`)
    const days = useFetch("http://localhost:3001/days")
    const curDay = days.find(curDay => {
        return curDay.day === Number(day)
    });
    const navigate = useNavigate();
    
    function dayDelete() {
        if(window.confirm("삭제 하시겠습니까?")) {
            fetch(`http://localhost:3001/days/${curDay?.id}`, {
                method: "DELETE",
            })
            .then(res => {
                if (res.ok) {
                    navigate("/");
                }
            });
        }
    }

    function moveDay(to) {
        if(to === "prev") {
            if(Number(day) === 1) {
                navigate(`/day/${days.length}`)
            } else {
                navigate(`/day/${Number(day)-1}`)
            }
        } else {
            if(Number(day) === days.length) {
                navigate(`/day/1`)
            } else {
                navigate(`/day/${Number(day)+1}`)
            }
        }
    }

    return (
        <>  
            <div className="arrow_btn">
                <button className="arrow prev" onClick={() => moveDay("prev")}>←</button>
                <button className="arrow next" onClick={() => moveDay("next")}>→</button>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2>Day {day}</h2>
                <button onClick={dayDelete} className="btn_del">Day 삭제</button>
            </div>
            {words.length === 0 && <span>Loading...</span>}
            <table>
                <tbody>
                    {words.map(word => (
                        <Word word={word} key={word.id} />
                    ))}
                </tbody>
            </table>
        </>
    );
}