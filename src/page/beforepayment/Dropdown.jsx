import { useState } from 'react'
import './Dropdown.scss'


function Dropdown ({selected , setSelected}) {

    const [isActive, setIsActive] = useState(false);
    const options = ['1개월' , '2개월' , '3개월' , '4개월'];

    // 초기값 설정 (예: 첫 번째 옵션)
    const initialSelected = options[0];

    // selected 값이 없을 경우 초기값으로 설정
    const currentSelected = selected || initialSelected;

    return (
        <div className="dropdownboxstyle">
            <div className="dropdown-btn" onClick={e => 
                setIsActive(!isActive)}>
            {/* selected 값이 초기값일 때 다른 텍스트 표시 */}
            {currentSelected === initialSelected ? '기본값 선택' : currentSelected}
            <span className='fas fa-caret-down'></span>
            </div>
            {isActive && (
                 <div className="dropdown-content">
                    {options.map((option) => (
                        <div 
                         onClick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                        }}
                        className="dropdown-item"
                        >
                        {option}
                        </div>
                    ))}
             </div>
            )}
        </div>
    )
}

export default Dropdown