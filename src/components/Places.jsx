export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isFetching,
}) {
  return (
    <section className='places-category'>
      <h2>{title}</h2>
      {isFetching && <p className='fallback-text'>data is Fetching ...</p>}
      {!isFetching && places.length === 0 && (
        <p className='fallback-text'>{fallbackText}</p>
      )}
      {!isFetching && places.length > 0 && (
        <ul className='places'>
          {places.map((place) => (
            <li key={place.id} className='place-item'>
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
