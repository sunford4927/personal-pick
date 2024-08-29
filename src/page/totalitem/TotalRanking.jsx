import React, { useEffect, useState } from "react";
import ItemAll from "../../components/totalrank/TotalRankItem";
import { sendGet, URL } from "../../util/util";
import './TotalRanking.scss'
import left_img from '../../img/왼쪽.png'
import { useNavigate, useParams } from "react-router-dom";
import Category from "../../components/category/Category";
import { choicRankingCategory, titleList, userAgeList, userTypeList } from "../../util/utilStr";
import { useSelector } from "react-redux";

const list = ["조회수 급상승", "카테고리별", "피부별", "연령대별"]

const TotalItem = () => {

    const nav = useNavigate();
    // TotalRanking 데이터 관리
    const [AllItem, setAllItem] = useState([]);
    // 카테고리별 상태관리
    const [totalCate, setTotalCate] = useState({    
        list: [],
        maintitle: "카테고리 전체",
        subtitle: "" 
    })
    // 피부별

    // 연령대별
    const homeCateMain = useSelector(state => state.homeCategory)
    const skinCateMain = useSelector(state => state.homeSkin)
    const ageCateMain = useSelector(state => state.homeAge)

    const { category } = useParams();
    useEffect(() => {
        sendGet(URL + '/MainPage', setAllItem);       
    }, [])
    const [cateIdx, setCateIdx] = useState(category)

    function showView(idx){
        
        switch(parseInt(idx)){
            case 1:
                return (
                    <div className="itemlist">
                        <ItemAll data={AllItem}></ItemAll>
                    </div>
                )
            case 2:
                return (
                    <>
                        <Category categoryData={titleList} />
                        <div className="itemlist">
                            <ItemAll data={homeCateMain.data}></ItemAll>
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <Category categoryData={userTypeList} />
                        <div className="itemlist">
                            <ItemAll data={skinCateMain.data}></ItemAll>
                        </div>
                    </>
                )              
            case 4:
                return (
                    <>
                        <Category categoryData={userAgeList} />
                        <div className="itemlist">
                            <ItemAll data={ageCateMain.data}></ItemAll>
                        </div>
                    </>
                )
        }
    }

    function changeClass( idx){
        setCateIdx(idx)
    }
    

    return (
        <>
            <div className="all_itemBox ">
                <img className="leftimg float_l cursor" src={left_img} onClick={()=> nav('/')} alt=""  />
                <div className="cos_rank_text">화해 랭킹</div>
                <div className="totalcatebox">
                    {list.map((item, idx) => {
                        return <button key={idx} className={cateIdx == idx+1 ? "rank_btn cursor rank_btn_click" : "rank_btn cursor"} onClick={()=>changeClass(idx+1)}>{item}</button>
                    })}
                </div>
                {showView(cateIdx)}
            </div>
        </>
    );
};

export default TotalItem;