import { useRef } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function CreateWord() {
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        
        fetch(`http://localhost:3001/words`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                day: Number(dayRef.current.value),  // .current.value 를 통해 input 값에 접근 가능
                eng: engRef.current.value,
                kor: korRef.current.value,
                isDone: false
            }),
        })
        .then(res => {
            if(res.ok){
                alert("생성이 완료 되었습니다.");
                navigate(`/day/${dayRef.current.value}`);
            }
        });
    }

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="computer" ref={engRef} />
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="컴퓨터" ref={korRef} />
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map(day => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button>저장</button>
        </form>
    );
}