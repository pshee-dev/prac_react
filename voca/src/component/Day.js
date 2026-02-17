import { useNavigate, useParams } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hooks/useFetch';

export default function Day() {
    const { day } = useParams();
    const words = useFetch(`http://localhost:3001/words?day=${day}`)
    const curDay = useFetch("http://localhost:3001/days").find(curDay => {
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

    return (
        <>  
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