// const Hello = function() {
//     <h1>Hello</h1>;
// };

// export default Hello;

import World from "./World";

export default function Hello() {
    return (
        <div>
            <h1>Hello</h1>
            {/* 컴포넌트 내부에서 새로운 컴포넌트를 사용할 때는 태그(div)로 감싸주어야 함 */}
            <World />        
            <World />        
        </div>
    );
}