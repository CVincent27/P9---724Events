import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [byDateDesc, setByDateDesc] = useState([])
  
  useEffect(
    () => 
      {
        const timer = setTimeout(
          () => {
            setIndex(index < byDateDesc.length - 1 ?  index + 1 : 0  )}, 5000 
          )
        return () => {clearTimeout(timer)}
      }
  ,[index, byDateDesc]);
       
  // Tri des data par date décroissante
  useEffect (() => 
    setByDateDesc(data?.focus.sort((evtA, evtB) => new Date(evtA.date) < new Date(evtB.date)  ? -1 : 1)
   ));

  return (
    <div className="SlideCardList">
      <ContentSlider data = {byDateDesc} index = {index}/>
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          <Pagination data = {byDateDesc} index = {index} onchange={setIndex}/>
        </div>
      </div>
    </div>
  );
}

const ContentSlider =  ({data, index}) => (
  data?.map((event, idx) => (
    <div
      key={event.title}
      className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
    >
    <img src={event.cover} alt="forum" />
    <div className="SlideCard__descriptionContainer">
      <div className="SlideCard__description">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div>{getMonth(new Date(event.date))}</div>
      </div>
    </div>
  </div>
  )
)
)

const Pagination = ({data, index, onchange}) => (
    data?.map((event , radioIdx) => (
      <input
      // eslint-disable-next-line react/no-array-index-key
        key={`${radioIdx}-radio`}
        type="radio"
        name="radio-button"
        checked={index === radioIdx}
        onChange = {index === radioIdx ?()=>(null) : ()=>(onchange(radioIdx))}
      />
    ))
)
  

export default Slider;