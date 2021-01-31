import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

// 미리 생성 스타일을 입혀서 적용시킨다.
let 박스 = styled.div`
	padding : 20px;
`;

let 제목 = styled.h4`
    font-size : 25px;
    color : ${props => props.색상}
`;

function Detail(props) {

    let [alert, setAlert] = useState(true);
    let [inputData, setInputData] = useState('');

    useEffect(() => {

        // axios.get()

        let timer = setTimeout(() => {
            setAlert(false);
        }, 2000);
        return () => { clearTimeout(timer) } // 타임아웃 쓸 때 쓰고 나서 제거해줌
    }, [alert]); // 대괄호 안에 useEffect가 실행될 조건을 걸수있음, alert라는 state가 변경이 될때만 실행 ㄱㄱ
    // [] 이렇게 아무것도 없이 쓰면 처음 한번만 실행된다

    let { id } = useParams();
    /* find() 라는 ES6 신문법이 있습니다. Array 안에서 원하는 자료를 찾고싶을 때 사용합니다.
    * find()는 array 뒤에 붙일 수 있으며, 안에 콜백함수가 들어갑니다.
    * 콜백함수 내의 파라미터는 (제가 상품이라고 적은거) array 안에 있던 하나하나의 데이터를 의미합니다.
    * return 오른쪽엔 조건식을 적을 수 있습니다. 이게 참인 데이터만 새로운 변수에 저장해줍니다.
    * 조건식엔 그리고 그걸 현재 URL의 /:id에 적힌 값과 상품의 영구번호 (상품.id)가 같은지 비교하고 있는 겁니다.
    */
    let 찾은상품 = props.shoes.find(function (상품) {
        return 상품.id == id
    });
    let history = useHistory();

    return (
        <div className="container">
            <박스>
                <제목 className="red">
                    DETAIL
                </제목>
            </박스>

            <input onChange={(e) => { setInputData(e.target.value) }} />
            {inputData}
            {
                alert == true
                    ? <div className="my-alert my-alert2">
                        <p>재고가 얼마 남지 않았습니다</p>
                    </div>
                    : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (Number(id) + 1) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>


                    <Info 재고={props.재고}></Info>

                    <button className="btn btn-danger" onClick={() => { props.재고변경([9, 11, 12]) }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => { history.push('/') }}>뒤로가기</button>
                </div>
            </div>
        </div>
    )
}

function Info(props) {
    return (
        <p>재고 : {props.재고[0]}</p>
    )
}

export default Detail;