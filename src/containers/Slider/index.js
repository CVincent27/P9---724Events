import { useEffect, useState } from "react"; 
import { useData } from "../../contexts/DataContext"; 
import { getMonth } from "../../helpers/Date"; 
import "./style.scss"; 

const Slider = () => {
  const { data } = useData(); 
  const [index, setIndex] = useState(0); 

  // Tri des event par date décroissante
  const byDateDesc = data?.focus
    ? data?.focus.sort(
        (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
      )
    : [];

  useEffect(() => {
    // gestion changement d'index
    const interval = setInterval(() => {
      // intervalle de 5 secondes
      setIndex((current) =>
        current < byDateDesc.length - 1 ? current + 1 : 0
      );
    }, 5000); 
    return () => clearInterval(interval); // clear interval
  }, [index, byDateDesc.length]); // déclenchement au changement d'index 

  const handleOptionChange = (e) => {
    // Gestion input radio
    setIndex(parseInt(e.target.value, 10)); // Mise à jour de l'index (base 10 pour intérpréter les chiffres de 0 à 9)
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map(
        (
          event,
          idx 
        ) => (
          <div
            key={event.id} 
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide" 
            }`}
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
      )}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map(
            (
              event,
              radioIdx 
            ) => (
              <input
                key={event.id} // Clé unique pour chaque bouton
                type="radio"
                name="radio-button"
                value={radioIdx}
                checked={index === radioIdx} 
                onChange={handleOptionChange} // Gestion changemet input radio
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;